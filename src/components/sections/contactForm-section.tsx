"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

// Updated schema to include all form fields across steps
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  phone: z.string().min(7, { message: "Please enter a valid phone number." }),
  background: z.string().min(10, { message: "Background must be at least 10 characters." }),
  references: z.string().min(5, { message: "References must be at least 5 characters." }),
  purpose: z.string().min(10, { message: "Purpose must be at least 10 characters." }),
  amount: z.number().min(0, { message: "Minimum amount is €1" }).max(100000, { message: "Maximum amount is €1,000,000" }),
  previousGrants: z.string().optional(),
  howHeard: z.string().min(1, { message: "Please select how you heard about us." }),
  applicationCategory: z.string().min(1, { message: "Please select an application category." }),
  appliedHedborg: z.string().min(1, { message: "Please select an option" }),
});

const referralSources = [
  'Facebook',
  'LinkedIn',
  'X_Twitter',
  'Google_Search',
  'Friend_Family',
  'Organization_Referral',
  'Other'
] as const;

const applicationCategories = [
  'Information_Technology',
  'Research',
  'Culture',
  'Education',
  'Healthcare',
  'Environmental',
  'Social_Impact',
  'Innovation',
  'Entrepreneurship',
  'Arts',
  'Science',
  'Other'
] as const;

// Define error type for form submission
// interface FormSubmissionError extends Error { ... }

// Define the reCAPTCHA interface directly in the global declaration
declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

// Add this new component at the top level
const StepIndicator = ({ currentStep, totalSteps = 5 }: { currentStep: number; totalSteps?: number }) => {
  const { t } = useTranslation();
  
  return (
    <div className="mb-8 px-4 md:px-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step <= currentStep ? 'bg-[#252932] text-white' : 'bg-gray-200'
                }`}
              >
                {step}
              </div>
              <span className="text-sm mt-1">
                {t(`application.stepIndicator.step${step}`)}
              </span>
            </div>
            {step < totalSteps && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  step < currentStep ? 'bg-[#252932]' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Export the interfaces so they can be imported elsewhere
export interface FormFields {
  name: string;
  email: string;
  lastName: string;
  phone: string;
  background: string;
  references: string;
  purpose: string;
  amount: number;
  previousGrants: string;
  howHeard: string;
  applicationCategory: string;
  appliedHedborg: string;
}

export interface StepData {
  [key: string]: string | File[] | { type: string; file: File }[] | undefined;
}

interface ContactFormProps {
  currentStep: number;
  formData: FormFields;  // Update to use FormFields instead of FormData
  onStepComplete: (data: StepData) => void;
  onStepBack: () => void;
}

// Add proper types for references and grants
interface Reference {
  name: string;
  contact: string;
  relationship: string;
}

interface PreviousGrant {
  foundation: string;
  year: string;
  amount: string;
}

// Update the STEP_FIELDS definition to match the new order
const STEP_FIELDS: Record<number, string[]> = {
  1: ['name', 'lastName', 'email', 'phone'],
  2: ['background', 'purpose', 'amount', 'applicationCategory'],
  3: ['previousGrants', 'howHeard', 'appliedHedborg'], // Application History
  4: ['references'], // References
  5: ['documents'] // Documents
};

export function ContactForm({ currentStep, formData, onStepComplete, onStepBack }: ContactFormProps) {
  const { t } = useTranslation();
  const [attachments, setAttachments] = useState<{ type: string; file: File }[]>([]);
  const [references, setReferences] = useState<Reference[]>([]);
  const [currentReference, setCurrentReference] = useState<Reference>({
    name: '',
    contact: '',
    relationship: ''
  });
  const [previousGrants, setPreviousGrants] = useState<PreviousGrant[]>([]);
  const [currentGrant, setCurrentGrant] = useState<PreviousGrant>({
    foundation: '',
    year: '',
    amount: ''
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: formData?.name || "",
      email: formData?.email || "",
      lastName: formData?.lastName || "",
      phone: formData?.phone || "",
      background: formData?.background || "",
      references: formData?.references || "",
      purpose: formData?.purpose || "",
      amount: formData?.amount || 0,
      previousGrants: formData?.previousGrants || "",
      howHeard: formData?.howHeard || "",
      applicationCategory: formData?.applicationCategory || "",
      appliedHedborg: formData?.appliedHedborg || "",
    },
  });

  useEffect(() => {
    // Only load reCAPTCHA on client side
    if (typeof window !== 'undefined' && !window.grecaptcha) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  useEffect(() => {
    // When step changes, reset form to show saved values from formData
    form.reset(formData);
  }, [currentStep, formData, form]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Only show Step 1 fields */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("contactForm.name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("contactForm.namePlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("contactForm.lastName")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("contactForm.lastNamePlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("contactForm.email")}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={t("contactForm.emailPlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("contactForm.phone")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("contactForm.phonePlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="applicationCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("contactForm.applicationCategory")}</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full p-2 border rounded-md">
                      <option value="">{t("contactForm.selectOption")}</option>
                      {applicationCategories.map((category) => (
                        <option key={category} value={category}>
                          {t(`contactForm.applicationCategories.${category}`)}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="background"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("contactForm.background")}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t("contactForm.backgroundPlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("contactForm.purpose")}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t("contactForm.purposePlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("contactForm.amount")}</FormLabel>
                  <div className="space-y-4">
                    <Slider
                      min={0}
                      max={100000}
                      step={1000}
                      value={[field.value || 0]}
                      onValueChange={(value) => {
                        field.onChange(value[0]);
                      }}
                      className="w-full"
                    />
                    <div className="flex justify-between items-center">
                      <FormControl>
                        <div className="text-lg font-semibold">
                          €{field.value?.toLocaleString() || '0'}
                        </div>
                      </FormControl>
                      <div className="text-sm text-gray-500">
                        Max: €100,000
                      </div>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="previousGrants"
              render={() => (
                <FormItem>
                  <FormLabel>{t("contactForm.previousGrants")}</FormLabel>
                  <div className="bg-gray-50 p-4 rounded-lg mb-8">
                    <h3 className="text-lg font-medium mb-4">{t("contactForm.addPreviousGrant")}</h3>
                    <div className="space-y-4">
                      <Input
                        placeholder="Foundation Name"
                        value={currentGrant.foundation}
                        onChange={(e) => setCurrentGrant({...currentGrant, foundation: e.target.value})}
                      />
                      <Input
                        placeholder="Year"
                        type="number"
                        min="1900"
                        max={new Date().getFullYear()}
                        value={currentGrant.year}
                        onChange={(e) => setCurrentGrant({...currentGrant, year: e.target.value})}
                      />
                      <Input
                        placeholder="Amount (€)"
                        type="number"
                        value={currentGrant.amount}
                        onChange={(e) => setCurrentGrant({...currentGrant, amount: e.target.value})}
                      />
                      <div className="pt-2 pb-4">
                        <Button
                          type="button"
                          onClick={() => {
                            if (currentGrant.foundation && currentGrant.year && currentGrant.amount) {
                              setPreviousGrants([...previousGrants, currentGrant]);
                              setCurrentGrant({ foundation: '', year: '', amount: '' });
                            }
                          }}
                        >
                          Add Grant
                        </Button>
                      </div>
                    </div>
                  </div>

                  {previousGrants.length > 0 && (
                    <div className="space-y-6 mb-8">
                      <h4 className="font-medium">Previous Grants:</h4>
                      {previousGrants.map((grant, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">{grant.foundation}</p>
                              <p className="text-sm text-gray-600">Year: {grant.year}</p>
                              <p className="text-sm text-gray-600">Amount: €{parseInt(grant.amount).toLocaleString()}</p>
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => setPreviousGrants(previousGrants.filter((_, i) => i !== index))}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="howHeard"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("contactForm.howHeard")}</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full p-2 border rounded-md">
                      <option value="">{t("contactForm.selectOption")}</option>
                      {referralSources.map((source) => (
                        <option key={source} value={source}>
                          {t(`contactForm.referralSources.${source}`)}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="appliedHedborg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("contactForm.appliedHedborg")}</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full p-2 border rounded-md">
                      <option value="">{t("contactForm.selectOption")}</option>
                      <option value="yes">{t("contactForm.yes")}</option>
                      <option value="no">{t("contactForm.no")}</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-medium mb-4">{t("contactForm.addReference")}</h3>
              <div className="space-y-4">
                <Input
                  placeholder="Reference Name"
                  value={currentReference.name}
                  onChange={(e) => setCurrentReference({...currentReference, name: e.target.value})}
                />
                <Input
                  placeholder="Contact Information"
                  value={currentReference.contact}
                  onChange={(e) => setCurrentReference({...currentReference, contact: e.target.value})}
                />
                <Input
                  placeholder="Relationship/How you know them"
                  value={currentReference.relationship}
                  onChange={(e) => setCurrentReference({...currentReference, relationship: e.target.value})}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (currentReference.name && currentReference.contact && currentReference.relationship) {
                      setReferences([...references, currentReference]);
                      setCurrentReference({ name: '', contact: '', relationship: '' });
                    }
                  }}
                >
                  Add Reference
                </Button>
              </div>
            </div>

            {references.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-medium">Added References:</h4>
                {references.map((ref, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{ref.name}</p>
                        <p className="text-sm text-gray-600">{ref.contact}</p>
                        <p className="text-sm text-gray-600">{ref.relationship}</p>
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => setReferences(references.filter((_, i) => i !== index))}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="cv" className="block text-sm font-medium text-gray-700">
                {t("contactForm.attachCV")}
              </label>
              <input 
                type="file" 
                name="cv" 
                id="cv" 
                className="mt-2"
                accept=".pdf,.doc,.docx,.txt,.rtf,.odt"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setAttachments([{ type: 'cv', file }]);
                  }
                }}
              />
            </div>
            
            <div>
              <label htmlFor="additionalAttachments" className="block text-sm font-medium text-gray-700">
                {t("contactForm.additionalAttachments")}
              </label>
              <input 
                type="file" 
                name="additionalAttachments" 
                id="additionalAttachments" 
                multiple
                className="mt-2"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setAttachments(current => [
                    ...current,
                    ...files.map(file => ({ type: 'additional', file }))
                  ]);
                }}
                accept=".pdf,.doc,.docx,.txt,.rtf,.odt,.xlsx,.xls,.csv,.ppt,.pptx"
              />
            </div>

            {attachments.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Uploaded Files:</h4>
                <div className="space-y-2">
                  {attachments.map((attachment, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>{attachment.file.name}</span>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => setAttachments(attachments => attachments.filter((_, i) => i !== index))}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What happens next section - Updated styling */}
            <div className="mt-16 pt-9">
              <h4 className="font-semibold text-[#252932] mb-4 text-lg">
                {t("contactForm.whatHappensNext")}
              </h4>
              <ul className="space-y-3">
                {[
                  t("contactForm.nextSteps.review"),
                  t("contactForm.nextSteps.confirmation"),
                  t("contactForm.nextSteps.process"),
                  t("contactForm.nextSteps.contact")
                ].map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1">
                      <svg className="w-4 h-4 text-[#252932]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const stepFields = STEP_FIELDS[currentStep];
    if (!stepFields) return;

    try {
      // Special handling for step 3 (previous grants)
      if (currentStep === 3) {
        const isValid = await form.trigger(['howHeard', 'appliedHedborg'] as const);
        if (!isValid) return;

        const stepData: StepData = {
          previousGrants: JSON.stringify(previousGrants),
          howHeard: form.getValues('howHeard'),
          appliedHedborg: form.getValues('appliedHedborg')
        };

        onStepComplete(stepData);
        return;
      }

      // Special handling for step 4 (references)
      if (currentStep === 4) {
        if (references.length === 0) {
          alert('Please add at least one reference');
          return;
        }

        const stepData: StepData = {
          references: JSON.stringify(references)
        };

        onStepComplete(stepData);
        return;
      }

      // Special handling for step 5 (documents)
      if (currentStep === 5) {
        const stepData: StepData = {
          attachments
        };

        onStepComplete(stepData);
        return;
      }

      // For steps 1 and 2, proceed with normal validation
      const isValid = await form.trigger(stepFields as Array<keyof typeof formSchema._type>);
      if (!isValid) return;

      const stepData = stepFields.reduce((acc, field) => {
        const value = form.getValues(field as keyof typeof form.getValues);
        return {
          ...acc,
          [field]: value
        };
      }, {} as Record<string, string>);

      onStepComplete(stepData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full px-4 md:px-6 pb-20">
      <StepIndicator currentStep={currentStep} totalSteps={5} />
      
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-16">
        <div className="md:col-span-4 relative">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl text-[#252932] font-normal">
              {t(`application.steps.${currentStep}.title`)}
            </h2>
          </div>

          <Form {...form}>
            <form onSubmit={handleSubmit}>
              {renderStepContent()}
              
              <div className="flex justify-between mt-8 pt-4 border-t">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onStepBack}
                    className="border-[#252932] text-[#252932] hover:bg-[#252932]/10"
                  >
                    {t("application.button.back")}
                  </Button>
                )}
                <Button 
                  type="submit"
                  className="ml-auto bg-[#252932] hover:bg-[#252932]/90 text-white"
                >
                  {currentStep === 5 
                    ? t("application.button.submit") 
                    : t("application.button.continue")
                  }
                </Button>
              </div>
            </form>
          </Form>

          <div className="hidden md:block absolute top-0 -right-8 w-[1px] h-96 bg-gray-300" />
        </div>
        
        <div className="hidden md:block md:col-span-3">
          <div className="p-6">
            <h3 className="text-2xl text-[#252932] mb-8 font-normal">
              {t("application.title")}
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">✓</span>
                <span className="text-gray-700">{t("application.timeEstimate")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">✓</span>
                <span className="text-gray-700">{t("application.documents.preferred")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">✓</span>
                <span className="text-gray-700">{t("application.documents.incomplete")}</span>
              </li>
            </ul>

            <div className="mt-12 mb-8">
              <Image
                src="/images/help.svg"
                alt={t("application.help.illustration")}
                width={600}
                height={240}
                className="w-full h-auto"
              />
            </div>

            <div className="bg-[#252932] text-white p-6 rounded-lg text-center">
              <h4 className="text-xl">
                {t("application.help.title")}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
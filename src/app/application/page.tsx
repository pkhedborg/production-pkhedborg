"use client";

import { useState } from "react";
import { ContactForm, FormFields, StepData } from "@/components/sections/contactForm-section";
import FAQSection from "@/components/sections/faq-section";
import { useTranslation } from "react-i18next";
import ApplyImage from "@/components/Images/OptimizeApplyImage";
import OptimizeHelpImage from "@/components/Images/OptimizeHelpImage";

export default function ApplicationPage() {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormFields>({
    name: "",
    email: "",
    lastName: "",
    phone: "",
    background: "",
    references: "",
    purpose: "",
    amount: 0,
    previousGrants: "",
    howHeard: "",
    applicationCategory: "",
    appliedHedborg: "",
  });

  const handleStepComplete = async (stepData: StepData) => {
    console.log('Step completed with data:', stepData);
    setFormData(prev => ({
      ...prev,
      ...stepData
    }));
    
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    } else {
      try {
        const submitFormData = new FormData();
        
        // Add all form fields with the correct field names using the component's formData state
        submitFormData.append('user_name', formData.name);
        submitFormData.append('user_email', formData.email);
        submitFormData.append('lastName', formData.lastName);
        submitFormData.append('phone', formData.phone);
        submitFormData.append('background', formData.background);
        submitFormData.append('references', formData.references);
        submitFormData.append('purpose', formData.purpose);
        submitFormData.append('amount', formData.amount.toString());
        submitFormData.append('previousGrants', formData.previousGrants);
        submitFormData.append('howHeard', formData.howHeard);
        submitFormData.append('applicationCategory', formData.applicationCategory);
        submitFormData.append('appliedHedborg', formData.appliedHedborg);

        // Add reCAPTCHA token if available
        if (typeof window !== 'undefined' && window.grecaptcha) {
          const token = await window.grecaptcha.execute(
            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string,
            { action: 'submit' }
          );
          submitFormData.append('captchaToken', token);
        }

        // Add files with the correct naming convention
        if ('attachments' in stepData && Array.isArray(stepData.attachments)) {
          const attachments = stepData.attachments as { type: string; file: File }[];
          // Handle CV file
          const cvFile = attachments.find(att => att.type === 'cv');
          if (cvFile) {
            submitFormData.append('cv', cvFile.file);
          }

          // Handle additional attachments
          const additionalFiles = attachments.filter(att => att.type === 'additional');
          additionalFiles.forEach((attachment, index) => {
            submitFormData.append(`additionalAttachment_${index}`, attachment.file, attachment.file.name);
          });
        }

        const response = await fetch("https://eo8irjh3bmlqldy.m.pipedream.net", {
          method: "POST",
          body: submitFormData,
        });

        if (response.ok) {
          setIsSubmitted(true);
        } else {
          throw new Error('Submission failed');
        }
      } catch (error) {
        console.error('Submission error:', error);
        alert('There was an error submitting your application. Please try again.');
      }
    }
  };

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const SuccessMessage = () => (
    <div className="text-center py-12 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t("application.success.title")}
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            {t("application.success.message")}
          </p>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg text-left">
          <h3 className="text-xl font-semibold text-[#252932] mb-4">
            {t("application.success.nextSteps.title")}
          </h3>
          <ul className="space-y-3 text-[#252932]">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              {t("application.success.nextSteps.confirmation")}
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              {t("application.success.nextSteps.review")}
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              {t("application.success.nextSteps.contact")}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Optimized Image */}
      <div className="relative h-[300px] md:h-[400px] bg-[#252932] mt-20">
        <div className="absolute inset-0">
          <ApplyImage />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {t("application.hero.title")}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
            {t("application.hero.subtitle")}
          </p>
        </div>
      </div>

      {/* Conditional rendering based on submission state */}
      {isSubmitted ? (
        <SuccessMessage />
      ) : (
        <>
          {/* Form Section */}
          <div className="max-w-3xl mx-auto mt-8 md:mt-14 px-4 md:px-0">
            <div className="hidden md:block absolute right-[-400px] top-1/2 transform -translate-y-1/2">
              <div className="relative w-[350px] h-[350px]">
                <OptimizeHelpImage />
              </div>
            </div>
            <ContactForm 
              currentStep={currentStep}
              formData={formData}
              onStepComplete={handleStepComplete}
              onStepBack={handleStepBack}
            />
          </div>

          {/* FAQ Section */}
          <div className="bg-white mt-20">
            <FAQSection />
          </div>
        </>
      )}
    </div>
  );
}
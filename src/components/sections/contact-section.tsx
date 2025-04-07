"use client";

import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  subject: z.string().optional(),
});

// Move the form component to a separate component (can be in the same file)
function ContactUsForm() {
  const { t } = useTranslation(); // Initialize translation hook
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Modified reCAPTCHA script loading
  useEffect(() => {
    const loadRecaptcha = async () => {
      if (typeof window !== 'undefined') {
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
        document.body.appendChild(script);
      }
    };
    loadRecaptcha();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      subject: "",
    },
  });

  // Update the sendFormData function to include captcha
  const sendFormData = async (data: z.infer<typeof formSchema>) => {
    try {
      // Execute reCAPTCHA
      if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        throw new Error('reCAPTCHA site key is not defined');
      }
      const token = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
        action: 'submit'
      });

      const response = await fetch("https://eofkn3koap2kbkt.m.pipedream.net", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          captchaToken: token
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        console.error("Failed to send data to the webhook:", response.statusText);
        alert('Form submission failed. Please try again.');
      }
    } catch (error) {
      console.error("Error sending data to the webhook:", error);
      alert('An error occurred. Please try again.');
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    sendFormData(data);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{t("contactUs.heading")}</h1>
        <p className="text-gray-600 text-lg">{t("contactUs.description")}</p>
      </div>

      {isSubmitted ? (
        <div className="text-center py-8" aria-live="polite">
          {t("contactUs.thankYouMessage")}
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">
              {t("contactUs.formTitle")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("contactUs.nameLabel")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("contactUs.namePlaceholder")}
                        {...field}
                        className="w-full p-2 border border-gray-300"
                        required
                      />
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
                    <FormLabel>
                      {t("contactUs.emailLabel")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("contactUs.emailPlaceholder")}
                        {...field}
                        className="w-full p-2 border border-gray-300"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("contactUs.subjectLabel")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("contactUs.subjectPlaceholder")}
                      {...field}
                      className="w-full p-2 border border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("contactUs.messageLabel")}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("contactUs.messagePlaceholder")}
                      {...field}
                      className="w-full p-2 border border-gray-300 min-h-[120px]"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-2">
              <Button 
                type="submit" 
                className="bg-[#252932] hover:bg-[#212632]/90 text-white px-8 py-2"
              >
                {t("contactUs.submitButton")}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

// Add the actual page component
export default function ContactPage() {
  return <ContactUsForm />;
}

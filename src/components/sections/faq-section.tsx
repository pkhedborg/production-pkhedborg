"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { useTranslation } from "react-i18next";

const FAQSection = () => {
  const { t } = useTranslation();

  const faqItems = [
    {
      question: "faq.question1",
      answer: "faq.answer1"
    },
    {
      question: "faq.question2",
      answer: "faq.answer2"
    },
    {
      question: "faq.question3",
      answer: "faq.answer3"
    },
    {
      question: "faq.question4",
      answer: "faq.answer4"
    },
    {
      question: "faq.question5",
      answer: "faq.answer5"
    },
    {
      question: "faq.question6",
      answer: "faq.answer6"
    },
    {
      question: "faq.question7",
      answer: "faq.answer7"
    },
    {
      question: "faq.question8",
      answer: "faq.answer8"
    }
  ];

  return (
    <section className="container mx-auto px-4 py-12 md:py-20 mb-20">
      <h2 className="text-3xl md:text-4xl font-bold !text-center mb-12">
        {t("faq.title")}
      </h2>
      <Accordion 
        type="single" 
        collapsible 
        className="w-full max-w-3xl space-y-4 mx-auto [&_button]:justify-between [&_button]:text-left"
      >
        {faqItems.map((item, index) => (
          <AccordionItem 
            key={`item-${index + 1}`} 
            value={`item-${index + 1}`} 
            className="border-b border-gray-200 pb-4"
          >
            <AccordionTrigger className="flex flex-1 items-center justify-between hover:no-underline px-1 py-4">
              <span className="flex-1 text-lg">{t(item.question)}</span>
            </AccordionTrigger>
            <AccordionContent className="text-left px-1">
              <div className="text-gray-600 whitespace-pre-line">{t(item.answer)}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQSection;
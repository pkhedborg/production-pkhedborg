"use client";

import Link from 'next/link';
import NumberTicker from "@/components/ui/number-ticker";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import FoundationImage from '@/components/Images/OptimizedFoundationImage';
import CardOneImage from '@/components/Images/OptimizedCardOneImage';
import CardTwoImage from '@/components/Images/OptimizedCardTwoImage';
import CardThreeImage from '@/components/Images/OptimizedCardThreeImage';

const FoundationSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 bg-white">
      <div className="container mx-auto px-4 grid grid-cols-1 xl:grid-cols-2 items-start gap-12">
        {/* Left Side - Foundation Image */}
        <div className="w-full">
          <FoundationImage />
        </div>

        {/* Right Side - Text Content */}
        <div className="space-y-6 mt-8 xl:mt-0">
          <h3 className="text-gray-600 uppercase tracking-wider">
            {t('foundation.subtitle')}
          </h3>
          <h2 className="text-5xl font-bold text-gray-900">
            {t('foundation.title')}
          </h2>
          <div className="space-y-6 text-gray-700 text-lg">
            <p>{t('foundation.description1')}</p>
            <p>{t('foundation.description2')}</p>
            <p>{t('foundation.description3')}</p>
          </div>
          <div className="flex justify-center md:justify-start">
            <Link 
              href="/application" 
              className="mt-6 inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-all duration-300 hover:translate-x-1"
            >
              {t('foundation.buttonText')} &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <motion.div 
        className="container mx-auto my-12 h-px bg-gray-200 w-full md:w-[90%]"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ 
          duration: 1,
          ease: [0.2, 0.65, 0.3, 0.9]
        }}
      />

      {/* Numbers Section Header */}
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-20">
          {t('impact.title')}
        </h2>
      </div>

      {/* Counter Section */}
      <div className="container mx-auto px-4 mt-20">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 text-center">
          <div>
            <NumberTicker 
              value={500} 
              className="text-5xl xl:text-6xl font-bold"
            />
            <p className="text-xl text-gray-600 mt-4">
              {t('foundation.stats.projects')}
            </p>
          </div>
          <div>
            <NumberTicker 
              value={1499999.90}
              decimalPlaces={2}
              prefix=""
              className="text-5xl xl:text-6xl font-bold"
            />
            <p className="text-xl text-gray-600 mt-4">
              {t('foundation.stats.grants')}
            </p>
          </div>
          <div>
            <NumberTicker 
              value={40}
              className="text-5xl xl:text-6xl font-bold"
            />
            <p className="text-xl text-gray-600 mt-4">
              {t('foundation.stats.years')}
            </p>
          </div>
        </div>
      </div>

      {/* Second Divider Line */}
      <motion.div 
        className="container mx-auto my-12 h-px bg-gray-200 w-full md:w-[90%]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      />

      {/* More about the foundation */}
      <div className="container mx-auto sm:text-center mb-8">
      </div>

      {/* Cards Section */}
      <div className="container mx-auto mt-20 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            {t('moreAbout.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-12">
          {[
            {
              ImageComponent: CardOneImage,
              alt: 'moreAbout.ourHistory.alt',
              title: 'moreAbout.ourHistory.title',
              description: 'moreAbout.ourHistory.description',
              link: '/history'
            },
            {
              ImageComponent: CardTwoImage,
              alt: 'moreAbout.howToApply.alt',
              title: 'moreAbout.howToApply.title',
              description: 'moreAbout.howToApply.description',
              link: '/application'
            },
            {
              ImageComponent: CardThreeImage,
              alt: 'moreAbout.contactUs.alt',
              title: 'moreAbout.contactUs.title',
              description: 'moreAbout.contactUs.description',
              link: '/contact'
            }
          ].map((card, index) => (
            <Link href={card.link} key={index}>
              <div className="bg-white h-full cursor-pointer group transition-all duration-300 hover:shadow-xl">
                <div className="overflow-hidden">
                  <card.ImageComponent />
                </div>
                <div className="p-6 xl:p-8">
                  <h3 className="text-2xl font-bold mt-2 group-hover:text-primary transition-colors duration-300">
                    {t(card.title)}
                  </h3>
                  <p className="text-lg text-gray-600 mt-4">
                    {t(card.description)}
                  </p>
                  <div className="mt-6">
                    <span className="text-red-500 font-semibold group-hover:text-red-400 inline-flex items-center transition-all duration-300 group-hover:translate-x-1">
                      {t('learnMore')} →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundationSection;
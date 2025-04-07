'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
import enTranslation from '@/locales/en/translation.json';
import frTranslation from '@/locales/fr/translation.json';
import nlTranslation from '@/locales/nl/translation.json';
import svTranslation from '@/locales/sv/translation.json';

type Resources = {
  en: { translation: typeof enTranslation };
  fr: { translation: typeof frTranslation };
  nl: { translation: typeof nlTranslation };
  sv: { translation: typeof svTranslation };
};

const resources: Resources = {
  en: { translation: enTranslation },
  fr: { translation: frTranslation },
  nl: { translation: nlTranslation },
  sv: { translation: svTranslation },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr', 'nl', 'sv'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

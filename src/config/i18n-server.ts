import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import all translations
import enTranslation from '@/locales/en/translation.json';
import nlTranslation from '@/locales/nl/translation.json';
import svTranslation from '@/locales/sv/translation.json';
import frTranslation from '@/locales/fr/translation.json';

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: enTranslation },
        nl: { translation: nlTranslation },
        sv: { translation: svTranslation },
        fr: { translation: frTranslation }
      },
      lng: 'en', // default language
      fallbackLng: 'en',
      supportedLngs: ['en', 'nl', 'sv', 'fr'],
      interpolation: {
        escapeValue: false
      },
      react: {
        useSuspense: false
      }
    });
}

export { i18n }; 
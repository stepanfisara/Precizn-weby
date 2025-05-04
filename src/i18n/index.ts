import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationCS from './locales/cs.json';
import translationEN from './locales/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      cs: {
        translation: translationCS
      },
      en: {
        translation: translationEN
      }
    },
    lng: 'cs', // Set Czech as default language
    fallbackLng: 'cs',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
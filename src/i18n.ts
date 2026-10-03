import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enLocale from './locales/en.json'
import ruLocale from './locales/ru.json'

const savedLanguage = localStorage.getItem('redaktor-language') || 'en'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enLocale },
      ru: { translation: ruLocale },
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('redaktor-language', lng)
})

export default i18n

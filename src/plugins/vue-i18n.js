import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '../locales/en'
import tr from '../locales/tr'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'tr',
  fallbackLocale: 'tr',
  messages: {
    en,
    tr
  }
});

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// plugins
import './plugins/ant-design'
import 'ant-design-vue/dist/antd.css'
import './plugins/vuelidate'
import { i18n } from './plugins/vue-i18n'

// theme style
import './assets/scss/design.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

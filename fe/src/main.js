import Vue from 'vue'
import VeeValidate from 'vee-validate'
import VueDaumMap from 'vue-daum-map'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(VeeValidate)
Vue.use(VueDaumMap)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

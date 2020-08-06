import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

Vue.component('fa-icon', FontAwesomeIcon)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

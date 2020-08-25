import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueFormGenerator from 'vue-form-generator'
import store from './store'
import Axios from 'axios'


Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.use(VueFormGenerator,{
  validators: {
    strongPassword: (value) => {
      let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/

      if (!regex.test(value)) {
        return [ 'Password should be a minimum five characters, at least one uppercase letter, ' +
        'one lowercase letter and one number']
      } else {
        return []
      }
    }
  }
});

library.add(fas)

Vue.component('fa-icon', FontAwesomeIcon)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

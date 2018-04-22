import Vue from 'vue'
import Vuetify from 'vuetify'
import moment from 'moment'
import VeeValidate from 'vee-validate'
import VueSocketio from 'vue-socket.io'
// vue-fullscreen' 'img-vuer' mediumZoom // si vale pero tiene un error al abrir la imagen
import Viewer from 'v-viewer'
import 'vuetify/dist/vuetify.min.css'
import 'vue-material-design-icons/styles.css'
import App from './App'
import router from './router'
import { store } from './store'

let url = ''
if (process.env.NODE_ENV === 'production') {
  url = '/tomando_leccion'
} else {
  url = 'http://localhost:8000/tomando_leccion'
}

Vue.use(Vuetify, {
  theme: {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})
Vue.use(VueSocketio, url, store)
Vue.use(VeeValidate)
Vue.use(Viewer)
Vue.config.productionTip = false

Vue.filter('timeFromDate', (value) => {
  if (value) {
    return `${moment(value).locale('es').format('dddd DD MMMM YYYY, HH:mm')}`
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  sockets: {
    connect () {
      store.dispatch('setSocketUsuario', this.$socket)
      store.commit('SOCKET_CONNECT')
      store.dispatch('online', true)
    },
    disconnect () {
      store.dispatch('setSocketUsuario', this.$socket)
      store.commit('SOCKET_CONNECT')
      this.$store.dispatch('usuarioDatos')
      store.dispatch('online', false)
    }
  },
  template: '<App/>'
})

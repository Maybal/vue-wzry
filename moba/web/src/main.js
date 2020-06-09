import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './global.scss'
import './assets/style/iconfont.css'

import VueAwesomeSwiper from 'vue-awesome-swiper' 
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)

import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL:process.env.VUE_APP_API_URL || '/web/api'
  // baseURL:'http://localhost:3000/web/api'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

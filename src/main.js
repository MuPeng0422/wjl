// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './assets/common.less'
import dataV from '@jiaminghi/data-view'
import axios from 'axios'
import ip from '../config/ip'

Vue.use(dataV)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.ip = ip

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

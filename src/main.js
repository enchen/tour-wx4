// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './css/common.css'
import App from './App'
import router from './router'
import ES6promise from 'es6-promise'
import DpWaiting from './components/tools/Waiting'
ES6promise.polyfill()
import axios from 'axios'
import Vuex from 'vuex'
import  store from './store'
Vue.use(Vuex)
Vue.component('dp-waiting',DpWaiting)

import './css/mint-ui/message/style.css'
import './css/mint-ui/popup/style.css'
//暂时不用 以自定义的弹出框替代提示信息
// import Message from  'element-ui/lib/message'
// import './css/element/message.css'
// Vue.prototype.$message = Message




import Dialog from  'element-ui/lib/dialog'
import './css/element/dialog.css'
Vue.component('el-dialog',Dialog)

import input from  'element-ui/lib/input'
import './css/element/input.css'
Vue.component('el-input',input)

import Button from  'element-ui/lib/button'
import './css/element/button.css'
Vue.component('el-button',Button)

import Checkbox from 'element-ui/lib/checkbox'
import './css/element/checkbox.css'
Vue.component('el-checkbox',Checkbox)
//Vue.component('mt-messagebox',MessageBox)
// Add a request interceptor
// 自定义组件
import Bottom from  './components/tools/Bottom.vue'
Vue.component('dp-bottom',Bottom)

import Image from  './components/tools/Image.vue'
Vue.component('dp-image',Image)
axios.defaults.baseURL='https://www.detoursh.com/test'
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  //这里应该没有什么用处
  //var token =cookie.get('dptoken')
  //console.info(token)
  //if (token) {
  //config.headers['dptoken'] = token
 // }
  //config.headers['Referer'] = 'https://detoursh.com'
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

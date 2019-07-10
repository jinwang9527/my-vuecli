// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import '@/styles/index.scss'
import './permission'
import './assets/iconfont/iconfont.css'
import './assets/iconfont/iconfont.js'

Vue.config.productionTip = false;
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: {App},
  template: '<App/>'
})

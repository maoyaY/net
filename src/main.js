import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import 'src/styles/myIndex.less' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI)

import axios from 'src/utils/myAxios';
Vue.prototype.$http = axios;
import api from 'src/api/api'
Vue.prototype.$api = api;
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {loading:"/static/images/spinner.svg" });
import BlockTitle from "src/components/BlockTitle";
Vue.component('block-title',BlockTitle);

// 引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

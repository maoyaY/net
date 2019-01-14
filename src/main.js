// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import promise from 'es6-promise';//解决axios在ie9下不生效的方法
promise.polyfill();

//ui选择elementui
import ElementUI from 'element-ui';
import './theme/index.css'
import './common/css/index.less'
Vue.use(ElementUI);

//过滤器
import filter from './filter'
filter(Vue);

//拖拽
import VueDND from 'awe-dnd'

Vue.use(VueDND)

//图表
import echarts from 'echarts';
Vue.prototype.echarts = echarts;

//富文本
import vueQuillEditor from 'vue-quill-editor'
Vue.use(vueQuillEditor);

import axios from 'axios';
Vue.prototype.$http = axios;
//拦截器、
import { Loading, Message, MessageBox  } from 'element-ui'
// 超时时间
axios.defaults.timeout = 60000
// http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {
  // element ui Loading方法
  if (!config.noLoading) {
    loadinginstace = Loading.service({fullscreen: true});
  }
  // console.log(loadinginstace)
  return config
}, error => {
  Message({
    message:'加载超时',
    type:'warning'
  });
  if (loadinginstace) {
    loadinginstace.close();
  }
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
  if (loadinginstace) {
    loadinginstace.close();
  }

  return data
}, error => {
  Message({
    message:'请求失败',
    type:'warning'
  });
  if (loadinginstace) {
    loadinginstace.close();
  }
  return Promise.reject(error)
})



//导出
import htmlToPdf from './components/utils/htmlToPdf'
Vue.use(htmlToPdf)


Vue.config.productionTip = false
import store from './vuex'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

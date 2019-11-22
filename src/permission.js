import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import {Message} from 'element-ui'
import {getStore, setStore} from "src/utils/index";

const whiteList = ['/login','/personalLogin'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getStore('token')) {
    if(to.path == '/' && location.origin.indexOf('blog') > 0){
      next({path: '/guide/personalDraft'})
    }
    if (to.path === '/login' || to.path === '/personalLogin') {

      if(location.origin.indexOf('blog') > 0){
        next({path: '/guide/personalDraft'}) // 否则全部重定向到登录页
      }else{
        next({path: '/'}) // 否则全部重定向到登录页
      }
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        store.commit('INIT_USER_INFO');
        if (store.getters.roles.length === 0) {
          store.dispatch('LogOut').then(() => {
            Message.error('登录信息有误,请重新登录!');
            next({path: '/'})
          })
        }else{
          //虚拟商品供应商
          if(to.path == '/' && store.getters.roles[0] == "sugrade"){
            next({path: '/ticket/index'})
          }else{
            const roles = store.getters.roles // note: roles must be a array! such as: ['editor','develop']

            store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            })
          }
        }
        //  todo  更安全-放,先从缓存取
        // store.dispatch('GetInfo').then(res => { // 拉取用户信息
        //   next()
        // }).catch((err) => {
        //   store.dispatch('LogOut').then(() => {
        //     Message.error(err || 'Verification failed, please login again')
        //     next({ path: '/' })
        //   })
        // })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // next(`/login?redirect=${to.path}`) //
      //否则全部重定向到登录页
      if(location.origin.indexOf('blog') > 0){
        next(`/personalLogin`) // 否则全部重定向到登录页
      }else{
         next(`/login`) // 否则全部重定向到登录页
      }
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

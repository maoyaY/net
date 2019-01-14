import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
const commonLayout = r => require.ensure([], () => r(require('../views/common/commonLayout')), 'commonLayout');

export const constantRouterMap = [
  { path: '/', component: () => import('../views/login/index'),   redirect: 'login', hidden: true },
  { path: '/login', component: () => import('../views/login/index'), hidden: true },
  { path: '/forgetPwd', component: () => import('../views/login/forgetPwd'), hidden: true },
  { path: '/error', component: () => import('../views/error/error'), hidden: true },
  {
    path: '/admin',
    component: commonLayout,
    redirect: '/admin',
    children: [{
      path: '',
      component: () => import('../views/admin/index'),
      name: 'admin',
      meta: { title: 'admin', icon: 'admin', noCache: true }
    }
    ],
  },
  {
    path: '/page',
    component: commonLayout,
    redirect: '/page',
    children: [{
      path: '',
      component: () => import('../views/page/index'),
      name: 'page',
      meta: { title: 'page', icon: 'page', noCache: true }
    }
    ],
  },
  {
    path: '/approveManage',
    component: commonLayout,
    redirect: '',
    children: [{
      path: '',
      component: () => import('../views/admin/approveManage'),
      name: 'approveManage',
      meta: { title: 'approveManage', icon: 'approveManage', noCache: true }
    }
    ],
  },
  {
    path: '/profile',
    component: commonLayout,
    redirect: '',
    children: [{
      path: '',
      component: () => import('../views/profile/index'),
      name: 'profile',
      meta: { title: 'profile', icon: 'profile', noCache: true }
    },
      {
        path: 'changeApprove',
        component: () => import('../views/profile/changeApprove'),
        name: 'changeApprove',
        meta: { title: 'changeApprove', icon: 'changeApprove', noCache: true }
      }
    ],
  },
  {
    path: '/product',
    component: commonLayout,
    redirect: '',
    children: [{
      path: '',
      component: () => import('../views/product/index'),
      name: 'product',
      meta: { title: 'product', icon: 'product', noCache: true }
    },
      {
        path: 'addProduct',
        component: () => import('../views/product/addProduct'),
        name: 'addProduct',
        meta: { title: 'addProduct', icon: 'addProduct', noCache: true }
      }
    ],
  },
  {
    path: '/discounts',
    component: commonLayout,
    redirect: '/discounts/index',
    children: [
      {
        path: 'index',
        component: () => import('../views/discounts/index'),
        name: 'discounts',
        meta: { title: 'discounts', icon: 'discounts', noCache: true }
      },
      {
        path: 'coupon',
        component: () => import('../views/discounts/coupon'),
        name: 'coupon',
        meta: { title: 'coupon', icon: 'coupon', noCache: true }
      }
    ],
  },
  {
    path: '/imageText',
    component: commonLayout,
    redirect: '/imageText/tweet',
    children: [{
      path: 'tweet',
      component: () => import('../views/imageText/tweet'),
      name: 'tweet',
      meta: { title: 'tweet', icon: 'tweet', noCache: true }
    },
      {
        path: 'addTweet',
        component: () => import('../views/imageText/addTweet'),
        name: 'addTweet',
        meta: { title: 'addTweet', icon: 'addTweet', noCache: true }
      },
      {
        path: 'addActivity',
        component: () => import('../views/imageText/addActivity'),
        name: 'addActivity',
        meta: { title: 'addActivity', icon: 'addActivity', noCache: true }
      }
    ],
  },
  {
    path: '/order',
    component: commonLayout,
    redirect: '',
    children: [{
      path: '',
      component: () => import('../views/order/index'),
      name: 'order',
      meta: { title: 'order', icon: 'order', noCache: true }
    },
      {
        path: 'orderDetail',
        component: () => import('../views/order/orderDetail'),
        name: 'orderDetail',
        meta: { title: 'orderDetail', icon: 'orderDetail', noCache: true }
      }
    ],
  },
  {
    path: '/marketing',
    component: commonLayout,
    redirect: '',
    children: [{
      path: '',
      component: () => import('../views/marketing/index'),
      name: 'marketing',
      meta: {title: 'marketing', icon: 'marketing', noCache: true}
    }, {
      path: 'couponEdit',
      component: () => import('../views/marketing/couponEdit'),
      name: 'couponEdit',
      meta: {noCache: true}
    },],
  },
  {
    path: '/member',
    component: commonLayout,
    redirect: '',
    children: [{
      path: '',
      component: () => import('../views/member/index'),
      name: 'member',
      meta: { title: 'member', icon: 'member', noCache: true }
    },
      {
        path: 'memberDetail',
        component: () => import('../views/member/memberDetail'),
        name: 'memberDetail',
      }
    ],
  },
  // {
  //   path: '/dispatching',
  //   component: commonLayout,
  //   redirect: '',
  //   children: [{
  //     path: '',
  //     component: () => import('../views/dispatching/index'),
  //     name: 'dispatching',
  //     meta: { title: 'dispatching', icon: 'dispatching', noCache: true }
  //   },
  //     {
  //       path: 'addDispatching',
  //       component: () => import('../views/dispatching/addDispatching'),
  //       name: 'addDispatching',
  //       meta: { title: 'addDispatching', icon: 'addDispatching', noCache: true }
  //     }
  //   ],
  // },
  {
    path: '/set',
    component: commonLayout,
    redirect: '/set/index',
    children: [{
      path: 'index',
      component: () => import('../views/set/index'),
      name: 'set',
      meta: { title: 'set', icon: 'set', noCache: true }
    },
      {
        path: 'activity',
        component: () => import('../views/set/activity'),
        name: 'activity',
        meta: { title: 'activity', icon: 'activity', noCache: true }
      }
    ],
  },
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})


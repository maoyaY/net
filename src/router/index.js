import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('src/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('src/views/login/index'),
    hidden: true
  },
  {
    path: '/personalLogin',
    component: () => import('src/views/login/personalLogin'),
    hidden: true
  },
  {path: '/404', component: () => import('src/views/errorPage/404'), hidden: true},
  {path: '/401', component: () => import('src/views/errorPage/401'), hidden: true},


]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

//  这些router会被权限过滤,不设置meta.roles的话也是看的到的
//  supplizer,admin,super

//  快捷数组
export const level0 = ['supplizer']; //  供应商可见
export const level1 = ['supplizer', 'admin', 'super']; //  三角色都可见
export const level2 = ['admin', 'super'];  //  管理员可见
export const level3 = ['super']; //  超管可见
export const level4 = ['admin', 'super','personal']; //  普通用户
export const level5 = ['personal']; //  普通用户
export const level6 = ['sugrade', 'admin', 'super'];//虚拟供应商

export const asyncRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: 'profile',
    meta: { roles: level1},
    children: [
      {
        path: 'profile',
        name: 'ProfileIndex',
        component: () => import('src/views/profile/index'),
        meta: {title: '概览', icon: 'gailan', noCache: true, roles: level1}
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    alwaysShow: true, //  当配置供应商只能看到所有商品时,所有商品会升级显示为1级菜单,加上这个还是能显示为二级
    redirect: '/product/index',
    name: 'Product',  //  有二级菜单的时候加下,面包屑就会显示 概览/一级菜单/二级
    meta: {title: '商品', icon: 'shangpin', roles: level1},
    children: [
      {
        path: 'index',
        name: 'ProductIndex',
        component: () => import('src/views/product/index'),
        meta: {title: '普通商品', icon: 'yes', noCache: false, roles: level1}
      }, {
        path: 'productEdit',
        name: 'ProductEdit',
        hidden: true,
        component: () => import('src/views/product/productEdit'),
        meta: {title: '商品编辑', icon: 'yes', noCache: false, roles: level1}
      },

      {
        path: 'productCategory',
        name: 'ProductCategory',
        component: () => import('src/views/product/productCategory'),
        meta: {title: '商品分类', icon: 'yes', noCache: true, roles: level2}
      },
      {
        path: 'productTag',
        name: 'ProductTag',
        component: () => import('src/views/product/productTag'),
        meta: {title: '场景和商品标签', icon: 'yes', noCache: true, roles: level2}
      },

      {
        path: 'productBrand',
        name: 'ProductBrand',
        component: () => import('src/views/product/productBrand'),
        meta: {title: '品牌和标签', icon: 'yes', noCache: true, roles: level2}
      },
      {
        path: 'editBrand',
        name: 'editBrand',
        hidden: true,
        component: () => import('src/views/product/editBrand'),
        meta: {title: '编辑品牌', icon: 'yes', noCache: true, roles: level2}
      },
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: 'order',
    alwaysShow: true,
    name: 'Order',
    meta: {title: '订单', icon: 'dingdan', roles: level1},
    children: [
      {
        path: 'allOrder',
        name: 'AllOrder',
        component: () => import('src/views/order/allOrder'),
        meta: {title: '所有订单', noCache: false, icon: 'yes', roles: level1}
      },

      {
        path: 'order',
        name: 'OrderIndex',
        component: () => import('src/views/order/index'),
        meta: {title: '普通订单', noCache: false, icon: 'yes', roles: level1}
      }, {
        path: 'orderDetail',
        name: 'OrderDetail',
        hidden: true,
        component: () => import('src/views/order/orderDetail'),
        meta: {title: '订单详情', noCache: true, roles: level1}
      },

      {
        path: 'actiOrder',
        name: 'ActiOrder',
        component: () => import('src/views/order/actiOrder'),
        meta: {title: '活动订单', noCache: false, icon: 'yes', roles: level1}
      },
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/distributor',
    alwaysShow: true,
    name: 'DistributorPa',
    meta: {title: '用户', icon: 'huiyuan', roles: level2},
    children: [
      {
        path: 'suppliers',
        name: 'Suppliers',
        component: () => import('src/views/user/suppliers'),
        meta: {title: '供应商', icon: 'yes', noCache: true, roles: level2}
      }, {
        path: 'supplierEdit',
        name: 'SupplierEdit',
        hidden: true,
        component: () => import('src/views/user/supplierEdit'),
        meta: {title: '供应商编辑', noCache: true, roles: level2}
      },
      {
        path: 'distributor',
        name: 'Distributor',
        component: () => import('src/views/user/distributor'),
        meta: {title: '分销商', icon: 'yes', noCache: true, roles: level2}
      },

      {
        path: 'user',
        name: 'User',
        component: () => import('src/views/user/user'),
        meta: {title: '消费者', icon: 'yes', noCache: true, roles: level2}
      },
    ]
  },

  {
    path: '/circle',
    component: Layout,
    redirect: 'circle',
    meta: {title: '圈子', icon: 'article', roles: level1},
    children: [
      {
        path: 'circle',
        name: 'CircleIndex',
        component: () => import('src/views/circle/index'),
        meta: {title: '圈子', noCache: true, icon: 'article', roles: level1}
      }, {
        path: 'editCircle',
        name: 'EditCircle',
        hidden: true,
        component: () => import('src/views/circle/editCircle'),
        meta: {title: '资讯编辑', noCache: false, roles: level1}
      },{
        path: 'newEdit',
        name: 'newEdit',
        hidden: true,
        component: () => import('src/views/circle/newEdit'),
        meta: {title: '资讯编辑', noCache: false, roles: level1}
      }
    ]
  },

  {
    path: '/marketing',
    component: Layout,
    redirect: '/marketing/coupon',
    alwaysShow: true,
    name: 'Marketing',
    meta: {title: '营销', icon: 'yingxiaoshezhi', roles: level1},
    children: [
      {
        path: 'coupon',
        name: 'Coupon',
        component: () => import('src/views/marketing/coupon'),
        meta: {title: '优惠券', icon: 'yes', noCache: true, roles: level1}
      }, {
        path: 'editCoupon',
        name: 'EditCoupon',
        hidden: true,
        component: () => import('src/views/marketing/editCoupon'),
        meta: {title: '优惠券编辑', noCache: true, roles: level1}
      }, {
        path: 'attendance',
        name: 'Attendance',
        component: () => import('src/views/marketing/attendance'),
        meta: {title: '星币基础设置',icon: 'yes', noCache: true, roles: level2}
      }, {
        path: 'indexBanner',
        name: 'IndexBanner',
        component: () => import('src/views/marketing/indexBanner'),
        meta: {title: '首页轮播图', icon: 'yes', noCache: true, roles: level2}
      },{
        path: 'activityBanner',
        name: 'activityBanner',
        component: () => import('src/views/marketing/activityBanner'),
        meta: {title: '活动图', icon: 'yes', noCache: true, roles: level2}
      },{
        path: 'productBanner',
        name: 'productBanner',
        component: () => import('src/views/marketing/productBanner'),
        meta: {title: '商城轮播图', icon: 'yes', noCache: true, roles: level2}
      },{
        path: 'keyWord',
        name: 'keyWord',
        component: () => import('src/views/marketing/keyWord'),
        meta: {title: '关键词', icon: 'yes', noCache: true, roles: level2}
      }, {
        path: 'routeBanner',
        name: 'routeBanner',
        component: () => import('src/views/marketing/routeBanner'),
        meta: {title: '旗行轮播图', icon: 'yes', noCache: true, roles: level2}
      }, {
        path: 'richList',
        name: 'richList',
        component: () => import('src/views/marketing/richList'),
        meta: {title: '旗行富文本', icon: 'yes', noCache: true, roles: level2}
      }, {
        path: 'editRich',
        name: 'editRich',
        hidden: true,
        component: () => import('src/views/marketing/editRich'),
        meta: {title: '富文本编辑', noCache: true, roles: level2}
      }
    ]
  },

  {
    path: '/commission',
    component: Layout,
    redirect: 'commission',
    alwaysShow: true,
    name: 'Commission',
    meta: {title: '佣金', icon: 'yongjin', roles: level2},
    children: [
      {
        path: 'commission',
        name: 'CommissionIndex',
        component: () => import('src/views/commission/index'),
        meta: {title: '佣金概览', icon: 'yes', noCache: true, roles: level2}
      }, {
        path: 'commissionSetting',
        name: 'CommissionSetting',
        component: () => import('src/views/commission/commissionSetting'),
        meta: {title: '佣金设置', icon: 'yes', noCache: true, roles: level2}
      },
    ]
  },

  {
    path: '/approval',
    component: Layout,
    alwaysShow: true,
    redirect: '/approval/withdrawAudit',
    name: 'Approval',
    meta: {title: '审批', icon: 'shenpi', roles: level1},
    children: [
      {
        path: 'withdrawAudit',
        name: 'WithdrawAudit',
        component: () => import('src/views/approval/withdrawAudit'),
        meta: {title: '提现审批', icon: 'yes', noCache: true, roles: level2}
      },
      {
        path: 'returnProductAudit',
        name: 'ReturnProductAudit',
        component: () => import('src/views/approval/returnProductAudit'),
        meta: {title: '退货审批', icon: 'yes', noCache: false, roles: level1}
      }, {
        path: 'returnProdOrderDetail',
        name: 'ReturnProdOrderDetail',
        hidden: true,
        component: () => import('src/views/approval/returnProdOrderDetail'),
        meta: {title: '退货订单详情', icon: 'yes', noCache: true, roles: level1}
      },
      {
        path: 'agentAudit',
        name: 'AgentAudit',
        component: () => import('src/views/approval/agentAudit'),
        meta: {title: '新代理商审批', icon: 'yes', noCache: true, roles: level2}
      }, {
        path: 'productAudit',
        name: 'ProductAudit',
        component: () => import('src/views/approval/productAudit'),
        meta: {title: '普通商品审批', icon: 'yes', noCache: true, roles: level2}
      }, {
        path: 'circleAudit',
        name: 'CircleAudit',
        component: () => import('src/views/approval/circleAudit'),
        meta: {title: '圈子审核', icon: 'yes', noCache: true, roles: level2}
      },
      {
        path: 'circleRewardAudit',
        name: 'circleRewardAudit',
        component: () => import('src/views/approval/circleRewardAudit'),
        meta: {title: '圈子打赏审核', icon: 'yes', noCache: true, roles: level2}
      },

      //  活动
      {
        path: 'firstOrderActiAudit',
        name: 'FirstOrderActiAudit',
        component: () => import('src/views/approval/firstOrderActiAudit'),
        meta: {title: '新人首单活动商品审批', icon: 'yes', noCache: true, roles: level2}
      }, {
        path: 'guessActiAudit',
        name: 'GuessActiAudit',
        component: () => import('src/views/approval/guessActiAudit'),
        meta: {title: '每日竞猜活动商品审批', icon: 'yes', noCache: true, roles: level2}
      }, {
        path: 'magicGiftBoxAudit',
        name: 'MagicGiftBoxAudit',
        component: () => import('src/views/approval/magicGiftBoxAudit'),
        meta: {title: '魔术礼盒活动商品审批', icon: 'yes', noCache: true, roles: level2}
      }, {
        path: 'trialProductAudit',
        name: 'TrialProductAudit',
        component: () => import('src/views/approval/trialProductAudit'),
        meta: {title: '试用商品审批', icon: 'yes', noCache: true, roles: level2}
      },

      {
        path: 'limitedProductAudit',
        name: 'limitedProductAudit',
        component: () => import('src/views/approval/limitedProductAudit'),
        meta: {title: '限时活动商品审批', icon: 'yes', noCache: true, roles: level2}
      },
      {
        path: 'groupActiAudit',
        name: 'groupActiAudit',
        component: () => import('src/views/approval/groupActiAudit'),
        meta: {title: '拼团竞猜商品审批', icon: 'yes', noCache: true, roles: level2}
      },
      {
        path: 'starAudit',
        name: 'starAudit',
        component: () => import('src/views/approval/starAudit'),
        meta: {title: '星币商城商品审批', icon: 'yes', noCache: true, roles: level0}
      },
      {
        path: 'activationCodeActi',
        name: 'ActivationCodeActi',
        component: () => import('src/views/approval/activationCodeActi'),
        meta: {title: '激活码审批', icon: 'yes', noCache: true, roles: level2}
      },

      {
        path: 'supplizerBalanceApplyAudit',
        name: 'SupplizerBalanceApplyAudit',
        component: () => import('src/views/approval/supplizerBalanceApplyAudit'),
        meta: {title: '供应商结算异常申请审批', icon: 'yes', noCache: true, roles: level2}
      },
      {
        path: 'toiletAudit',
        name: 'toiletAudit',
        component: () => import('src/views/approval/toiletAudit'),
        meta: {title: '厕所审批', icon: 'yes', noCache: true, roles: level2}
      },
      {
        path: 'guideAudit',
        name: 'guideAudit',
        component: () => import('src/views/approval/guideAudit'),
        meta: {title: '导游审批', icon: 'yes', noCache: true, roles: level2}
      },
    ]
  },

  {
    path: '/service',
    component: Layout,
    redirect: 'service',
    alwaysShow: true,
    meta: {title: '客服', icon: 'kefu', roles: level2},
    children: [
      {
        path: 'service',
        name: 'ServiceIndex',
        component: () => import('src/views/service/index'),
        meta: {title: '前台客服问答', noCache: true, roles: level2}
      },{
        path: 'backQuesAnswer',
        name: 'BackQuesAnswer',
        component: () => import('src/views/service/backQuesAnswer'),
        meta: {title: '后台客服问答', noCache: true,  roles: level1}
      },
      // {
      //   path: 'platformRule',
      //   name: 'PlatformRule',
      //   component: () => import('src/views/service/platformRule'),
      //   meta: {title: '平台规则', noCache: true,  roles: level0}
      // },
      {
        path: 'notice',
        name: 'notice',
        component: () => import('src/views/service/notice'),
        meta: {title: '公告发布', noCache: true,  roles: level2}
      },
      {
        path: 'addNotice',
        name: 'addNotice',
        hidden: true,
        component: () => import('src/views/service/addNotice'),
        meta: {title: '编辑公告', noCache: true,  roles: level2}
      },
      {
        path: 'message',
        name: 'message',
        component: () => import('src/views/service/message'),
        meta: {title: '留言', noCache: true,  roles: level2}
      },
      // {
      //   path: 'appMessage',
      //   name: 'appMessage',
      //   component: () => import('src/views/service/appMessage'),
      //   meta: {title: '站内信', noCache: true,  roles: level2}
      // },
      // {
      //   path: 'addMessage',
      //   name: 'addMessage',
      //   hidden: true,
      //   component: () => import('src/views/service/addMessage'),
      //   meta: {title: '站内信', noCache: true,  roles: level2}
      // },
    ]
  },

  {
    path: '/activity',
    component: Layout,
    alwaysShow: true,
    redirect: '/activity/index',
    name: 'Activity',
    meta: {title: '活动', icon: 'huodong',roles: level2},
    children: [
      {
        path: 'index',
        name: 'ActivityIndex',
        component: () => import('src/views/activity/index'),
        meta: {title: '活动管理', icon: 'yes', noCache: true, roles: level2}
      }, {
        path: 'firstOrder',
        name: 'FirstOrder',
        component: () => import('src/views/activity/firstOrder'),
        meta: {title: '新人首单', icon: 'yes', noCache: true, roles: level1}
      }, {
        path: 'guess',
        name: 'Guess',
        component: () => import('src/views/activity/guess'),
        meta: {title: '每日竞猜', icon: 'yes', noCache: true, roles: level1}
      }, {
        path: 'magicGiftBox',
        name: 'MagicGiftBox',
        component: () => import('src/views/activity/magicGiftBox'),
        meta: {title: '魔术礼盒', icon: 'yes', noCache: true, roles: level1}
      },
      {
        path: 'trialProduct',
        name: 'TrialProduct',
        component: () => import('src/views/activity/trialProduct'),
        meta: {title: '试用商品', icon: 'yes', noCache: true, roles: level1}
      }, {
        path: 'trialProductEdit',
        name: 'TrialProductEdit',
        hidden: true,
        component: () => import('src/views/activity/trialProductEdit'),
        meta: {title: '试用商品编辑', noCache: true, roles: level1}
      },
      {
        path: 'limitedFix',
        name: 'limitedFix',
        component: () => import('src/views/activity/limitedFix'),
        meta: {title: '限时特惠',icon: 'yes', noCache: true, roles: level1}
      },
      {
        path: 'limitedFixEdit',
        name: 'limitedFixEdit',
        hidden: true,
        component: () => import('src/views/activity/limitedFixEdit'),
        meta: {title: '限时活动编辑', noCache: true, roles: level1}
      },
      {
        path: 'groupGuess',
        name: 'groupGuess',
        component: () => import('src/views/activity/groupGuess'),
        meta: {title: '拼团竞猜', icon: 'yes',noCache: true, roles: level1}
      },
      {
        path: 'starProduct',
        name: 'starProduct',
        component: () => import('src/views/activity/starProduct'),
        meta: {title: '星币商城', icon: 'yes', noCache: true, roles: level2}
      },

      //  供应商
      // {
      //   path: 'supplizerActi',
      //   name: 'SupplizerActi',
      //   component: () => import('src/views/activity/supplizerActi'),
      //   meta: {title: '活动',noCache: true, roles: level0}
      // },
    ]
  },

  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/index',
    name: 'Setting',
    alwaysShow: true,
    meta: {title: '配置', icon: 'shezhi', roles: level2},
    children: [
      {
        path: 'index',
        name: 'SettingIndex',
        component: () => import('src/views/setting/index'),
        meta: {title: '激活码收款', icon: 'yes', noCache: true, roles: level2}
      }, {
        path: 'manager',
        name: 'Manager',
        component: () => import('src/views/setting/manager'),
        meta: {title: '管理员', icon: 'yes', noCache: true, roles: level3}
      }, {
        path: 'approvalSetting',
        name: 'ApprovalSetting',
        component: () => import('src/views/setting/approvalSetting'),
        meta: {title: '审批流', icon: 'yes', noCache: false, roles: level3}
      },{
        path: 'noticeMaintain',
        name: 'NoticeMaintain',
        component: () => import('src/views/setting/noticeMaintain'),
        meta: {title: '通告', icon: 'yes', noCache: false, roles: level2},
      },{
        path: 'activationType',
        name: 'activationType',
        component: () => import('src/views/setting/activationType'),
        meta: {title: '活跃分', icon: 'yes', noCache: false, roles: level2},
      }, {
        path: 'rule',
        name: 'rule',
        component: () => import('src/views/setting/rule'),
        meta: {title: '规则', icon: 'yes', noCache: true, roles: level2}
      },
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/draft',
    alwaysShow: true,
    // name: 'personSettingPa',
    meta: {title: '导游素材', icon: 'iconGuide', roles: level4},
    children: [
      // {
      //   path: 'draft',
      //   name: 'draft',
      //   component: () => import('src/views/guide/draft'),
      //   meta: {title: '所有活动', noCache: true, roles: level4}
      // },
      {
        path: 'personalDraft',
        name: 'personalDraft',
        component: () => import('src/views/guide/personalDraft'),
        meta: {title: '所有活动', noCache: true, roles: level4}
      },
      {
        path: 'editDraft',
        name: 'editDraft',
        hidden:true,
        component: () => import('src/views/guide/editDraft'),
        meta: {title: '我的草稿', noCache: true, roles: level5}
      },
      {
        path: 'travelNotes',
        name: 'travelNotes',
        component: () => import('src/views/guide/travelNotes'),
        meta: {title: '所有游记', noCache: true, roles: level4}
      },
      {
        path: 'editTravelNote',
        name: 'editTravelNote',
        hidden:true,
        component: () => import('src/views/guide/editTravelNote'),
        meta: {title: '游记编辑', noCache: true, roles: level5}
      },
      {
        path: 'strategy',
        name: 'strategy',
        component: () => import('src/views/guide/strategy'),
        meta: {title: '所有攻略', noCache: true, roles: level4}
      },
      {
        path: 'editStrategy',
        name: 'editStrategy',
        hidden:true,
        component: () => import('src/views/guide/editStrategy'),
        meta: {title: '攻略编辑', noCache: true, roles: level5}
      },
      {
        path: 'essay',
        name: 'essay',
        component: () => import('src/views/guide/essay'),
        meta: {title: '所有随笔', noCache: true, roles: level4}
      },
    ]
  },
  {
    path: '/scenic',
    component: Layout,
    redirect: '/scenic/index',
    alwaysShow: true,
    // name: 'personSettingPa',
    meta: {title: '景区', icon: 'scenicArea', roles: level4},
    children: [
      {
        path: 'index',
        name: 'scenic',
        component: () => import('src/views/scenic/index'),
        meta: {title: '景区管理', noCache: true, roles: level4}
      },
      {
        path: 'editScenic',
        name: 'editScenic',
        hidden: true,
        component: () => import('src/views/scenic/editScenic'),
        meta: {title: '景区编辑',noCache: true, roles: level4}
      },{
        path: 'toilet',
        name: 'toilet',
        component: () => import('src/views/scenic/toilet'),
        meta: {title: '厕所管理', noCache: true, roles: level2}
      }, {
        path: 'editToilet',
        name: 'editToilet',
        hidden: true,
        component: () => import('src/views/scenic/editToilet'),
        meta: {title: '厕所编辑',noCache: true, roles: level2}
      },
    ]
  },
  // {
  //   path: '/dataStatistic',
  //   component: Layout,
  //   redirect: '/dataStatistic/index',
  //   meta: { roles: level1},
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'dataStatisticIndex',
  //       component: () => import('src/views/dataStatistic/index'),
  //       meta: {title: '数据统计', icon: 'dataStatistic', noCache: true, roles: level1}
  //     }
  //   ]
  // },
  {
    path: '/ticket',
    component: Layout,
    redirect: '/ticket/index',
    alwaysShow: true,
    // name: 'personSettingPa',
    meta: {title: '票务', icon: 'ticket', roles: level6},
    children: [
      {
        path: 'index',
        name: 'ticket',
        component: () => import('src/views/ticket/index'),
        meta: {title: '票务管理', noCache: true, roles: level6}
      },
      {
        path: 'editTicket',
        name: 'editTicket',
        hidden: true,
        component: () => import('src/views/ticket/editTicket'),
        meta: {title: '票务编辑',noCache: true, roles: level6}
      },
      {
        path: 'purchaseHistory',
        name: 'purchaseHistory',
        hidden: true,
        component: () => import('src/views/ticket/purchaseHistory'),
        meta: {title: '购买记录',noCache: true, roles: level6}
      }
    ]
  },
  {
    path: '/material',
    component: Layout,
    redirect: '/material/index',
    alwaysShow: true,
    // name: 'personSettingPa',
    meta: {title: '素材反馈', icon: 'material', roles: level2},
    children: [
      {
        path: 'index',
        name: 'material',
        component: () => import('src/views/material/index'),
        meta: {title: '素材反馈', noCache: true, roles: level2}
      },
      {
        path: 'lookMaterial',
        name: 'lookMaterial',
        hidden: true,
        component: () => import('src/views/material/lookMaterial'),
        meta: {title: '素材预览',noCache: true, roles: level2}
      }
    ]
  },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/withdraw',
  //   alwaysShow: true,
  //   // name: 'personSettingPa',
  //   meta: {title: '导游素材', icon: 'iconGuide', roles: level2},
  //   children: [
  //     {
  //       path: 'personSetting',
  //       name: 'PersonSetting',
  //       component: () => import('src/views/personSetting/personSetting'),
  //       meta: {title: '商户信息', noCache: true, roles: level2}
  //     }
  //   ]
  // },
  {
    path: '/personSetting',
    component: Layout,
    redirect: '/personSetting/withdraw',
    alwaysShow: true,
    // name: 'personSettingPa',
    meta: {title: '设置', icon: 'personSetting', roles: level0},
    children: [
      {
        path: 'personSetting',
        name: 'PersonSetting',
        component: () => import('src/views/personSetting/personSetting'),
        meta: {title: '商户信息', noCache: true, roles: level0}
      },{
        path: 'withdraw',
        name: 'Withdraw',
        component: () => import('src/views/personSetting/withdraw'),
        meta: {title: '提现', noCache: true, roles: level0}
      },{
        path: 'balance',
        name: 'Balance',
        component: () => import('src/views/personSetting/balance'),
        meta: {title: '结算', noCache: true, roles: level0}
      },
    ]
  },

  {path: '*', redirect: '/404', hidden: true},
]

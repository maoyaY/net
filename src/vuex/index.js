import Vue from 'vue';
import Vuex from 'vuex';
import side from '../common/json/side';


Vue.use(Vuex);

let store= new Vuex.Store({
	state: {
	  role:{
	    adname:''
    },
    menu: [
      {
        title:"概况",
        path:"/profile",
        iconPath: 'icon-profile-side'
      },
      {
        title:"用户",
        path:"/member",
        iconPath: 'icon-member-side'
      },
      {
        title:"商品",
        path:"/product",
        iconPath: 'icon-product-side'
      },
      {
        title:"订单",
        path:"/order",
        iconPath: 'icon-order-side'
      },
      {
        title:"优惠",
        path:"/discounts",
        iconPath: 'icon-discounts-side',
        children: [
          {
            title: '优惠券',
            path: 'index'
          },
          {
            title: '用户优惠券',
            path: 'coupon'
          }
        ]
      },
      {
        title:"图文",
        path:"/imageText",
        iconPath: 'icon-imageText-side',
        children: [
          {
            title: '健康服务',
            path: 'tweet'
          }
        ]
      },
      {
        title:"页面",
        path:"/page",
        iconPath: 'icon-page-side'
      },

      {
        title:"配置",
        path:"/set",
        iconPath: 'icon-set-side',
        children: [
          {
            title: '配置设置',
            path: 'index'
          },
          {
            title: '网站信息',
            path: 'activity'
          }
        ]
      }

    ],
	},
	mutations: {

	}
})


export default store

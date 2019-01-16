// const title = 'http://10.0.0.197:7443/sharp/manager/';
// const title = 'http://120.79.182.43:7443/sharp/manager/';
// const title ='http://120.79.182.43:7443/';
// const title ='http://47.104.228.112:7444/'
const title ='https://hindigo.lkfcni.cn/api/v1/'
const api={
  login: title + 'user/admin_login',//用户登录

  get_tab_list: title +'tabs/get_tab_list',//获取标签
  get_all_news: title +'news/get_all',//获取资讯列表
  get_abo_news: title +'news/get_abo',//获取资讯详情
  update_status_news: title +'news/update_status',//删除资讯
  new_tab: title +'tabs/new_tab',//新增标签
  update_tab: title + 'tabs/update_tab',//更新标签
  delete_tab: title + 'tabs/delete_tab',//删除标签
  upload_files: title +'config/upload_files',//上传图片
  new_news: title +'news/new_news',//上传资讯
  update_news: title +'news/update_news',//编辑资讯

  get_product_list: title +'products/get_product_list',//获取商品列表
  get_product_message: title +'products/get_product_message',//获取商品详情
  new_product: title +'products/new_product',//新增商品
  update_product: title +'products/update_product',//更新商品

  get_order_list: title +'order/get_order_list',//获取订单列表
  get_order_message: title +'order/get_order_message_back',//获取订单详情
  get_logistics: title +'order/get_logistics',//获取物流
  update_order: title +'order/update_order',//更新物流
  get_all_user: title +'user/get_all_user',//获取用户列表
  get_user_info: title +'user/get_user_info_back',//获取用户详情
  get_my_share: title +'user/get_my_share',//获取分享列表
  get_software_data: title +'config/get_software_data',//获取首页数据
  card_list: title +'card/card_list',//获取优惠券列表
  get_all_card_back: title +'card/get_all_card_back',//获取用户优惠券列表
  delete_card: title +'card/delete_card',//核销优惠券
  update_card: title +'card/update_card',//更新优惠券
  get_config: title +'config/get_config',//获取辑购物保障/关于我们/新手指南/客服邮箱/合作伙伴/客服电话/药品防伪查询地址/免责声明/轮播图
  update_config: title +'config/update_config',//编辑购物保障/关于我们/新手指南/客服邮箱/合作伙伴/客服电话/药品防伪查询地址/免责声明/轮播图


  get_admin_list: title + 'user/get_admin_list',//获取管理员列表
  add_admin_by_superadmin: title + 'user/add_admin_by_superadmin',//添加啊管理员
  get_admin_all_type: title + 'user/get_admin_all_type',//获取管理员身份
  update_admin: title + 'user/update_admin',//更新管理员
  update_admin_password: title + 'user/update_admin_password',//修改密码
  product_list: title + 'product/list',//获取商品列表
  delete_product: title + 'product/delete_list',//删除商品
  supplizer_list: title +'supplizer/list',//获取供应商列表
  category_list: title + 'category/list',//获取类目
  brand_list: title + 'brand/list',//获取品牌
  scene_list: title + 'scene/list',//获取场景
  items_list: title + 'items/list',//获取标签
  create_product: title +'product/create',//添加商品


  get_order_situation: title + 'order/get_order_situation',//获取订单概况
  get_all_order: title + 'order/list',//获取所有订单
  get_order_by_LOid: title + 'order/get',//获取订单详情
  order_count: title +'order/count',//获取订单数量
  get_omfilter: title + 'order/get_omfilter',//获取订单filter
  update_order_status: title + 'order/update_order_status',//更新订单状态

  update_activity: title + 'activity/update', //  修改活动基础信息
  add_commodity: title + 'commodity/add', //  添加试用商品
  get_all_qa:title + 'qa/get_all',//获取所有问题
  add_questanswer: title +'qa/add_questanswer',//添加问题
  add_questoutline: title + 'qa/add_questoutline',//添加问题类型
  product_get: title + 'product/get',//获取商品详情
  delete_questoutline: title + 'qa/delete_questoutline',//删除问题分类
  delete_question: title + 'qa/delete_question',//删除问题
  upload_file: title + 'file/upload',//上传图片
  get_product_sale: title + 'config/get_product_sale',//历史商品数据

}

export default api

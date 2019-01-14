<style lang="less" scoped>
    @import "../../common/css/index";
    @import "../../common/css/modal";
    .fz(@fontSize){
      font-size: @fontSize;
    }
    .m-system-name-box{
      text-align: center;
      padding: 0.3rem 0 0.12rem;
      border-bottom: 1px solid #e7eef1;
      margin: 0 0.2rem 0.15rem 0.2rem;
      display: flex;
      flex-flow: row;
      align-items: center;
      color: #fff;
      .m-system-circle{
        display: inline-block;
        width:0.25rem;
        height: 0.25rem;
        background:rgba(255,255,255,1);
        border-radius:18px;
        margin-right: 13px;
      }
      .m-system-name-text{
        text-align: left;
        .m-system-name{
          font-size: 0.2rem;
          cursor: pointer;
        }
        .m-ft-10{
          font-size: 10px;
        }
      }

    }
    .common-layout {
        .fj();
        .wl(100vw, 100vh);

        .left-aside {
            .wl(1.6rem, 100vh);
            overflow-y: scroll;
            background: @sidebarColor;
            .tac {
                .system-title{
                    text-align: center;
                    font-size: .26rem;
                    color: #d1dbe5;
                    padding: .12rem;
                    border-bottom: 1px dotted #d1dbe5;
                }
            }


            .menu-title{
                .fz(1rem);
            }
        }

        .right-content {
            flex: 1;
            padding-left: .6rem;
            padding-right: .4rem;
            overflow-y: scroll;
            /*overflow: scroll;*/
            .right-content-hd {
                height: 1rem;
                .fj(flex-end);
                align-items: center;
                /*border-bottom: 3px solid rgba(63, 63, 63, .3);*/

                .search-input {
                    width: 3rem;
                }

                .admin-name {
                    .fz(0.24rem);
                    margin: 0 .2rem 0 .5rem;
                    cursor: pointer;
                }

                .head-img {
                    .wl(.31rem, .34rem);
                }
            }

            .main-view {
              .two-level-tabs{
                padding-bottom: .6rem;

              }
            }
        }
    }
    .m-sidebar{
      text-align: center;
      li{
        padding-left: 0!important;
      }
    }
    .icon{
      display: inline-block;
      width: 0.3rem;
      height: 0.3rem;
      &.icon-profile-side{
        background: url("../../common/images/side/icon-profile-side.png") no-repeat;
        background-size: 100% 100%;
      }
      &.icon-page-side{
        background: url("../../common/images/side/icon-page-side.png") no-repeat;
        background-size: 100% 100%;
      }
      &.icon-product-side{
        background: url("../../common/images/side/icon-product-side.png") no-repeat;
        background-size: 100% 100%;
      }
      &.icon-discounts-side{
        background: url("../../common/images/side/icon-discounts-side.png") no-repeat;
        background-size: 100% 100%;
      }
      &.icon-imageText-side{
        background: url("../../common/images/side/icon-imageText-side.png") no-repeat;
        background-size: 100% 100%;
      }
      &.icon-order-side{
        background: url("../../common/images/side/icon-order-side.png") no-repeat;
        background-size: 100% 100%;
      }
      &.icon-member-side{
        background: url("../../common/images/side/icon-approve-side.png") no-repeat;
        background-size: 100% 100%;
      }
      &.icon-set-side{
        background: url("../../common/images/side/icon-set-side.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .icon-person-navbar{
      background: url("../../common/images/icon-person-navbar.png");
      background-size: 100% 100%;
      margin: 0 0.05rem;
    }
    .navbar-sidebar{
      display: inline-block;
      width: 0.4rem;
      height: 0.4rem;
      cursor: pointer;
    }
    .hamburger.is-active {
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
    .hamburger {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    .m-modal{
      .m-modal-state{
        width: 4rem;
        height: 350px;
        text-align: center;
        p{
          font-size: 0.12rem;
          margin-bottom: 0.2rem;
        }
        .m-btn-p{
          display: inline-block;
          font-size: 0.14rem;
          cursor: pointer;
          padding: 0 0.3rem;
          height: 0.32rem;
          line-height: 0.32rem;
          background-color: @mainColor;
          color: #fff;
          border-radius: 5px;
        }
      }
    }
    /*滚动条样式*/
    .left-aside::-webkit-scrollbar {/*滚动条整体样式*/
      width: 0;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 0;
    }
    .left-aside::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 5px;
      -webkit-box-shadow: inset 0 0 0 rgba(0,0,0,0.2);
      background: rgba(0,0,0,0.2);
    }
    .left-aside::-webkit-scrollbar-track {/*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 0 rgba(0,0,0,0.2);
      border-radius: 0;
      background: rgba(0,0,0,0.1);
    }
</style>

<template>
    <div class="common-layout">
        <aside class="left-aside">
            <el-row class="tac">
                <el-col :span="24">
                  <div class="m-system-name-box">
                    <span class="m-system-circle"></span>
                    <div class="m-system-name-text">
                      <h3 class="m-system-name">净威 </h3>
                      <p class="m-ft-10">后台管理系统</p>
                    </div>
                  </div>
                    <el-menu class="m-sidebar" :default-active="defaultPage.path"
                             text-color="#fff" active-text-color="#fff" :router="true">
                        <el-menu-item v-for="(item,index) in menu" :index="item.path" :key="index">
                            <!--<i class="el-icon-menu"></i>-->
                          <!--<img :src="item.iconPath" class="icon" alt="">-->
                          <i :class="item.iconPath" class="icon"></i>
                            <span slot="title">{{item.title}}</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
        </aside>

        <section class="right-content">
            <header class="right-content-hd">
                <span class="version">
                    <!--开发版本:2018.11.27-->
                </span>
                <el-autocomplete prefix-icon="el-icon-menu" placeholder="请输入菜单名" v-model="searchTxt"
                                 value-key="title"  :fetch-suggestions="querySearch" @select="selectMenu">
                </el-autocomplete>
              <el-dropdown :hide-on-click="false" trigger="click" @command="handleCommand">
                <!--hello,{{$store.state.role.adname}}-->
                <span><i class="icon-person-navbar icon"></i></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="passward">修改密码</el-dropdown-item>
                  <el-dropdown-item command="admin" v-if="stateType != 77">管理员管理</el-dropdown-item>
                  <!--<el-dropdown-item command="approve">切换中英文(ENGLISH)</el-dropdown-item>-->
                  <el-dropdown-item command="exit" divided>退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <div class="m-modal" v-show="show_pwd_modal" @click="hideModal">
                <div class="m-modal-state">
                  <div class="m-modal-content" @click="modalClick">
                    <h3>管理员数据管理</h3>
                    <p>--修改密码</p>
                    <el-form :inline="false" :model="pwdForm" :rules="rules" ref="pwdForm"  label-width="1.4rem">
                      <el-form-item label="请输入旧密码" prop="MApasswordOld">
                        <el-input v-model="pwdForm.password_old" type="password" class="m-input-pwd" placeholder=""></el-input>
                      </el-form-item>
                      <el-form-item label="请输入新密码" prop="MApasswordNew">
                        <el-input v-model="pwdForm.password_new" type="password" class="m-input-pwd" placeholder=""></el-input>
                      </el-form-item>
                      <el-form-item label="请确认新密码" prop="MApasswordRepeat">
                        <el-input v-model="pwdForm.password_repeat" type="password" class="m-input-pwd" placeholder=""></el-input>
                      </el-form-item>
                      <p class="m-btn-p" @click="pwdSubmit('pwdForm')">确认修改</p>
                    </el-form>
                  </div>
                </div>
              </div>
            </header>

            <main class="main-view">
                <el-tabs class="two-level-tabs" v-if="showTabPane" :value="secondIndex" @tab-click="handleClick">
                    <el-tab-pane v-for="item in defaultPage.children" :label="item.title"
                                 :name="item.path" :key="item.path">
                    </el-tab-pane>
                </el-tabs>
              <!--<keep-alive>-->
                <router-view></router-view>
              <!--</keep-alive>-->

            </main>
        </section>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import axios from 'axios';
    import api from '../../api/api'

    export default {
        name: "commonLayout",

        data() {
            return {
                searchTxt: '',
              show_pwd_modal:false,
              pwdForm:{
                password_old:'',
                password_new:'',
                password_repeat:''
              },
              rules: {
                password_old: [
                  { required: true, message: '请输入旧密码', trigger: 'blur' }
                ],
                password_new:[
                  { required: true, message: '请输入新密码', trigger: 'blur' }
                ],
                password_repeat:[
                  { required: true, message: '请确认新密码', trigger: 'blur' }
                ],
              }
            }
        },

        components: {},

        computed: {
            // ...mapState(['menu']),
            menu(){
              let _menu = [];
                if(localStorage.getItem('user_type') == 77){
                  _menu = [{
                    title:"概况",
                    path:"/profile",
                    iconPath: 'icon-profile-side'
                  }]
                }else{
                  _menu = [
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

                  ];
                }
                return _menu;
            },
            stateType(){
              return localStorage.getItem('user_type');
            },
            menuList(){
                let menuList = [];

                for (let i = 0; i < this.menu.length; i++) {
                    let currentMenu = this.menu[i];

                    if(currentMenu.children){
                        for (let j = 0; j < currentMenu.children.length; j++) {
                            menuList.push({
                                title: currentMenu.children[j].title,
                                path:currentMenu.path + '/'+currentMenu.children[j].path
                            });

                        }
                    }else{
                        menuList.push(currentMenu);
                    }
                }

                return menuList;
            },

            defaultIndex() {
                let firstLevelPath = '/' + this.$route.path.split('/')[1]

                return firstLevelPath;
            },
            secondIndex() {
                let secondLevelPath = this.$route.path.split('/')[2]

                return secondLevelPath;
            },
            //
            //
            defaultPage() {
                let firstLevelPath = '/' + this.$route.path.split('/')[1];
                // if(firstLevelPath != '/admin'){
                  return this.menu.find(menu => menu.path == firstLevelPath);
                // }

            },
            //
            showTabPane() {
                let isSecond;

                if (this.defaultPage.children) {
                    isSecond = this.defaultPage.children.find(item => item.path == this.secondIndex);

                }

                return this.defaultPage.children && this.defaultPage.children.length && isSecond
            },
        },

        methods: {
            handleClick(tab) {
                this.$router.push(tab.name)
            },
            querySearch(queryString, cb) {
                // console.log(queryString);
                let searchRes =  this.menuList.filter(item => item.title .toLowerCase().indexOf(queryString.toLowerCase()) !== -1)

                cb(searchRes);
            },
            selectMenu(menu){
                console.log(menu);
                this.$router.push(menu.path)
            },
          hideModal(){
            this.show_pwd_modal = false;
          },
          pwdSubmit(formName){
            let that = this;
            this.$refs[formName].validate((valid) => {
              if (valid) {
                axios.post(api.update_admin_password + '?token=' + localStorage.getItem('token'),that.pwdForm).
                then(res=>{
                  if(res.data.status == 200){
                    this.$message({
                      message: res.data.message,
                      type: 'success'
                    });
                    this.show_pwd_modal = false;
                    for(let i in that.pwdForm){
                      that.pwdForm[i] = ''
                    }
                  }else{
                    this.$message.error(res.data.message);
                  }
                }, res=>{
                  this.$message.error(res.data.message);
                });
              } else {
                console.log('error submit!!');
                return false;
              }
            });

          },
          handleCommand(command) {
            if(command == 'passward'){
              this.show_pwd_modal = true;
            }else if(command == 'admin'){
              console.log(command)
              this.$router.push('/admin');
            } else if(command == 'approve'){
              this.$router.push('/approveManage');
            } else if(command == 'exit'){
              this.$confirm('确定要退出当前登录吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$router.push('/');
                localStorage.removeItem('user_type');
              }).catch(() => {
              });

            }
          },
          modalClick(e){
            e.stopPropagation();
            return false
          }
        },

        created() {
          console.log(this.menu);
            // console.log(this.$route.path.split('/')[2]);
        },
    }
</script>


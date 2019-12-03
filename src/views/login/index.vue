<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form"
             label-position="left">
      <h3 class="title">摩可后台管理系统</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input v-model.trim="loginForm.username" maxlength="100" name="username" type="text" placeholder="用户名"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :type="pwdType" v-model="loginForm.password" maxlength="100" name="password" placeholder="密码"
          @keyup.enter.native="handleLogin"/>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>

      <el-form-item>
        <el-button :loading="loading" type="primary" style="width: 100%;" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>

      <el-radio-group v-model="loginForm.userType">
        <el-radio label="1" name="userType" border>管理员</el-radio>
        <el-radio label="2" name="userType" border>供应商</el-radio>
      </el-radio-group>

      <div class="tips">
      </div>
    </el-form>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {getStore, setStore} from "src/utils/index";


  export default {
    name: 'Login',
    data() {
      return {
        loginForm: {
          username: getStore('username'),
          password: '',
          userType: getStore('userType') || '1',
        },
        loginRules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        loading: false,
        pwdType: 'password',
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true

            setStore('username', this.loginForm.username);
            setStore('userType', this.loginForm.userType);

            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({path: this.redirect || '/'})

              let roleZh = '';

              switch (this.userInfo.level) {
                case 'supplizer':
                  roleZh = '供应商';
                  break;
                case 'admin':
                  roleZh = '管理员';
                  break;
                case 'super':
                  roleZh = '超级管理员';
                  break;
              }

              this.$notify({
                title: '登录成功',
                message: `身份:${roleZh}`,
                type: 'success'
              });
            }).catch(() => {
              this.loading = false
            })
          } else {
            // this.$message.warning('请填写用户名和密码');
            return false
          }
        })
      }
    },

    created() {
      // console.log(this.$http, this.$api);
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg: #2d3a4b;
  $light_gray: #eee;

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 520px;
      max-width: 100%;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>

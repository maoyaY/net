<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {getStore, setStore, removeStore} from "src/utils/index";

  export default {
    name: 'App',

    data() {
      return {
        interval: null,
      }
    },

    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
      key() {
        return this.$route.fullPath
      },
    },

    methods: {
      authRefresh() {
        if(getStore('token')){
          this.$http.get(this.$api.auth_fresh, {
            noLoading: true,
            params: {}
          }).then(
            res => {
              if (res.data.status == 200) {
                let resData = res.data,
                    data = res.data.data;

                this.$store.commit('SET_TOKEN', data);
              }
            }
          )
        }
      },
    },

    destroyed() {
      clearInterval(this.interval);
    },

    created() {
      console.log('v 2.1.0');
      //  6小时刷新一下token
      this.interval = setInterval(this.authRefresh, 1000 * 60 * 6 * 60);
      if(location.href.indexOf('?') >0){
        let code = location.href.split('=')[1].split('#')[0];
        let params = {
          code:code,
          userType:10
        }
        this.$store.dispatch('Login', params).then(() => {
          this.loading = false

          location.href = location.origin + '#/guide/personalDraft';
          // this.$router.push({path: '/guide/draft'});

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
            case 'personal':
              roleZh = '普通用户';
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
      }
      // console.log('v 周3下午10点30');
    },
    mounted() {

    }
  }
</script>

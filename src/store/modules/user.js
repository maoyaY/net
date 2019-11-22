import {logout, getInfo} from 'src/api/login'
import {login, supplizerLogin, authRefresh,personalLogin} from 'src/service/index'
import {getStore, setStore, removeStore} from "src/utils/index";


const user = {
  state: {
    userInfo: {},
    token: getStore('token'),
    name: '',
    avatar: '',
    roles: [],
    interval: null,
  },

  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },

    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INTERVAL: (state, interval) => {
      state.interval = interval
    },

    INIT_USER_INFO: (state) => {
      let saveUserInfo = getStore('User-Info');

      if (saveUserInfo) {
        state.userInfo = JSON.parse(saveUserInfo);
        state.roles = [state.userInfo.level]
      }
    }
  },

  actions: {
    //  登录,整合下供应商和管理员的,字段也统一下
    //  role: supplizer,admin,super(在router的beforeEach中拿缓存的,避免刷新)
    //  router中配置好role
    Login({commit}, userInfo)      {
      return new Promise((resolve, reject) => {
        console.log(userInfo.userType == 10,'user')
        if (userInfo.userType == 1) { //  管理员
          login(userInfo.username, userInfo.password).then(response => {
            if (response.data.status == 200) {
              let resData = response.data,
                data = resData.data;

              setStore('token', data.token);
              commit('SET_TOKEN', data.token)

              let cookieUserInfo = {
                username: data.admin.adname,
                personName: '',
                avatar: data.admin.adheader,
                level: data.admin.adlevel == '超级管理员' ? 'super' : 'admin'
              }
              setStore('User-Info', cookieUserInfo)
              commit('SET_USER_INFO', cookieUserInfo)
              resolve()
            } else {
              reject();
            }
          }).catch(error => {
            reject(error)
          })
        } else if(userInfo.userType == 10){     //普通用户
          if(!getStore('token')){
            personalLogin(userInfo.code).then(response => {
              if (response.data.status == 200) {
                let resData = response.data,
                  data = resData.data;

                setStore('token', data.token);
                commit('SET_TOKEN', data.token)

                let cookieUserInfo = {
                  username: data.user.usname,
                  personName: data.user.usname,
                  avatar: data.user.usheader,
                  level: 'personal'
                }
                setStore('User-Info', cookieUserInfo)
                commit('SET_USER_INFO', cookieUserInfo)
                resolve()
              } else {
                reject();
              }
            }).catch(error => {
              reject(error)
            })
          }

        } else {  //  供应商
          supplizerLogin(userInfo.username, userInfo.password).then(response => {
            if (response.data.status == 200) {
              let resData = response.data,
                data = resData.data;

              setStore('token', data.token);
              commit('SET_TOKEN', data.token);
              let cookieUserInfo;
              if(data.supplizer.sugrade == 0){
                cookieUserInfo = {
                  username: data.supplizer.sulinkphone,
                  personName: data.supplizer.suname,
                  avatar: data.supplizer.suheader,
                  level: 'supplizer'
                }
              }else if(data.supplizer.sugrade == 1){
                cookieUserInfo = {
                  username: data.supplizer.sulinkphone,
                  personName: data.supplizer.suname,
                  avatar: data.supplizer.suheader,
                  level: 'sugrade'
                }
              }

              setStore('User-Info', cookieUserInfo)
              commit('SET_USER_INFO', cookieUserInfo)
              resolve()
            } else {
              reject();
            }
          }).catch(error => {
            reject(error)
          })
        }
      })
    },

    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])

        // if (state.interval) {
        //   clearInterval(state.interval);
        // }
        removeStore('token')
        resolve()
      })
    },

    // 获取用户信息
    GetInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default user

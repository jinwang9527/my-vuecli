import {getToken, setToken,removeToken} from '../utils/auth'
import {userLogin, getUserInfo, getRoles} from "../api/login/login"
import {asyncRouterMap} from '../router'


function getChildren(route, roles) {
  const children = [];
  route.forEach(item => {
    if (item.children !== undefined) {
      if (item.children && item.children.length > 0) {
        item.children = selectChildren(item, roles)
      }
    }
    children.push(item)
  });
  return children
}

function selectChildren(item, roles) {
  const childrens = [];
  item.children.forEach(roule => {
    if (roule.role) {
      if (roule.role.indexOf(roles) >= 0) {
        childrens.push(roule)
      }
    } else if (!roule.role) {
      childrens.push(roule)
    }
    item.children = childrens
  })
  return childrens
}


const user = {
  //类似组件中的data 用来存储数据
  state: {
    token: getToken(),
    count: 0,
    roles: [],
    userInfo: null,
    avatar: '',
    name: '',
  },
  mutations: {
    count(state) {
      state.count++
    },
    setToken(state, token) {
      return state.token = token
    },
    setRoles(state, roles) {
      return state.roles = roles
    },
    setUserInfo(state, userInfo) {
      return state.userInfo = userInfo
    },
    setName(state, name) {
      return state.name = name
    }
  },
  actions: {
    Login({commit}, user) {
      return new Promise((resolve, reject) => {
        userLogin({account:"A10002",password:"123456"}).then(response => {
          commit("setToken", response.data);
          setToken(response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetUserInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const data = response.data
          commit("setUserInfo", data.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },


    getRoles({commit, state}) {
      return new Promise((resolve, reject) => {
        getRoles().then(response => {
          const data = response.data
          commit("setRoles", data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    filterAsyncRouter(res) {
      return new Promise((resolve, reject) => {
        const roles = []
        res.getters.roles.forEach(item => {
          asyncRouterMap.filter(route => {
            if (route.role.indexOf(item) >= 0) {
              if (route.children && route.children.length) {
                route.children = getChildren(route.children, item)
              }
              roles.push(route)
            }

          })
          resolve(roles)
        })
        reject()
      })
    },
    //前端登出
    FedLogOut({commit}){
      return new Promise(resolve => {
        commit ('SET_TOKEN','')
        removeToken()
        resolve()
      })
    }

  },

};
export default user



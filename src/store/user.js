const user = {
  //类似组件中的data 用来存储数据
  state: {
    token: null,
    count: 0,
  },
  //通过mutations来操作state的数据
  mutations: {
    //调用mutations 的方法  通过 this.$store.commit('方法名')
    count(state) {
      state.count++
    },
    setToken(state, token) {
      return state.token = token
    },
  },
  actions: {
    GetToken({commit}) {
      return commit("setToken", "token")
    }
  }
};
export default user

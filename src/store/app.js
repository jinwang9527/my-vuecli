import Cookies from 'js-cookie'


const app={
  state:{
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device:'desktop',
    AppMain:{
      loading:false,
      text:'拼命加载中',
      spinner:'el-icon-loading',
      background:'rgba(0,0,0,0.8)'
    }
  },
  mutations:{
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    APP_MAIN: (state, AppMain) => {
      state.AppMain = AppMain
    },
    APP_MAIN_LOADING: (state, loading) => {
      state.AppMain.loading = loading
    },
    APP_MAIN_LOADING_TEXT: (state, text) => {
      state.AppMain.text = text
    },
    APP_MAIN_LOADING_SPINNER: (state, spinner) => {
      state.AppMain.spinner = spinner
    },
    APP_MAIN_LOADING_BACKGROUND: (state, background) => {
      state.AppMain.background = background
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    }
  },
  getters: {
    AppMain: (state) => {
      return state.AppMain
    }
  }
}

export default app

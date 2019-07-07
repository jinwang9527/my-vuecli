const getters = {
  token: state => state.user.token,
  count: state => state.user.count,
  roles: state => state.user.roles,
  userInfo: state => state.user.userInfo,
  avatar:state => state.user.avatar,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  name:state => state.user.name
};
export default getters

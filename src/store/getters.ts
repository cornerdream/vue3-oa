
const getters = {  
  token: state => state.user.token,
  // userInfo:state => {console.log(state);state.user.userInfo},
  id: state => state.user.id,
  username: state => state.user.username,
  email: state => state.user.email,
  image: state => state.user.image,
  userMenu:state => state.sliderMenus.userMenu, 
  
  
  // roles: state => state.user.roles,
  // permission_routers: state => state.permission.routers,
  // addRouters: state => state.permission.addRouters,
  // socketApi: state => state.api.socketApi
}
export default getters

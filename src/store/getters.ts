const getters = {
  token: (state:any) => state.user.token,
  id: (state:any) => state.user.id,
  username: (state:any) => state.user.username,
  email: (state:any) => state.user.email,
  image: (state:any) => state.user.image,
  userMenu: (state:any) => state.sliderMenus.userMenu, //导航菜单
  activeNav: (state:any) => state.sliderMenus.activeNav,
  activeOpen: (state:any) => state.sliderMenus.activeOpen,
  options: (state:any) => state.product.options, //分类
  cartList: (state:any) => state.cart.cartList, //购物车
  project: (state:any) => state.cart.project, //项目
  buyer: (state:any) => state.cart.buyer //采购员
}
export default getters

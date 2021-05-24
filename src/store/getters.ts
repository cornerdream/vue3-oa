const getters = {
  token: (state) => state.user.token,
  id: (state) => state.user.id,
  username: (state) => state.user.username,
  email: (state) => state.user.email,
  image: (state) => state.user.image,
  userMenu: (state) => state.sliderMenus.userMenu,//导航菜单
  options:(state) => state.product.options,//分类
  cartList:(state)=> state.cart.cartList,//购物车
  project:(state) => state.cart.project,//项目
  buyer:(state)=> state.cart.buyer,//采购员
}
export default getters

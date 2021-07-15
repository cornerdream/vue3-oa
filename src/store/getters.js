const getters = {
    token: (state) => state.user.token,
    id: (state) => state.user.id,
    username: (state) => state.user.username,
    email: (state) => state.user.email,
    image: (state) => state.user.image,
    userMenu: (state) => state.sliderMenus.userMenu, //导航菜单
    activeNav: (state) => state.sliderMenus.activeNav,
    activeOpen: (state) => state.sliderMenus.activeOpen,
    options: (state) => state.product.options, //分类
    tagData: (state) => state.product.tagData,
    navData: (state) => state.product.navData,
    filterData: (state) => state.product.filterData,
    listData: (state) => state.product.listData,
    cartList: (state) => state.cart.cartList, //购物车
    project: (state) => state.cart.project, //项目
    buyer: (state) => state.cart.buyer, //采购员
    helpMenu: (state) => state.help.helpMenu, //导航菜单
    listMenu: (state) => state.help.listMenu, //导航菜单
    activeNavs: (state) => state.help.activeNavs,
    activeOpens: (state) => state.help.activeOpens,
}
export default getters
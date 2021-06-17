import { createStore } from 'vuex'

import user from './modules/login'
import sliderMenus from './modules/sliderMenus'
import product from './modules/product'
import cart from './modules/cart'
import getters from './getters'

export default createStore({
  modules: {
    user,
    sliderMenus,
    product,
    cart
  },
  getters
})

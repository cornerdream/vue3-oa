import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import user from './modules/login'
import sliderMenus from './modules/sliderMenus'
import product from './modules/product'
import cart from './modules/cart'
import getters from './getters'
import help from './modules/help'
export default createStore({
  modules: {
    user,
    sliderMenus,
    product,
    cart,
    help
  },
  getters,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer(val) {
        return {
        // 只储存state中的user
        sliderMenus: val.sliderMenus
      }}
    })
  ]
})

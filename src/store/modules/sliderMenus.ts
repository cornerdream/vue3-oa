import { getUserMenu } from '../../api/login'

const user = {
  state: {
    userMenu: {}
  },

  mutations: {
    SET_USERMENU: (state, userMenu) => {
      state.userMenu = userMenu
      // window.localStorage.setItem('userMenu',userMenu);
    }
  },

  actions: {
    // 获取菜單信息
    GetUserMenu({ commit }) {
      return new Promise((resolve, reject) => {
        getUserMenu()
          .then((res) => {
            commit('SET_USERMENU', res.data.data)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
}

export default user

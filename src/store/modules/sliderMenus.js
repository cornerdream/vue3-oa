import { getUserMenu } from '@/api/login'

const user = {
  state: {
    userMenu: {},
    activeNav:'orders',
    activeOpen:['']
  },

  mutations: {
    SET_USERMENU: (state, userMenu) => {
      state.userMenu = userMenu
      // window.localStorage.setItem('userMenu',userMenu);
    },
    SET_ACTIVENAV: (state, activeNav) => {   
      state.activeNav = activeNav
    },
    SET_ACTIVEOPEN:function(state, activeOpen){
     
      // state.activeOpen = [];
      state.activeOpen=activeOpen
    },
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
    },
    //
    GetActiveNav({commit},data){
      commit('SET_ACTIVENAV',data)
    },
    GetActiveOpen({commit},data){
      commit('SET_ACTIVEOPEN',data)
    }
  }
}

export default user

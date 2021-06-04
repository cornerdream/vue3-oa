import { getUserMenu } from '../../api/login'

const user = {
  state: {
    userMenu: {},
    activeNav:'me',
    activeOpen:['me']
  },

  mutations: {
    SET_USERMENU: (state:any, userMenu:any) => {
      state.userMenu = userMenu
      // window.localStorage.setItem('userMenu',userMenu);
    },
    SET_ACTIVENAV: (state:any, activeNav:any) => {
      
      state.activeNav = activeNav
      
    },
    SET_ACTIVEOPEN:function(state:any, activeOpen:any){
      
      state.activeOpen = [];
      state.activeOpen=activeOpen
      
    },
  },

  actions: {
    // 获取菜單信息
    GetUserMenu({ commit }:any) {
      return new Promise((resolve, reject) => {
        getUserMenu()
          .then((res) => {
            console.log(res);
            commit('SET_USERMENU', res.data.data)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    //
    GetActiveNav({commit}:any,data:any){
      commit('SET_ACTIVENAV',data)
    },
    GetActiveOpen({commit}:any,data:any){
      commit('SET_ACTIVEOPEN',data)
    }
  }
}

export default user

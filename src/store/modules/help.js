import { getHelptype,getHelpdoc } from '@/api/help'

const user = {
    state: {
      helpMenu: {},
      listMenu:{},
      activeNavs:'',
      activeOpens:['']
    },
  
    mutations: {
      SET_HELPMENU: (state, helpMenu) => {
        state.helpMenu = helpMenu
      },
      SET_LISTMENU: (state, listMenu) => {   
        state.listMenu = listMenu
      },
      SET_ACTIVENAVS: (state, activeNavs) => {   
        state.activeNavs = activeNavs
      },
      SET_ACTIVEOPENS:function(state, activeOpens){
     
        // state.activeOpen = [];
        state.activeOpens=activeOpens
      },
    },
  
    actions: {
      // 获取菜單信息
      GetHelptype({ commit }) {
        return new Promise((resolve, reject) => {
            getHelptype()
            .then((res) => {
              commit('SET_HELPMENU', res.data.data)
              resolve(res)
            })
            .catch((error) => {
              reject(error)
            })
        })
      },
      //
      GetHelpdoc({ commit },params) {
        return new Promise((resolve, reject) => {
            getHelpdoc(params)
            .then((res) => {
              commit('SET_LISTMENU', res.data.data)
              resolve(res)
            })
            .catch((error) => {
              reject(error)
            })
        })
      },
      GetActiveNavs({commit},data){
        commit('SET_ACTIVENAVS',data)
      },
      GetActiveOpens({commit},data){
        commit('SET_ACTIVEOPENS',data)
      }
    }
  }
  
  export default user
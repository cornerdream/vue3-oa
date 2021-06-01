import { getProductTree } from '../../api/product'

const user = {
  state: {
    options: []
  },

  mutations: {
    SET_OPTIONS: (state:any, options:any) => {
      state.options = options
    }
  },

  actions: {
    //
    GetProductTree({ commit }:any) {
      return new Promise((resolve, reject) => {
        getProductTree()
          .then((res) => {
            commit('SET_OPTIONS', res.data.data)
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

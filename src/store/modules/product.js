import { getProductTree } from '@/api/product'
import { getProductTag, getProductClassify } from '@/api/product'
import { toRaw } from '@vue/reactivity'
const user = {
    state: {
        options: [],
        tagData: [],
        navData: [],
        filterData: [],
        listData: [],
    },

    mutations: {
        SET_OPTIONS: (state, options) => {
            state.options = options
        },
        SET_TAG: (state, data) => {
            state.tagData = data.category;
            state.navData = data.navigation;
            state.filterData = data.filter;
        },
        SET_CLASSIFY: (state, data) => {
            state.listData = data.result;
        }

    },

    actions: {
        //
        GetProductTree({ commit }) {
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
        },
        GetProductTag({ commit }, param) {
            return new Promise((resolve, reject) => {

                getProductTag(param)
                    .then((res) => {
                        commit('SET_TAG', res.data.data)
                        resolve(res)
                    })
                    .catch((error) => {
                        reject(error)
                    })

            })
        },
        GetProductClassify({ commit }, param) {
            return new Promise((resolve, reject) => {

                getProductClassify(param)
                    .then((res) => {
                        commit('SET_CLASSIFY', res.data.data)
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
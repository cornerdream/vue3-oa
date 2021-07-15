import { getProductProject, getProductBuyer } from '@/api/product'
import { getCart, save, del, update, select } from '@/api/cart'

const user = {
    state: {
        cartList: [], //购物车
        project: [], //项目列表
        buyer: [] //采购员列表
    },
    getters: {
        totalNum: (state) => {
            let total = 0
            state.cartList.map((item) => {
                // if (item.selected) {
                total += item.count
                    // }
            })
            return total
        },
        totalPrice: (state) => {
            let total = 0
            state.cartList.map((item) => {
                if (item.selected) {
                    total += item.count * item.price
                }
            })
            return total
        },
        selectAll: (state) => {
            let select = state.cartList.every((item) => item.selected)
            return select
        }
    },
    mutations: {
        SET_CART: (state, cartList) => {
            state.cartList = cartList
        },
        SET_PROJECT: (state, data) => {
            state.project = data
        },
        SET_BUYER: (state, data) => {
            state.buyer = data
        },
        SET_ADD: (state, data) => {
            let record = state.cartList.find((item) => item.id == data.id)
            if (!record) {
                state.cartList.push(data)
            } else {
                record.count += data.count
                record.buyer = data.buyer
                record.notes = data.notes
                record.project = data.project
            }
        },
        SET_UPDATE: (state, data) => {
            let record = state.cartList.find((item) => item.id == data.id)
            record = data
        },
        SET_DEL: (state, data) => {
            state.cartList.forEach((el, index) => {
                if (el.id == data.id) {
                    state.cartList.splice(index, 1)
                }
            })
        }
    },

    actions: {
        // 获取购物车列表
        GetCart({ commit }) {
            return new Promise((resolve, reject) => {
                getCart()
                    .then((res) => {
                        commit('SET_CART', res.data.data)
                        resolve(res)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        GetProject({ commit }, data) {
            return new Promise((resolve, reject) => {
                getProductProject(data)
                    .then((res) => {
                        commit('SET_PROJECT', res.data.data.results)
                        resolve(res)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        GetBuyer({ commit }, data) {
            return new Promise((resolve, reject) => {
                getProductBuyer(data)
                    .then((res) => {
                        commit('SET_BUYER', res.data.data.results)
                        resolve(res)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        // 选择购物车信息
        Select({ commit }, data) {
            return new Promise((resolve, reject) => {
                select(data)
                    .then((res) => {
                        resolve(res)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        // 修改购物车信息
        Update({ commit }, data) {
            return new Promise((resolve, reject) => {
                update(data)
                    .then((res) => {
                        commit('SET_UPDATE', res.data.data)
                        resolve(res)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        // 保存购物车信息
        Save({ commit }, data) {
            return new Promise((resolve, reject) => {
                save(data)
                    .then((res) => {
                        commit('SET_ADD', res.data.data)
                        resolve(res)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        // 删除菜單信息
        Delete({ commit }, data) {
            return new Promise((resolve, reject) => {
                del(data)
                    .then((res) => {
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
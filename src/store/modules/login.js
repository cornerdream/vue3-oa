import { login, getUserInfo, getLogout } from '@/api/login'

const user = {
    state: {
        token: window.localStorage.getItem('token') || '',
        id: window.localStorage.getItem('id') || '',
        username: window.localStorage.getItem('username') || '',
        email: window.localStorage.getItem('email') || '',
        image: window.localStorage.getItem('image') || ''
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
            window.localStorage.setItem('token', token)
        },
        SET_ID: (state, id) => {
            state.id = id
            window.localStorage.setItem('id', id)
        },
        SET_USERNAME: (state, username) => {
            state.username = username
            window.localStorage.setItem('username', username)
        },
        SET_EMAIL: (state, email) => {
            state.email = email
            window.localStorage.setItem('email', email)
        },
        SET_IMAGE: (state, image) => {
            state.image = image
            window.localStorage.setItem('image', image)
        }
    },

    actions: {
        // 登录
        Login({ commit }, user) {
            return new Promise((resolve, reject) => {
                login(user)
                    .then((res) => {
                        commit('SET_TOKEN', res.data.data)
                        resolve(res)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },

        // 获取用户信息
        GetUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getUserInfo()
                    .then((res) => {
                        commit('SET_ID', res.data.data.id)
                        commit('SET_USERNAME', res.data.data.username)
                        commit('SET_EMAIL', res.data.data.email)
                        commit('SET_IMAGE', res.data.data.image)
                        resolve(res)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },

        // 登出
        LogOut({ commit }) {
            return new Promise((resolve, reject) => {
                getLogout().then((res) => {
                    commit('SET_TOKEN', res.data.data)
                    window.localStorage.clear()
                    window.sessionStorage.clear()
                    resolve(null)
                })

            })
        }
    }
}

export default user
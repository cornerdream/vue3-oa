import Axios from 'axios'
import { ElMessage } from 'element-plus'
import qs from 'qs'
import store from '@/store'
import router from '@/router'
import { routeLocationKey } from 'vue-router'

//const baseURL='http://192.168.31.107:8000';
const baseURL = 'http://192.168.1.218:8000';
// const baseURL = 'http://192.168.1.212:8000';
// const baseURL = 'http://localhost:3000';
const timeout = 2000;
const $axios = Axios.create({
    baseURL,
    timeout,
    withCredentials: true,
})


function redirectLogin() {
    router.push({
        name: 'login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
}
$axios.interceptors.request.use(
    (config) => {
        // const { token } = store.state.user
        // const { cookie } = Cookies.get('session_id')
        // console.log(cookie, '是')
        // if (token) {
        //     config.headers.Authorization = 'JWT ' + token
        // }
        // }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

let isRfreshing = false
let requests = []
$axios.interceptors.response.use(
    (response) => {
        return response
    },
    async(error) => {
        if (error.response) {
            const { status } = error.response
            if (status == 400) {
                ElMessage.error('请求参数错误')
            } else if (status == 401) {
                // if (!store.state.user.token) {
                //   redirectLogin()
                //   return Promise.reject(error)
                // }
                redirectLogin();

            } else if (status == 403) {
                ElMessage.error('没有权限，请联系管理员')
            } else if (status == 404) {
                ElMessage.error('请求资源不存在');
                router.push('/404')
            } else if (status == 498) {
                ElMessage.error('请求超时，请重新登录');
                redirectLogin();
            } else if (status >= 500) {
                ElMessage.error('服务端错误，请联系管理员')
            } else if (error.request) {
                ElMessage.error('请求超时，请刷新重试')
            } else {
                ElMessage.error(`请求失败:${error.message}`)
            }
            return Promise.reject(error)
        }
    }
)
export default $axios
import Axios from 'axios'
import { ElMessage } from 'element-plus'

import store from '@/store'
import router from '@/router'
import { routeLocationKey } from 'vue-router'


//const baseURL='http://192.168.31.107:8000';
const baseURL = 'http://192.168.1.212:8000';
const timeout = 2000;
const $axios = Axios.create({
  baseURL,
  timeout
})

function redirectLogin() {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

// function refreshToken(){
//     return Axios.create()({
//         method:"POST",
//         url:'',
//         data:qs.stringify({
//             refreshToken:store.state.user.refresh_token
//         })
//     })
// }

$axios.interceptors.request.use(
  (config) => {
    const { token } = store.state.user
    if (token) {
      config.headers.Authorization = 'JWT ' + token
    }

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
  async (error) => {
    if (error.response) {
      const { status } = error.response
      if (status == 400) {
        ElMessage.error('请求参数错误')
      } else if (status == 401) {
        if (!store.state.user.token) {
          redirectLogin()
          return Promise.reject(error)
        }
        // if(!isRfreshing){
        //     isRfreshing = true;
        //     return refreshToken().then(res=>{
        //         if(!res.data.success){
        //             throw new Error('刷新Token失败')
        //         }
        //         store.commit('setUser',res.data.content);
        //         requests.forEach(cb=>cb());
        //         requests = [];
        //         return request(error.config)
        //     }).catch(error=>{
        //         store.commit('setUser',null);
        //         redirectLogin();
        //         return Promise.reject(error);
        //     }).finally(()=>{
        //         isRfreshing = false;
        //     })
        // }else{
          
        // }
        redirectLogin();
        // return new Promise((resolve) => {
        //   requests.push(() => {
        //     resolve($axios(error.config))
        //   })
        // })
      } else if (status == 403) {
        ElMessage.error('没有权限，请联系管理员')
      } else if (status == 404) {
        ElMessage.error('请求资源不存在');
        router.push('/404')
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

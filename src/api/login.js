//登录
import $axios from '@/utils/axios'
import qs from 'qs'


//登录获取token
export const login = (data) => {
  return $axios({
    method: 'POST',
    url: '/auth/authorizations/',
    data: qs.stringify(data)
  })
}
//登录后获取用户信息
export const getUserInfo = () => {
  return $axios({
    method: 'GET',
    url: '/auth/user/'
  })
}
//登录后获取导航信息
export const getUserMenu = () => {
  return $axios({
    method: 'GET',
    url: '/auth/build/menus/'
  })
}

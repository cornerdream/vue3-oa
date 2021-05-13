//购物车
import $axios from '../utils/axios'

// 获取购物车信息
export function getCartTree() {
    return $axios({
      url: 'cart/',
      method: 'get'
    })
}
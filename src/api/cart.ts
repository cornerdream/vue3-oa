//购物车
import $axios from '../utils/axios'

// 获取购物车信息
export function getCart() {
  return $axios({
    url: 'cart/',
    method: 'get'
  })
}

// 保存购物车信息
export function save(data) {
  return $axios({
    url: 'cart/',
    method: 'post',
    data
  })
}

// 删除购物车信息
export function del(data) {
  return $axios({
    url: 'cart/',
    method: 'delete',
    data
  })
}

// 修改购物车信息
export function update (data) {
  return $axios({
    url: 'cart/',
    method: 'put',
    data
  })
}

// 选择购物车信息
export function select (data) {
  return $axios({
    url: '/cart/selection/',
    method: 'put',
    data
  })
}
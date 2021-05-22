//订单
import $axios from '../utils/axios'

// 获取订单信息
export function getOrder(params) {
  return $axios({
    url: '/api/orders/list/',
    method: 'get',
    params
  })
}

// 保存订单信息
export function save(data) {
  return $axios({
    url: '/api/orders/',
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
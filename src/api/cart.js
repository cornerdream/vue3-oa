//购物车
import $axios from '@/utils/axios'
import qs from 'qs'
// 获取购物车信息
export const getCart=() =>{
  return $axios({
    url: 'cart/list/',
    method: 'get'
  })
}

// 保存购物车信息
export const save=(data)=> {
  return $axios({
    url: 'cart/',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 删除购物车信息
export const del=(data)=> {
  return $axios({
    url: 'cart/delete/',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 修改购物车信息
export const update=(data)=> {
  return $axios({
    url: 'cart/edit/',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 选择购物车信息
export const select=(data) =>{
  return $axios({
    url: '/cart/selection/',
    method: 'post',
    data: qs.stringify(data)
  })
}

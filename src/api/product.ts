import $axios from '../utils/axios'

// 获取商品类别
export function getProductTree() {
    return $axios({
      url: 'api/product/category/tree',
      method: 'get'
    })
}
// 获取商品类别信息
export function getProductClassify(id) {
  return $axios({
    url: '/categories/'+id+'/skus/',
    method: 'get'
  })
}
// 获取商品列表信息
export function getProductList() {
  return $axios({
    url: '/api/skus/list',
    method: 'get'
  })
}

// 获取商品详情
export function getProductDetail(id) {
  return $axios({
    url: '/api/skus/'+id,
    method: 'get'
    
  })
}
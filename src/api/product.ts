import $axios from '../utils/axios'
import qs from 'qs'

// 获取商品类别
export function getProductTree() {
  return $axios({
    url: 'api/product/category/tree',
    method: 'get'
  })
}
// 获取商品分类详情
export function getProductTag(params:any) {
  if (!isNaN(params)) {
    return $axios({
      url: '/api/' + params + '/spec/',
      method: 'get'
    })
  } else {
    params = qs.parse(params)[0]
    const idObj = params.shift()    
    const id = idObj.category_id
    let obj = {}
    params.map((item:any) => {
      Object.assign(obj, item)
    })
    return $axios({
      url: '/api/' + id + '/spec/',
      method: 'get',
      params: obj
    })
  }
}
// 获取商品类别下列表
export function getProductClassify(params:any) {
  if (!isNaN(params)) {
    return $axios({
      url: '/categories/' + params + '/skus/',
      method: 'get'
    })
  } else {
    params = qs.parse(params)[0]
    const idObj = params.shift()   
    const id = idObj.category_id
    let obj = {}
    params.map((item:any) => {
      Object.assign(obj, item)
    })
    return $axios({
      url: '/categories/' + id + '/skus/',
      method: 'get',
      params: obj
    })
  }
}

// 获取首页商品列表
export function getProductList() {
  return $axios({
    url: '/api/skus/list',
    method: 'get'
  })
}

// 获取商品详情
export function getProductDetail(id:Number) {
  return $axios({
    url: '/api/skus/' + id + '/',
    method: 'get'
  })
}

// 获取商品添加的项目信息
export function getProductProject() {
  return $axios({
    url: '/api/project/',
    method: 'get'
  })
}

// 获取商品添加的采购员信息
export function getProductBuyer() {
  return $axios({
    url: '/api/user/list/',
    method: 'get'
  })
}

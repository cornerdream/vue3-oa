import $axios from '@/utils/axios'
import qs from 'qs'

// 获取商品类别
export const getProductTree=() =>{
  return $axios({
    url: 'api/product/category/tree',
    method: 'get'
  })
}
// 获取商品分类详情
export const getProductTag=(params) =>{
  console.log(params)
  console.log(isNaN(params))
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
    params.map((item) => {
      Object.assign(obj, item)
    })
    console.log(obj)
    return $axios({
      url: '/api/' + id + '/spec/',
      method: 'get',
      params: obj
    })
  }
}
// 获取商品类别下列表
export const getProductClassify=(params)=> {
  console.log(params)
  console.log(isNaN(params))
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
    params.map((item) => {
      Object.assign(obj, item)
    })
    console.log(obj)
    return $axios({
      url: '/categories/' + id + '/skus/',
      method: 'get',
      params: obj
    })
  }
}

// 获取首页商品列表
export const getProductList=() =>{
  return $axios({
    url: '/api/skus/list',
    method: 'get'
  })
}

// 获取商品详情
export const getProductDetail=(id) =>{
  return $axios({
    url: '/api/skus/' + id + '/',
    method: 'get'
  })
}

// 获取商品添加的项目信息
export const getProductProject=() =>{
  return $axios({
    url: '/api/project/',
    method: 'get'
  })
}

// 获取商品添加的采购员信息
export const getProductBuyer=() =>{
  return $axios({
    url: '/api/user/list/',
    method: 'get'
  })
}

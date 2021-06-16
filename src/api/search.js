//搜索
import $axios from '@/utils/axios'
import qs from 'qs'
// 获取商品分类详情
export const searchProductTag=(params) =>{
    console.log(params)
    if(Array.isArray(params)){
        let obj={}
        params.map((item)=>{
          Object.assign(obj, item)
        })
        console.log(obj)
        params = obj
    }
    console.log(params)
    return $axios({
        url: '/api/skus/options/search/',
        method: 'get',
        params
    })
    
  }
  // 获取商品类别下列表
  export const searchProductClassify=(params)=> {
      console.log(params)
      if(Array.isArray(params)){
        let obj={}
        params.map((item)=>{
          Object.assign(obj, item)
        })
        console.log(obj)
        params = obj
    }
    console.log(params)
    return $axios({
        url: '/api/skus/search/',
        method: 'get',
        params
    })
  }
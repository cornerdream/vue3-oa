import $axios from '../utils/axios'

// 获取所有的Role
export function getRoles(params:any) {
  return $axios({
    url: 'api/roles/',
    method: 'get',
    params
  })
}
//增加
export function add(data:any) {
  return $axios({
    url: 'api/roles/',
    method: 'post',
    data
  })
}

//编辑
export function edit(id:Number, data:any) {
  return $axios({
    url: 'api/roles/' + id + '/',
    method: 'put',
    data
  })
}
//获取分配信息
export function retrieve(id:Number) {
  return $axios({
    url: 'api/roles/' + id + '/',
    method: 'get'
  })
}
//分配信息保存
export function save(id:Number, data:any) {
  return $axios({
    url: 'api/roles/' + id + '/',
    method: 'patch',
    data
  })
}
//删除
export function del(id:Number) {
  return $axios({
    url: 'api/roles/' + id + '/',
    method: 'delete'
  })
}

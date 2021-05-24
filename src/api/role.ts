import $axios from '../utils/axios'

// 获取所有的Role
export function getRoles(params) {
  return $axios({
    url: 'api/roles/',
    method: 'get',
    params
  })
}
//增加
export function add(data) {
  return $axios({
    url: 'api/roles/',
    method: 'post',
    data
  })
}

//编辑
export function edit(id, data) {
  return $axios({
    url: 'api/roles/' + id + '/',
    method: 'put',
    data
  })
}
//获取分配信息
export function retrieve(id) {
  return $axios({
    url: 'api/roles/' + id + '/',
    method: 'get'
  })
}
//分配信息保存
export function save(id, data) {
  return $axios({
    url: 'api/roles/' + id + '/',
    method: 'patch',
    data
  })
}
//删除
export function del(id) {
  return $axios({
    url: 'api/roles/' + id + '/',
    method: 'delete'
  })
}

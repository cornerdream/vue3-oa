import $axios from '@/utils/axios'

// 获取所有的Role
export const getRoles=(params) =>{
  return $axios({
    url: 'api/roles/',
    method: 'get',
    params
  })
}
//增加
export const add=(data) =>{
  return $axios({
    url: 'api/roles/',
    method: 'post',
    data
  })
}

//编辑
export const edit=(id, data) =>{
  return $axios({
    url: 'api/roles/' + id + '/',
    method: 'put',
    data
  })
}
//获取分配信息
export const retrieve=(id) =>{
  return $axios({
    url: 'api/roles/' + id + '/',
    method: 'get'
  })
}
//分配信息保存
export const save=(id, data) =>{
  return $axios({
    url: 'api/roles/' + id + '/',
    method: 'patch',
    data
  })
}
//删除
export const del=(id)=> {
  return $axios({
    url: 'api/roles/' + id + '/',
    method: 'delete'
  })
}

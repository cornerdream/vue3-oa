import $axios from '@/utils/axios'

// 获取所有的权限树
export const getPermissionTree=(params)=> {
  return $axios({
    url: 'api/permission/tree/',
    method: 'get',
    params
  })
}

export const add=(data) =>{
  return $axios({
    url: 'api/permissions/',
    method: 'post',
    data
  })
}

export const del=(id) =>{
  return $axios({
    url: 'api/permissions/' + id + '/',
    method: 'delete'
  })
}

export const edit=(id, data) =>{
  return $axios({
    url: 'api/permissions/' + id + '/',
    method: 'put',
    data
  })
}

export const retrieve=(id) =>{
  return $axios({
    url: 'api/permissions/' + id + '/',
    method: 'get'
  })
}

export const save=(id, data)=> {
  return $axios({
    url: 'api/permissions/' + id + '/',
    method: 'patch',
    data
  })
}

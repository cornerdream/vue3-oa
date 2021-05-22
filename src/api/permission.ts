import $axios from '../utils/axios'

// 获取所有的权限树
export function getPermissionTree(params) {
  return $axios({
    url: 'api/permission/tree/',
    method: 'get',
    params
  })
}

export function add(data) {
  return $axios({
    url: 'api/permissions/',
    method: 'post',
    data
  })
}

export function del(id) {
  return $axios({
    url: 'api/permissions/' + id + '/',
    method: 'delete'
  })
}

export function edit(id, data) {
  return $axios({
    url: 'api/permissions/' + id + '/',
    method: 'put',
    data
  })
}

export function retrieve(id) {
  return $axios({
    url: 'api/permissions/' + id + '/',
    method: 'get'
  })
}

export function save(id, data) {
  return $axios({
    url: 'api/permissions/' + id + '/',
    method: 'patch',
    data
  })
}

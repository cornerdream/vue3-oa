import $axios from '../utils/axios'

// 获取所有的organization
export function getOrganizationTree(params:any) {
  return $axios({
    url: 'api/organization/tree/',
    method: 'get',
    params
  })
}

// 获取所有的user
export function getOrganizationUserTree() {
  return $axios({
    url: 'api/organization/user/tree/',
    method: 'get'
  })
}

export function add(data:any) {
  return $axios({
    url: 'api/organizations/',
    method: 'post',
    data
  })
}

export function del(id:Number) {
  return $axios({
    url: 'api/organizations/' + id + '/',
    method: 'delete'
  })
}

export function edit(id:Number, data:any) {
  return $axios({
    url: 'api/organizations/' + id + '/',
    method: 'put',
    data
  })
}

//用户
import $axios from '../utils/axios'
import qs from 'qs'

export function add(data:any) {
  return $axios({
    url: 'api/users/',
    method: 'post',
    data
  })
}

export function del(id:Number) {
  return $axios({
    url: 'api/users/' + id + '/',
    method: 'delete'
  })
}

export function edit(id:Number, data:any) {
  return $axios({
    url: 'api/users/' + id + '/',
    method: 'put',
    data
  })
}

export function updatePasswd(id:Number, data:any) {
  return $axios({
    url: 'api/users/' + id + '/change-passwd/',
    method: 'post',
    data
  })
}

export function getUser(params:any) {
  return $axios({
    url: 'api/users/',
    method: 'get',
    params
  })
}

export function getUserList(name:string) {
  if (name) {
    return $axios({
      url: 'api/user/list/?name=' + name,
      method: 'get'
    })
  } else {
    return $axios({
      url: 'api/user/list/',
      method: 'get'
    })
  }
}

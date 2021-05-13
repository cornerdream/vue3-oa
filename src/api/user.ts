//用户
import $axios from '../utils/axios'
import qs from 'qs'



export function add(data) {
  return $axios({
    url: 'api/users/',
    method: 'post',
    data
  })
}

export function del(id) {
  return $axios({
    url: 'api/users/' + id + '/',
    method: 'delete'
  })
}

export function edit(id, data) {
  return $axios({
    url: 'api/users/' + id + '/',
    method: 'put',
    data
  })
}

export function updatePasswd(id, data) {
  return $axios({
    url: 'api/users/' + id + '/change-passwd/',
    method: 'post',
    data
  })
}

export function getUser(params) {
  
  return $axios({
    url: 'api/users/',
    method: 'get',
    params
  })
  
}

export function getUserList(name) {
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


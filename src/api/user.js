//用户
import $axios from '@/utils/axios'
export const upload=(data)=> {
  return $axios({
    url: '/api/upload/',
    method: 'post',
    data
  })
}

export const add=(data)=> {
  return $axios({
    url: 'api/users/',
    method: 'post',
    data
  })
}

export const del=(id) =>{
  return $axios({
    url: 'api/users/' + id + '/',
    method: 'delete'
  })
}

export const edit=(id, data)=> {
  return $axios({
    url: 'api/users/' + id + '/',
    method: 'put',
    data
  })
}

export const updatePasswd=(id, data)=> {
  return $axios({
    url: 'api/users/' + id + '/change-passwd/',
    method: 'post',
    data
  })
}

export const getUser=(params) =>{
  return $axios({
    url: 'api/users/',
    method: 'get',
    params
  })
}

export const getUserList=(name) =>{
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

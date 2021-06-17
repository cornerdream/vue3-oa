import $axios from '@/utils/axios'

// 获取所有的organization
export const getOrganizationTree=(params)=> {
  return $axios({
    url: 'api/organization/tree/',
    method: 'get',
    params
  })
}

// 获取所有的user
export const getOrganizationUserTree=()=> {
  return $axios({
    url: 'api/organization/user/tree/',
    method: 'get'
  })
}

export const add=(data) =>{
  return $axios({
    url: 'api/organizations/',
    method: 'post',
    data
  })
}

export const del=(id) =>{
  return $axios({
    url: 'api/organizations/' + id + '/',
    method: 'delete'
  })
}

export const edit=(id, data)=> {
  return $axios({
    url: 'api/organizations/' + id + '/',
    method: 'put',
    data
  })
}

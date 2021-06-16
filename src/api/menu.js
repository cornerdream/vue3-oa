// 菜单
import $axios from '@/utils/axios'

// 获取菜单列表
export const getMenuTree=() =>{
  return $axios({
    url: 'api/menu/tree/',
    method: 'get'
  })
}
// 获取菜单信息
export const getMenus=(params)=> {
  return $axios({
    url: 'api/menus/',
    method: 'get',
    params
  })
}
//菜单新增
export const add=(data) =>{
  console.log(data);
  return $axios({
    url: 'api/menus/',
    method: 'post',
    data
  })
}
//菜单删除
export const del=(id)=> {
  return $axios({
    url: 'api/menus/' + id + '/',
    method: 'delete'
  })
}
//菜单编辑
export const edit=(id, data)=> {
  return $axios({
    url: 'api/menus/' + id + '/',
    method: 'put',
    data
  })
}
//菜单编辑后更新
export const retrieve=(id) =>{
  return $axios({
    url: 'api/menus/' + id + '/',
    method: 'get'
  })
}
//菜单编辑后保存
export const save=(id, data) =>{
  return $axios({
    url: 'api/menus/' + id + '/',
    method: 'patch',
    data
  })
}

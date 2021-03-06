// 菜单
import $axios from '../utils/axios'

// 获取菜单列表
export function getMenuTree() {
  return $axios({
    url: 'api/menu/tree/',
    method: 'get'
  })
}
// 获取菜单信息
export function getMenus(params:any) {
  return $axios({
    url: 'api/menus/',
    method: 'get',
    params
  })
}
//菜单新增
export function add(data:any) {
  console.log(data);
  return $axios({
    url: 'api/menus/',
    method: 'post',
    data
  })
}
//菜单删除
export function del(id:Number) {
  return $axios({
    url: 'api/menus/' + id + '/',
    method: 'delete'
  })
}
//菜单编辑
export function edit(id:Number, data:any) {
  return $axios({
    url: 'api/menus/' + id + '/',
    method: 'put',
    data
  })
}
//菜单编辑后更新
export function retrieve(id:Number) {
  return $axios({
    url: 'api/menus/' + id + '/',
    method: 'get'
  })
}
//菜单编辑后保存
export function save(id:Number, data:any) {
  return $axios({
    url: 'api/menus/' + id + '/',
    method: 'patch',
    data
  })
}

//仓库拣货
import $axios from '../utils/axios'
//拣货类型图形视图
export function pickist() {
    return $axios({
      url: '/api/pickingtype/list/',
      method: 'get'
    })
}
//拣货入库列表
export function picktype(picking_type,page,size) {
    return $axios({
      url: '/api/picking/'+picking_type+'/list/?page='+page+'&page_size='+size,
      method: 'get'
    })
}
//查询
export function search(picking_type,search) {
    return $axios({
      url: '/api/picking/'+picking_type+'/list/?search='+search,
      method: 'get'
    })
}
//拣货入库单详情
export function pickid(id) {
    return $axios({
      url: '/api/picking/'+  id,
      method: 'get'
    })
}
// 获取仓库列表
export function wareList(id) {
  return $axios({
    url: '/api/warehouse/list',
    method: 'get'
  })
}
// 部分更新
export function save(id,data) {
  return $axios({
    url: '/api/picking/'+  id+'/',
    method: 'patch',
    data
  })
}
//申请人
export function userlist(id) {
  return $axios({
    url: '/api/user/list/',
    method: 'get'
  })
}
//类型
export function typelist(id) {
  return $axios({
    url: '/api/pickingtypeinfo/list/',
    method: 'get'
  })
}
//检查  
export function check(data) {
  return $axios({
    url: '/api/pickings/action-check/',
    method: 'post',
    data
  })
}
//提交 
export function commit(data) {
  return $axios({
    url: '/api/pickings/action-commit/',
    method: 'post',
    data
  })
} 
//撤销
export function reserved(data) {
  return $axios({
    url: '/api/pickings/action-reserved/',
    method: 'post',
    data
  })
}
//状态筛选
export function state(id: string) {
  return $axios({
    url: '/api/pickings/state/list/',
    method: 'get'
  })
}

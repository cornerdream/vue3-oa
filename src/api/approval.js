//审批管理
import $axios from '@/utils/axios'
// 获取当前用户的所有任务
export const sworkflowtask=(search, ordering, page, size) => {
  return $axios({
    url:
      '/api/user/workflowtask?search=' +
      search +
      '&ordering=' +
      ordering +
      '&page=' +
      page +
      '&size=' +
      size,
    method: 'get'
  })
}
//获取某个审批任务单据详情
export const worflowre=(types, req) => {
  return $axios({
    url: '/api/worflowreq/?type_id=' + types + '&req_id=' + req,
    method: 'get'
  })
}
//审批当前任务
export const approve=(data) => {
  return $axios({
    url: '/api/user/workflowtask/approve',
    method: 'post',
    data
  })
}
//获取当前用户的已审批任务
export const approved=(search, ordering, page, size) => {
  return $axios({
    url:
      '/api/user/workflowtask/approved?search=' +
      search +
      '&ordering=_' +
      ordering +
      '&page=' +
      page +
      '&size=' +
      size,
    method: 'get'
  })
}
//获取当前用户的待审批任务
export const approving=(search, ordering, page, size) =>{
  return $axios({
    url:
      '/api/user/workflowtask/approving?search=' +
      search +
      '&ordering=_' +
      ordering +
      '&page=' +
      page +
      '&size=' +
      size,
    method: 'get'
  })
}
//获取当前用户的已拒绝任务
export const denyed=(search, ordering, page, size) => {
  return $axios({
    url:
      '/api/user/workflowtask/denyed?search=' +
      search +
      '&ordering=_' +
      ordering +
      '&page=' +
      page +
      '&size=' +
      size,
    method: 'get'
  })
}

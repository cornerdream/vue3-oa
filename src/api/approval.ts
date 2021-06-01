//审批管理
import $axios from '../utils/axios'
// 获取当前用户的所有任务
export function sworkflowtask(search: string, ordering: string, page: string, size: string) {
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
export function worflowre(types: string, req: string) {
  return $axios({
    url: '/api/worflowreq/?type_id=' + types + '&req_id=' + req,
    method: 'get'
  })
}
//审批当前任务
export function approve(data: any) {
  return $axios({
    url: '/api/user/workflowtask/approve',
    method: 'post',
    data
  })
}
//获取当前用户的已审批任务
export function approved(search: string, ordering: string, page: string, size: string) {
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
export function approving(search: string, ordering: string, page: string, size: string) {
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
export function denyed(search: string, ordering: string, page: string, size: string) {
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

//审批管理
import $axios from '@/utils/axios'
import qs from 'qs'
// 获取当前用户的所有任务
export const sworkflowtask=(params) => {
  return $axios({
    url:
      '/api/user/workflowtask',
    method: 'get',
    params
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
    data: qs.stringify(data)
  })
}
//获取当前用户的已审批任务
export const approved=(params) => {
  return $axios({
    url:
      '/api/user/workflowtask/approved',
    method: 'get',
    params
  })
}
//获取当前用户的待审批任务
export const approving=(params) =>{
  return $axios({
    url:
      '/api/user/workflowtask/approving',
    method: 'get',
    params
  })
}
//获取当前用户的已拒绝任务
export const denyed=(params) => {
  return $axios({
    url:
      '/api/user/workflowtask/denyed',
    method: 'get',
    params
  })
}

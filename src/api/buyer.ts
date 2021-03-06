//采购员订单
import $axios from '../utils/axios'
//采购员订单列表
export function buyerlist() {
    return $axios({
      url: '/api/orders/buyer/list/',
      method: 'get'
    })
}
///api/orders/{id}/采购员订单详情
export function buyerid(id: string) {
    return $axios({
      url: '/api/orders/'+  id,
      method: 'get'
    })
}
// 询价 订单提交进入询价
export function sent(id: string) {
    return $axios({
      url: '/api/orders/'+id+'/sent/',
      method: 'patch'
    })
} 
//提交 订单提交审批流
export function submit(id: string) {
    return $axios({
      url: '/api/orders/'+id+'/commit/',
      method: 'patch'
    })
}
//保存 部分更新订单管理信息
export function save(id: string,data: any) {
    return $axios({
      url: '/api/order/'+  id+'/',
      method: 'patch',
      data
    })
}
//撤销审批流程
export function roolback(id: string) {
    return $axios({
      url: '/api/orders/'+  id+'/roolback/',
      method: 'patch'
    })
}
//撤销询价流程
export function draft(id: string) {
    return $axios({
      url: '/api/orders/'+  id+'/draft/',
      method: 'patch'
    })
}
//提交审批流程
export function roolcommit(id: string) {
    return $axios({
      url: '/api/orders/'+  id+'/commit/',
      method: 'patch'
    })
}
//供应商列表
export function supplierList() {
    return $axios({
      url: '/api/supplier/list',
      method: 'get'
    })
}
//项目列表
export function projectList() {
    return $axios({
      url: '/api/project/list',
      method: 'get'
    })
}
//部门列表
export function departmentList() {
    return $axios({
      url: '/api/organization/user/tree/',
      method: 'get'
    })
  }
// 产品名称列表
export function infoList() {
  return $axios({
    url: '/api/skus/info/list',
    method: 'get'
  })
}
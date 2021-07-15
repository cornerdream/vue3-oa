import $axios from '@/utils/axios'
import qs from 'qs'
// 获取帮助文档分类
export const getHelptype=() =>{
    return $axios({
      url: '/api/user/helptype/',
      method: 'get'
    })
  }
// 获取帮助文档详情
export const getHelpdoc=(params) =>{
    return $axios({
      url: '/api/user/helpdoc/?id='+params,
      method: 'get',
    })
  }
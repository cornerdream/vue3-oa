//仓库拣货
import $axios from '../utils/axios'
//拣货类型图形视图
export function pickist() {
    return $axios({
      url: '/api/pickingtype/list/',
      method: 'get'
    })
}
///api/picking/{picking_type}/list/拣货入库列表视图
export function picktype(picking_type: string) {
    return $axios({
      url: '/api/picking/'+picking_type+'/list/',
      method: 'get'
    })
}
///api/picking/{id}/拣货入库单详情视图
export function pickid(id: string) {
    return $axios({
      url: '/api/picking/'+  id,
      method: 'get'
    })
}
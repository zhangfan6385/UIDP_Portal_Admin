
import request from '@/frame_src/utils/request'

export function fetchApplyPlatList(query) {
  return request({
    url: '/apply/fetchApplyPlatList',
    method: 'get',
    params: query
  })
}
export function fetchApplyComponentList(query) {
  return request({
    url: '/apply/fetchApplyComponentList',
    method: 'get',
    params: query
  })
}
export function fetchApplyServiceList(query) {
  return request({
    url: '/apply/fetchApplyServiceList',
    method: 'get',
    params: query
  })
}
export function examineApplyData(data) {//审核
  return request({
    url: '/apply/examineApplyData',
    method: 'post',
    data
  })
}
export function updateApplyArticle(data) { // -删除
  return request({
    url: '/apply/updateApplyArticle',
    method: 'post',
    data
  })
}

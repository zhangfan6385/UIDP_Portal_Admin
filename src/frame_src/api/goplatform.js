import request from '@/frame_src/utils/request'
export function fetchGoPlatformList(query) { // 公告查询
  return request({
    url: '/platform/fetchPlatformList',
    method: 'get',
    params: query
  })
}
export function createGoPlatformArticle(data) { // 创建公告主表信息
  return request({
    url: '/platform/createPlatformArticle',
    method: 'post',
    data
  })
}
export function updateGoPlatformData(data) { // 修改公告主表信息
  return request({
    url: '/platform/updatePlatformData',
    method: 'post',
    data
  })
}
export function updateGoPlatformArticle(data) { // -删除
  return request({
    url: '/platform/updatePlatformArticle',
    method: 'post',
    params: data
  })
}

import request from '@/frame_src/utils/request'
export function fetchCommunityList(query) { // 公告查询
  return request({
    url: '/community/fetchCommunityList',
    method: 'get',
    params: query
  })
}
export function createCommunityArticle(data) { // 创建公告主表信息
  return request({
    url: '/community/createCommunityArticle',
    method: 'post',
    data
  })
}
export function updateCommunityData(data) { // 修改公告主表信息
  return request({
    url: '/community/updateCommunityData',
    method: 'post',
    data
  })
}
export function updateCommunityArticle(data) { // -删除
  return request({
    url: '/community/updateCommunityArticle',
    method: 'post',
    params: data
  })
}
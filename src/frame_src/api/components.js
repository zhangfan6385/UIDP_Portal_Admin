import request from '@/frame_src/utils/request'
export function fetchComponentsList(query) { // 公告查询
  return request({
    url: '/components/fetchComponentsList',
    method: 'get',
    params: query
  })
}
export function createComponentsArticle(data) { // 创建公告主表信息
  return request({
    url: '/components/createComponentsArticle',
    method: 'post',
    data
  })
}
export function updateComponentsData(data) { // 修改公告主表信息
  return request({
    url: '/components/updateComponentsData',
    method: 'post',
    data
  })
}
export function updateComponentsArticle(data) { // -删除
  return request({
    url: '/components/updateComponentsArticle',
    method: 'post',
    params: data
  })
}
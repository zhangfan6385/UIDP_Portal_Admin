
import request from '@/frame_src/utils/request'
export function fetchPlatformList(query) { // 公告查询
  return request({
    url: '/platform/fetchPlatformList',
    method: 'get',
    params: query
  })
}
export function createPlatformArticle(data) { // 创建公告主表信息
  return request({
    url: '/platform/createPlatformArticle',
    method: 'post',
    data
  })
}
export function updatePlatformData(data) { // 修改公告主表信息
  return request({
    url: '/platform/updatePlatformData',
    method: 'post',
    data
  })
}
export function updatePlatformArticle(data) { // -删除
  return request({
    url: '/platform/updatePlatformArticle',
    method: 'post',
    data
  })
}

export function fetchPlatDetailList(query) { 
  return request({
    url: '/platdetail/fetchPlatDetailList',
    method: 'get',
    params: query
  })
}


export function createPlatDetailArticle(data) { 
  return request({
    url: '/platdetail/createPlatDetailArticle',
    method: 'post',
    data
  })
}

export function updatePlatDetailArticle(data) {
  return request({
    url: '/platdetail/updatePlatDetailArticle',
    method: 'post',
    data
  })
}


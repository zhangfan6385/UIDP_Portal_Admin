import request from '@/frame_src/utils/request'
export function fetchServiceList(query) { // 公告查询
  return request({
    url: '/service/fetchServiceList',
    method: 'get',
    params: query
  })
}
export function createServiceArticle(data) { // 创建公告主表信息
  return request({
    url: '/service/createServiceArticle',
    method: 'post',
    data
  })
}
export function updateServiceData(data) { // 修改公告主表信息
  return request({
    url: '/service/updateServiceData',
    method: 'post',
    data
  })
}
export function updateServiceArticle(data) { // -删除
  return request({
    url: '/service/updateServiceArticle',
    method: 'post',
    params: data
  })
}
  export function fetchServiceDetailList(query) { 
    return request({
      url: '/servicedetail/fetchServiceDetailList',
      method: 'get',
      params: query
    })
  }
  
  
  export function createServiceDetailArticle(data) { 
    return request({
      url: '/servicedetail/createServiceDetailArticle',
      method: 'post',
      data
    })
  }
  
  export function updateServiceDetailArticle(data) {
    return request({
      url: '/servicedetail/updateServiceDetailArticle',
      method: 'post',
      data
    })
  
}
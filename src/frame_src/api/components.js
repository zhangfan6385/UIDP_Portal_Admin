import request from '@/frame_src/utils/request'
export function fetchComponentList(query) { // 公告查询
  return request({
    url: '/component/fetchComponentList',
    method: 'get',
    params: query
  })
}
export function createComponentArticle(data) { // 创建公告主表信息
  return request({
    url: '/component/createComponentArticle',
    method: 'post',
    data
  })
}
export function updateComponentData(data) { // 修改公告主表信息
  return request({
    url: '/component/updateComponentData',
    method: 'post',
    data
  })
}
export function updateComponentArticle(data) { // -删除
  return request({
    url: '/component/updateComponentArticle',
    method: 'post',
    data
  })
}

  export function fetchComponentDetailList(query) { 
    return request({
      url: '/componentdetail/fetchComponentDetailList',
      method: 'get',
      params: query
    })
  }
  
  
  export function createComponentDetailArticle(data) { 
    return request({
      url: '/componentdetail/createComponentDetailArticle',
      method: 'post',
      data
    })
  }
  
  export function updateComponentDetailArticle(data) {
    return request({
      url: '/componentdetail/updateComponentDetailArticle',
      method: 'post',
      data
    })
  
}
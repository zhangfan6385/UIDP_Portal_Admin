import request from '@/frame_src/utils/request'
export function fetchProjectList(query) { // 公告查询
  return request({
    url: '/project/fetchProjectList',
    method: 'get',
    params: query
  })
}
export function createprojectArticle(data) { // 创建公告主表信息
  return request({
    url: '/project/createProjectArticle',
    method: 'post',
    data
  })
}
export function updateprojectData(data) { // 修改公告主表信息
  return request({
    url: '/project/updateProjectData',
    method: 'post',
    data
  })
}
export function updateprojectArticle(data) { // -删除
  return request({
    url: '/project/updateProjectArticle',
    method: 'post',
    params: data
  })
}
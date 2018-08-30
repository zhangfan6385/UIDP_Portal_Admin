import request from '@/frame_src/utils/request'
export function fetchProjectList(query) { // 项目信息查询
  return request({
    url: '/project/fetchProjectList',
    method: 'get',
    params: query
  })
}
export function createProjectArticle(data) { // 创建项目信息
  return request({
    url: '/project/createProjectArticle',
    method: 'post',
    data
  })
}
export function updateProjectData(data) { // 修改项目信息
  return request({
    url: '/project/updateProjectData',
    method: 'post',
    data
  })
}
export function updateProjectArticle(data) { // -删除
  return request({
    url: '/project/updateProjectArticle',
    method: 'post',
    data
  })
}
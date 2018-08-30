
import request from '@/frame_src/utils/request'
export function fetchScoreConfigList(query) { // 积分配置查询
  return request({
    url: '/scoreconfig/fetchScoreConfigList',
    method: 'get',
    params: query
  })
}
export function createScoreConfigArticle(data) { // 创建积分配置
  return request({
    url: '/scoreconfig/createScoreConfigArticle',
    method: 'post',
    data
  })
}
export function updateScoreConfigData(data) { // 修改积分配置
  return request({
    url: '/scoreconfig/updateScoreConfigData',
    method: 'post',
    data
  })
}
export function updateScoreConfigArticle(data) { // 删除积分配置
  return request({
    url: '/scoreconfig/updateScoreConfigArticle',
    method: 'post',
    data
  })
}


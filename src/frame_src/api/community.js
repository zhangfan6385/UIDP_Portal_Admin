
import request from '@/frame_src/utils/request'
export function getCommunityPostList(query) { // 查询
  return request({
    url: '/community/getCommunityPostList',
    method: 'get',
    params: query
  })
}


export function deletePost(data) { // 删除
  return request({
    url: '/community/deletePost',
    method: 'post',
    data
  })
}

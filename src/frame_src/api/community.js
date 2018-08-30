
import request from '@/frame_src/utils/request'
export function getCommunityPostList(query) { // 公告查询
  return request({
    url: '/community/getCommunityPostList',
    method: 'get',
    params: query
  })
}

import request from '@/frame_src/utils/request'


export function GetTitle(query) { //查询登录标题
  return request({
    url: 'Conf/loginConfig',
    //url:'title/gettitle',
    method: 'get',
    params:query
  })
}
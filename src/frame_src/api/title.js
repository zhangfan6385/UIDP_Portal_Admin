import request from '@/frame_src/utils/request'


export function GetTitle(query) { //查询登录标题
  return request({
    url: 'Conf/loginConfig',
    //url:'title/gettitle',
    method: 'get',
    params:query
  })
}

export function GetColor(query) { //查询配置颜色
  return request({
    url: 'Conf/getColor?CONF_CODE=%27COLOR%27',
    method: 'get',
    params:query
  })
}
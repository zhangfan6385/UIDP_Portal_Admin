import Mock from 'mockjs'
import { param2Obj } from '@/frame_src/utils'

const List = []
const count = 5 

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({ 

    NOTICE_ID: Mock.Random.integer(100000000, 10000000002),
    NOTICE_CODE:Mock.Random.integer(100000000, 10000000002),
    NOTICE_TITLE:Mock.Random.integer(0, 1),
    NOTICE_CONTENT:Mock.Random.integer(0, 1),
    NOTICE_ORGID: '192.168.2.'+'@increment',
    NOTICE_ORGNAME:'https//'+'@increment',
    NOTICE_DATETIME:'2018-01-11',
    NOTICE_CREATEBY:'' 
  }))
}
export default {
  fetchNoticeList: config => {
    const { NOTICE_CODE,NOTICE_TITLE, page = 1, limit = 20 } = param2Obj(config.url)

    const mockList = List.filter(item => {
      if (NOTICE_CODE.length>0 && item.NOTICE_CODE.indexOf(NOTICE_CODE) < 0&&NOTICE_TITLE.length>0  && item.NOTICE_TITLE.indexOf(NOTICE_TITLE) < 0)
      return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList,
      code: 2000,
      message: '查询成功'
    }
  }, getUpdateConfigArticle: config => {
    const { field, CONF_CODE } = param2Obj(config.url)
    if (field === 'deletaStatus') {
      return {
        bb: CONF_CODE,
        code: 2000,
        message: '刪除成功'
      }
    }
  },
  getCreateConfigArticle: () => ({
    code: 2000,
    message: '创建成功'
  }),
  getUpdateConfigData: () => ({
    code: 2000,
    message: '修改成功'
  })
}
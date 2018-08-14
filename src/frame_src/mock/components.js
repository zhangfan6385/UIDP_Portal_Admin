import Mock from 'mockjs'
import { param2Obj } from '@/frame_src/utils'

const List = []
const count = 5 

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({ 

        PLAT_ID: Mock.Random.integer(100000000, 10000000002),
        PLAT_CODE:Mock.Random.integer(100000000, 10000000002),
        PLAT_VERSION:Mock.Random.integer(0, 1),
        PLAT_PUBLISHDATE:Mock.Random.integer(0, 1),
        PLAT_RUNREQUIRE: '192.168.2.'+'@increment',
        PLAT_CREATEBY:'https//'+'@increment',
        PLAT_CREATEDATE:'2018-01-11',
        PLAT_CREATEORGID:'' ,
        PLAT_CREATEORGNAME:'' ,
        PLAT_TYPE:'' ,
        PLAT_ROLEID:'' 
  }))
}
export default {
  fetchComponentsList: config => {
    const { PLATFROM_CODE,PLATFROM_TITLE, page = 1, limit = 20 } = param2Obj(config.url)

    const mockList = List.filter(item => {
      if (PLATFROM_CODE.length>0 && item.PLATFROM_CODE.indexOf(PLATFROM_CODE) < 0)
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
  }, getUpdatePlatfromArticle: config => {
    const { field, CONF_CODE } = param2Obj(config.url)
    if (field === 'deletaStatus') {
      return {
        bb: CONF_CODE,
        code: 2000,
        message: '刪除成功'
      }
    }
  },
  getCreatePlatfromArticle: () => ({
    code: 2000,
    message: '创建成功'
  }),
  getUpdatePlatfromData: () => ({
    code: 2000,
    message: '修改成功'
  })
}
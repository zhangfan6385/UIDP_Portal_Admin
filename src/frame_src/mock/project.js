import Mock from 'mockjs'
import { param2Obj } from '@/frame_src/utils'

const List = []
const count = 5

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        PROJECT_ID: Mock.Random.integer(100000000, 10000000002),
        PROJECT_CODE: Mock.Random.integer(100000000, 10000000002),
        PROJECT_NAME: Mock.Random.integer(100000000, 10000000002),
        PROJECT_PARTYA: Mock.Random.integer(100000000, 10000000002),
        PROJECT_PARTYB: Mock.Random.integer(100000000, 10000000002),
        PROJECT_AMOUNT: Mock.Random.integer(100000000, 10000000002),
        PROJECT_FORM:Mock.Random.integer(100000000, 10000000002),
        PROJECT_SETDATE: '2018-01-11',
        PROJECT_CONTRACTDATE:'2018-01-11',
        PROJECT_CHECKDATE: '2018-01-11',
        PROJECT_URL: 'https//' + '@increment',
        PROJECT_ISONLINE: "是"
    }))
}
export default {
    fetchProjectList: config => {
        const { PROJECT_CODE, PROJECT_NAME, page = 1, limit = 20 } = param2Obj(config.url)

        const mockList = List.filter(item => {
            if (PROJECT_CODE.length > 0 && item.PROJECT_CODE.indexOf(PROJECT_CODE) < 0 && PROJECT_NAME.length > 0 && item.PROJECT_NAME.indexOf(PROJECT_NAME) < 0)
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
    }, getUpdateProjectArticle: config => {
        const { field, CONF_CODE } = param2Obj(config.url)
        if (field === 'deletaStatus') {
            return {
                bb: CONF_CODE,
                code: 2000,
                message: '刪除成功'
            }
        }
    },
    getCreateProjectArticle: () => ({
        code: 2000,
        message: '创建成功'
    }),
    getUpdateProjectData: () => ({
        code: 2000,
        message: '修改成功'
    })
}
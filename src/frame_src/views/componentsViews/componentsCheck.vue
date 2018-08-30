<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-input style="width: 200px;" class="filter-item" placeholder="申请项目" v-model="listQuery.PROJECT_NAME"></el-input>
            <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('commonTable.search')}}</el-button>
        </div>
        <el-card class="box-card">
            <el-table :key='tableKey'  :data="list" :header-cell-class-name="tableRowClassName" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
                <el-table-column width="150px" align="center" label="申请单位">
                    <template slot-scope="scope">
                        <span>{{scope.row.APPLY_ORG_NAME}}</span>
                    </template>
                </el-table-column>

                <el-table-column width="150px" align="center" label="项目名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.PROJECT_NAME}}</span>
                    </template>
                </el-table-column>

                <el-table-column width="100px" align="center" label="用途类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.APPLY_TYPE}}</span>
                    </template>
                </el-table-column>

                <el-table-column width="200px" align="center" label="用途说明">
                    <template slot-scope="scope">
                        <span>{{scope.row.USE_CONTENT}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="联系人">
                    <template slot-scope="scope">
                        <span>{{scope.row.APPLY_LINKMAN}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="联系电话">
                    <template slot-scope="scope">
                        <span>{{scope.row.APPLY_PHONE}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="审核状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.CHECK_STATE}}</span>
                    </template>
                </el-table-column>
                <el-table-column min-width="140px" align="center" label="审核原因">
                    <template slot-scope="scope">
                        <span>{{scope.row.CHECK_CONTENT}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="审核人">
                    <template slot-scope="scope">
                        <span>{{scope.row.CHECK_PERSON_NAME}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="审核时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.CHECK_DATE}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" fixed="right" label="操作" width="220">
                    <template slot-scope="scope">
                        <el-button type="primary" v-if="scope.row.CHECK_STATE=='0'"  size="mini" @click="handleCheck(scope.row)">{{$t('commonTable.check')}}</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">{{$t('commonTable.delete')}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <!--添加或者修改-->
        <el-dialog :visible.sync="editVisible" title="审核窗口" width="500px">
            <el-card>
                <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="120px" style='width: 94%; margin-left:6%;'>
                        <el-form-item label="审核状态：" prop="CHECK_STATE" label-width="90px">
                        <el-radio class="radio" v-model="temp.CHECK_STATE" :label="1">通过</el-radio>
                        <el-radio class="radio" v-model="temp.CHECK_STATE" :label="2">驳回</el-radio>
                    </el-form-item>
                    <el-form-item label="审核原因：" prop="CHECK_CONTENT" label-width="90px">
                        <el-input type="textarea" :rows="4" v-model="temp.CHECK_CONTENT"></el-input>
                    </el-form-item>
                </el-form>
                <div style="text-align:center">
                    <el-button @click="editVisible = false">{{$t('userTable.cancel')}}</el-button>
                    <!-- <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('commonTable.save')}}</el-button>
                    <el-button v-else type="primary" @click="updateData">{{$t('commonTable.save')}}</el-button> -->
                    <el-button type="primary" @click="updateData">{{$t('commonTable.save')}}</el-button>
                </div>
            </el-card>
        </el-dialog>
    </div>

</template>
<script>
import {
    fetchApplyComponentList,
    examineApplyData,
    updateApplyArticle
} from "@/frame_src/api/apply";
import waves from "@/frame_src/directive/waves"; // 水波纹指令
// import { parseTime } from '@/frame_src/utils'
import { getToken } from "@/frame_src/utils/auth";
export default {
    name: "platformCheck",
    directives: {
        waves
    },
    data() {
        return {
            platName:"",
            projectName:"",
            managetel:"暂无电话",
            tableKey: 0,
            list: null,
            total: null,
            listLoading: true,
            listQuery: {
                page: 1,
                limit: 10,
                PROJECT_NAME: "",
                APPLY_ORG_NAME:""
            },

            temp: {
                APPLY_ID:"",
                CHECK_STATE: "",
                CHECK_CONTENT: "",
                CHECK_PERSON_ID: "",
                CHECK_PERSON_NAME: ""
            },
             record: {
                USER_ID: "",
                RECORD_TITLE: "",
                RECORD_CONTENT: "",
                ORG_ID: "",
                PROJECT_ID:"",
                APPLY_ID:"",
                CREATER:""
            },
            editVisible: false,
            rules: {
                FLAG: [
                    {
                        required: true,
                        message: "FLAG is required",
                        trigger: "change"
                    }
                ]
            },
            //dialogStatus: "",
        };
    },
    methods: {
        getList() {
            this.listLoading = true;
            fetchApplyComponentList(this.listQuery).then(response => {
                if (response.data.code === 2000) {
                    this.list = response.data.items;
                    this.total = response.data.total;
                    this.listLoading = false;
                } else {
                    this.listLoading = false;
                    this.$notify({
                        position: "bottom-right",
                        title: "失败",
                        message: response.data.message,
                        type: "error",
                        duration: 2000
                    });
                }
            });
        },

        handleCheck(row) {
            this.editVisible = true;
            this.record.PROJECT_ID=row.PROJECT_ID
            this.temp.CHECK_PERSON_ID=this.$store.state.user.userId
            this.temp.CHECK_PERSON_NAME=this.$store.state.user.name
            this.temp.PLAT_VERSION=row.PLAT_VERSION
            this.platName=row.COMPONENT_NAME+"("+row.COMPONENT_CODE+")"
            this.projectName=row.PROJECT_NAME
            this.temp.APPLY_ID=row.APPLY_ID
            this.record.APPLY_ID=row.APPLY_ID
            if(row.MANAGE_TEL!=""&&row.MANAGE_TEL!=null){this.managetel=row.MANAGE_TEL}
        },
      
        handleDelete(row) {
               const query = { APPLY_ID: row.APPLY_ID }
                updateApplyArticle(query).then(response => {
                this.message = response.data.message
                this.title = '失败'
                this.type = 'error'
                if (response.data.code === 2000) {
                // const index = this.list.indexOf(row)
                // this.list.splice(index, 1)
                this.getList()
                this.title = '成功'
                this.type = 'success'
                }
                this.$notify({   position: 'bottom-right',
                title: this.title,
                message: this.message,
                type: this.type,
                duration: 2000
                })
            })
        },
        updateData(){
        var result="";
        if(this.temp.CHECK_STATE=="1"){
            result="审核通过！"
        }
        else if(this.temp.CHECK_STATE=="2"){
            result="审核未通过，"+this.temp.CHECK_CONTENT+"如有问题请联系管理员,联系电话："+this.managetel
        }
        this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp) // 这样就不会共用同一个对象
          const postData=[]
          this.record.USER_ID=this.$store.state.user.userId
          this.record.RECORD_TITLE=this.platName+"使用申请"
          this.record.RECORD_CONTENT=`
          <table border="0" cellspacing="0" cellpadding="0" style="font-family:"微软雅黑",Helvetica,Arial,sans-serif;font-size:14px " width="100%">
            <tbody>
                <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;">
                        <table width="100%" border="0" cellpadding="5" cellspacing="0" >
                            <tbody>
                                <tr>
                                    <td>
                                        <p style="margin:0;font-size:14px;line-height:24px;font-family:"微软雅黑",Helvetica,Arial,sans-serif;margin-bottom: 20px"><br>尊敬的开发者：<br>
                                        </p>
                                        <p style="color:#000;margin:0;font-size:14px;line-height:24px;font-family:"微软雅黑",Helvetica,Arial,sans-serif;"><br>
                                        
                                        您在`+this.projectName+`项目申请的`+this.platName+result+`</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>                                                          
                   </td>
              </tr>
            </tbody>
         </table>`
          this.record.ORG_ID=this.$store.state.user.departId
          this.record.CREATER=this.$store.state.user.name
          postData.push(tempData)
          postData.push(this.record)
          //tempData.NOTICE_CONTENT=this.content
          examineApplyData(postData).then(response => {
            var message = response.data.message
            var title = '失败'
            var type = 'error'
            if (response.data.code === 2000) {
              this.getList()
              title = '成功'
              type = 'success'
              // for (const v of this.list) {
              //   if (v.CONF_CODE === this.temp.CONF_CODE) {
              //     const index = this.list.indexOf(v)
              //     this.list.splice(index, 1, this.temp)
              //     break
              //   }
              // }
            }
            this.editVisible = false
            this.$notify({   position: 'bottom-right',
              title: title,
              message: message,
              type: type,
              duration: 2000
            })
          })
        }
      })
        },
        handleSizeChange(val) {
            this.listQuery.limit = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getList();
        },
        handleFilter() {
            this.listQuery.page = 1;
            this.getList();
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex === 0) {
                return "el-button--primary is-active"; // 'warning-row'
            } // 'el-button--primary is-plain'// 'warning-row'
            return "";
        },
    },
    created() {
        this.listLoading = false;
        this.getList();
    },
    computed: {
        getRoleLevel() {
            if (this.$store.state.user.roleLevel === "admin") {
                return true;
            } else {
                return false;
            }
        },
        headers() {
            return {
                "X-Token": getToken()
            };
        }
    }
};
</script>
<style lang="scss" >
.el-dialog__header{
    padding: 10px;
}
.el-dialog__body{
    padding: 10px;
}
 .pagination-container{
     margin-top: 3px;
 }
</style>
<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">

            <el-input style="width: 200px;" class="filter-item" placeholder="请输入服务编号" v-model="listQuery.SERVICE_CODE"></el-input>
            <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('commonTable.search')}}</el-button>

            <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('commonTable.add')}}</el-button>
        </div>
 <el-card class="box-card">
            <el-table :key='tableKey' :data="list" :header-cell-class-name="tableRowClassName" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%;text-align:left;">
                <el-table-column width="100" header-align="center" :label="$t('serviceTable.service_code')" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{scope.row.SERVICE_CODE}}</span>
                    </template>
                </el-table-column>

                <el-table-column width="150" header-align="center" :label="$t('serviceTable.service_name')" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{scope.row.SERVICE_NAME}}</span>
                    </template>
                </el-table-column>

                <el-table-column width="120" header-align="center"  :label="$t('serviceTable.service_publishdate')" prop="SERVICE_PUBLISHDATE" :formatter="dateFormat" :show-overflow-tooltip="true">
                    <!-- <template slot-scope="scope">
                        <span>{{scope.row.PLAT_PUBLISHDATE}}</span>
                    </template> -->
                </el-table-column>
                <el-table-column width="120" header-align="center" :label="$t('serviceTable.service_url')" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{scope.row.SERVICE_URL}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="120" header-align="center" :label="$t('serviceTable.original_url')" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{scope.row.ORIGINAL_URL}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="100" header-align="center" :label="$t('serviceTable.data_format')" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{scope.row.DATA_FORMAT}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column width="100px" align="center"  :label="$t('platformTable.plat_type')">
                    <template slot-scope="scope">
                        <span>{{scope.row.PLAT_TYPE}}</span>
                    </template>
                </el-table-column> -->
                 <el-table-column width="100" header-align="center" :label="$t('serviceTable.manage_org_name')" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{scope.row.MANAGE_ORG_NAME}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="100" header-align="center"  :label="$t('serviceTable.manage_tel')" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{scope.row.MANAGE_TEL}}</span>
                    </template>
                </el-table-column> 
                <el-table-column width="100" header-align="center" :label="$t('serviceTable.creater')" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{scope.row.CREATER}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column width="160px" align="center" :label="$t('serviceTable.create_date')" prop="CREATE_DATE" :formatter="dateFormat" :show-overflow-tooltip="true">
                </el-table-column> -->
               
 <el-table-column
      align="center"
      fixed="right"
      label="操作"
      width="240">
      <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('commonTable.edit')}}</el-button>
            <el-button type="primary"  size="mini" @click="handleUpload(scope.row)">{{$t('commonTable.upload')}}</el-button>
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
        <el-dialog :visible.sync="editVisible" :title="textMap[dialogStatus]" width="700px">
            <el-card>
                <el-form :rules="rules" ref="dataForm" :model="temp" label-position="center" label-width="120px" style='width: 99%; '>
                      <el-row>
                        <el-col :span="12">
                             <el-form-item label="服务编号：" prop="SERVICE_CODE">
                        <el-input v-model="temp.SERVICE_CODE"></el-input>
                    </el-form-item>
                        </el-col>
                         <el-col :span="12">
                             <el-form-item label="服务名称：" prop="SERVICE_NAME">
                        <el-input v-model="temp.SERVICE_NAME"></el-input>
                    </el-form-item>
                         </el-col>
                      </el-row>
                       <el-row>
                        <el-col :span="12">
                            <el-form-item label="请求方式：" prop="REQUEST_METHOD">
                        <el-input v-model="temp.REQUEST_METHOD"></el-input>
                    </el-form-item>
                        </el-col>
                         <el-col :span="12">
                    <el-form-item label="发布日期：" prop="SERVICE_PUBLISHDATE">
                            <el-date-picker type="date" placeholder="选择日期" v-model="temp.SERVICE_PUBLISHDATE" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                         </el-col>
                      </el-row>
                         <el-row>
                        <el-col :span="24">
                            <el-form-item label="服务地址：" prop="SERVICE_URL">
                        <el-input v-model="temp.SERVICE_URL"></el-input>
                    </el-form-item>
                        </el-col>
                        
                      </el-row>
                        <el-row>
                             <el-col :span="24">
                    <el-form-item label="原始地址：" prop="ORIGINAL_URL">
                        <el-input v-model="temp.ORIGINAL_URL"></el-input>
                    </el-form-item>
                         </el-col>
                        </el-row>
                         <el-row>
                        <el-col :span="12">
                             <el-form-item label="数据格式：" prop="DATA_FORMAT">
                        <el-input v-model="temp.DATA_FORMAT"></el-input>
                    </el-form-item>
                        </el-col>
                         <el-col :span="12">
                                <el-form-item label="调用次数：" prop="SERVICE_TIMES">
                        <el-input v-model="temp.SERVICE_TIMES"></el-input>
                    </el-form-item>
                         </el-col>
                      </el-row>
                         <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$t('platformTable.manage_org_name')+':'" >
                                <!-- <el-select-tree v-model="temp.MANAGE_ORG_ID" :treeData.sync="menuSelectATree" :propNames="defaultProps" clearable
                                  style="width: 100%;" >
                                </el-select-tree> -->
 <treeselect  
 v-model="temp.MANAGE_ORG_ID" 
 :multiple="false" 
 :options="menuSelectATree" 
 :normalizer="normalizer"
 :disable-branch-nodes="false"
  placeholder="管理部门"
  noResultsText="未搜索到结果"
/>
                            </el-form-item>
                        </el-col>
                         <el-col :span="12">
                            <el-form-item label="管理部门电话：" prop="MANAGE_TEL">
                        <el-input v-model="temp.MANAGE_TEL"></el-input>
                    </el-form-item>
                         </el-col>
                      </el-row>
                         <el-row>
                        <el-col :span="24">
                              <el-form-item label="平台运行需求：" prop="SERVICE_CONTENT">
                        <el-input v-model="temp.SERVICE_CONTENT" type="textarea" :rows="5"></el-input>
                    </el-form-item>
                        </el-col>

                      </el-row>
                </el-form>
                <div style="text-align:center">
                    <el-button @click="editVisible = false">{{$t('userTable.cancel')}}</el-button>
                    <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('commonTable.save')}}</el-button>
                    <el-button v-else type="primary" @click="updateData">{{$t('commonTable.save')}}</el-button>
                </div>
            </el-card>
        </el-dialog>


         <!--上传-->
        <el-dialog class="el-dialog__header" :visible.sync="uploadVisible" :title="$t('commonTable.upload')" width="950px">
            <el-form :rules="rules" ref="platdataForm" :model="temp" label-position="left" label-width="120px" style='width: 100%; height:400px'>
                <el-card style="height:100%">
                    <el-row style="height:100%">
                        <el-col :span="9" style="height:100%">
                            <el-form-item label="文件类型：" prop="FILE_TYPE"  size="small" label-width="90px" style="margin-right:10px">
                                <el-select v-model="tempFile.fileType" placeholder="请选择" style="width: 100%;">
                                    <el-option label="程序包" value="0"></el-option>
                                    <el-option label="文档" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="文件名称：" prop="FILE_NAME" label-width="90px" style="margin-right:10px">
                                <el-input v-model="tempFile.fileName" size="small"  style="width: 100%"></el-input>
                            </el-form-item>
                            <el-upload 
                            multiple
                            :action="urlUpload"
                            :data="filedata"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess"
                            :headers="headers"
                            class="upload-demo" 
                            ref="upload"
                            :auto-upload="false"
                            :file-list="fileList">
                                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                            </el-upload>
                        </el-col>
                        <el-col :span="15">
                            <el-table :data="listdetail" :header-cell-class-name="tableRowClassName" border max-height="320"  style="width: 100%;">
                                <el-table-column align="center" label="文件名称" prop="FILE_NAME">
                                <!-- <template slot-scope="scope">
                                    <span>{{scope.row.FILE_NAME}}</span>
                                </template> -->
                                </el-table-column>
                                <el-table-column  align="center" label="文件类型" prop="FILE_TYPE" :formatter="typeFormat">
                                    <!-- <template slot-scope="scope">
                                        <span>{{scope.row.FILE_TYPE}}</span>
                                    </template> -->
                                </el-table-column>
                                <el-table-column  align="center" label="文件大小" prop="FILE_SIZE">
                                    <!-- <template slot-scope="scope">
                                        <span>{{scope.row.FILE_SIZE}}</span>
                                    </template> -->
                                </el-table-column>
                                <el-table-column align="center" :label="$t('commonTable.actions')" width="80px" class-name="small-padding fixed-width">
                                    <template slot-scope="scope">
                                        <el-button type="danger" size="mini" @click="handleFileDelete(scope.row)">{{$t('commonTable.delete')}}</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
                            </el-pagination> -->
                        </el-col>
                    </el-row>
                </el-card>
            </el-form>
        </el-dialog>
    </div>

</template>

<script>
import panel from '@/frame_src/components/TreeList/panel.vue'
import selectTree from '@/frame_src/components/TreeList/selectTree.vue'
import treeter from '@/frame_src/components/TreeList/treeter'
import merge from 'element-ui/src/utils/merge'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import {
    fetchServiceList,
    createServiceArticle,
    updateServiceData,
    updateServiceArticle,
    fetchServiceDetailList,
    createServiceDetailArticle,
    updateServiceDetailArticle
} from "@/frame_src/api/service";
import waves from "@/frame_src/directive/waves"; // 水波纹指令
// import { parseTime } from '@/frame_src/utils'
import { getToken } from "@/frame_src/utils/auth";
import Moment from 'moment';
import {
    fetchPartyList
} from "@/frame_src/api/org";
export default {
    name: "serviceManager",
    directives: {
        waves
    },
    mixins: [treeter],
    components: {
      'imp-panel': panel,
      'el-select-tree': selectTree,
                    Treeselect
    },
    data() {
        return {
               normalizer(node) {
      return {
        id: node.id,
        label: node.ORG_SHORT_NAME,
        // children: node.children==null?[]:node.children,
        children: node.children
      }
    },
            tableKey: 0,
            list: null,
            total: null,
            listLoading: true,
            // listUpdate: {
            //     field: undefined,
            //     RESULT_ID: undefined
            // },
            fileList: [],
            defaultProps: {
                children: 'children',
                label: 'ORG_SHORT_NAME',
                id: 'id'
            },
            menuSelectATree: [],
            listQuery: {
                page: 1,
                limit: 10,
                SERVICE_CODE: "",
                SERVICE_NAME:"",
                MANAGE_ORG_CODE:this.$store.state.user.departCode==""?null:this.$store.state.user.departCode
            },
            listdetail: null,
            temp: {
                SERVICE_ID: "",
                SERVICE_CODE: "",
                SERVICE_NAME: "",
                SERVICE_PUBLISHDATE: "",
                REQUEST_METHOD:"",
                SERVICE_TIMES:"",
                ORIGINAL_URL:"",
                SERVICE_URL:"",
                SERVICE_CONTENT: "",
                DATA_FORMAT:"",
                CREATER: "",
                MANAGE_TEL: "",
                MANAGE_ORG_NAME: "",
                MANAGE_ORG_ID: this.$store.state.user.departId==""?null:this.$store.state.user.departId,
                MANAGE_ROLE_ID: ""
            },
            tempFile:{
                fileName:"",
                fileType:"",
            },
            textMap: {
                update: "修改服务信息",
                create: "添加服务信息"
            },
            detailVisible: false,
            editVisible: false,
            uploadVisible: false,
            downloadLoading: false,
            rules: {
                FLAG: [
                    {
                        required: true,
                        message: "FLAG is required",
                        trigger: "change"
                    }
                ]
            },
            dialogStatus: "",
            urlUpload: process.env.BASE_API + "servicedetail/uploadServiceFile",
            filedata:{
                serviceId:"",
                creater:"",
                fileType:"",
                fileName:""
            },
        };
    },
    methods: {
        loadPartyA() {
        const query = { sysCode: '100' }
        fetchPartyList(query).then(response => {
          this.menuSelectATree =JSON.parse(response.data)
        })
       },
        typeFormat:function(row, column) {
        var type = row[column.property];
          if (type == 0) {
             return "程序包";
          }
          else if (type == 1){
            return "文档";
          }
        },
        dateFormat:function(row, column) {
               var date = row[column.property];
          if (date == undefined) {
             return "";
          }
          return Moment(date).format("YYYY-MM-DD");
            },
        getList() {
            this.listLoading = true;
            fetchServiceList(this.listQuery).then(response => {
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
    resetTemp(){  
              this.temp={
                SERVICE_ID: "",
                SERVICE_CODE: "",
                SERVICE_NAME: "",
                SERVICE_PUBLISHDATE: "",
                REQUEST_METHOD:"",
                SERVICE_TIMES:"",
                ORIGINAL_URL:"",
                SERVICE_URL:"",
                SERVICE_CONTENT: "",
                DATA_FORMAT:"",
                CREATER: "",
                MANAGE_TEL: "",
                MANAGE_ORG_NAME: "",
                MANAGE_ORG_ID: this.$store.state.user.departId==""?null:this.$store.state.user.departId,
                MANAGE_ROLE_ID: ""
            }
        },
        handleCreate() {
            this.resetTemp()
            this.editVisible = true;
            this.dialogStatus = "create";
            this.loadPartyA()
        },
        handleUpdate(row) {
            this.editVisible = true;
            this.dialogStatus = "update";
            this.loadPartyA()
            this.temp = Object.assign({}, row) // copy obj
            this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
            })
        },
        handleUpload(row) {
            this.uploadVisible = true;
            this.filedata.serviceId=row.SERVICE_ID;
            this.filedata.creater=this.$store.state.user.name;
            this.load()
        },
        load(){
            this.fileList=[]
            this.tempFile.fileType=''
            this.tempFile.fileName=''
            this.listLoading = true;
            const query={SERVICE_ID:this.filedata.serviceId}
            fetchServiceDetailList(query).then(response => {
                if (response.data.code === 2000) {
                    this.listdetail = response.data.items;
                    // this.total = response.data.total;
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
        handleDelete(row) {
this.$confirm('确认删除记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
  const query = { SERVICE_ID: row.SERVICE_ID }
                updateServiceArticle(query).then(response => {
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
  }).catch(() => {
        });
           },
    handleRemove(file, fileList) {
        const query = { SERVICE_DETAIL_ID: file.id }
        updateServiceDetailArticle(query).then(response => {
        this.message = response.data.message
        this.title = '失败'
        this.type = 'error'
        if (response.data.code === 2000) {

          this.load()
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
        handleFileDelete(row) {
this.$confirm('确认删除记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
 const query = { SERVICE_DETAIL_ID: row.SERVICE_DETAIL_ID }
                updateServiceDetailArticle(query).then(response => {
                this.message = response.data.message
                this.title = '失败'
                this.type = 'error'
                if (response.data.code === 2000) {
                // const index = this.list.indexOf(row)
                // this.list.splice(index, 1)
                this.load()
                this.title = '成功'
                this.type = 'success'
                }
                // this.$notify({   position: 'bottom-right',
                // title: this.title,
                // message: this.message,
                // type: this.type,
                // duration: 2000
                // })
            })
  }).catch(() => {
        });
               
           },
        createData() { // 创建
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                // this.temp.userId = parseInt(Math.random() * 100) + 1024 // mock a id
                // this.temp.author = "ppp" //当前登陆人
                // this.temp.NOTICE_ORGID=this.$store.state.user.departId
                // this.temp.NOTICE_ORGNAME=this.$store.state.user.departName
                //this.temp.MANAGE_ROLE_ID=this.$store.state.user.roles
                this.temp.CREATER=this.$store.state.user.name
                createServiceArticle(this.temp).then(response => {
                    var message = response.data.message
                    var title = '失败'
                    var type = 'error'
                    if (response.data.code === 2000) {
                    this.getList()
                    title = '成功'
                    type = 'success'
                    // this.list.unshift(this.temp)
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
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp) // 这样就不会共用同一个对象
          //tempData.NOTICE_CONTENT=this.content
          updateServiceData(tempData).then(response => {
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
        //upload
        submitUpload() {
            this.filedata.fileType=this.tempFile.fileType
            this.filedata.fileName=this.tempFile.fileName
            this.$refs.upload.submit();
        },
         handleSuccess(res, file, fileList) {
            var message = res.message;
            var title = "失败";
            var type = "error";
            if (res.code === 2000) {
                //this.getList();
                this.load();
                title = "成功";
                type = "success";
                this.showUpload = false;
            }
            this.$notify({
                position: "bottom-right",
                title: title,
                message: message,
                type: type,
                duration: 2000
            });
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
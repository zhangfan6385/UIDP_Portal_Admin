<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">

            <el-input style="width: 200px;" class="filter-item" placeholder="请输入平台编号" v-model="listQuery.PLAT_CODE"></el-input>
            <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('commonTable.search')}}</el-button>

            <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('commonTable.add')}}</el-button>
        </div>
 <el-card class="box-card">
            <el-table :key='tableKey' :data="list" :header-cell-class-name="tableRowClassName" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
                <el-table-column width="150" align="center" :label="$t('platformTable.plat_code')" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{scope.row.PLAT_CODE}}</span>
                    </template>
                </el-table-column>

                <el-table-column width="80" align="center" :label="$t('platformTable.plat_version')" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{scope.row.PLAT_VERSION}}</span>
                    </template>
                </el-table-column>

                <el-table-column width="160" align="center"  :label="$t('platformTable.plat_publishdate')" prop="PLAT_PUBLISHDATE" :formatter="dateFormat" :show-overflow-tooltip="true">
                    <!-- <template slot-scope="scope">
                        <span>{{scope.row.PLAT_PUBLISHDATE}}</span>
                    </template> -->
                </el-table-column>
                <el-table-column width="100" align="center"  :label="$t('platformTable.plat_size')" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{scope.row.PLAT_SIZE}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="100" align="center"  :label="$t('platformTable.suit_plat')" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{scope.row.SUIT_PLAT}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="100" align="center"  :label="$t('platformTable.application_browser')" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{scope.row.APPLICATION_BROWSER}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column width="100px" align="center"  :label="$t('platformTable.plat_type')">
                    <template slot-scope="scope">
                        <span>{{scope.row.PLAT_TYPE}}</span>
                    </template>
                </el-table-column> -->
                 <el-table-column width="100" align="center" :label="$t('platformTable.manage_org_name')" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{scope.row.MANAGE_ORG_NAME}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="100" align="center"  :label="$t('platformTable.manage_tel')" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{scope.row.MANAGE_TEL}}</span>
                    </template>
                </el-table-column> 
                <el-table-column width="100" align="center" :label="$t('platformTable.creater')" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{scope.row.CREATER}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column width="160px" align="center" :label="$t('platformTable.create_date')" prop="CREATE_DATE" :formatter="dateFormat" :show-overflow-tooltip="true">
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
                             <el-form-item label="平台编号：" prop="PLAT_CODE">
                        <el-input v-model="temp.PLAT_CODE"></el-input>
                    </el-form-item>
                        </el-col>
                         <el-col :span="12">
                             <el-form-item label="平台名称：" prop="PLAT_NAME">
                        <el-input v-model="temp.PLAT_NAME"></el-input>
                    </el-form-item>
                         </el-col>
                      </el-row>
                       <el-row>
                        <el-col :span="12">
                            <el-form-item label="平台版本：" prop="PLAT_VERSION">
                        <el-input v-model="temp.PLAT_VERSION"></el-input>
                    </el-form-item>
                        </el-col>
                         <el-col :span="12">
                    <el-form-item label="发布日期：" prop="PLAT_PUBLISHDATE">
                            <el-date-picker type="date" placeholder="选择日期" v-model="temp.PLAT_PUBLISHDATE" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                         </el-col>
                      </el-row>
                         <el-row>
                        <el-col :span="12">
                            <el-form-item label="软件语言：" prop="SOFTWARE_LANGUAGE">
                        <el-input v-model="temp.SOFTWARE_LANGUAGE"></el-input>
                    </el-form-item>
                        </el-col>
                         <el-col :span="12">
                    <el-form-item label="适用平台：" prop="SUIT_PLAT">
                        <el-input v-model="temp.SUIT_PLAT"></el-input>
                    </el-form-item>
                         </el-col>
                      </el-row>
                         <el-row>
                        <el-col :span="12">
                             <el-form-item label="应用浏览器：" prop="APPLICATION_BROWSER">
                        <el-input v-model="temp.APPLICATION_BROWSER"></el-input>
                    </el-form-item>
                        </el-col>
                         <el-col :span="12">
                                <el-form-item label="软件大小：" prop="PLAT_SIZE">
                        <el-input v-model="temp.PLAT_SIZE"></el-input>
                    </el-form-item>
                         </el-col>
                      </el-row>
                         <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$t('platformTable.manage_org_name')+':'" >
                                <el-select-tree v-model="temp.MANAGE_ORG_ID" :treeData.sync="menuSelectATree" :propNames="defaultProps" clearable
                                  style="width: 100%;" >
                                </el-select-tree>
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
                              <el-form-item label="平台运行需求：" prop="PLAT_RUNREQUIRE">
                        <el-input v-model="temp.PLAT_RUNREQUIRE" type="textarea" :rows="5"></el-input>
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
import {
    fetchPlatformList,
    createPlatformArticle,
    updatePlatformData,
    updatePlatformArticle,
    fetchPlatDetailList,
    createPlatDetailArticle,
    updatePlatDetailArticle
} from "@/frame_src/api/platform";
import waves from "@/frame_src/directive/waves"; // 水波纹指令
// import { parseTime } from '@/frame_src/utils'
import { getToken } from "@/frame_src/utils/auth";
import Moment from 'moment';
import {
    fetchPartyList
} from "@/frame_src/api/org";
export default {
    name: "uidpPlatformManager",
    directives: {
        waves
    },
    mixins: [treeter],
    components: {
      'imp-panel': panel,
      'el-select-tree': selectTree
    },
    data() {
        return {
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
                PLAT_TYPE:1,//0:C#1:go
                PLAT_CODE: "",
                PLAT_NAME:""
            },
            listdetail: null,
            temp: {
                PLAT_ID: "",
                PLAT_CODE: "",
                PLAT_VERSION: "",
                PLAT_PUBLISHDATE: "",
                PLAT_SIZE:"",
                SOFTWARE_LANGUAGE:"",
                SUIT_PLAT:"",
                APPLICATION_BROWSER:"",
                PLAT_RUNREQUIRE: "",
                PLAT_TYPE:"",
                CREATER: "",
                MANAGE_TEL: "",
                MANAGE_ORG_NAME: "",
                MANAGE_ORG_ID: "",
                MANAGE_ROLE_ID: ""
            },
            tempFile:{
                fileName:"",
                fileType:"",
            },
            textMap: {
                update: "修改平台信息",
                create: "添加平台信息"
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
            urlUpload: process.env.BASE_API + "platdetail/uploadPlatFile",
            filedata:{
                platId:"",
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
            fetchPlatformList(this.listQuery).then(response => {
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

        handleCreate() {
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
            this.filedata.platId=row.PLAT_ID;
            this.filedata.creater=this.$store.state.user.name;
            this.load()
        },
        load(){
            this.fileList=[]
            this.tempFile.fileType=''
            this.tempFile.fileName=''
            this.listLoading = true;
            const query={PLAT_ID:this.filedata.platId}
            fetchPlatDetailList(query).then(response => {
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
             const query = { PLAT_ID: row.PLAT_ID }
                updatePlatformArticle(query).then(response => {
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

        this.$confirm('确认删除记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
  const query = { PLAT_DETAIL_ID: file.id }
        updatePlatDetailArticle(query).then(response => {
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
  }).catch(() => {
        });
      
        },
        handleFileDelete(row) {
                //this.temp = Object.assign({}, row) // copy obj
                const query = { PLAT_DETAIL_ID: row.PLAT_DETAIL_ID }
                updatePlatDetailArticle(query).then(response => {
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
           },
        createData() { // 创建
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                // this.temp.userId = parseInt(Math.random() * 100) + 1024 // mock a id
                // this.temp.author = "ppp" //当前登陆人
                // this.temp.NOTICE_ORGID=this.$store.state.user.departId
                // this.temp.NOTICE_ORGNAME=this.$store.state.user.departName
                this.temp.MANAGE_ROLE_ID=this.$store.state.user.roles
                this.temp.CREATER=this.$store.state.user.name
                this.temp.PLAT_TYPE=1
                createPlatformArticle(this.temp).then(response => {
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
          updatePlatformData(tempData).then(response => {
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
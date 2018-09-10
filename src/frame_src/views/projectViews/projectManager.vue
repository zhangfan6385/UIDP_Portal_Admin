<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">

            <el-input style="width: 200px;" class="filter-item" placeholder="请输入项目编号" v-model="listQuery.PROJECT_CODE"></el-input>
            <el-input style="width: 200px;" class="filter-item" placeholder="请输入项目名称" v-model="listQuery.PROJECT_NAME"></el-input>

            <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('projectTable.search')}}</el-button>

            <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('projectTable.add')}}</el-button>
        </div>
        <el-card class="box-card">
            <el-table :key='tableKey' :data="list" :header-cell-class-name="tableRowClassName" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">

                <el-table-column width="100" align="center" :label="$t('projectTable.project_code')" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{scope.row.PROJECT_CODE}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="150" align="center" :label="$t('projectTable.project_name')" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{scope.row.PROJECT_NAME}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="100" align="center" :label="$t('projectTable.project_partya')" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{scope.row.PROJECT_PARTYA_NAME}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="100" align="center" :label="$t('projectTable.project_partyb')" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{scope.row.PROJECT_PARTYB_NAME}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="100" align="center" :label="$t('projectTable.project_amount')" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{scope.row.PROJECT_AMOUNT}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="100" align="center" :label="$t('projectTable.project_form')" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{scope.row.PROJECT_FORM}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="110" align="center" :label="$t('projectTable.project_setdate')" prop="PROJECT_SETDATE" :formatter="dateFormat" :show-overflow-tooltip="true">
                    <!-- <template slot-scope="scope">
                        <span>{{scope.row.PROJECT_SETDATE}}</span>
                    </template> -->
                </el-table-column>
                <el-table-column width="110" align="center" :label="$t('projectTable.project_contractdate')" prop="PROJECT_CONTRACTDATE" :formatter="dateFormat" :show-overflow-tooltip="true">
                    <!-- <template slot-scope="scope">
                        <span>{{scope.row.PROJECT_CONTRACTDATE}}</span>
                    </template> -->
                </el-table-column>
                <el-table-column width="110" align="center" :label="$t('projectTable.project_checkdate')"  prop="PROJECT_CHECKDATE" :formatter="dateFormat" :show-overflow-tooltip="true">
                    <!-- <template slot-scope="scope">
                        <span>{{scope.row.PROJECT_CHECKDATE}}</span>
                    </template> -->
                </el-table-column>
                <el-table-column min-width="200" align="center" :label="$t('projectTable.project_url')" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{scope.row.PROJECT_URL}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="80" align="center" :label="$t('projectTable.project_isonline')" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <!-- <span>{{scope.row.PROJECT_ISONLINE}}</span> -->
                        <span v-if="scope.row.PROJECT_ISONLINE=='0'">否</span>
                        <span v-if="scope.row.PROJECT_ISONLINE=='1'">是</span>
                        <span v-else></span>
                    </template>
                </el-table-column>
      <el-table-column
      align="center"
      fixed="right"
      label="操作"
      width="150">
      <template slot-scope="scope">
  <el-button type="primary" size="mini"  @click="handleUpdate(scope.row)">{{$t('projectTable.edit')}}</el-button>
   <el-button type="danger" size="mini"  @click="handleDelete(scope.row)">{{$t('projectTable.delete')}}</el-button>

      </template>
    </el-table-column>

            </el-table>
        </el-card>
        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <!--添加或者修改-->
        <el-dialog :visible.sync="editVisible" :title="textMap[dialogStatus]" width="800px">
            <el-card>
                <el-form :rules="rules" ref="dataForm" :model="temp" label-position="center" label-width="120px" style='width: 99%;'>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$t('projectTable.project_code')+':'" prop="PROJECT_CODE">
                                <el-input v-model="temp.PROJECT_CODE"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('projectTable.project_name')+':'" prop="PROJECT_NAME">
                                <el-input v-model="temp.PROJECT_NAME"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$t('projectTable.project_amount')+':'" prop="PROJECT_AMOUNT">
                                <el-input v-model="temp.PROJECT_AMOUNT"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('projectTable.project_form')+':'" prop="PROJECT_FORM">
                                <el-select v-model="temp.PROJECT_FORM" placeholder="请选择" style="width: 100%;">
                                    <el-option label="" value=""></el-option>
                                    <el-option label="公开招标" value="公开招标"></el-option>
                                    <el-option label="竞争性谈判" value="竞争性谈判"></el-option>
                                    <el-option label="单一采购来源" value="单一采购来源"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$t('projectTable.project_partya')+':'" >
                                <!-- <el-select-tree v-model="temp.PROJECT_PARTYA_ID" :treeData.sync="menuSelectATree" :propNames="defaultProps" clearable
                                  placeholder="甲方单位" style="width: 100%;" >
                                </el-select-tree> -->
                                <treeselect  
 v-model="temp.PROJECT_PARTYA_ID" 
 :multiple="false" 
 :options="menuSelectATree" 
 :normalizer="normalizer"
 :disable-branch-nodes="false"
  placeholder="甲方单位"
  noResultsText="未搜索到结果"
/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('projectTable.project_partyb')+':'" prop="PROJECT_PARTYB">
                                <!-- <el-select-tree v-model="temp.PROJECT_PARTYB_ID" :treeData.sync="menuSelectBTree" :propNames="defaultProps" clearable
                                  placeholder="乙方单位" style="width: 100%;">
                                </el-select-tree> -->
                                                                <treeselect  
 v-model="temp.PROJECT_PARTYB_ID" 
 :multiple="false" 
 :options="menuSelectBTree" 
 :normalizer="normalizer"
 :disable-branch-nodes="false"
  placeholder="乙方单位"
  noResultsText="未搜索到结果"
/>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$t('projectTable.project_setdate')+':'" prop="PROJECT_SETDATE">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="temp.PROJECT_SETDATE" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('projectTable.project_contractdate')+':'" prop="PROJECT_CONTRACTDATE">
                                <el-date-picker type="date" placeholder="选择日期" v-model="temp.PROJECT_CONTRACTDATE" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$t('projectTable.project_checkdate')+':'" prop="PROJECT_CHECKDATE">
                                <el-date-picker type="date" placeholder="选择日期" v-model="temp.PROJECT_CHECKDATE" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                        <el-form-item :label="$t('projectTable.project_isonline')+':'" prop="PROJECT_ISONLINE">
                        <el-radio class="radio" v-model="temp.PROJECT_ISONLINE" :label="1">是</el-radio>
                        <el-radio class="radio" v-model="temp.PROJECT_ISONLINE" :label="0">否</el-radio>
                    </el-form-item>
                          
                        </el-col>
                    </el-row>
                     <el-row>
                        <el-col :span="24">
                            <el-form-item :label="$t('projectTable.project_url')+':'" prop="PROJECT_URL">
                                <el-input v-model="temp.PROJECT_URL" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                      <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$t('projectTable.project_partyaperson')+':'" prop="CONTACT_PARTYA_NAME">
                                <el-input v-model="temp.CONTACT_PARTYA_NAME"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('projectTable.project_partyaphone')+':'" prop="CONTACT_PARTYA_PHONE">
                                <el-input v-model="temp.CONTACT_PARTYA_PHONE"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                     <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$t('projectTable.project_partybperson')+':'" prop="CONTACT_PARTYB_NAME">
                                <el-input v-model="temp.CONTACT_PARTYB_NAME"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('projectTable.project_partybphone')+':'" prop="CONTACT_PARTYB_PHONE">
                                <el-input v-model="temp.CONTACT_PARTYB_PHONE"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div style="text-align:center">
                    <el-button @click="editVisible = false">{{$t('userTable.cancel')}}</el-button>
                    <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('projectTable.save')}}</el-button>
                    <el-button v-else type="primary" @click="updateData">{{$t('projectTable.save')}}</el-button>
                </div>
            </el-card>
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
    fetchProjectList,
    createProjectArticle,
    updateProjectData,
    updateProjectArticle
} from "@/frame_src/api/project";
import {
    fetchPartyList
} from "@/frame_src/api/org";
import waves from "@/frame_src/directive/waves"; // 水波纹指令
// import { parseTime } from '@/frame_src/utils'
import Moment from 'moment';
import { getToken } from "@/frame_src/utils/auth";
export default {
    name: "projectManager",
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
        children: node.children,
      }
    },
            tableKey: 0,
            list: null,
            total: null,
            listLoading: false,
            // listUpdate: {
            //     field: undefined,
            //     RESULT_ID: undefined
            // },
            defaultProps: {
                children: 'children',
                label: 'ORG_SHORT_NAME',
                id: 'id'
            },
            listQuery: {
                page: 1,
                limit: 10,
                PROJECT_CODE: "",
                PROJECT_NAME: ""
            },
            menuSelectATree: [],
            menuSelectBTree: [],
            temp: {
                PROJECT_ID: "",
                PROJECT_CODE: "",
                PROJECT_NAME: "",
                PROJECT_PARTYA_ID:null,
                PROJECT_PARTYA_CODE:"",
                PROJECT_PARTYA_NAME: "",
                PROJECT_PARTYB_ID: null,
                PROJECT_PARTYB_CODE:"",
                PROJECT_PARTYB_NAME:"",
                PROJECT_AMOUNT: "",
                PROJECT_FORM: "",
                PROJECT_SETDATE: "",
                PROJECT_CONTRACTDATE: "",
                PROJECT_CHECKDATE: "",
                PROJECT_URL: "",
                PROJECT_ISONLINE: "0",
                CONTACT_PARTYA_NAME:"",
                CONTACT_PARTYA_PHONE:"",
                CONTACT_PARTYB_NAME:"",
                CONTACT_PARTYB_PHONE:"",
                CREATER:""
            },
            textMap: {
                update: "修改项目",
                create: "添加项目"
            },
            editVisible: false,
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
            urlUpload: process.env.BASE_API + "user/uploadUserArticle",
            fileList: []
        };
    },
    methods: {
           dateFormat:function(row, column) {
               var date = row[column.property];
          if (date == undefined) {
             return "";
          }
          return Moment(date).format("YYYY-MM-DD");
            },
            resetTemp(){  
             this.temp={
                PROJECT_ID: "",
                PROJECT_CODE: "",
                PROJECT_NAME: "",
                PROJECT_PARTYA_ID:null,
                PROJECT_PARTYA_CODE:"",
                PROJECT_PARTYA_NAME: "",
                PROJECT_PARTYB_ID: null,
                PROJECT_PARTYB_CODE:"",
                PROJECT_PARTYB_NAME:"",
                PROJECT_AMOUNT: "",
                PROJECT_FORM: "",
                PROJECT_SETDATE: "",
                PROJECT_CONTRACTDATE: "",
                PROJECT_CHECKDATE: "",
                PROJECT_URL: "",
                PROJECT_ISONLINE: "0",
                CONTACT_PARTYA_NAME:"",
                CONTACT_PARTYA_PHONE:"",
                CONTACT_PARTYB_NAME:"",
                CONTACT_PARTYB_PHONE:"",
                CREATER:""
            }
        },
        getList() {
            this.listLoading = true;
            fetchProjectList(this.listQuery).then(response => {
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
        loadPartyA() {
        const query = { sysCode: '100' }
        fetchPartyList(query).then(response => {
          this.menuSelectATree =JSON.parse(response.data)
        })
       },
       loadPartyB() {
        const query = { sysCode: '200' }
        fetchPartyList(query).then(response => {
          this.menuSelectBTree = JSON.parse(response.data)
        })
       },
        handleCreate() {
            this.resetTemp()
            this.editVisible = true;
            this.dialogStatus = "create";
            this.loadPartyA()
            this.loadPartyB()
        },
        handleUpdate(row) {
            this.loadPartyA()
            this.loadPartyB()
            this.temp = Object.assign({}, row) // copy obj
            this.editVisible = true;
            this.dialogStatus = "update";
            //this.content=row.NOTICE_CONTENT
            this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
            })
        },
        handleDelete(row) {
        this.$confirm('确认删除记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
              const query = { PROJECT_ID: row.PROJECT_ID }
                updateProjectArticle(query).then(response => {
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
           createData() { // 创建
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                // this.temp.userId = parseInt(Math.random() * 100) + 1024 // mock a id
                // this.temp.author = "ppp" //当前登陆人
                // this.temp.NOTICE_ORGID=this.$store.state.user.departId
                // this.temp.NOTICE_ORGNAME=this.$store.state.user.departName
                this.temp.CREATER=this.$store.state.user.name
                createProjectArticle(this.temp).then(response => {
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
          updateProjectData(tempData).then(response => {
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
        }
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
        }
    }
};
</script>
<style lang="scss" scoped>
.quilldiv {
    height: 200px;
}
</style>
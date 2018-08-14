<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">

            <el-input style="width: 200px;" class="filter-item" placeholder="请输入公告编号" v-model="listQuery.NOTICE_CODE"></el-input>
            <el-input style="width: 200px;" class="filter-item" placeholder="请输入公告标题" v-model="listQuery.NOTICE_TITLE"></el-input>

            <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('noticeTable.search')}}</el-button>

      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('noticeTable.add')}}</el-button>
        </div>
        <el-card class="box-card">
            <el-table :key='tableKey' :data="list" :header-cell-class-name="tableRowClassName" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">

                <el-table-column width="150px" align="center" :label="$t('noticeTable.notice_code')">
                    <template slot-scope="scope">
                        <span>{{scope.row.NOTICE_CODE}}</span>
                    </template>
                </el-table-column>

                <el-table-column min-width="290px" align="center" :label="$t('noticeTable.notice_title')">
                    <template slot-scope="scope">
                        <span>{{scope.row.NOTICE_TITLE}}</span>
                    </template>
                </el-table-column>

                <el-table-column width="100px" align="center" :label="$t('noticeTable.notice_createby')">
                    <template slot-scope="scope">
                        <span>{{scope.row.NOTICE_CREATEBY}}</span>
                    </template>
                </el-table-column>

                <el-table-column width="200px" align="center" :label="$t('noticeTable.notice_orgname')">
                    <template slot-scope="scope">
                        <span>{{scope.row.NOTICE_ORGNAME}}</span>
                    </template>
                </el-table-column>

                <el-table-column width="140px" align="center" :label="$t('noticeTable.notice_datetime')">
                    <template slot-scope="scope">
                        <span>{{scope.row.NOTICE_DATETIME}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" fixed="right" :label="$t('noticeTable.actions')" width="80px" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleDetail(scope.row)">{{$t('noticeTable.detail')}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" fixed="right" :label="$t('noticeTable.actions')" width="80px" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('noticeTable.edit')}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" fixed="right" :label="$t('noticeTable.actions')" width="80px" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleUpload(scope.row)">{{$t('noticeTable.upload')}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" fixed="right" :label="$t('noticeTable.actions')" width="80px" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">{{$t('noticeTable.delete')}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <!--详情-->
        <el-dialog :visible.sync="detailVisible" :title="$t('noticeTable.detail')" width="800px">
            <el-card>
                <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="120px" style='width: 94%; margin-left:6%;'>
                    <el-form-item :label="$t('noticeTable.notice_code')+':'" prop="NOTICE_CODE">
                        <el-input v-model="temp.NOTICE_CODE" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('noticeTable.notice_title')+':'" prop="NOTICE_TITLE">
                        <el-input v-model="temp.NOTICE_TITLE" width="400px" :disabled="true"></el-input>
                    </el-form-item>
                 <el-form-item :label="$t('noticeTable.notice_content')+':'" prop="NOTICE_CONTENT">
                       <div>
                           adsfadfas
                       </div>
                    </el-form-item>
                    </el-form>
                    </el-card>
        </el-dialog>
        <!--修改-->
        <el-dialog :visible.sync="editVisible" :title="textMap[dialogStatus]" width="800px">
        <el-card>
                <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="120px" style='width: 94%; margin-left:6%;'>
                    <el-form-item :label="$t('noticeTable.notice_code')+':'" prop="NOTICE_CODE">
                        <el-input v-model="temp.NOTICE_CODE"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('noticeTable.notice_title')+':'" prop="NOTICE_TITLE">
                        <el-input v-model="temp.NOTICE_TITLE" width="400px"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('noticeTable.notice_content')+':'" prop="NOTICE_CONTENT">
                       
                            <quill-editor>
                            </quill-editor>
                
                    </el-form-item>
                    </el-form>
                     <div style="text-align:center">
                        <el-button @click="editVisible = false">{{$t('userTable.cancel')}}</el-button>
                        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('noticeTable.save')}}</el-button>
                        <el-button v-else type="primary" @click="updateData">{{$t('noticeTable.save')}}</el-button>
                    </div>
                    </el-card>
        </el-dialog>
        <!--上传-->
        <el-dialog :visible.sync="uploadVisible" :title="$t('noticeTable.upload')">
            <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="120px" style='width: 94%; margin-left:6%;'>

                <el-card>
                    <el-upload class="upload-demo" ref="upload" :action="urlUpload" :on-preview="handlePreview" :on-remove="handleRemove" :on-exceed="handleExceed" :on-success="handleSuccess" :before-remove="beforeRemove" :headers="headers" :file-list="fileList">
                        <el-button class="filter-item" type="primary" icon="el-icon-edit">点击上传</el-button>
                    </el-upload>
                </el-card>

            </el-form>
        </el-dialog>
    </div>

</template>
<script>
import {
    fetchNoticeList ////记住修改API
} from "@/frame_src/api/notice";
import waves from "@/frame_src/directive/waves"; // 水波纹指令
// import { parseTime } from '@/frame_src/utils'
import quillEditor from "@/frame_src/components/QuillEditor";
import { getToken } from "@/frame_src/utils/auth";
export default {
    name: "uidpConfigManager",
    directives: {
        waves
    },
    data() {
        return {
            tableKey: 0,
            list: null,
            total: null,
            listLoading: true,
            listUpdate: {
                field: undefined,
                RESULT_ID: undefined
            },
            listQuery: {
                page: 1,
                limit: 10,
                NOTICE_CODE: "",
                NOTICE_TITLE: ""
            },
            temp: {
                NOTICE_ID: "",
                NOTICE_CODE: "",
                NOTICE_TITLE: "",
                NOTICE_CONTENT: "",
                NOTICE_ORGID: "",
                NOTICE_ORGNAME: "",
                NOTICE_CREATEBY: ""
            },
            textMap: {
                update: "修改公告",
                create: "添加公告"
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
            dialogStatus:'',
            urlUpload: process.env.BASE_API + "user/uploadUserArticle",
            fileList: [],

        };
    },
    components: {
        quillEditor
    },
    methods: {
        getList() {
            this.listLoading = true;
            fetchNoticeList(this.listQuery).then(response => {
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
        handleDetail() {
            this.detailVisible = true;
            
        },
        handleCreate(){
             this.editVisible = true;
            this.dialogStatus='create'
        },
        handleUpdate() {
            this.editVisible = true;
            this.dialogStatus='update'
        },
        handleUpload() {
            this.uploadVisible = true;
        },
        handleUdelete() {

        },
        createData(){},
        updateData(){},
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
        handleRemove(file, fileList) {},
        handlePreview(file) {},
        handleSuccess(res, file, fileList) {
            var message = res.message;
            var title = "失败";
            var type = "error";
            if (res.code === 2000) {
                this.getList();
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
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 1个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
         beforeRemove(file, fileList) {
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
    },
    headers() {
      return {
        "X-Token": getToken()
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.quilldiv {
    height: 200px;
}
</style>
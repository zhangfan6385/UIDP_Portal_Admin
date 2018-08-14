<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">

            <el-input style="width: 200px;" class="filter-item" placeholder="请输入平台编号" v-model="listQuery.NOTICE_CODE"></el-input>
            <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('commonTable.search')}}</el-button>

            <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('commonTable.add')}}</el-button>
        </div>
        <el-card class="box-card">
            <el-table :key='tableKey'  max-height="100%" :data="list" :header-cell-class-name="tableRowClassName" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
                <el-table-column width="150px" align="center" label="平台编号">
                    <template slot-scope="scope">
                        <span>{{scope.row.PLAT_CODE}}</span>
                    </template>
                </el-table-column>

                <el-table-column width="290px" align="center" label="平台版本">
                    <template slot-scope="scope">
                        <span>{{scope.row.PLAT_VERSION}}</span>
                    </template>
                </el-table-column>

                <el-table-column width="100px" align="center" label="发布日期">
                    <template slot-scope="scope">
                        <span>{{scope.row.PLAT_PUBLISHDATE}}</span>
                    </template>
                </el-table-column>

                <el-table-column min-width="200px" align="center" label="平台运行需求">
                    <template slot-scope="scope">
                        <span>{{scope.row.PLAT_RUNREQUIRE}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="发布人">
                    <template slot-scope="scope">
                        <span>{{scope.row.PLAT_CREATEBY}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="发日期">
                    <template slot-scope="scope">
                        <span>{{scope.row.PLAT_CREATEDATE}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="管理部门">
                    <template slot-scope="scope">
                        <span>{{scope.row.PLAT_CREATEORGNAME}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center"  fixed="right" :label="$t('commonTable.actions')" width="80px" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('commonTable.edit')}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center"  fixed="right" :label="$t('commonTable.actions')" width="80px" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button type="primary"  size="mini" @click="handleUpload(scope.row)">{{$t('commonTable.upload')}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center"  fixed="right" :label="$t('commonTable.actions')" width="80px" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
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
        <el-dialog :visible.sync="editVisible" :title="textMap[dialogStatus]" width="500px">
            <el-card>
                <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="120px" style='width: 94%; margin-left:6%;'>
                    <el-form-item label="平台编号：" prop="NOTICE_CODE">
                        <el-input v-model="temp.NOTICE_CODE"></el-input>
                    </el-form-item>
                    <el-form-item label="平台版本：" prop="NOTICE_TITLE">
                        <el-input v-model="temp.NOTICE_TITLE"></el-input>
                    </el-form-item>
                    <el-form-item label="发布日期：" prop="NOTICE_TITLE">
                        <el-input v-model="temp.NOTICE_TITLE"></el-input>
                    </el-form-item>
                    <el-form-item label="平台运行需求：" prop="NOTICE_TITLE">
                        <el-input v-model="temp.NOTICE_TITLE" type="textarea" :rows="5"></el-input>
                    </el-form-item>
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
            <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="120px" style='width: 100%; height:400px'>
                <el-card style="height:100%">
                    <el-row style="height:100%">
                        <el-col :span="9" style="height:100%">
                            <el-form-item label="文件类型：" prop="PROJECT_FORM"  size="small" label-width="90px" style="margin-right:10px">
                                <el-select v-model="temp.PLAT_DETAILTYPE" placeholder="请选择" style="width: 100%;">
                                    <el-option label="程序包" value="0"></el-option>
                                    <el-option label="文档" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="文件名称：" prop="NOTICE_CODE" label-width="90px" style="margin-right:10px">
                                <el-input v-model="temp.NOTICE_CODE" size="small"  style="width: 100%"></el-input>
                            </el-form-item>
                            <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :file-list="fileList" :auto-upload="false">
                                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                            </el-upload>
                        </el-col>
                        <el-col :span="15">
                            <el-table :data="listdetail" size="small"  :header-cell-class-name="tableRowClassName" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%;height:320px">
                                <el-table-column  align="center" label="文件名称">
                                    <template slot-scope="scope">
                                        <a>文建.txt</a>
                                    </template>
                                </el-table-column>
                                <el-table-column  align="center" label="文件类型">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.PLAT_CODE}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" :label="$t('commonTable.actions')" width="80px" class-name="small-padding fixed-width">
                                    <template slot-scope="scope">
                                        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">{{$t('commonTable.delete')}}</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
                        </el-col>
                    </el-row>
                </el-card>
            </el-form>
        </el-dialog>
    </div>

</template>
<script>
import {
    fetchGoPlatformList ////记住修改API
} from "@/frame_src/api/platform";
import waves from "@/frame_src/directive/waves"; // 水波纹指令
// import { parseTime } from '@/frame_src/utils'
import { getToken } from "@/frame_src/utils/auth";
export default {
    name: "uidpPlatformManager",
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
                PLAT_CODE: ""
            },
            listdetail: null,
            temp: {
                PLAT_ID: "",
                PLAT_CODE: "",
                PLAT_VERSION: "",
                PLAT_PUBLISHDATE: "",
                PLAT_RUNREQUIRE: "",
                PLAT_CREATEBY: "",
                PLAT_CREATEDATE: "",
                PLAT_CREATEDATE: "",
                PLAT_CREATEORGNAME: "",
                PLAT_CREATEORGID: "",
                PLAT_TYPE: "",
                PLAT_ROLEID: ""
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
            urlUpload: process.env.BASE_API + "user/uploadUserArticle",
            fileList: []
        };
    },
    methods: {
        getList() {
            this.listLoading = true;
            fetchGoPlatformList(this.listQuery).then(response => {
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
        handleCreate() {
            this.editVisible = true;
            this.dialogStatus = "create";
        },
        handleUpdate() {
            this.editVisible = true;
            this.dialogStatus = "update";
        },
        handleUpload() {
            this.uploadVisible = true;
        },
        handleUdelete() {},
        createData() {},
        updateData() {},
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
            this.fileList = [];
            this.$refs.upload.submit();
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
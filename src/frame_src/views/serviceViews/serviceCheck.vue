<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">

            <el-input style="width: 200px;" class="filter-item" placeholder="申请人账号或姓名" v-model="listQuery.NOTICE_CODE"></el-input>
            <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('commonTable.search')}}</el-button>
 </div>
        <el-card class="box-card">
            <el-table :key='tableKey'  max-height="100%" :data="list" :header-cell-class-name="tableRowClassName" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
                <el-table-column width="150px" align="center" label="公司名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.APPLICATION_ORGNAME}}</span>
                    </template>
                </el-table-column>

                <el-table-column width="150px" align="center" label="项目名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.APPLICATION_PROJECTNAME}}</span>
                    </template>
                </el-table-column>

                <el-table-column width="100px" align="center" label="用途类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.APPLICATION_USETYPE}}</span>
                    </template>
                </el-table-column>

                <el-table-column width="200px" align="center" label="用途说明">
                    <template slot-scope="scope">
                        <span>{{scope.row.APPLICATION_USECONTENT}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="联系人">
                    <template slot-scope="scope">
                        <span>{{scope.row.APPLICATION_LINKMAN}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="联系电话">
                    <template slot-scope="scope">
                        <span>{{scope.row.APPLICATION_TEL}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="审核状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.APPLICATION_CHECKSTATE}}</span>
                    </template>
                </el-table-column>
                <el-table-column min-width="140px" align="center" label="审核原因">
                    <template slot-scope="scope">
                        <span>{{scope.row.APPLICATION_CHECKCONTENT}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="审核人">
                    <template slot-scope="scope">
                        <span>{{scope.row.APPLICATION_CHECKMAN}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="审核时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.APPLICATION_CHECKDATE}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center"  fixed="right" :label="$t('commonTable.actions')" width="80px" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button type="primary"  size="mini" @click="handleCheck(scope.row)">审核</el-button>
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
        <el-dialog :visible.sync="editVisible" title="审核窗口" width="500px">
            <el-card>
                <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="120px" style='width: 94%; margin-left:6%;'>
                        <el-form-item label="审核状态：" prop="PROJECT_FORM" label-width="90px">
                        <el-select v-model="temp.PROJECT_FORM" placeholder="请选择" style="width: 100%;">
                            <el-option label="通过" value=1></el-option>
                            <el-option label="驳回" value=2></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="审核原因：" prop="NOTICE_TITLE" label-width="90px">
                        <el-input type="textarea" :rows="4" v-model="temp.NOTICE_TITLE"></el-input>
                    </el-form-item>
                </el-form>
                <div style="text-align:center">
                    <el-button @click="editVisible = false">{{$t('userTable.cancel')}}</el-button>
                    <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('commonTable.save')}}</el-button>
                    <el-button v-else type="primary" @click="updateData">{{$t('commonTable.save')}}</el-button>
                </div>
            </el-card>
        </el-dialog>
    </div>

</template>
<script>
import {
    fetchNoticeList ////记住修改API
} from "@/frame_src/api/notice";
import waves from "@/frame_src/directive/waves"; // 水波纹指令
// import { parseTime } from '@/frame_src/utils'
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
            listdetail: null,
            temp: {
                NOTICE_ID: "",
                NOTICE_CODE: "",
                NOTICE_TITLE: "",
                NOTICE_CONTENT: "",
                NOTICE_ORGID: "",
                NOTICE_ORGNAME: "",
                NOTICE_CREATEBY: ""
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
        };
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
        handleCheck() {
            this.editVisible = true;
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
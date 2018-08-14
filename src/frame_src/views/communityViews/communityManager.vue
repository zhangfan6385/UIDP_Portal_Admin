<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">

            <el-input style="width: 200px;" class="filter-item" placeholder="请输入标题" v-model="listQuery.NOTICE_CODE"></el-input>
            <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('commonTable.search')}}</el-button>
     </div>
        <el-card class="box-card">
            <el-table :key='tableKey'  max-height="100%" :data="list" :header-cell-class-name="tableRowClassName" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
                <el-table-column width="150px" align="center" label="帖子编号">
                    <template slot-scope="scope">
                        <span>{{scope.row.PLAT_CODE}}</span>
                    </template>
                </el-table-column>

                <el-table-column min-width="290px" align="center" label="帖子标题">
                    <template slot-scope="scope">
                        <span>{{scope.row.PLAT_VERSION}}</span>
                    </template>
                </el-table-column>

                <el-table-column width="100px" align="center" label="帖子类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.PLAT_PUBLISHDATE}}</span>
                    </template>
                </el-table-column>

                <el-table-column width="200px" align="center" label="发布人">
                    <template slot-scope="scope">
                        <span>{{scope.row.PLAT_RUNREQUIRE}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="发日期">
                    <template slot-scope="scope">
                        <span>{{scope.row.PLAT_CREATEDATE}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="所需积分">
                    <template slot-scope="scope">
                        <span>{{scope.row.PLAT_CREATEORGNAME}}</span>
                    </template>
                </el-table-column>
                 <el-table-column width="140px" align="center" label="悬赏积分">
                    <template slot-scope="scope">
                        <span>{{scope.row.PLAT_CREATEORGNAME}}</span>
                    </template>
                </el-table-column>
                 <el-table-column width="140px" align="center" label="查看次数">
                    <template slot-scope="scope">
                        <span>{{scope.row.PLAT_CREATEORGNAME}}</span>
                    </template>
                </el-table-column>
                 <el-table-column width="140px" align="center" label="评论次数">
                    <template slot-scope="scope">
                        <span>{{scope.row.PLAT_CREATEORGNAME}}</span>
                    </template>
                </el-table-column>
                 <el-table-column width="140px" align="center" label="收藏次数">
                    <template slot-scope="scope">
                        <span>{{scope.row.PLAT_CREATEORGNAME}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center"  fixed="right" :label="$t('commonTable.actions')" width="80px" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleDetail(scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center"  fixed="right" :label="$t('commonTable.actions')" width="80px" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <!--详情-->
        <el-dialog :visible.sync="detailVisible" title="详情" width="500px">
            <el-card>
            </el-card>
        </el-dialog>
       
    </div>

</template>
<script>
import {
    fetchCommunityList ////记住修改API
} from "@/frame_src/api/community";
import waves from "@/frame_src/directive/waves"; // 水波纹指令
// import { parseTime } from '@/frame_src/utils'
import { getToken } from "@/frame_src/utils/auth";
export default {
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
            detailVisible: false,
            rules: {
                FLAG: [
                    {
                        required: true,
                        message: "FLAG is required",
                        trigger: "change"
                    }
                ]
            },
            dialogStatus: ""
        };
    },
    methods: {
        getList() {
            this.listLoading = true;
            fetchCommunityList(this.listQuery).then(response => {
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
        handleUdelete() {},
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
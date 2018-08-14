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

                <el-table-column width="150px" align="center" :label="$t('projectTable.project_code')">
                    <template slot-scope="scope">
                        <span>{{scope.row.PROJECT_CODE}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="150px" align="center" :label="$t('projectTable.project_name')">
                    <template slot-scope="scope">
                        <span>{{scope.row.PROJECT_NAME}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="150px" align="center" :label="$t('projectTable.project_partya')">
                    <template slot-scope="scope">
                        <span>{{scope.row.PROJECT_PARTYA}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="150pxpx" align="center" :label="$t('projectTable.project_partyb')">
                    <template slot-scope="scope">
                        <span>{{scope.row.PROJECT_PARTYB}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="140px" align="center" :label="$t('projectTable.project_amount')">
                    <template slot-scope="scope">
                        <span>{{scope.row.PROJECT_AMOUNT}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="140px" align="center" :label="$t('projectTable.project_form')">
                    <template slot-scope="scope">
                        <span>{{scope.row.PROJECT_FORM}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="140px" align="center" :label="$t('projectTable.project_setdate')">
                    <template slot-scope="scope">
                        <span>{{scope.row.PROJECT_SETDATE}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="140px" align="center" :label="$t('projectTable.project_contractdate')">
                    <template slot-scope="scope">
                        <span>{{scope.row.PROJECT_CONTRACTDATE}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="140px" align="center" :label="$t('projectTable.project_checkdate')">
                    <template slot-scope="scope">
                        <span>{{scope.row.PROJECT_CHECKDATE}}</span>
                    </template>
                </el-table-column>
                <el-table-column min-width="140px" align="center" :label="$t('projectTable.project_url')">
                    <template slot-scope="scope">
                        <span>{{scope.row.PROJECT_URL}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="140px" align="center" :label="$t('projectTable.project_isonline')">
                    <template slot-scope="scope">
                        <span>{{scope.row.PROJECT_ISONLINE}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" fixed="right" :label="$t('projectTable.actions')" width="80px" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini"  @click="handleUpdate(scope.row)">{{$t('projectTable.edit')}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" fixed="right" :label="$t('projectTable.actions')" width="80px" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
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
                <el-form :rules="rules" ref="dataForm" :model="temp" label-position="center" label-width="100px" style='width: 99%;'>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$t('projectTable.project_code')+':'" prop="PROJECT_CODE">
                                <el-input v-model="temp.PROJECT_CODE"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('projectTable.project_name')+':'" prop="PROJECT_NAME">
                                <el-input v-model="temp.PROJECT_NAME" width="400px"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$t('projectTable.project_partya')+':'" prop="PROJECT_PARTYA">
                                <el-input v-model="temp.PROJECT_PARTYA"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('projectTable.project_partyb')+':'" prop="PROJECT_PARTYB">
                                <el-input v-model="temp.PROJECT_PARTYB" width="400px"></el-input>
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
                            <el-form-item :label="$t('projectTable.project_setdate')+':'" prop="PROJECT_SETDATE">
                                <el-input v-model="temp.PROJECT_SETDATE"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('projectTable.project_contractdate')+':'" prop="PROJECT_CONTRACTDATE">
                                <el-input v-model="temp.PROJECT_CONTRACTDATE" width="400px"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$t('projectTable.project_checkdate')+':'" prop="PROJECT_CHECKDATE">
                                <el-input v-model="temp.PROJECT_CHECKDATE"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('projectTable.project_url')+':'" prop="PROJECT_URL">
                                <el-input v-model="temp.PROJECT_URL" width="400px"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                     <el-row>
                        <el-col :span="12">
                    <el-form-item :label="$t('projectTable.project_isonline')+':'" prop="PROJECT_ISONLINE">
                        <el-select v-model="temp.PROJECT_ISONLINE" placeholder="请选择" style="width: 100%;">
                            <el-option label="否" value=0></el-option>
                            <el-option label="是" value=1></el-option>
                        </el-select>
                    </el-form-item>
                        </el-col>
                        <el-col :span="12">
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
import {
    fetchProjectList ////记住修改API
} from "@/frame_src/api/project";
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
            listLoading: false,
            listUpdate: {
                field: undefined,
                RESULT_ID: undefined
            },
            listQuery: {
                page: 1,
                limit: 10,
                PROJECT_CODE: "",
                PROJECT_NAME: ""
            },
            temp: {
                PROJECT_ID: "",
                PROJECT_CODE: "",
                PROJECT_NAME: "",
                PROJECT_PARTYA: "",
                PROJECT_PARTYB: "",
                PROJECT_AMOUNT: "",
                PROJECT_FORM: "",
                PROJECT_SETDATE: "",
                PROJECT_CONTRACTDATE: "",
                PROJECT_CHECKDATE: "",
                PROJECT_URL: "",
                PROJECT_ISONLINE: ""
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
        handleCreate() {
            this.editVisible = true;
            this.dialogStatus = "create";
        },
        handleUpdate() {
            this.editVisible = true;
            this.dialogStatus = "update";
        },
        handleUdelete() {},
        createData() {
            console.log(this.temp.PROJECT_FORM);
        },
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
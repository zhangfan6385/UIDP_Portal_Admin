﻿<template>
    <div class="app-container calendar-list-container">
        <imp-panel>
            <h3 class="box-title" slot="header" style="width: 25%;">
                <h5 v-if="!Useorg">本地组织机构</h5>
                <h5 v-else-if="Useorg">云组织机构</h5>

                <el-button class="filter-item" style="margin-left: 10px;" @click="btnnewAdd" type="primary" icon="el-icon-edit" v-if="!Useorg">添加</el-button>
            </h3>
            <h3 class="box-title" slot="header" style="width: 25%;">
                <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="showUpload=true" v-if="!Useorg">上传</el-button>

                <!-- <input id="excel-upload-input" ref="excel-upload-input" type="file" accept=".xlsx, .xls" class="c-hide" @change="handkeFileChange"> -->
                <!--  <el-button style="margin-left:16px;" size="mini" type="primary" @click="handleUpload">browse</el-button>
  :render-content="renderContent"-->
            </h3>

            <el-row slot="body" :gutter="24" style="margin-bottom: 20px;">
                <el-col :span="6" :xs="24" :sm="24" :md="6" :lg="6" style="margin-bottom: 20px;">
                    <el-tree v-if="roleTree" style="font-size:14px" :data="roleTree" ref="roleTree" highlight-current @node-click="handleNodeClick" clearable node-key="id" :props="defaultProps"></el-tree>
                </el-col>
                <el-col :span="18" :xs="24" :sm="24" :md="18" :lg="18">
                    <el-card class="box-card">

                        <div class="text item">
                            <el-form :rules="rules" :model="form" ref="form">
                                <el-form-item :label="$t('orgTable.parent')+'：'" :label-width="formLabelWidth">
                                    <!--<el-input v-model="form.parentId" auto-complete="off"></el-input>-->
                                    <el-select-tree v-model="form.parentId" :treeData="roleTree" :propNames="defaultProps" clearable placeholder="请选择父级" prop="" @nodeClick="nodeClick">
                                    </el-select-tree>
                                </el-form-item>
                                <!-- <el-form-item v-if="form.parentId==null||form.parentId.length==0" :label="$t('orgTable.orgCode')" prop="orgCode" :label-width="formLabelWidth">
                  <el-input v-model="form.orgCode" auto-complete="off" type="number" onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )"></el-input>
                </el-form-item> -->
                                <el-form-item :label="$t('orgTable.orgCode')+'：'" prop="orgCode" :label-width="formLabelWidth">
                                    <el-input v-model="form.orgCode" auto-complete="off" readonly="true" placeholder="系统自动生成"></el-input>
                                </el-form-item>

                                <el-form-item label="组织机构名称：" prop="orgName" :label-width="formLabelWidth">
                                    <el-input v-model="form.orgName" auto-complete="off"></el-input>
                                </el-form-item>

                                <el-form-item label="组织机构简称：" prop="orgShortName" :label-width="formLabelWidth">
                                    <el-input v-model="form.orgShortName" auto-complete="off"></el-input>
                                    <!-- <el-input v- model="form.orgShortName" auto-complete="off" @change="initFullName"></el-input> -->
                                </el-form-item>
                                <!-- <el-col :span="12" :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
                <el-form-item :label="$t('orgTable.orgNameFull')" prop="orgNameFull" :label-width="formLabelWidth">
                <el-input v-model="form.orgNameFull" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
                <el-form-item :label="$t('orgTable.orgAddr')" prop="orgAddr" :label-width="formLabelWidth">
                <el-input v-model="form.orgAddr" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
                <el-form-item :label="$t('orgTable.phone')" prop="phone" :label-width="formLabelWidth">
                <el-input v-model="form.phone" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
                <el-form-item :label="$t('orgTable.phoneS')" prop="phoneS" :label-width="formLabelWidth">
                <el-input v-model="form.phoneS" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
                <el-form-item :label="$t('orgTable.phoneFax')" prop="phoneFax" :label-width="formLabelWidth">
                <el-input v-model="form.phoneFax" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>-->
                                <el-form-item label="是否有效：" :label-width="formLabelWidth">
                                    <el-radio class="radio" v-model="form.ISINVALID" label="1">有效</el-radio>
                                    <el-radio class="radio" v-model="form.ISINVALID" label="0">无效</el-radio>
                                </el-form-item>
                                <el-form-item :label="$t('orgTable.remark')+'：'" :label-width="formLabelWidth">
                                    <el-input v-model="form.remark" auto-complete="off"></el-input>
                                </el-form-item>
                                <!-- <el-col :span="12" :xs="24" :sm="24" :md="9" :lg="9" :xl="9">-->
                                <el-form-item label="" :label-width="formLabelWidth">

                                    <el-button v-if="form.id==null&&!Useorg" type="primary" @click="onOkSubmit">{{$t('orgTable.add')}}
                                    </el-button>
                                    <el-button v-if="form.id!=null&&!Useorg" type="primary" @click="onUpdateSubmit">{{$t('orgTable.edit')}}
                                    </el-button>
                                    <el-button type="danger" @click="deleteSelected" v-show="form.orgCode && form.orgCode!=null&&!Useorg">{{$t('orgTable.delete')}}
                                    </el-button>

                                </el-form-item>
                            </el-form>
                        </div>
                    </el-card>

                </el-col>
                <el-dialog :visible.sync="showUpload">
                    <el-card class="box-card">
                        <div class="filter-container">
                            <el-upload class="upload-demo" :action="urlUpload" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess" :before-remove="beforeRemove" :headers="headers" :file-list="fileList">
                                <el-button class="filter-item" type="primary" icon="el-icon-edit">点击上传</el-button>
                            </el-upload>
                            <a :href="urldownload" v-if="!Useorg">模板下载</a>
                        </div>
                    </el-card>
                </el-dialog>
            </el-row>

        </imp-panel>

    </div>
</template>
<script>
import {
    fetchOrgList,
    createOrgArticle,
    updateOrgArticle,
    updateOrgData
} from "@/frame_src/api/org";
import UploadExcelComponent from "@/frame_src/components/UploadExcel/index.vue";
import panel from "@/frame_src/components/TreeList/panel.vue";
import selectTree from "@/frame_src/components/TreeList/selectTree.vue";
import treeter from "@/frame_src/components/TreeList/treeter";
import { getToken } from "@/frame_src/utils/auth";
import { GetTitle } from "@/frame_src/api/title";
export default {
    mixins: [treeter],
    components: {
        "imp-panel": panel,
        "el-select-tree": selectTree,
        UploadExcelComponent
    },
    data() {
        return {
            showUpload: false,
            urlUpload: process.env.BASE_API + "org/uploadOrgArticle",
            urldownload: process.env.BASE_API + "ExcelModel/组织机构.xlsx",
            dialogLoading: false,
            dialogVisible: false,
            Useorg: undefined,
            formLabelWidth: "120px",
            defaultProps: {
                children: "children",
                label: "orgShortName",
                id: "id"
            },
            fileList: [], // [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
            listUpdate: {
                field: undefined,
                id: undefined
            },
            listupload: {
                data2: undefined
            },
            roleTree: [],
            rules: {
                orgShortName: [
                    {
                        required: true,
                        message: "组织结构简称不能为空",
                        trigger: "change"
                    }
                ],
                orgName: [
                    {
                        required: true,
                        message: "组织结构名称不能为空",
                        trigger: "change"
                    }
                ],
                ISINVALID: [
                    {
                        required: true,
                        message: "是否有效不能为空",
                        trigger: "change"
                    }
                ]
            },
            resourceTree: [],
            maxId: 700000,

            listQuery: {
                // sysCode: undefined// 回头注释掉
            },
            tempOrgName: "",
            form: {
                id: null, // id: null,
                parentId: null, // parentId  orgid
                orgCode: null, // name: '',
                orgName: "", // enName
                orgNameFull: "", // enName
                // orgAddr: "", // enName
                // phone: "", // enName
                // phoneS: "", // enName
                // phoneFax: "",
                ISINVALID: "",
                remark: "",
                orgShortName: "",
                orgCodeUpper: ""
            },
            CONF_CODE:
                "'PTR_IDENT','LOCAL_IDENT','SYS_NAME','CopyRight','CLOUD_ORG'"
        };
    },
    methods: {
        initFullName(value) {
            var str = this.form.orgName;
            if (value != null && value.length > 0) {
                return (this.form.orgName = this.tempOrgName + "/" + value);
            } else {
                return (this.form.orgName = str.substring(
                    0,
                    str.lastIndexOf("/")
                ));
            }
        },
        getorg() {
            const query = { CONF_CODE: this.CONF_CODE };
            GetTitle(query).then(response => {
                this.Useorg = Boolean(response.data.cloudorg.CONF_VALUE);
            });
        },

        handleNodeClick(data) {
            // 把左侧树的选中数据赋值到右边form表单里。
            //this.form = data;
            this.form = Object.assign({}, data); // copy obj
            this.form.orgCodeUpper = data.orgCode;
        },
        nodeClick(data) {
            //this.tempOrgName=data.orgName;
            //var codenum=data.children.length+1;
            // this.form.orgName=data.orgName;
            // this.form.orgCode=data.orgCode;
            this.form.orgCodeUpper = data.orgCode;
            //this.form.orgCode=data.orgCode+(Array(3).join("0")+codenum).slice(-3);
        },
        btnnewAdd() {
            // this.form.parentId=this.form.id
            // this.form.id=null;
            // this.form.orgShortName="";
            // this.form.remark="";

            // 增加新的角色数据
            this.$refs["form"].resetFields();
            this.form = {
                id: null,
                orgCodeUpper: this.form.orgCodeUpper,
                parentId: this.form.id, // parentId  orgid
                orgCode: null, // name: '',
                orgName: "", // enName
                orgNameFull: "", // enName
                // orgAddr: "", // enName
                // phone: "", // enName
                // phoneS: "", // enName
                // phoneFax: "",
                ISINVALID: "1",
                remark: "",
                orgShortName: ""
            };
        },
        newAdd() {
            // 增加新的角色数据
            this.$refs["form"].resetFields();
            this.form = {
                id: null,
                parentId: this.form.id,
                orgCode: "", // name: '',
                orgName: "", // enName
                orgNameFull: "", // enName
                // orgAddr: "", // enName
                // phone: "", // enName
                // phoneS: "", // enName
                // phoneFax: "",
                ISINVALID: "1",
                remark: "",
                orgShortName: ""
            };
        },
        onOkSubmit() {
            // 创建成功按钮
            this.$refs["form"].validate(valid => {
                if (valid) {
                    createOrgArticle(this.form).then(response => {
                        var message = response.data.message;
                        var title = "失败";
                        var type = "error";
                        if (response.data.code === 2000) {
                            title = "成功";
                            type = "success";
                            this.newAdd();
                            this.load();
                        }
                        this.$notify({
                            position: "bottom-right",
                            title: title,
                            message: message,
                            type: type,
                            duration: 2000
                        });
                        this.$refs["form"].resetFields();
                    });
                }
            });
        },
        onUpdateSubmit() {
            // 修改角色信息方法
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.ISINVALID == "1") {
                        this.form.orgShortName = this.form.orgShortName.replace(
                            "(无效)",
                            ""
                        );
                        this.form.orgName = this.form.orgName.replace(
                            "(无效)",
                            ""
                        );
                    }
                    updateOrgData(this.form).then(response => {
                        // 调用修改方法
                        var message = response.data.message;
                        var title = "失败";
                        var type = "error";
                        if (response.data.code === 2000) {
                            title = "成功";
                            type = "success";
                            this.newAdd();
                            this.load();
                        }
                        this.$notify({
                            position: "bottom-right",
                            title: title,
                            message: message,
                            type: type,
                            duration: 2000
                        });
                    });
                }
            });
        },
        deleteSelected(id) {
            // 删除方法

            this.$confirm("是否确认删除该条记录?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.listUpdate.id = this.form.orgCode; // 传递id
                    this.listUpdate.field = "deletaStatus"; // 传递判断参数
                    updateOrgArticle(this.listUpdate).then(response => {
                        var message = response.data.message;
                        var title = "失败";
                        var type = "error";
                        if (response.data.code === 2000) {
                            this.deleteFromTree(
                                this.roleTree,
                                this.form.id,
                                "id"
                            ); // 调用删除假数据的树里的方法
                            title = "成功";
                            type = "success";
                            this.newAdd();
                            //  this.load2();
                        }
                        this.$notify({
                            position: "bottom-right",
                            title: title,
                            message: message,
                            type: type,
                            duration: 2000
                        });
                    });
                })
                .catch(() => {});

            // this.load();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleSuccess(res, file, fileList) {
            var message = res.message;
            var title = "失败";
            var type = "error";
            if (res.code === 2000) {
                this.newAdd();
                this.load();
                title = "成功";
                type = "success";
            }
            this.$notify({
                position: "bottom-right",
                title: title,
                message: message,
                type: type,
                duration: 2000
            });
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 1个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        beforeRemove(file, fileList) {
            // return this.$confirm(`确定移除 ${file.name}？`)
        },

        load() {
            // 查询数据
            // this.listQuery.sysCode = '1'// 回头注释掉
            fetchOrgList().then(response => {
                this.roleTree = response.data.items;
                // this.roleTree.push(...defaultValue.roleList);
            });
        },
        renderContent(h, { node, data, store }) {
            // 左侧树的遍历
            return (
                <span>
                    <span>
                        <span>{node.label}</span>
                    </span>
                    <span class="render-content">
                        <i
                            class="fa fa-trash"
                            on-click={() => this.deleteSelected(data.id)}
                        />
                    </span>
                </span>
            );
        }
    },
    mounted() {},
    created() {
        // 创建页面的初始化方法
        this.load();
        this.getorg();
    },
    computed: {
        headers() {
            return {
                "X-Token": getToken()
            };
        }
    }
};
</script>
<style lang="scss" scoped>
.render-content {
    float: right;
    margin-right: 20px;
}

.render-content i.fa {
    margin-left: 10px;
}

.render-content i.fa:hover {
    color: #e6000f;
}

.select-tree .el-scrollbar.is-empty .el-select-dropdown__list {
    padding: 0;
}

.select-tree .el-scrollbar {
    border: 1px solid #d1dbe5;
}

.select-tree .el-tree {
    border: 0;
}
</style>
<style lang="scss" >
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: rgb(170, 166, 166) !important;
}
.el-tree-node__content:hover {
    background-color: #c5c7c9 !important;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type="number"] {
    -moz-appearance: textfield;
}
</style>
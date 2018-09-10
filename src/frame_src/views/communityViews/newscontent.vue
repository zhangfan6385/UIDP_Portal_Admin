<template>
    <!--主贴界面-->
    <div id="newscontent" class="newscontent">
        <el-row :gutter="20" type="flex">
            <el-col :span="2"> </el-col>
            <el-col :span="20">
                <div class="card">
                    <!--主楼标题按钮界面-->
                    <el-card>
                        <div slot="header" class="cardheader">
                            <span>{{cardcontent.TITLE_NAME}}</span>
                            <div class="operation">
                                <el-button size="mini" @click="delcard" type="danger">
                                    <i class="el-icon-warning"></i>删除本帖
                                </el-button>
                                <!-- <el-button size="mini" @click="collection" v-if="cardcontent.COLLECTION_STATE==='0'">
                                    <i class="el-icon-circle-plus"></i>收藏
                                </el-button>
                                <el-button size="mini" @click="uncollection" v-else-if="cardcontent.COLLECTION_STATE==='1'">
                                    <i class="el-icon-remove"></i>取消收藏
                                </el-button> -->
                                <el-button size="mini" type="info" @click="goAnchor">回复</el-button>
                                <el-button size="mini" type="primary" @click="back">后退</el-button>
                            </div>
                        </div>
                        <!--主贴头像区域-->
                        <el-row>
                            <el-col :span="6">
                                <div class="userhead">
                                    <img src="../../../frame_src/imgs/userHead.png">
                                    <div class="logo">
                                        <el-button type="primary" size="mini">楼主</el-button>
                                        <br> {{cardcontent.USER_NAME}}
                                    </div>
                                </div>
                            </el-col>
                            <!--主贴信息界面-->
                            <el-col :span="17">
                                <div class="content">
                                    <p v-html="cardcontent.POST_CONTENT"></p>
                                </div>
                            </el-col>
                        </el-row>
                        <div class="foot">
                            <el-row>
                                <el-col :span="24">
                                    发表日期：{{cardcontent.SEND_DATE}}
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                    <!--回复-->
                    <el-card v-for="(commit,key) in cardcontent.children" :key="key">
                        <el-row>
                            <el-col :span="6">
                                <div class="userhead">
                                    <!-- <img src="../../../app_src/imgs/userHead.png"> -->
                                    <div class="logo">
                                        <el-button type="primary" size="mini">{{key+2}}楼</el-button>
                                        <br> {{commit.USER_NAME}}
                                    </div>
                                </div>
                            </el-col>
                            <!--主贴信息界面-->
                            <el-col :span="17">
                                <div class="content">
                                    <p v-html="commit.CONTENT"></p>
                                </div>
                            </el-col>
                        </el-row>
                        <div class="foot">
                            <el-row>
                                <el-col :span="24">
                                    发表日期：{{commit.CREATE_DATE}}
                                    <el-button type="text" @click="delcommit(commit)">删除</el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                    <el-card>
                        <!-- <div slot="header" class="clearfix">
                            <span>发表回复</span>
                        </div> -->
                        <!-- <el-form :model="commit">
                            <el-form-item label="用途类型">
                                <el-input v-model="commit.CONTENT"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submit">提 交</el-button>
                            </el-form-item>
                        </el-form> -->
                        <el-form ref="commit" :model="commit" label-width="80px" id="commit">
                            <el-form-item :label="type" :rules="rules.content">
                                <div class="editor">
                                    <quill-editor v-model="commit.CONTENT" ref="myQuillEditor" :options="commit.editorOption" @ready="onEditorReady($event)" height="500px"></quill-editor>
                                </div>

                                <el-form-item>
                                    <el-button type="primary" @click="submit">确认提交</el-button>
                                </el-form-item>

                            </el-form-item>
                        </el-form>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>


<script>
import {
    getDetail,
    createArticle,
    delArticle,
    commit,
    delcommit,
    delcard,
    updateLookTimes
} from "@/frame_src/api/communityDetail";
import { quillEditor } from "vue-quill-editor";
export default {
    data() {
        return {
            cardcontent: {},
            type: "",
            queryList: {
                POST_ID: null,
                USER_ID: null
            },
            createList: {
                POST_ID: "",
                COLLECTION_PERSON_ID: null
            },
            delComentList: {
                COMMENT_ID: null
            },
            delCardList: {
                POST_ID: ""
            },
            commit: {
                POST_ID: "",
                CONTENT: "",
                FROM_UID: "", //当前登录人ID
                //TO_UID:'',//主贴ID
                IS_RIGHT_ANSWER: 0,
                BONUS_POINTS: 0
            },
            rules: {
                content: [
                    {
                        required: true,
                        message: "请输入详细内容",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        //获取帖子内容
        getCardDetail() {
            this.queryList.POST_ID = this.$route.params.id;
            this.queryList.USER_ID = this.$store.state.user.userId;
            //this.queryList.USER_ID=1;
            getDetail(this.queryList).then(response => {
                if (response.data.code === 2000) {
                    this.cardcontent = response.data.items;
                    if (this.cardcontent.POST_TYPE === 3) {
                        this.type = "回复";
                    } else {
                        this.type = "评论";
                    }
                } else {
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
        collection() {
            if (this.$store.state.user.userId === null) {
                this.$store.state.user.dialogLoginVisible = true;
            } else {
                this.createList.COLLECTION_PERSON_ID = this.$store.state.user.userId;
                this.createList.POST_ID = this.cardcontent.POST_ID;
                createArticle(this.createList).then(response => {
                    if (response.data.code === 2000) {
                        this.$notify({
                            position: "bottom-right",
                            title: "收藏成功",
                            message: response.data.message,
                            type: "success",
                            duration: 2000
                        });
                    } else {
                        this.$notify({
                            position: "bottom-right",
                            title: "失败",
                            message: response.data.message,
                            type: "error",
                            duration: 2000
                        });
                    }
                });
            }
        },
        uncollection() {
            if (this.$store.state.user.userId === null) {
                this.$store.state.user.dialogLoginVisible = true;
            } else {
                this.createList.COLLECTION_PERSON_ID = this.$store.state.user.userId;
                this.createList.POST_ID = this.cardcontent.POST_ID;
                delArticle(this.createList).then(response => {
                    if (response.data.code === 2000) {
                        this.$notify({
                            position: "bottom-right",
                            title: "取消收藏成功",
                            message: response.data.message,
                            type: "success",
                            duration: 2000
                        });
                    } else {
                        this.$notify({
                            position: "bottom-right",
                            title: "失败",
                            message: response.data.message,
                            type: "error",
                            duration: 2000
                        });
                    }
                });
            }
        },
        onEditorReady(editor) {},
        submit() {
            if (this.$store.state.user.userId === null) {
                dialogLoginVisible = true;
            } else {
                this.commit.POST_ID = this.cardcontent.POST_ID;
                this.commit.FROM_UID = this.$store.state.user.userId;
                //this.commit.FROM_UID = 1;
                this.commit.TO_UID = this.cardcontent.USER_ID;
                commit(this.commit).then(response => {
                    if (response.data.code === 2000) {
                        this.$notify({
                            position: "bottom-right",
                            title: "发表成功",
                            message: response.data.message,
                            type: "success",
                            duration: 2000
                        });
                        this.getCardDetail();
                    } else {
                        this.$notify({
                            position: "bottom-right",
                            title: "失败",
                            message: response.data.message,
                            type: "error",
                            duration: 2000
                        });
                    }
                });
            }
        },
        goAnchor() {
            window.location.hash = "commit";
        },
        back() {
            this.$router.go(-1);
        },
        delcard() {
            this.delCardList.POST_ID = this.cardcontent.POST_ID;
            delcard(this.delCardList).then(response => {
                if (response.data.code === 2000) {
                    this.$notify({
                        position: "bottom-right",
                        title: "删帖成功",
                        message: response.data.message,
                        type: "success",
                        duration: 2000
                    });
                    this.$router.push({ path: "/community/main/index" });
                } else {
                    this.$notify({
                        position: "bottom-right",
                        title: "删帖失败",
                        message: response.data.message,
                        type: "error",
                        duration: 2000
                    });
                }
            });
        },
        delcommit(data) {
            this.delComentList.COMMENT_ID = data.COMMENT_ID;
            delcommit(this.delComentList).then(response => {
                if (response.data.code === 2000) {
                    this.$notify({
                        position: "bottom-right",
                        title: "删除成功",
                        message: response.data.message,
                        type: "success",
                        duration: 2000
                    });
                    this.getCardDetail();
                } else {
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
        update() {
            this.delCardList.POST_ID = this.$route.params.id;
            updateLookTimes(this.delCardList)
        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        }
    },
    components: {
        quillEditor
    },
    mounted() {
        this.getCardDetail();
        this.update();
    }
};
</script>



<style lang="scss">
.newscontent {
    margin-top: 10px;
    .card {
        .content {
            line-height: 20px;
        }
        .foot {
            float: right;
            right: 0;
            font-size: 10px;
            color: gray;
            font-family: "Times New Roman", Times, serif;
        }
    }
    .cardheader {
        .operation {
            float: right;
            margin-right: 30px;
            margin-bottom: 20px;
        }
    }
    .userhead {
        margin-top: 20px;
        text-align: center;
        img {
            width: 150px;
            height: 150px;
        }
        .logo {
            margin-top: 20px;
        }
    }
    .commit {
        margin-top: 35px;
    }
    .commitcontent {
        margin-top: 10px;
        margin-left: 15px;
        font-size: 12px;
        color: gray;
    }
    .commitfoot {
        float: right;
        bottom: 0;
        font-size: 8px;
        right: 0;
    }
    .commitfootbutton {
        float: right;
        margin-top: 20px;
    }
    .commitfootinput {
        margin-top: 20px;
    }
    .commithead {
        text-align: right;
        img {
            width: 30px;
            height: 30px;
        }
    }
    .post {
        margin-top: 20px;
    }
}
</style>




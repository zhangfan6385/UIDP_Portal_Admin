<template>
        <div  v-loading="imageLoading"
                       element-loading-text="请稍等，图片上传中">
        <quill-editor ref="newEditor" v-model="mycontent"
               :options="editorOption" 
               @blur="onEditorBlur($event)" 
               @focus="onEditorFocus($event)"
               @change="onEditorChange($event)">
         </quill-editor>
                         <!-- 文件上传input 将它隐藏-->
                           <el-upload style="display:none"  :action="apiUrl" :show-file-list="false" :before-upload='newEditorbeforeupload'  :on-success='newEditorSuccess'
                           ref="uniqueId" id="uniqueId">
                           </el-upload >
                       </div>
</template>
<script>
import Quill from 'quill'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
        props: {
             content:{
                    type:String
                    //required: true
                    //default:'这是一个模态框'
                },
                apiUrl:{
                    type:String,
                    required: true
                }


    },
        data:function(){
            return{
                //editcontent:content,
                //apiUrl:"",
                mycontent: this.content,//data中新增字段
                imageLoading:false,
                editorOption:{}
            }
        },
        watch: {
        content(val) {
            this.myResult = val;//新增result的watch，监听变更并同步到myResult上
        }
    },
        mounted(){
              var imgHandler = async function(state) {
                  if (state) {
                  var fileInput =document.querySelector('#uniqueId input') //隐藏的file元素
                   fileInput.click() //触发事件
                  }
              }
             this.$refs.newEditor.quill.getModule("toolbar").addHandler("image", imgHandler) 
           
              },
        components:{
            quillEditor
        },
        methods:{
            newEditorbeforeupload(file){                   
                         const isJPG = file.type === 'image/jpeg' ||file.type ===  'image/png';
                        const isLt2M = file.size / 1024 / 1024 < 2;
                        if (!isJPG) {
                            this.$message.error('上传图片只能是 JPG或PNG 格式!');
                        }
                        if (!isLt2M) {
                            this.$message.error('上传图片大小不能超过 2MB!');
                        }
                    if(isJPG && isLt2M)this.imageLoading =true
                         return isJPG && isLt2M;                                            
                },
                    //上传图片回调 
                newEditorSuccess(response, file, fileList){
                    // if(response.status===1){     
                    if(response!=""){                    
                        this.addImgRange = this.$refs.newEditor.quill.getSelection()
                        this.$refs.newEditor.quill.insertEmbed(this.addImgRange != null?this.addImgRange.index:0, 'image',process.env.BASE_API+response, Quill.sources.USER)
                    }
                  this.imageLoading =false
                },
            onEditorBlur(editor){//失去焦点事件    
 	    },
            onEditorFocus(editor){//获得焦点事件
            },
            onEditorChange({editor,html,text}){//编辑器文本发生变化
                //this.content可以实时获取到当前编辑器内的文本内容
                let data={
                    editorContent:html
                };
                this.$emit("listenToEditorChange",data)
                
            }
        },


}
 
</script>
<style>
    .quill-editor {
        height: 100%;
        width:100%;
    }
    #appQuill {
        height: 100%;
        width:100%;
    }
</style>

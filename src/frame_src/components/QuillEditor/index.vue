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
// 工具栏配置
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
  ["blockquote", "code-block"], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
  [{ script: "sub" }, { script: "super" }], // 上标/下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  [{ size: ["small", false, "large", "huge"] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: ['SimSun', 'SimHei','Microsoft-YaHei','KaiTi','FangSong'] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ["clean"], // 清除文本格式
//   ["link", "image", "video"] // 链接、图片、视频
  ["link", "image"] // 链接、图片、视频
];

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
                editorOption:{
                    placeholder: "",
                    theme: "snow", // or 'bubble'
                    placeholder: "您想说点什么？",
                    modules: {
                        toolbar: {
                            container: toolbarOptions,
                        }
                    }
                }
            }
        },
        watch: {
        content(val) {
            this.mycontent = val;//新增result的watch，监听变更并同步到myResult上
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
    .ql-snow .ql-tooltip[data-mode=link]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存';
    padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode=video]::before {
    content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
  content: '10px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
  content: '18px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
  content: '32px';
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: '标题1';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: '标题2';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: '标题3';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: '标题4';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: '标题5';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: '标题6';
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=SimSun]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=SimSun]::before {
    content: "宋体";
    font-family: "SimSun";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=SimHei]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=SimHei]::before {
	content: "黑体";
	font-family: "SimHei";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Microsoft-YaHei]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Microsoft-YaHei]::before {
	content: "微软雅黑";
	font-family: "Microsoft YaHei";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=KaiTi]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=KaiTi]::before {
	content: "楷体";
	font-family: "KaiTi";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=FangSong]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=FangSong]::before {
	content: "仿宋";
	font-family: "FangSong";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Arial]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Arial]::before {
	content: "Arial";
	font-family: "Arial";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Times-New-Roman]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Times-New-Roman]::before {
	content: "Times New Roman";
	font-family: "Times New Roman";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=sans-serif]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=sans-serif]::before {
	content: "sans-serif";
	font-family: "sans-serif";
}
.ql-font-SimSun {
  	font-family: "SimSun";
}
.ql-font-SimHei {
  	font-family: "SimHei";
}
.ql-font-Microsoft-YaHei {
  	font-family: "Microsoft YaHei";
}
.ql-font-KaiTi {
  	font-family: "KaiTi";
}
.ql-font-FangSong {
  	font-family: "FangSong";
}
.ql-font-Arial {
  	font-family: "Arial";
}
.ql-font-Times-New-Roman {
  	font-family: "Times New Roman";
}
.ql-font-sans-serif {
  	font-family: "sans-serif";
} 
</style>

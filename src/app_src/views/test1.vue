<template>
<div id="quill">
    <span style="padding:50px;line-height:100px;">第三方演示页面</span>
    <div class="are">
     <quill-editor>
    </quill-editor>
     </div>
   
</div>
</template>
<script>
import  quillEditor  from '@/frame_src/components/QuillEditor'
export default {
    name:'aaa',
        data:function(){
            return{
                dcontent:'asfdsaf'
            }
        },
        components:{
            quillEditor
        }
}
 
</script>
<style>
.are{
    height: 200px;
    width:500px;
}
</style>
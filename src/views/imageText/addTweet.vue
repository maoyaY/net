<template>
    <div class="m-addTweet">
      <h3 class="m-part-title">
        <span>
           <span class="m-part-title-icon"></span>
           <span>文章编辑</span>
        </span>
      </h3>
      <el-form ref="form" :model="form" :rules="rules" label-width="1.2rem" label-position="right" class="demo-ruleForm">
        <el-form-item label="标题：" required>
          <el-input v-model="form.news_title" class="m-input-m" placeholder="输入推文标题"></el-input>
        </el-form-item>
        <el-form-item label="标题图：" required>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <span class="m-upload-img"></span>
          </el-upload>
          <p class="m-alert-text">建议尺寸：X*X像素,图片大小XMB以内</p>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="详细">
          <div class="edit_container">
            <quill-editor v-model="form.news_all"
                          ref="myQuillEditor"
                          class="editer"
                          :options="form.editorOption" @ready="onEditorReady($event)">
            </quill-editor>
          </div>
        </el-form-item>

        <el-form-item label="标签：" required>
          <el-select v-model="value" class="m-input-m" placeholder="请选择">
            <el-option
              v-for="item in tab"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-popover
            placement="right"
            width="400"
            trigger="click">
            <h3>新建标签</h3>
            <div style="margin: 0.2rem 0;">
              <el-input v-model="input" placeholder="请输入标签名称"></el-input>
            </div>
            <div class="m-modal-btn-box" style="text-align: center;">
              <span class="m-btn active">保存</span>
              <span class="m-btn ">取消</span>
            </div>
            <span class="m-add-text" slot="reference">+新增标签</span>
          </el-popover>

        </el-form-item>


        <div class="m-form-btn-box">
          <span class="m-form-btn active">保存</span>
          <span class="m-form-btn " >取消</span>
        </div>
      </el-form>
    </div>
</template>

<script>
  import 'quill/dist/quill.core.css'

  import 'quill/dist/quill.snow.css'

  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor' //调用编辑器
    export default {
       data(){
         return{
           form:{
             news_id: "",
             news_title: "",
             news_all: "",
             news_picture: "",
             news_writer: "",
             news_time: "",
             editorOption:{}
           },
           rules:{
             PRname:[
               { required: true, message: '请输入商品名称', trigger: 'blur' }
             ],
             news_all: [
               {required: true, message: '请输入详细内容', trigger: 'blur'}
             ]
           },
           dialogImageUrl: '',
           dialogVisible: false,
           options: [{
             value: '选项1',
             label: '黄金糕'
           }, {
             value: '选项2',
             label: '双皮奶'
           }, {
             value: '选项3',
             label: '蚵仔煎'
           }, {
             value: '选项4',
             label: '龙须面'
           }, {
             value: '选项5',
             label: '北京烤鸭'
           }],
           value: ''
         }
       },
      computed: {
        editor() {
          return this.$refs.myQuillEditor.quill
        }
      },
      components: {
//使用编辑器
        quillEditor
      },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      onEditorReady(editor) {
      },
      onSubmit() {
        //提交
//this.$refs.infoForm.validate，这是表单验证
        this.$refs.infoForm.validate((valid) => {
          if(valid) {
            this.$post('m/add/about/us',this.infoForm).then(res => {
              if(res.errCode == 200) {
                this.$message({
                  message: res.errMsg,
                  type: 'success'
                });
                this.$router.push('/aboutus/aboutlist');
              } else {
                this.$message({
                  message: res.errMsg,
                  type:'error'
                });
              }
            });
          }
        });
      }

    }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>

  @import "../../common/css/_variate";
  .m-addTweet{
    .m-part-title{
      margin-bottom: 0.1rem;
      &.m-mr-top{
        margin-top: 1rem;
      }
    }
    .m-add-text{
      margin-left: 0.5rem;
    }
    .m-product-box{
      flex-wrap: wrap;
    }
    .m-one-product{
      width:1.5rem;
      height:2.1rem;
      border:1px dashed #707070;
      border-radius: 5px;
      padding: 0.1rem 0;
      color: #595757;
      text-align: center;
      margin-right: 0.2rem;
      margin-bottom: 0.2rem;
      img.m-product-img{
        display: block;
        width: 1.28rem;
        height: 1.28rem;
      }
      p{
        line-height: 0.36rem;
        text-align: left;
        padding: 0 0.1rem;
        .m-price{
          color: #E50012;
        }
      }
      .el-upload--picture-card{
        width: 1.28rem;
        height: 1.28rem;
      }
    }

  }

</style>

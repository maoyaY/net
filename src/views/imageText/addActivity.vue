<template>
  <div class="m-addTweet">
    <h3 class="m-part-title">
        <span>
           <span class="m-part-title-icon"></span>
           <span>活动编辑</span>
        </span>
    </h3>
    <el-form ref="form" :model="form" :rules="rules" label-width="1.2rem" label-position="right" class="demo-ruleForm">
      <el-form-item label="标题：" required>
        <el-input v-model="form.name" class="m-input-m" placeholder="输入活动专题名称"></el-input>
      </el-form-item>
      <!--</el-form-item>-->
      <el-form-item label="封面：" required>
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <span class="m-upload-img"></span>
        </el-upload>
        <p class="m-alert-text">添加banner图片，
          建议尺寸：682*324像素</p>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="正文：" >
        <el-form-item prop="date1">
          <el-input type="textarea" v-model="form.desc" class="m-input-m"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="图片：" >
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <span class="m-upload-img"></span>
        </el-upload>
        <p class="m-alert-text">建议尺寸：750*450像素</p>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="视频：" >
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <span class="m-upload-video"></span>
        </el-upload>
        <p class="m-alert-text">建议大小：10MB以内</p>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <h3 class="m-part-title m-mr-top">
          <span>
             <span class="m-part-title-icon"></span>
             <span>商品绑定</span>
          </span>
      </h3>
      <el-form-item label="商品：" >
        <div class="m-flex-start m-product-box">
          <div class="m-one-product">
            <img src="" class="m-product-img" alt="">
            <p class="m-flex-between">
              <span>商品1</span>
              <span class="m-price">¥1</span>
            </p>
            <p>123</p>
          </div>
          <div class="m-one-product">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :show-file-list="false"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <span class="m-upload-img"></span>
            </el-upload>
          </div>
        </div>

      </el-form-item>

      <h3 class="m-part-title m-mr-top">
          <span>
             <span class="m-part-title-icon"></span>
             <span>优惠券绑定</span>
          </span>
      </h3>
      <el-form-item label="优惠券：" >
        <el-select v-model="value5" class="m-input-m" multiple placeholder="选择优惠券">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>


      <div class="m-form-btn-box">
        <span class="m-form-btn active">保存</span>
        <span class="m-form-btn ">取消</span>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        form:{
          resource:'',
          date1:'',
          name:'',
          desc:''
        },
        rules:{
          PRname:[
            { required: true, message: '请输入商品名称', trigger: 'blur' }
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
        value: '',
        value5:[]
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
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

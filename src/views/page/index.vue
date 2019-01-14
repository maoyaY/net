<template>
    <div class="m-page">
      <page-nav :list="nav_list" class="m-bd" @navClick="navClick"></page-nav>

      <h3 class="m-part-title m-flex-start form-section-title">
        <span class="m-part-title-icon"></span>
        <span>{{select.tabs_name}}管理</span>
      </h3>
      <div class="m-img-management-box" v-if="select.value != 'index_pic'">
        <p class="m-img-label">顶部轮播图：</p>
        <div class="m-up-img-box">
          <div class="inputbg m-img-xl el-upload-list--picture-card" v-for="(item,index) in image_list" v-if="image_list.length >0 ">
            <img :src="item"   style="width:6.5rem;height:1.6rem;"/>
            <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="CardPreviewMain(index)">
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span class="el-upload-list__item-delete" @click="imgRemoveMain(index)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
          </div>

          <div class="inputbg "><span>+添加图片</span><input type="file" id="main" accept="image/*" @change="imgUploadDetailMain"></div>
        </div>
        <p class="m-alert-text">建议尺寸：750*160像素</p>
      </div>
      <div class="m-img-management-box" v-else v-for="(item,index) in banner_list" >
        <p class="m-img-label">首页广告位{{index +1}}：</p>
        <div class="m-up-img-box" >
          <div class="inputbg m-img-xl el-upload-list--picture-card" v-if="item.img">
            <img :src="item.img"   style="width:6.5rem;height:1.6rem;"/>
            <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="CardPreviewMain(index,'banner')">
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span class="el-upload-list__item-delete" @click="imgRemoveMain(index,'banner')">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
          </div>

          <div class="inputbg "><span>+添加图片</span><input type="file" :id="index" accept="image/*" @change="imgUploadDetail($event,index)"></div>
        </div>
        <p class="m-alert-text">建议尺寸：750*160像素</p>
        <el-row class="m-input-row">
          <el-col :span="2" ><span>跳转地址:</span></el-col>
          <el-col :span="12"><el-input v-model="banner_list[index].url" placeholder="请输入内容"></el-input></el-col>
        </el-row>
      </div>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <div class="m-form-btn-box">
        <span class="m-form-btn active" @click="submitSure">确定</span>
        <span class="m-form-btn" @click="changeRoute('-1')"> 取消</span>
      </div>
      <!--<div class="m-img-management-box">-->
        <!--<p class="m-img-label">分割轮播图：</p>-->
        <!--<el-upload-->
          <!--action="https://jsonplaceholder.typicode.com/posts/"-->
          <!--list-type="picture-card"-->
          <!--:on-preview="handlePictureCardPreview"-->
          <!--:on-remove="handleRemove">-->
          <!--<i class="el-icon-plus"></i>-->
        <!--</el-upload>-->
        <!--<el-dialog :visible.sync="dialogVisible">-->
          <!--<img width="100%" :src="dialogImageUrl" alt="">-->
        <!--</el-dialog>-->
        <!--<p class="m-alert-text">建议尺寸：X*X像素</p>-->
      <!--</div>-->
    </div>
</template>

<script>
  import pageNav from '../../components/common/pageNav';
  import axios from 'axios';
  import api from '../../api/api';
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor' //调用编辑器
    export default {
        data(){
          return{
            nav_list:[
              {
                tabs_name:'首页',
                value:'load_pic',
                active:true
              },
              {
                tabs_name:'保健护理',
                value:'load_pic_second',
                active:false
              },
              {
                tabs_name:'医药产品',
                value:'load_pic_third',
                active:false
              },
              {
                tabs_name:'健康服务',
                value:'load_pic_fourth',
                active:false
              },
              {
                tabs_name:'首页广告',
                value:'index_pic',
                active:false
              }
            ],
            select:{
              tabs_name:'首页',
              value:'load_pic',
              active:true,
              num:20
            },
            dialogImageUrl: '',
            dialogVisible: false,
            image_list:[],
            all_img:[],
            banner_list:[
              {
                url:'',
                img:''
              },
              {
                url:'',
                img:''
              },
              {
                url:'',
                img:''
              }
            ],
            all_banner:[]
          }
        },
      components:{
        pageNav
      },
      mounted(){
          this.getInfo();
      },
      methods:{
        navClick(index){
          let arr = [].concat(this.nav_list);
          for(let i=0;i<arr.length;i++){
            arr[i].active = false;
          }
          arr[index].active =true;
          this.nav_list = [].concat(arr);
          this.select = this.nav_list[index];
          this.getInfo();
        },

        /*轮播图片删除*/
        imgRemoveMain(index,name){
          if(name){
            this.banner_list[index].img = ''
            var file = document.getElementById(index);
            file.value ='';
          }else{
            this.image_list.splice(index, 1);
            var file = document.getElementById('main');
            file.value ='';
          }

        },
        /*轮播图片大图显示*/
        CardPreviewMain(index,name){
          this.dialogVisible = true;
          if(name){
            this.dialogImageUrl =  this.banner_list[index].img;
          }else{
            this.dialogImageUrl =  this.image_list[index];
          }

        },
        /*轮播图片上传重定向*/
        imgUploadDetailMain(event,index){
          if(this.image_list.length > 5){
            this.$message({
              type:'warning',
              message:'一个类型只能上传5张照片'
            });
            return false;
          }
          let form = new FormData();
          form.append("file", event.target.files[0]);
          form.append("FileType", this.select.value);
          axios.post(api.upload_files ,form).then(res => {
            if(res.data.status == 200){
              this.image_list.push(res.data.data);
              var file = document.getElementById('main');
              file.value ='';
            }else{
              this.$message({
                type: 'error',
                message: '服务器请求失败，请稍后再试 '
              });
            }
          },error =>{
            this.$message({
              type: 'error',
              message: '服务器请求失败，请稍后再试 '
            });
          })
        },
        /*轮播图片上传重定向*/
        imgUploadDetail(event,index){
          if(this.banner_list[index].img.length > 1){
            this.$message({
              type:'warning',
              message:'一个类型只能上传一张照片'
            });
            return false;
          }
          let form = new FormData();
          form.append("file", event.target.files[0]);
          form.append("FileType", this.select.value);
          axios.post(api.upload_files ,form).then(res => {
            if(res.data.status == 200){

              let arr = [].concat(this.banner_list);
              arr[index].img = res.data.data;
              this.banner_list = [].concat(arr);
              var file = document.getElementById(index);
              file.value ='';
            }else{
              this.$message({
                type: 'error',
                message: '服务器请求失败，请稍后再试 '
              });
            }
          },error =>{
            this.$message({
              type: 'error',
              message: '服务器请求失败，请稍后再试 '
            });
          })
        },
        changeRoute(v){
          this.$router.go(v)
        },
        //确定
        submitSure(){
          axios.post(api.update_config +'?select_name='+this.select.value,{
            select_value:this.select.value == 'index_pic'?this.banner_list : this.image_list
          }).then(res => {
              if(res.data.status == 200){
                this.$message({
                  type: 'success',
                  duration:1000,
                  message: res.data.message
                });
              }else{
                this.$message({
                  type: 'warning',
                  duration:1000,
                  message: res.data.message
                });
              }
          })
        },
      //  获取参数
        getInfo(){
          axios.get(api.get_config,{
            params:{
              select_name:this.select.value
            }
          }).then(res => {
             if(res.data.status == 200){

                if(this.select.value == 'index_pic'){
                  this.banner_list = res.data.data.select_value;
                  this.all_banner = res.data.data.select_value
                }else{
                  this.all_img = res.data.data.select_value;
                  this.image_list = res.data.data.select_value;
               }
             }else{

               if(this.select.value == 'index_pic'){
                 this.banner_list = res.data.data.select_value;
                 this.all_banner = res.data.data.select_value
               }else{
                 this.all_img = [];
                 this.image_list = [];
               }
             }
          })
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/css/_variate";
    .m-img-management-box{
      padding-bottom: 0.2rem ;
      border-top: 1px solid #eee;
      margin-top: 0.2rem;
      .m-img-label{
        padding: 0.2rem 0;
      }
      .m-alert-text{
        margin-top: 0.2rem;
      }
    }
  .m-input-row{
    margin: 0.2rem 0;
  }
  .el-upload-list--picture-card .el-upload-list__item-actions:hover {
    opacity: 1;
  }
  .m-up-img-box{
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    .el-upload-list__item-actions {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0,0,0,.5);
      -webkit-transition: opacity .3s;
      transition: opacity .3s;
      border-radius: 6px;
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: center;
      span {
        cursor: pointer;
      }
    }
  }
  .inputbg{
    margin-left: 10px;
    color: #97ADCB;
    border: 1px solid #eeeeee;
    background-color: #fbfdff;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    width: 1.6rem;
    height: 1.6rem;
    line-height: 1.6rem;
    text-align: center;
    margin-bottom: 0.2rem;
    &.m-img-xl{
      width: 6.5rem;
    }
  }
  .inputbg input{
    position: absolute;
    top: 0;
    left: 0;
    opacity:0;
    filter:alpha(opacity=0);
    width: 1.6rem;
    height: 1.6rem;
    line-height: 1.6rem;
    cursor: pointer;
  }
</style>

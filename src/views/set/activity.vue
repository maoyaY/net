<template>
    <div class="m-imageText">
      <page-nav :list="nav_list" class="m-bd" @navClick="navClick"></page-nav>
      <h3 class="m-part-title m-flex-between">
        <span>
           <span class="m-part-title-icon"></span>
           <span>{{select.tabs_name}}</span>
        </span>
      </h3>

      <div class="m-content">
        <div class="edit_container">
          <quill-editor v-if="select.tabs_name == '合作伙伴'"
            v-model="select_value"
                        ref="myQuillEditor"
                        class="editer"
                        :options="editorOption" @ready="onEditorReady($event)">
          </quill-editor>
            <div class="m-up-img-box" v-else>
              <div class="inputbg m-img-xl el-upload-list--picture-card" v-if="select_value">

                <img :src="select_value"   style="width: 3.2rem;height:1.2rem;"/>
                <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-preview" @click="CardPreviewMain">
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span class="el-upload-list__item-delete" @click="imgRemoveMain">
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
              </div>
              <div class="inputbg m-img-xl"><span>+添加图片</span><input type="file" id="main" accept="image/*" @change="imgUploadDetailMain"></div>
            </div>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%"  :src="imageUrl" >
            </el-dialog>
        </div>
        <div class="m-form-btn-box">
          <span class="m-form-btn active" @click="submitSure">确定</span>
          <span class="m-form-btn" @click="cancelValue"> 取消</span>
        </div>
      </div>
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
          return {
            state4:'',
            select_value:'',
            all_value:'',
            editorOption:{
            },
            nav_list:[
              {
                tabs_name:'购物保障',
                value:'buyer_set',
                active:true
              },
              {
                tabs_name:'配送服务',
                value:'expressed_service',
                active:false
              },
              {
                tabs_name:'关于我们',
                value:'about_us',
                active:false
              },
              {
                tabs_name:'新手指南',
                value:'new_suggest',
                active:false
              },
              {
                tabs_name:'合作伙伴',
                value:'partener',
                active:false
              },
              {
                tabs_name:'免责声明',
                value:'without_me',
                active:false
              }
            ],
            select:{
              tabs_name:'购物保障',
              value:'buyer_set',
              active:true
            },
            imageUrl:'',
            dialogVisible:false
          }
        },
      components:{
        pageNav
      },
      computed: {
        editor() {
          return this.$refs.myQuillEditor.quill
        }
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
        changeRoute(v){
          this.$router.push(v);
        },
        onEditorReady(editor) {
        },
        submitSure(){
          axios.post(api.update_config +'?select_name='+this.select.value,{
            select_value:this.select_value
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
              this.select_value = res.data.data.select_value;
              this.all_value = res.data.data.select_value;
            }
          })
        },
        cancelValue(){

          this.select_value = this.all_value;
        },
        /*商品主图片删除*/
        imgRemoveMain(index){
          this.select_value = '';
          var file = document.getElementById('main');
          file.value ='';
        },
        /*商品主图片大图显示*/
        CardPreviewMain(index){
          this.imageUrl =  this.select_value;
          this.dialogVisible = true;
        },
        /*商品主图片上传重定向*/
        imgUploadDetailMain(event,index){
          if(this.select_value.length > 0){
            this.$message({
              type:'warning',
              message:'一个类型只能上传1张照片'
            });
            return false;
          }
          let form = new FormData();
          form.append("file", event.target.files[0]);
          form.append("FileType", 'pic');
          axios.post(api.upload_files ,form).then(res => {
            if(res.data.status == 200){
              this.select_value = res.data.data;
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
      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .m-imageText{
    .m-part-title{
      margin-bottom: 0.2rem;
    }
  }
  .el-upload-list--picture-card .el-upload-list__item-actions:hover {
    opacity: 1;
  }
  .m-up-img-box{
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: flex-start;
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
    width: 3.2rem;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    &.m-img-l{
      width: 3.1rem;
      height: 1.1rem;
      line-height: 1.1rem;
      input{
        width: 3.1rem;
        height: 1.1rem;
        line-height: 1.1rem;
      }
    }
  }
  .inputbg input{
    position: absolute;
    top: 0;
    left: 0;
    opacity:0;
    filter:alpha(opacity=0);
    width: 3.2rem;
    height: 1.2rem;
    line-height: 1.2rem;
    cursor: pointer;
  }
</style>

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
          <quill-editor v-model="select_value"
                        ref="myQuillEditor"
                        class="editer"
                        :options="editorOption" @ready="onEditorReady($event)">
          </quill-editor>
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
            }
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
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .m-imageText{
    .m-part-title{
      margin-bottom: 0.2rem;
    }
  }
</style>

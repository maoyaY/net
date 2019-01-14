<template>
  <div class="m-imageText">
    <page-nav :list="nav_list" @navClick="navClick"></page-nav>
    <div v-if="!show_add">
      <h3 class="m-part-title">
        <span class="m-part-title-icon"></span>
        <span>{{select.tabs_name}}</span>
      </h3>
      <div class="m-search-box">
        <div>
          <span class="m-btn active" @click="addTweet">
            <span class="m-btn-icon m-add"></span>
            <span>添加文章</span>
          </span>
        </div>
        <div>
          <el-input v-model="news_title" class="m-search-input" placeholder="标题/作者/摘要"></el-input>
          <span class="m-btn m-search-btn" @click="getNews(select.tabs_id)">
            <span class="m-btn-icon m-search"></span>
            <span>搜索</span>
          </span>
        </div>
      </div>
      <div class="m-content">
        <el-table :data="data" class="m-table"  stripe style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column align="left" width="280" prop="userId" label="标题" >
            <template slot-scope="scope">
              <img :src="scope.row.news_picture" class="m-product-img" alt="">
              <span>{{scope.row.news_title}}</span>
            </template>
          </el-table-column>
          <!--<el-table-column align="center" prop="userId" label="状态" :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"></el-table-column>-->
          <el-table-column align="center" prop="news_writer" label="资讯编辑人"></el-table-column>
          <el-table-column align="center" prop="news_time" label="发布时间"></el-table-column>
          <el-table-column align="center" width="280" label="操作" >
            <template slot-scope="scope">
              <span class="m-table-link m-bd" @click="addTweet(scope.row)">编辑</span>
              <!--<span class="m-table-link m-bd" >关闭</span>-->
              <span class="m-table-link" @click="deleteNews(scope.row)">删除</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="m-bottom">
          <div>
            <!--<span class="m-btn cancel">下架</span>-->
            <span class="m-btn" @click="deleteNews">删除</span>
          </div>
          <pagination :total="total_page" @pageChange="pageChange"></pagination>
        </div>
      </div>
    </div>

    <div class="m-addTweet" v-if="show_add">
      <h3 class="m-part-title">
        <span>
           <span class="m-part-title-icon"></span>
           <span>文章编辑</span>
        </span>
      </h3>
      <el-form ref="form" :model="form" :rules="rules" label-width="1.2rem" label-position="right" class="demo-ruleForm">
        <el-form-item label="标题：" prop="news_title">
          <el-input v-model="form.news_title" class="m-input-m" placeholder="输入推文标题"></el-input>
        </el-form-item>
        <el-form-item label="标题图：" prop="news_picture">
          <div class="m-up-img-box">
            <div class="inputbg m-img-xl el-upload-list--picture-card" v-if="form.news_picture">
              <img :src="form.news_picture"  style="width: 1.2rem;height:1.2rem;"/>
              <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-preview" @click="CardPreview">
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span class="el-upload-list__item-delete" @click="imgRemove">
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
            </div>
            <div class="inputbg m-img-xl"><span>+添加图片</span><input type="file" id="main_img" accept="image/*" @change="imgUploadDetail($event)"></div>
          </div>

          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" v-if="imageUrl" :src="imageUrl" >
          </el-dialog>

        </el-form-item>
        <el-form-item label="详细" prop="news_all">
          <div class="edit_container">
            <quill-editor v-model="form.news_all"
                          ref="myQuillEditor"
                          class="editer"
                          :options="form.editorOption" @ready="onEditorReady($event)">
            </quill-editor>
          </div>
        </el-form-item>

        <el-form-item label="标签：" prop="tabs_id">
          <el-select v-model="form.tabs_id" class="m-input-m" placeholder="请选择">
            <el-option
              v-for="item in nav_list"
              :key="item.tabs_id"
              :label="item.tabs_name"
              :value="item.tabs_id">
            </el-option>
          </el-select>
          <el-popover
            placement="right"
            width="400"
            trigger="manual"
            v-model="show_tab">
            <h3 class="m-flex-between"><span>新建标签</span><span @click.stop="show_tab = false" class="m-close-icon">x</span></h3>
            <div style="margin: 0.2rem 0;">
              <!--<el-input v-model="tabs_name" placeholder="请输入标签名称"></el-input>-->
              <div style="margin: 0.2rem 0;">
                <div class="m-category-content">
                  <div id="m-scroll">
                    <div class="m-one-category"  :key="Math.random()">
                      <!--<div class="m-search-box">-->
                      <!--<span class="icon icon-search"></span>-->
                      <!--<input type="text" v-model="category_input[index]" placeholder=""  @change="changeInput(index)">-->
                      <!--</div>-->
                      <div class="m-add-box">
                        <span class="m-add-icon" @click="editCate(-1)">+</span>
                      </div>
                      <div class="m-classify">
                        <ul>
                          <template v-for="(item,i) in nav_list">
                            <!--<template v-for="(itemss,i) in item">-->
                            <li  :key="Math.random()" >
                              <span class="m-category-name">{{item.tabs_name}}</span>
                              <span class="m-edit-box">
                              <span class="m-edit" @click="editCate(i)">编辑</span>
                              <span class="m-edit" @click="deleteCate(i)">删除</span>
                            </span>

                            </li>
                            <!--</template>-->
                          </template>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--<div class="m-modal-btn-box" style="text-align: center;">-->
              <!--<span class="m-btn active" @click="saveTab">保存</span>-->
              <!--<span class="m-btn " @click="show_tab = false">取消</span>-->
            <!--</div>-->
            <span class="m-add-text" slot="reference"  @click="show_tab = !show_tab">+新增标签</span>
          </el-popover>

        </el-form-item>

        <el-dialog
          title="编辑标签"
          :visible.sync="show_edit"
          width="30%">
          <el-input v-model="tabs_name" placeholder="请输入标签名称"></el-input>
          <span slot="footer" class="dialog-footer">
    <el-button @click="cancelTab">取 消</el-button>
    <el-button type="primary" @click="saveTab">确 定</el-button>
  </span>
        </el-dialog>
        <div class="m-form-btn-box">
          <span class="m-form-btn active" @click="saveTweet">保存</span>
          <span class="m-form-btn "  @click="cancelTweet">取消</span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import pageNav from '../../components/common/pageNav';
  import tweet from './addTweet';
  import axios from 'axios';
  import api from '../../api/api';
  import Pagination from "../../components/common/page";
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor' //调用编辑器
  export default {
    data(){
      return {
        state4:'',
        data:[],
        nav_list:[],
        show_add:false,
        select:{},
        page_info:{
          page_size:10,
          page_num:1
        },
        total_page:1,
        form:{
          news_id:'',
          news_title: "",
          news_all: "",
          news_picture: '',
          tabs_id: ""
        },
        news_title:'',
        rules:{
          news_title:[
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          news_all: [
            {required: true, message: '请输入详细内容'}
          ],
          news_picture:[
            { required: true, message: '请上传主图' }
          ],
          tabs_id:[
            { required: true, message: '请选择标签', trigger: 'change' }
          ]
        },
        imageUrl:'',
        dialogVisible:false,
        tabs_name:'',
        show_tab:false,
        show_edit:false
      }
    },
    components:{
      pageNav,
      tweet,
      Pagination,
      quillEditor
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted(){
      this.getTab();
    },
    methods:{
      changeRoute(v){
        this.$router.push(v);
      },
      //获取标签
      getTab(){
        axios.get(api.get_tab_list,{
          params:{
            tabs_use:1
          }
        }).then(res => {
            if(res.data.status == 200){
              let index = 0;
              let arr = [].concat(res.data.data);
              for(let i = 0;i<arr.length;i++){
                arr.active = false;
                if(this.select){
                  if(this.select.tabs_id = arr[i].tabs_id){
                    index = i;
                  }
                }
              }
              arr[index].active = true;
              this.nav_list = [].concat(arr);
              this.select = arr[index];
              this.getNews(this.select.tabs_id);
            }
        })
      },
      //获取资讯列表
      getNews(id){
        axios.get(api.get_all_news,{
          params:{
            page_num:this.page_info.page_num,
            page_size: this.page_info.page_size,
            tabs_id:id,
            news_title:this.news_title
          }
        }).then(res => {
            if(res.data.status == 200){
              this.data = [].concat(res.data.data);
              this.total_page = res.data.total_page;
            }
        })
      },
      getAbo(id){
        axios.get(api.get_abo_news,{
          params:{
            news_id:id
          }
        }).then(res => {
          if(res.data.status == 200){
            this.form = {
                news_id: res.data.data.news_id,
                news_title: res.data.data.news_title,
                news_all: res.data.data.news_all,
                news_picture:res.data.data.news_picture,
                tabs_id:res.data.data.tabs_id
            };
          }
        })
      },
      //导航点击
      navClick(index){
        let arr = [].concat(this.nav_list);
        for(let i=0;i<arr.length;i++){
          arr[i].active = false;
        }
        arr[index].active =true;
        this.nav_list = [].concat(arr);
        this.select = this.nav_list[index];
        this.getNews(this.select.tabs_id);
        this.show_add = false;
      },
      //编辑
      addTweet(item){
        this.show_add = true;
        this.getAbo(item.news_id);
      },
      //分页
      pageChange(num){
        this.page_info.page_num = num;
        this.getNews(this.select.tabs_id);
      },
      //删除新闻
      deleteNews(item){
        let that = this;
        this.$confirm('确认删除此文章吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post(api.update_status_news + '?news_id='+item.news_id,{
            news_status:0
          }).then(res => {
            if(res.data.status == 200){
              that.$notify.success(res.data.message);
              that.getNews(this.select.tabs_id);
            }else{
              that.$message({
                message: res.data.message,
                duration:1000,
                type: 'error'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      imgRemove(){
        this.form.news_picture = '';
        var file = document.getElementById('main');
        file.value ='';
      },
      /*商品主图片大图显示*/
      CardPreview(){
        this.imageUrl =  this.form.news_picture;
        this.dialogVisible = true;
      },
      /*商品主图片上传重定向*/
      imgUploadDetail(event){
        if(this.form.news_picture.length > 0){
          this.$message({
            type:'warning',
            message:'一个类型只能上传一张照片'
          });
          return false;
        }
        let form = new FormData();
        form.append("file", event.target.files[0]);
        form.append("FileType", 'news_picture');
        // form.append(index, 1);
        axios.post(api.upload_files,form).then(res => {
          if(res.data.status == 200){
            this.form.news_picture = res.data.data;
            var file = document.getElementById('main_img');
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
      //保存文章
      saveTweet(){
        let that = this;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if(this.form.news_id){
              axios.post(api.update_news + '?news_id='+this.form.news_id,that.form).then(res => {
                if(res.data.status == 200){
                  that.$notify.success(res.data.message);
                  that.show_add = false;
                  that.getNews(that.select.tabs_id);
                  that.form = {
                    news_id:'',
                    news_title: "",
                    news_all: "",
                    news_picture: '',
                    tabs_id: ""
                  };
                }else{
                  that.$message({
                    message: res.data.message,
                    duration:1000,
                    type: 'error'
                  });
                }
              })
            }else{
              axios.post(api.new_news,that.form).then(res => {
                if(res.data.status == 200){
                  that.$notify.success(res.data.message);
                  that.show_add = false;
                  that.getNews(that.select.tabs_id);
                  that.form = {
                    news_id:'',
                    news_title: "",
                    news_all: "",
                    news_picture: '',
                    tabs_id: ""
                  };
                }else{
                  that.$message({
                    message: res.data.message,
                    duration:1000,
                    type: 'error'
                  });
                }
              })
            }

          }
        })

      },
      cancelTweet(){
        this.show_add = false;
        this.form = {
          news_id:'',
          news_title: "",
          news_all: "",
          news_picture: '',
          tabs_id: ""
        };
      },
      //编辑类目
      editCate(i){
        this.show_edit = true;
        if(i == -1){
          this.tabs_name = '';
          this.form.tabs_id = '';

        }else {
          this.form.tabs_id = this.nav_list[i].tabs_id;
          this.tabs_name = this.nav_list[i].tabs_name;
        }

      },
      /**/
      deleteCate(i){
        this.$confirm('确认要删除这个标签吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get(api.delete_tab,{
            params:{
              tabs_id:this.nav_list[i].tabs_id
            }
          }).then(res => {
            if(res.data.status == 200){
              this.$notify.success(res.data.message);
              this.getTab();
            }else{
              this.$message({
                message: res.data.message,
                duration:1000,
                type: 'error'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //保存标签
      saveTab(){
        if(!this.tabs_name){
          return false;
        }
        if(this.form.tabs_id){
          axios.post(api.update_tab + '?tabs_id='+this.form.tabs_id,{
            tabs_name:this.tabs_name,
            tabs_use:1
          }).then(res => {
            if(res.data.status == 200){
              this.$notify.success(res.data.message);
              this.getTab();
              this.show_edit = false;
              this.tabs_name = '';
              this.form.tabs_id = '';
            }else{
              this.$message({
                message: res.data.message,
                duration:1000,
                type: 'error'
              });
            }
          })
        }else{
          axios.post(api.new_tab,{
            tabs_name:this.tabs_name,
            tabs_use:1
          }).then(res => {
            if(res.data.status == 200){
              this.$notify.success(res.data.message);
              this.getTab();
              this.show_edit = false;
            }else{
              this.$message({
                message: res.data.message,
                duration:1000,
                type: 'error'
              });
            }
          })
        }

      },
      //取消
      cancelTab(){
        this.tabs_name = '';
        this.form.tabs_id = '';
      },
      onEditorReady(editor) {
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .m-content{
    .m-tweet-ul{
      display: flex;
      flex-flow: row;
      flex-wrap: wrap;
      li{
        width: 20%;
        border:1px solid rgba(238,238,239,1);
        box-shadow:0 3px 6px rgba(0,0,0,0.16);
        border-radius:10px;
        padding: 0.2rem 0.1rem 0.1rem;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
        .m-tweet-title{
          font-weight: bold;
        }
        .m-tweet-img{
          display: block;
          width: 100%;
          height: 1.66rem;
          background-color: #91aeb5;
          margin: 0.06rem 0;
        }
        .m-tweet-text{
          overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;
        }
        .m-tweet-more{
          text-align: right;
          font-size: 0.12rem;
          color: #B8B8B8;
          margin: 0.12rem 0;
        }
        .m-tweet-more-icon{
          display: inline-block;
          width: 0.07rem;
          height: 14px;
          background: url("../../common/images/icon-more.png") no-repeat;
          background-size: 100% 100%;
          vertical-align: text-bottom;
        }
        .m-tweet-btn-box{
          display: flex;
          flex-flow: row;
          justify-content: space-around;
          font-size: 0.18rem;
          color: #B8B8B8;
          border-top: 1px solid #DBDCDC;
          padding-top: 0.1rem;
          .m-tweet-btn-icon{
            display: inline-block;
            width: 0.24rem;
            height: 0.24rem;
            &.m-tweet-delete{
              background: url("../../common/images/icon-delete.png") no-repeat;
              background-size: 100% 100%;
              vertical-align: text-bottom;
            }
            &.m-tweet-edit{
              background: url("../../common/images/icon-edit.png") no-repeat;
              background-size: 100% 100%;
              vertical-align: text-bottom;
            }
          }
        }
      }
    }
    .m-new-label-box{
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      .m-new-label{
        position: relative;
        padding: 0.02rem 0.2rem;
        border: 1px solid #DBDCDC;
        margin-top: 0.2rem;
        margin-right: 0.2rem;
        cursor: pointer;
        .m-label-delete{
          position: absolute;
          bottom: -1px;
          right: -1px;
          width: 0.16rem;
          height: 0.16rem;
          background: url("../../common/images/icon-label-delete.png") no-repeat;
          background-size: 100% 100%;
        }
        &:hover{
          border: 1px solid #CB7E88;
          .m-label-delete{
            background: url("../../common/images/icon-label-delete-active.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
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
    width: 1.2rem;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    &.m-img-l{
      width: 1.1rem;
      height: 1.1rem;
      line-height: 1.1rem;
      input{
        width: 1.1rem;
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
    width: 1.2rem;
    height: 1.2rem;
    line-height: 1.2rem;
    cursor: pointer;
  }
</style>

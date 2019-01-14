<template>
    <div  class="m-addProduct">
      <h3 class="m-part-title" style="margin-bottom: 0.2rem;">
        <span class="m-part-title-icon"></span>
        <span>发布商品</span>
      </h3>
      <el-form ref="form" :model="form" :rules="rules" label-width="1.3rem" label-position="right" class="demo-ruleForm">
        <h3 class="m-form-part-title">
          <span class="m-part-title-icon"></span>
          <span>基本信息</span>
        </h3>
        <el-form-item label="商品名称：" prop="products_name" required>
          <el-input v-model="form.products_name" class="m-input-m" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="商品主图：" prop="products_pic"  required>
          <div class="m-up-img-box">
            <div class="inputbg m-img-xl el-upload-list--picture-card" v-for="(item,index) in form.products_pic">

              <img :src="item"   style="width: 1.2rem;height:1.2rem;"/>
              <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-preview" @click="CardPreviewMain(index)">
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span class="el-upload-list__item-delete" @click="imgRemoveMain(index)">
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
            </div>
            <div class="inputbg m-img-xl"><span>+添加图片</span><input type="file" id="main" accept="image/*" @change="imgUploadDetailMain"></div>
          </div>
          <p class="m-alert-text">建议尺寸：700*700像素,最多上传5张商品图片</p>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%"  :src="imageUrl" >
          </el-dialog>
        </el-form-item>
        <!--<el-form-item label="商品轮播：" prop="prmainpic"  required>-->
          <!--<el-upload-->
          <!--action="https://jsonplaceholder.typicode.com/posts/"-->
          <!--list-type="picture-card"-->
          <!--:limit="5"-->
          <!--:file-list="form.images"-->
          <!--:http-request="imgUploadAbo"-->
          <!--:on-success="handleAvatarSuccess"-->
          <!--:on-preview="handlePictureCardPreview"-->
          <!--:on-remove="handleRemove">-->
          <!--<span class="m-upload-img"></span>-->
          <!--</el-upload>-->


          <!--<p class="m-alert-text">建议尺寸：700*700像素,最多上传5张商品图片</p>-->

        <!--</el-form-item>-->

        <el-form-item label="标签：" required>
          <!--<el-select v-model="form.tabs_id" class="m-input-m"    @change="tabChange" placeholder="请选择">-->
            <!--<el-option-->
              <!--v-for="item in nav_list"-->
              <!--:key="item.tabs_id"-->
              <!--:label="item.tabs_name"-->
              <!--:value="item.tabs_id">-->
            <!--</el-option>-->
          <!--</el-select>-->
          <el-cascader
            :show-all-levels="false"
            :props="props"
            :options="nav_list"
            v-model="form.tabs_id"
            @change="tabChange">
          </el-cascader>
          <el-popover
            placement="right"
            width="550"
            trigger="manual"
            v-model="show_tab">
            <h3 class="m-flex-between">
              <span>编辑标签</span>
              <span @click="show_tab = false">X</span>
            </h3>
            <div style="margin: 0.2rem 0;">
              <div class="m-category-content">
                <div id="m-scroll">
                  <div class="m-one-category" v-for="(items,index) in category" :key="Math.random()">
                    <!--<div class="m-search-box">-->
                      <!--<span class="icon icon-search"></span>-->
                      <!--<input type="text" v-model="category_input[index]" placeholder=""  @change="changeInput(index)">-->
                    <!--</div>-->
                    <div class="m-add-box">
                      <span class="m-add-icon" @click="editCate(index,-1)">+</span>
                    </div>
                    <div class="m-classify">
                      <ul>
                        <template v-for="(item,i) in items">
                          <!--<template v-for="(itemss,i) in item">-->
                          <li :class="select_category[index] && select_category[index].tabs_name == item.tabs_name? 'active':''" :key="Math.random()" @click="selectCategory(item,index)">
                            <span class="m-category-name">{{item.tabs_name}}</span>
                            <span class="m-edit-box" >
                              <span class="m-edit" @click.stop="editCate(index,i)">编辑</span>
                              <span class="m-edit" @click.stop="deleteCate(index,i)">删除</span>
                              <i class="el-icon-arrow-right" v-if="index == 0" ></i>
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
            <!--<div class="m-modal-btn-box" style="text-align: center;">-->
              <!--<span class="m-btn active" @click="saveTab">保存</span>-->
              <!--<span class="m-btn " @click="show_tab = false">取消</span>-->
            <!--</div>-->
            <span class="m-add-text" slot="reference" @click="show_tab = !show_tab">+编辑标签</span>
          </el-popover>

        </el-form-item>
        <h3 class="m-form-part-title">
          <span class="m-part-title-icon"></span>
          <span>商品价格</span>
        </h3>
        <el-form-item label="商品规格：" required>
          <div class="m-different-price-box" >
            <div class="m-search-box">
              <div>
            <span class="m-btn active" @click="addOne">
              <span class="m-btn-icon m-add"></span>
              <span>添加商品属性</span>
            </span>
              </div>
            </div>
            <el-table
              :data="form.sku_list"
              :fit="true"
              style="width: 100%">
              <el-table-column
                label="图片" width="300">
                <template slot-scope="scope">
                  <div class="m-up-img-box">
                    <div class="inputbg m-img-xl el-upload-list--picture-card" v-if="scope.row.sku_pic">
                      <img :src="scope.row.sku_pic"  style="width: 1.2rem;height:1.2rem;"/>
                      <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-preview" @click="CardPreview(scope.$index)">
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span class="el-upload-list__item-delete" @click="imgRemove(scope.$index)">
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                    </div>
                    <div class="inputbg m-img-xl"><span>+添加图片</span><input type="file" :id="scope.$index" accept="image/*" @change="imgUploadDetail($event,scope.$index)"></div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="价格">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.sku_price" type="number" class="m-input-xxs"></el-input>
                </template>
              </el-table-column>
              <!--<el-table-column-->
                <!--label="库存">-->
                <!--<template slot-scope="scope">-->
                  <!--<el-input v-model="scope.row.skustock" type="number" class="m-input-xxs"></el-input>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column
                :label="item" v-for="(item,index) in form.sku_value" :key="index">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.sku_detail[index]" class="m-input-xxs"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <span class="m-table-link" @click="deleteOne(scope.$index)">删除</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>

        <el-form-item label="运费：" required prop="products_expressprice">
          <span>$</span>
          <el-input v-model="form.products_expressprice" type="number" class="m-input-s" placeholder="￥"></el-input>
        </el-form-item>
        <!--<el-form-item label="商品库存：" >-->
          <!--<el-input v-model="form.prstocks" type="number" class="m-input-s" placeholder=""></el-input>-->
          <!--<span>件</span>-->
        <!--</el-form-item>-->

        <h3 class="m-form-part-title">
          <span class="m-part-title-icon"></span>
          <span>商品详情</span>
        </h3>
        <el-form-item  required>
          <div class="edit_container">
            <quill-editor v-model="form.products_piclong"
                          ref="myQuillEditor"
                          class="editer"
                          :options="form.editorOption" @ready="onEditorReady($event)">
            </quill-editor>
          </div>
        </el-form-item>
        <h3 class="m-form-part-title">
          <span class="m-part-title-icon"></span>
          <span>商品限购</span>
        </h3>
        <el-form-item label="商品限购：">
          <el-radio-group v-model="resource">
            <el-radio label="不限购"></el-radio>
            <el-radio label="限购"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="限购数量：" v-if="resource == '限购'">
          <el-input v-model="form.products_forbidnum" type="number" class="m-input-s"></el-input>
        </el-form-item>
        <el-form-item label="购买间隔：">
          <el-radio-group v-model="resource1">
            <el-radio label="不限"></el-radio>
            <el-radio label="限制"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="限制时间：" v-if="resource1 == '限制'">
          <el-input v-model="form.products_forbidtime" type="number" class="m-input-s"></el-input>
          <span>日</span>
        </el-form-item>

      </el-form>
      <el-dialog
        title="编辑标签"
        :visible.sync="show_edit"
        width="30%">
        <el-input v-model="tabs_name" placeholder="请输入标签名称"></el-input>
        <div style="margin: 0.2rem 0;" v-if="show_gui">
          <el-tag
            :key="tag"
            v-for="tag in sku_value"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)" style="margin-right: 0.1rem;">
            {{tag}}
          </el-tag>
          <el-input
            class="m-input-xs"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+添加商品规格名称</el-button>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="cancelTab">取 消</el-button>
    <el-button type="primary" @click="saveTab">确 定</el-button>
  </span>
      </el-dialog>
      <div class="m-form-btn-box">
        <span class="m-form-btn active" @click="submitSure">确定</span>
        <span class="m-form-btn" @click="changeRoute('-1')"> 取消</span>
      </div>
    </div>

</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import api from '../../api/api';
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor' //调用编辑器
    export default {
        data() {
            return {
              inputVisible: false,
              inputValue: '',
              nav_list:[],
              resource:'不限购',
              resource1:'不限',
              products_id:'',
              sku_value:[],
              form:{
                products_name:'',
                products_expressprice:0,
                products_pic:[],
                products_forbidnum:0,
                products_forbidtime:0,
                sku_value:[],
                tabs_id:'',
                products_piclong:'',
                sku_list: [
                  {
                    sku_pic: "",
                    sku_price: 0,
                    sku_detail: ['']
                  }
                ]
              },
              rules:{
                products_name:[
                  { required: true, message: '请输入商品名称', trigger: 'blur' }
                ],
                products_piclong:[
                  { required: true, message: '请输入商品详情', trigger: 'blur' }
                ],
                products_pic:[
                  { required: true, message: '请输入商品图片', trigger: 'blur' }
                ],
                products_expressprice:[
                  { required: true, message: '请输入商品运费', trigger: 'blur' }
                ],
              },
              sku_list:[],
              sku_index:0,
              radio:1,
              show_tab:false,
              tabs_name:'',
              tabs_id:'',
              imageUrl:'',
              dialogVisible:false,
              category_list:[],
              show_edit:false,
              category:[],
              select_category:[],
              show_gui:false,
              props: {
                label: 'tabs_name',
                children: 'children',
                value:'tabs_id'
              }
            }
        },
        components: {
          quillEditor
        },
      computed: {
        editor() {
          return this.$refs.myQuillEditor.quill
        }
      },
        mounted(){
          this.getTab();
          if(this.$route.query.prid){
            this.getProduct();
          }

        },
        methods: {
          //获取商品详情
          getProduct(){
            axios.get(api.get_product_message,{
              params:{
                products_id:this.$route.query.prid
              }
            }).then(res => {
                if(res.data.status == 200){
                  let _product = res.data.data;
                  this.products_id = _product.products_id;
                  this.form ={
                    products_name: _product.products_name,
                    prdescription: _product.prdescription,
                    products_expressprice:_product.products_expressprice,
                    products_forbidtime:_product.products_forbidtime,
                    products_pic:_product.products_pic,
                    tabs_id:_product.tabs_id,
                    products_forbidnum: _product.products_forbidnum,
                    products_piclong:_product.products_piclong,
                    sku_list: [].concat(_product.sku),
                    sku_value:[].concat(_product.sku_value)
                  }
                  if( _product.products_forbidnum){
                    this.resource = '限购'
                  }
                  if( _product.products_forbidtime){
                    this.resource = '限制'
                  }
                }
              }
            )
          },
          //获取标签
          getTab(){
            axios.get(api.get_tab_list,{
              params:{
                tabs_use:2
              }
            }).then(res => {
              if(res.data.status == 200){
                this.nav_list = [].concat(res.data.data);
                let arr1 = [].concat(this.category);
                let arr2 = [].concat(this.select_category);
                arr1[0] = res.data.data;
                if(this.show_tab && arr2.length >0){
                  for(let i= 0;i<res.data.data.length;i++){
                    if(res.data.data[i].tabs_id == arr2[0].tabs_id){
                      arr2[0] = res.data.data[i]
                    }
                  }
                  arr1[1] = arr2[0].children;

                }
                this.category = [].concat(arr1);
                this.select_category = [].concat(arr2);
              }
            })
          },
          //保存标签
          saveTab(){
            if(!this.tabs_name){
              return false;
            }
            if(this.show_gui && this.sku_value.length <1){
              this.$message({
                message: '请先填写商品规格',
                duration:1000,
                type: 'error'
              });
              return false;
            }
            if(this.tabs_id){
              axios.post(api.update_tab + '?tabs_id='+this.tabs_id,{
                tabs_name:this.tabs_name,
                tabs_use:2,
                sku_value:this.sku_value,
                parent_id:(this.show_gui ? this.select_category[0].tabs_id:0)
              }).then(res => {
                if(res.data.status == 200){
                  this.$notify.success(res.data.message);
                  this.getTab();
                  this.show_edit = false;
                  this.tabs_name = '';
                  this.sku_value = [];
                  this.tabs_id = '';
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
                tabs_use:2,
                sku_value:this.sku_value,
                parent_id:(this.show_gui ? this.select_category[0].tabs_id:0)
              }).then(res => {
                if(res.data.status == 200){
                  this.$notify.success(res.data.message);
                  this.getTab();
                  this.show_edit = false;
                  this.tabs_name = '';
                  this.sku_value = [];
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
            this.show_edit = false;
            this.tabs_name = '';
            this.sku_value = [];
            this.tabs_id = '';
          },
          tabChange(item){
            for(let i=0;i<this.nav_list.length;i++){
              if(this.nav_list[i].tabs_id == item[0]){
                for(let j=0;j<this.nav_list[i].children.length;j++){
                  if(this.nav_list[i].children[j].tabs_id == item[1]){
                    this.form.sku_value = [].concat(this.nav_list[i].children[j].sku_value_name)
                  }
                }
              }
            }
          },
          /*获取子类目*/
          selectCategory(v,i){
            let _arr = [].concat(this.select_category);
            _arr[i] = v;
            this.select_category = [].concat(_arr);
            if(i == 1){
              return false;
            }
            let arr = [].concat(this.category);
            arr[1] = v.children;
            this.category = [].concat(arr);

          },
          //编辑类目
          editCate(index,i){
            this.show_edit = true;
            if(i == -1){
              this.tabs_name = '';
              this.tabs_id = '';
              this.sku_value = [];
              if(index == 1){
                this.show_gui = true;
              }
            }else {
              this.tabs_id = this.category[index][i].tabs_id;
              if(index === 1 ){
                this.show_gui = true;
                this.sku_value = [].concat(this.category[index][i].sku_value_name)
              }
              this.tabs_name = this.category[index][i].tabs_name;
            }

          },
          /**/
          deleteCate(index,i){
            this.$confirm('确认要删除这个标签吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              axios.get(api.delete_tab,{
                params:{
                  tabs_id:this.category[index][i].tabs_id
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
          //删除规格名称
          handleClose(tag) {
            this.sku_value.splice(this.sku_value.indexOf(tag), 1);
          },
          //显示规格输入框
          showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
              this.$refs.saveTagInput.$refs.input.focus();
            });
          },

          /*商品主图片删除*/
          imgRemoveMain(index){
            let arr = [].concat(this.form.products_pic);
            arr.splice(index,1);
            this.form.products_pic = [].concat(arr);
            var file = document.getElementById('main');
            file.value ='';
          },
          /*商品主图片大图显示*/
          CardPreviewMain(index){
            this.imageUrl =  this.form.products_pic[index];
            this.dialogVisible = true;
          },
          /*商品主图片上传重定向*/
          imgUploadDetailMain(event,index){
            if(this.form.products_pic.length > 4){
              this.$message({
                type:'warning',
                message:'一个类型只能上传5张照片'
              });
              return false;
            }
            let form = new FormData();
            form.append("file", event.target.files[0]);
            form.append("FileType", 'products_pic');
            axios.post(api.upload_files ,form).then(res => {
              if(res.data.status == 200){
                this.form.products_pic.push(res.data.data);
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

          //规格名称确定
          handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
              this.sku_value.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
          },
          changeRoute(v){
            if(v == '-1'){
              this.$router.go(-1)
            }else{
              let that = this;

              this.$refs['form'].validate((valid) => {
                if (valid) {
                  for(let i = 0;i<that.form.skus.length;i++){
                    for(let key in that.form.skus[i]){
                      if(!that.form.skus[i][key]){
                        this.$message({
                          type:'warning',
                          duration:800,
                          message:'请先设置商品具体属性'
                        });
                        return false;
                      }
                    }
                  }
                  let arr = [];
                  for(let i = 0;i<that.form.images.length;i++){
                   arr.push({pipic:that.form.images[i],pisort:i})
                  }
                  let _form  = JSON.parse(JSON.stringify(this.form));
                  _form.pskuvalue = [].concat(that.sku_list);
                  _form.images = [].concat(arr);
                  this.$router.push({path:v,query:{form:Object.assign(_form,that.$route.query.form)}})
                }
              })

            }
          },
          //添加一个商品属性
          addOne(){
            this.form.sku_list.push({
              sku_pic: "",
              sku_price: 0,
              sku_detail: new Array(this.form.sku_value.length)
            });
          },
          //删除一个商品属性
          deleteOne(index){
            this.form.sku_list.splice(index,1)
          },
          /*商品样式图片删除*/
          imgRemove(index){
            this.form.sku_list[index].sku_pic = '';
            var file = document.getElementById(index);
            file.value ='';
          },
          /*商品样式图片大图显示*/
          CardPreview(index){
            this.imageUrl =  this.form.sku_list[index].sku_pic;
            this.dialogVisible = true;
          },
          /*商品样式图片上传重定向*/
          imgUploadDetail(event,index){
            if(this.form.sku_list[index].sku_pic.length > 0){
              this.$message({
                type:'warning',
                message:'一个类型只能上传一张照片'
              });
              return false;
            }
            let form = new FormData();
            form.append("file", event.target.files[0]);
            form.append("FileType", 'sku_pic');
            axios.post(api.upload_files,form).then(res => {
              if(res.data.status == 200){
                this.form.sku_list[index].sku_pic = res.data.data;
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
          onEditorReady(editor) {
          },
          submitSure(){
            // let str = '[';
            // let _form = JSON.parse(JSON.stringify(this.form))
            // for(let i=0;i<_form.sku_list.length;i++){
            //   _form.sku_list[i].sku_detail = str + _form.sku_list[i].sku_detail.toString() + ']'
            // }

            // console.log(_form);
            // return false;
            if(this.resource == ' 不限购'){
              this.form.products_forbidnum = 0
            }
            if(this.resource1 == ' 不限'){
              this.form.products_forbidtime = 0
            }
            let that = this,_form=null;
            this.$refs['form'].validate((valid) => {
              if (valid) {
                _form = that.form;
                delete _form.sku_value;
                if(this.products_id){
                  axios.post(api.update_product + '?products_id='+that.products_id,_form).then(res => {
                    if(res.data.status == 200){
                      this.$notify.success(res.data.message);
                      this.$router.push('/product');
                    }else{
                      this.$message({
                        type: 'error',
                        message: res.data.message
                      });
                    }
                  })
                }else{
                  axios.post(api.new_product,_form).then(res => {
                    if(res.data.status == 200){
                      this.$notify.success(res.data.message);
                      this.$router.push('/product');
                    }else{
                      this.$message({
                        type: 'error',
                        message: res.data.message
                      });
                    }
                  })
                }

              }
            })
          }
        },
        created() {

        }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .m-addProduct{
    .m-addProduct-step{
      width: 100%;
      padding: 0.1rem 0;
      display: flex;
      flex-flow: row;
      justify-content: space-around;
      align-items: center;
      border: 1px solid #97ADCB;
      margin: 0.25rem 0;
      font-size: 0.18rem;
      font-weight: bold;
      span.active{
        color: #CB7E88;
      }
    }
    .m-form-part-title{
      font-weight: bold;
      font-size: 0.18rem;
      margin-bottom: 0.2rem;
      .m-part-title-icon{
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url("../../common/images/icon-title-child.png") no-repeat;
        background-size: 100% 100%;
        vertical-align: text-bottom;
        margin-right: 10px;
      }
    }
    .m-form-btn-box{
      margin-top: 1.6rem;
    }
    .m-inline-block{
      display: inline-block;
    }
    .m-search-box{
     padding-top: 0;
    }
    .m-different-price-box{
      padding: 0 0 0.2rem 0;
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

  }
</style>

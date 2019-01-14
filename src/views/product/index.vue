<template>
  <div class="m-product">
    <h3 class="m-part-title m-flex-between">
      <span>
         <span class="m-part-title-icon"></span>
         <span>商品列表</span>
      </span>
      <span class="m-btn active" @click="changeRoute('/product/addProduct')">
        <span class="m-btn-icon m-add"></span>
        <span>发布商品</span>
      </span>
    </h3>
    <div class="m-search-box">
      <div>

      </div>
      <div>
        <el-select v-model="products_status" placeholder="请选择状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="下架" value="0"></el-option>
          <el-option label="在售中" value="1"></el-option>
        </el-select>
        <el-cascader
          :props="props"
          :options="tab_list"
          v-model="tabs_id"
          filterable
          change-on-select
        >
        </el-cascader>
        <el-input v-model="product_name" class="m-input-xs" style="margin-right: 5px;" placeholder="搜索商品标题" @keyup.enter.native="getProduct(page_num)"></el-input>
        <span class="m-btn m-search-btn" @click="getProduct(page_num)">
            <span class="m-btn-icon m-search"></span>
            <span>搜索</span>
          </span>
      </div>
    </div>

    <div class="m-content">
      <el-table :data="product_data" class="m-table" v-loading="loading"
                @selection-change="handleSelectionChange" stripe style="width: 100%">
        <!--<el-table-column-->
          <!--type="selection"-->
          <!--width="55">-->
        <!--</el-table-column>-->
        <el-table-column align="left" width="280" prop="userId" label="商品" >
          <template slot-scope="scope">
            <img :src="scope.row.products_pic[0]" class="m-product-img" alt="">
            <span>{{scope.row.products_name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="products_status" label="状态"  >
        </el-table-column>
        <el-table-column align="center" prop="product_price"  label="价格" ></el-table-column>
        <el-table-column align="center" prop="products_salenum"  label="销量" ></el-table-column>
        <el-table-column align="center" prop="products_createtime" sortable label="创建时间" ></el-table-column>
        <el-table-column align="center" width="280" label="操作" >
          <template slot-scope="scope">
            <span class="m-table-link m-bd" @click="editProduct(scope.row)">编辑</span>
            <span class="m-table-link" v-if="scope.row.products_status == '在售中'" @click="deleteProduct(scope.row,0)">下架</span>
            <span class="m-table-link" v-else @click="deleteProduct(scope.row,1)">上架</span>
            <span class="m-table-link" @click="deleteProduct(scope.row,2)">删除</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="m-bottom m-flex-between">
        <div>
          <!--<span class="m-btn cancel">下架</span>-->
          <!--<span class="m-btn" @click="deleteProduct">删除</span>-->
        </div>
        <pagination :total="total_page" @pageChange="pageChange"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import data from '../../common/json/userInfo';
  import Pagination from "../../components/common/page";
  import axios from 'axios';
  import api from '../../api/api';
  export default {
    data(){
      return{
        loading:false,
        state4:'',
        product_data:data,
        total_page:0,
        select_product:null,
        product_name:'',
        products_status:'',
        supplizer_list:[],
        suid:'',
        page_num:1,
        tab_list:[],
        tabs_id:[],
        props: {
          label: 'tabs_name',
          children: 'children',
          value:'tabs_id'
        }
      }
    },
    components:{
      Pagination
    },
    mounted(){
      this.getProduct(1);
      this.getTab();
      // this.getSupplizer();
    },
    methods:{
      //获取标签
      getTab(){
        axios.get(api.get_tab_list,{
          params:{
            tabs_use:2
          }
        }).then(res => {
          if(res.data.status == 200){
            this.tab_list = [{  tabs_name: "全部",
              tabs_id: "",
              children: []}].concat(res.data.data);
          }
        })
      },
      //获取商品列表
      getProduct(num){
        this.loading = true;
        axios.get(api.get_product_list,{
          params:{
            page_size:10,
            page_num:num ,
            name:this.product_name,
            tabs_id:this.tabs_id[this.tabs_id.length -1],
            products_status: this.products_status
          }
        }).then(res => {
          this.loading = false;
          if(res.data.status == 200){
            this.product_data = res.data.data;
            this.total_page = res.data.total_page;
          }
        })
      },
      // //获取供应商列表
      // getSupplizer(value){
      //   axios.get(api.supplizer_list,{
      //     params:{
      //       kw:value || '',
      //       token:localStorage.getItem('token')
      //     }
      //   }).then(res => {
      //       if(res.data.status == 200){
      //         this.supplizer_list = res.data.data;
      //       }
      //   })
      // },
      //路由跳转
      changeRoute(v){
        this.$router.push(v)
      },
      //多选
      handleSelectionChange(val){
        this.select_product = val;
      },
      //删除商品
      deleteProduct(item,type){
        let that = this,name='下架';
        if(type == 2){
          name = '删除'
        }else if(type == 1){
          name='上架'
        }
        this.$confirm( name+'商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post(api.update_product+'?products_id=' +item.products_id,{
            products_status:type
          }).then(res => {
              if(res.data.status == 200){
                this.$notify({
                  type: 'success',
                  message: name+'成功!'
                });
                this.getProduct(this.page_num);
              }
          })
        }).catch(() => {

        });

      },
      pageChange(num){
        this.page_num = num;
        this.getProduct(num);
      },
      editProduct(item){
        this.$router.push({path:'/product/addProduct',query:{prid:item.products_id}});
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>


</style>

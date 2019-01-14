<template>
  <div class="m-approve">
    <page-nav :list="nav_list" @navClick="navClick"></page-nav>
    <h3 class="m-part-title m-flex-between">
      <div>
        <span class="m-part-title-icon"></span>
        <span>{{select.name}}列表</span>
      </div>
    </h3>
    <div class="m-content">
      <!--提现审批-->
      <el-table :data="data" class="m-table" v-if="select.name == '提现审批'" stripe style="width: 100%">
        <el-table-column align="center" prop="userId" label="店主ID" ></el-table-column>
        <el-table-column align="center" prop="userName" label="联系方式"></el-table-column>
        <el-table-column align="center" prop="email"  label="账户余额" ></el-table-column>
        <el-table-column align="center" label="粉丝" >
          <template slot-scope="scope">
            <span class="m-table-link">10</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="email"  label="获得佣金" ></el-table-column>
      </el-table>
      <!--代理商审批-->
      <el-table :data="data1" class="m-table" v-else-if="select.name == '代理商审批'" stripe style="width: 100%">
        <el-table-column align="center" prop="userId" label="用户ID" ></el-table-column>
        <el-table-column align="center" prop="userName" label="实名认证"></el-table-column>
        <el-table-column align="center" prop="email"  label="联系方式" ></el-table-column>
        <el-table-column align="center" width="200" label="身份证" >
          <template slot-scope="scope">
            <span class="m-table-link">10</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="email"  label="押金" ></el-table-column>
        <el-table-column align="center" prop="email"  label="时间" ></el-table-column>
        <el-table-column align="center" width="200"  label="操作" >
          <template slot-scope="scope">
            <span class="m-table-link">通过</span>
            <span class="m-table-link">驳回</span>
          </template>
        </el-table-column>
      </el-table>
      <!--商品上架-->
      <el-table :data="data2" class="m-table" v-else-if="select.name == '商品上架'" stripe style="width: 100%">
        <el-table-column align="center" width="200" prop="userId" label="商品" >
          <template slot-scope="scope">
            <img src="" class="m-product-img" alt="">
            <span>商品1</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="userName" label="商品编号"></el-table-column>
        <el-table-column align="center" prop="userName"  label="价格" >
          <template slot-scope="scope">
            <span class="m-red-price">商品1</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="email" sortable label="创建时间" ></el-table-column>
        <el-table-column align="center" prop="userName" label="品牌"></el-table-column>
        <el-table-column align="center" prop="userName"  label="场景" ></el-table-column>
        <el-table-column align="center" prop="registerTime" label="状态概况"  :filters="[{ text: '成为卖家审批', value: '成为卖家审批' }, { text: '类目使用审批', value: '类目使用审批' },{ text: '类目增设审批', value: '类目增设审批' }, { text: '商品发布审批', value: '商品发布审批' }, { text: '活动发起审批', value: '活动发起审批' }]"></el-table-column>
        <el-table-column align="center" width="200"  label="操作" >
          <template slot-scope="scope">
            <span class="m-table-link">详情</span>
            <span class="m-table-link">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <!--咨询-->
      <el-table :data="data3" class="m-table" v-else-if="select.name == '推文审核'" stripe style="width: 100%">
        <el-table-column align="center" width="200" prop="userId" label="咨询" >
          <template slot-scope="scope">
            <img src="" class="m-product-img" alt="">
            <span>商品1</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="userName" label="摘要"></el-table-column>
        <el-table-column align="center" prop="email" sortable label="创建时间" ></el-table-column>
        <el-table-column align="center" prop="userName" label="作者"></el-table-column>
        <el-table-column align="center"   label="操作" >
          <template slot-scope="scope">
            <span class="m-table-link">详情</span>
            <span class="m-table-link">通过</span>
            <span class="m-table-link">驳回</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="m-bottom">
        <pagination :total="total_page" @pageChange="pageChange"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import pageNav from '../../components/common/pageNav';
  import data from '../../common/json/userInfo';
  import Pagination from "../../components/common/page";
  export default {
    data(){
      return{
        nav_list:[
          {
            name:'提现审批',
            value:'',
            active:true,
            num:20
          },
          {
            name:'退货审批',
            value:'',
            active:false,
            num:20
          },
          {
            name:'代理商审批',
            value:'',
            active:false,
            num:20
          },
          {
            name:'商品上架',
            value:'',
            active:false,
            num:20
          },
          {
            name:'采购退货',
            value:'',
            active:false,
            num:20
          },
          {
            name:'推文审核',
            value:'',
            active:false,
            num:20
          }
        ],
        select:{
          name:'提现审批',
          value:'',
          active:true,
          num:20
        },
        data:data,
        total_page:6,
        data1:null,
        data2:null,
        data3:null
      }
    },
    components:{
      pageNav,
      Pagination
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
      },
      pageChange(){

      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
.m-approve{
  .m-part-title{
    margin-bottom: 0.35rem;
  }
  .m-red-price{
    color: #E50012;
  }
}

</style>

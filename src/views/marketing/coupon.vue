<template>
    <div>
      <h3 class="m-part-title m-flex-start">
        <span class="m-part-title-icon"></span>
        <span>优惠券</span>
      </h3>

      <div class="m-search-box">
        <div>
          <router-link tag="span" to="/marketing/couponEdit" class="m-btn active">
            <span class="m-btn-icon m-add"></span>
            <span>添加优惠券</span>
          </router-link>
        </div>

        <div>
          <el-input v-model="state4" class="m-search-input" placeholder="商品名称"></el-input>
          <el-autocomplete
            class="m-search-input"
            v-model="state4"
            :fetch-suggestions="querySearchAsync"
            placeholder="商品编号"
            @select="handleSelect"
          ></el-autocomplete>
          <span class="m-btn m-search-btn">
            <span class="m-btn-icon m-search"></span>
            <span>搜索</span>
          </span>
        </div>
      </div>
      <div class="m-content">
        <el-table :data="data" class="m-table" stripe style="width: 100%">
          <el-table-column align="center" prop="userId" label="名称" ></el-table-column>
          <el-table-column align="center" prop="userName" label="生效条件"></el-table-column>
          <el-table-column align="center" prop="email"  label="优惠条件" ></el-table-column>
          <el-table-column align="center" prop="email"  label="生效范围" ></el-table-column>
          <el-table-column align="center" prop="email"  label="剩余/总量" ></el-table-column>
          <el-table-column align="center" prop="registerTime" label="类别"  :filters="[{ text: '成为卖家审批', value: '成为卖家审批' }, { text: '类目使用审批', value: '类目使用审批' },{ text: '类目增设审批', value: '类目增设审批' }, { text: '商品发布审批', value: '商品发布审批' }, { text: '活动发起审批', value: '活动发起审批' }]"></el-table-column>
          <el-table-column align="center" label="操作" >
            <template slot-scope="scope">
              <span class="m-table-link">编辑</span>
              <span class="m-table-link">删除</span>
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
  import data from '../../common/json/userInfo';
  import Pagination from "../../components/common/page";
  export default {
    data(){
      return{
        state4:'',
        data:data,
        total_page:6
      }
    },
    components:{
      Pagination
    },
    methods:{
      querySearchAsync(){

      },
      handleSelect(){

      },
      pageChange(){

      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>

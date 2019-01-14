<template>
  <div>
    <h3 class="m-part-title">
      <span class="m-part-title-icon"></span>
      <span>用户列表</span>
    </h3>
    <div class="m-search-box">
      <div>
        <el-input v-model="user_email" class="m-search-input" placeholder="搜索用户账号"></el-input>
        <el-autocomplete
          class="m-search-input"
          v-model="user_telphone"
          :fetch-suggestions="querySearchAsync"
          placeholder="搜索用户手机号"
          @select="handleSelect"
        ></el-autocomplete>
        <span class="m-btn m-search-btn" @click="getUser(page_info.page_num)">
            <span class="m-btn-icon m-search"></span>
            <span>搜索</span>
          </span>
      </div>
    </div>
    <div class="m-content">
      <el-table :data="data" class="m-table" stripe style="width: 100%">
        <!--<el-table-column-->
          <!--type="selection"-->
          <!--width="55">-->
        <!--</el-table-column>-->
        <el-table-column align="center"   label="头像" >
          <template slot-scope="scope">
            <img :src="scope.row.user_pic" class="m-product-img" alt="">
          </template>
        </el-table-column>
        <el-table-column align="center" prop="user_name" label="用户名"></el-table-column>
        <el-table-column align="center" prop="user_email"  label="账号" ></el-table-column>
        <el-table-column align="center" prop="user_telphone" label="手机号"></el-table-column>
        <el-table-column align="center" prop="order_num"  label="购买量" ></el-table-column>
       <el-table-column align="center" prop="share_num"  label="绑定人数" ></el-table-column>
        <el-table-column align="center"  label="操作" >
          <template slot-scope="scope">
            <span class="m-table-link" @click="changeRoute('/member/memberDetail',scope.row)">查看详情</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="m-bottom m-flex-between">
        <div>
          <!--<el-checkbox v-model="checked">全选</el-checkbox>-->
          <!--<span class="m-check-alert">送积分</span>-->
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
        user_email:'',
        user_telphone:'',
        data:data,
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
        value8: '',
        checked:false,
        page_info:{
          page_size: 10,
          page_num:1
        },
        total_page:1
      }
    },
    components:{
      Pagination
    },
    mounted(){
      this.getUser(1);
    },
    methods:{
      querySearchAsync(){

      },
      handleSelect(){

      },
      pageChange(num){
        this.getUser(num);
        this.page_info.page_num = num;
      },
    //  获取用户列表
      getUser(num){
        axios.get(api.get_all_user,{
          params:{
            page_size:10,
            page_num:num,
            user_email:this.user_email,
            user_telphone: this.user_telphone
          }
        }).then(res => {
          if(res.data.status == 200){
            this.data = res.data.data;
          }
        })
      },
      changeRoute(v,item){
        this.$router.push({path:v,query:{uid:item.user_id}})
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>

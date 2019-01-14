<template>
    <div class="m-memberDetail">
      <h3 class="m-part-title">
        <span class="m-part-title-icon"></span>
        <span>用户详情</span>
      </h3>
      <div class="m-member-top">
        <ul class="m-member-ul">
          <li>
            <span class="m-member-span">头像：</span>
            <img :src="user_data.user_pic" class="m-member-img" alt="">
          </li>
          <li>
            <span class="m-member-span">用户名：</span>
            <span>{{user_data.user_name}}</span>
          </li>
          <li>
            <span class="m-member-span">账号：</span>
            <span>{{user_data.user_email}}</span>
          </li>
          <li>
            <span class="m-member-span">手机号：</span>
            <span>CN+86 {{user_data.user_telphone}}</span>
          </li>
          <li>
            <span class="m-member-span">身份证：</span>
            <span>{{user_data.user_cardno}}</span>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="m-member-table-title m-flex-between">
          <span>推荐关系列表</span>
          <span>推荐绑定{{total_share}}人</span>
        </h3>
        <el-table
          :data="share_data"
          align="center"
          style="width: 100%"
        >
          <el-table-column  label="头像" >
            <template slot-scope="scope">
              <img :src="scope.row.user_pic" class="m-member-img" alt="">
            </template>
          </el-table-column>
          <el-table-column prop="user_name" label="用户名" ></el-table-column>
          <el-table-column prop="user_createtime" label="绑定时间" sortable ></el-table-column>
          <el-table-column prop="user_email" label="账号" ></el-table-column>
          <el-table-column prop="user_telphone" label="手机号" ></el-table-column>
          <el-table-column prop="order_num" label="购买量" ></el-table-column>
          <el-table-column prop="price" label="消费金额" ></el-table-column>
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
  import Pagination from "../../components/common/page";
  import axios from 'axios';
  import api from '../../api/api';
    export default {
        data(){
          return{
            user_data:null,
            share_data:null,
            total_page:0,
            page_info:{
              page_size: 10,
              page_num:1
            },
            total_share:0
          }
        },
      components:{
        Pagination
      },
      mounted(){
          this.getUser();
          this.getShare();
      },
      methods:{
        pageChange(num){
          this.page = num;
        },
      //  获取用户详情
        getUser(){
          axios.get(api.get_user_info,{
            params:{
              user_id:this.$route.query.uid
            }

          }).then(res => {
            if(res.data.status == 200){
              this.user_data = res.data.data;
            }
          })
        },
        //  获取分享详情
        getShare(){
          axios.get(api.get_my_share,{
            params:{
              user_id:this.$route.query.uid,
              get_status:2
            }

          }).then(res => {
            if(res.data.status == 200){
              this.share_data = res.data.data;
              this.total_page = res.data.total_page;
              this.total_share = res.data.total_share;
            }
          })
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
.m-memberDetail{
  font-size: 0.18rem;
  .m-member-img{
    display: inline-block;
    width: 0.9rem;
    height: 0.9rem;
    vertical-align: text-top;
  }
  .m-member-top{
    padding: 0.2rem;
    border-bottom: 1px solid #eee;
    font-size: 0.18rem;
    .m-member-ul{
      li{
        padding-bottom: 0.2rem;
        .m-member-span{
          display: inline-block;
          width: 1.2rem;
          text-align: left;
        }
      }
    }
  }
  .m-member-table-title{
    padding: 0.2rem 0;
  }
}
</style>

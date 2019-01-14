<template>
  <div class="m-discount">
    <h3 class="m-part-title" >
      <span class="m-part-title-icon"></span>
      <span>用户优惠券</span>
    </h3>
    <!--<div class="m-search-box">-->
    <!--<div>-->
    <!--<span class="m-btn active" @click="addEdit">-->
    <!--<span class="m-btn-icon m-add"></span>-->
    <!--<span>新增优惠券</span>-->
    <!--</span>-->
    <!--</div>-->
    <!--<div>-->
    <!--<el-input v-model="input" class="m-input-s" placeholder="名称"></el-input>-->
    <!--<span class="m-btn m-search-btn">-->
    <!--<span class="m-btn-icon m-search"></span>-->
    <!--<span>搜索</span>-->
    <!--</span>-->
    <!--</div>-->
    <!--</div>-->

    <div class="m-content">
      <el-table :data="discount_data" v-loading="loading" class="m-table" stripe  @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column align="center" prop="card_name" label="优惠券名称" ></el-table-column>
        <el-table-column align="center" prop="user_truename" label="用户名称"  >
        </el-table-column>
        <el-table-column align="center" prop="card_deal" label="处理金额">
        </el-table-column>
        <el-table-column align="center" prop="cardpackage_endtime"  label="有效截至时间" >
        </el-table-column>
        <el-table-column align="center" label="操作" >
          <template slot-scope="scope">
            <span class="m-table-link"  @click="deleteCoupon(scope.row,'row')">核销</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="m-bottom m-flex-between">
        <div>
          <!--<span class="m-btn cancel">下架</span>-->
          <span class="m-btn" @click="deleteCoupon">核销</span>
        </div>
        <pagination :total="total_page" @pageChange="pageChange"></pagination>
      </div>

    </div>

  </div>
</template>

<script>
  import Pagination from "../../components/common/page";
  import axios from 'axios';
  import api from '../../api/api'
  export default {
    data(){
      return{

        discount_data:[],
        total_page:0,
        level:[],
        loading:false,
        page_info:{
          page_num:1,
          page_size:10
        },

        multipleSelection:[]
      }
    },
    components:{
      Pagination
    },
    mounted(){
      this.getDiscount();
    },
    methods:{
      getDiscount() {
        axios.get(api.get_all_card_back,{
          params:{
            page_size: this.page_info.page_size,
            page_num:this.page_info.page_num
          }
        }).then(res => {
          if(res.data.status == 200){
            this.discount_data = res.data.data;
            this.total_page  = res.data.total_page;
          }
        })
      },
      //筛选
      filterTag(value, row) {
        return row.adlevel === value;
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //分页
      pageChange(num){
        this.page_info.page_num = num;
        this.getDiscount();
      },
      //核销
      deleteCoupon(item,name){
        let card_id_list = [];
        if(name){
          card_id_list.push(item.cardpackage_id)
        }else{
          for(let i=0;i<this.multipleSelection.length;i++){
            card_id_list.push(this.multipleSelection[i].cardpackage_id)
          }
        }
        this.$confirm('此操作将永久删除该用户优惠券, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post(api.delete_card,{
            card_id_list:card_id_list
          }).then(res => {
            if(res.data.status == 200){
              this.$message({
                type: 'success',
                message: res.data.message,
                duration:1000
              });
              this.getDiscount();
            }else{
              this.$message({
                type: 'error',
                message: res.data.message,
                duration:1000
              });
            }
          })

        }).catch(() => {

        });
      }

    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .m-discount{
    .m-part-title{
      margin-bottom: 0.2rem;
    }
  }

</style>

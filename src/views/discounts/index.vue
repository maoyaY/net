<template>
  <div class="m-discount">
    <h3 class="m-part-title" >
      <span class="m-part-title-icon"></span>
      <span>优惠券</span>
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
      <el-table :data="discount_data" v-loading="loading" class="m-table" stripe  :default-sort = "{prop: 'logintime', order: 'descending'}" style="width: 100%">
        <el-table-column align="center" prop="card_name" label="名称" ></el-table-column>
        <el-table-column align="center" prop="card_usetime" label="限制时间"  >
          <template slot-scope="scope" >
            <div class="m-flex-between">
              <el-input v-model="scope.row.card_usetime"  :disabled="scope.row.disable"></el-input>
              <span style="margin-left: 0.1rem;">天</span>
            </div>

          </template>
        </el-table-column>
        <el-table-column align="center" prop="card_use" label="使用条件">
          <template slot-scope="scope">
            <div class="m-flex-between">
              <span style="margin-right: 0.1rem;">$</span>
              <el-input v-model="scope.row.card_use" :disabled="scope.row.disable"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="card_cut"  label="减免金额" >
          <template slot-scope="scope">
            <div class="m-flex-between">
              <span style="margin-right: 0.1rem;">$</span>
              <el-input v-model="scope.row.card_cut" :disabled="scope.row.disable"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="card_cuthigh"  label="最高减免额度" >
          <template slot-scope="scope">
            <div class="m-flex-between">
              <span style="margin-right: 0.1rem;">$</span>
              <el-input v-model="scope.row.card_cuthigh" :disabled="scope.row.disable"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" >
          <template slot-scope="scope">
            <span class="m-table-link" v-if="scope.row.disable" @click="editClick(scope.$index)">编辑</span>
            <span class="m-table-link" v-if="!scope.row.disable" @click="saveClick(scope.$index,'save')">保存</span>
            <span class="m-table-link" v-if="!scope.row.disable" @click="saveClick(scope.$index)">取消</span>
          </template>
        </el-table-column>
      </el-table>


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
        loading:false
      }
    },
    components:{
      Pagination
    },
    mounted(){
      this.getDiscount();
    },
    methods:{
      //
      getDiscount() {
        axios.get(api.card_list).then(res => {
          if(res.data.status == 200){

            for(let i=0;i<res.data.data.length;i++){
              res.data.data[i].disable = true;
            }
            this.discount_data = res.data.data;
          }
        })
      },
      editClick(index){
        let arr = [].concat(this.discount_data);
        arr[index].disable = false;
        this.discount_data = [].concat(arr);
      },
      saveClick(index,bool){
        let arr =[].concat(this.discount_data);
        if(bool){
          axios.post(api.update_card +'?card_id='+arr[index].card_id,{
            card_usetime: arr[index].card_usetime,
            card_use: arr[index].card_use,
            card_cut: arr[index].card_cut,
            card_cuthigh: arr[index].card_cuthigh,
            card_name: arr[index].card_name
          }).then(res => {
            if(res.data.status == 200){
              arr[index].disable = true;
              this.discount_data = [].concat(arr)
              this.$notify({
                title: '提示',
                message: res.data.message,
              });
            }else{
              this.$message.error(res.data.message);
            }
          })
        }else{
          arr[index].disable = true;
          this.discount_data = [].concat(arr)
        }
      },
      addEdit(){
        this.$router.push('/discounts/couponEdit')
      },
      //筛选
      filterTag(value, row) {
        return row.adlevel === value;
      },


      //分页
      pageChange(num){
        this.getAdmin(num)
      },

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

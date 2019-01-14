<template>
  <div class="m-changeApprove">
    <h3 class="m-part-title">
      <span class="m-part-title-icon"></span>
      <span>退换货审批</span>
    </h3>
    <div class="m-content">
      <el-table :data="admin_data" v-loading="loading" class="m-table" stripe  :default-sort = "{prop: 'logintime', order: 'descending'}" style="width: 100%">
        <el-table-column align="center" prop="adnum" label="申请人" ></el-table-column>
        <el-table-column align="center" prop="adname" label="联系方式"></el-table-column>
        <el-table-column align="center" prop="adtelphone"  label="商品" ></el-table-column>
        <el-table-column align="center" prop="adtelphone"  label="商品编号" ></el-table-column>
        <el-table-column align="center" prop="adlevel" label="价格"  ></el-table-column>
        <el-table-column align="center" prop="logintime"  label="申请时间"  ></el-table-column>
        <el-table-column align="center" label="操作" >
          <template slot-scope="scope">
            <el-popover trigger="manual" placement="left" v-model="admin_data[scope.$index].click">
              <div class="m-absolute-modal " style="padding: 0.3rem 0.5rem;">
                <div>
                  <h3 class="m-flex-between">
                    <span>状态：</span>
                    <span>已发货</span>
                  </h3>
                  <p style="margin: 0.2rem 0;"><span>居居女孩</span><span style="color: #999999;margin-left: 0.5rem;">CN+86  15700000000</span></p>
                  <p>收货地址：中国-浙江-杭州市-西湖区
                    浙江工业大学（屏峰校区）家和西苑14幢112</p>
                  <div class="m-approve-product" style="display: flex;flex-flow: row;align-items: flex-start;justify-content: flex-start;margin: 0.2rem 0;">
                    <img src="" style="display: inline-block;width: 1.5rem;height:1.5rem;" alt="">
                    <div style="width: 5.6rem;">
                      <p class="m-flex-between">
                        <span>商品名称</span>
                        <span style="color: #E60012;">$ 18.00</span>
                      </p>
                      <p class="m-flex-between">
                        <span>小苍兰香；50ml</span>
                        <span>×1</span>
                      </p>
                    </div>
                  </div>
                  <p class="m-flex-between">
                    <span>运费</span>
                    <span style="color: #E60012;">$ 0.00</span>
                  </p>
                  <p class="m-flex-between">
                    <span>实付款（含运费，不含关税）</span>
                    <span style="color: #E60012;">$ 0.00</span>
                  </p>
                  <h3 style="font-weight: bold;margin: 0.2rem 0;">备注：</h3>
                  <p>订单信息</p>
                  <p>订单编号：123456789000</p>
                  <p>创建时间：2018-11-05 11:26:00</p>
                  <p>付款时间：2018-11-05 11:27:30</p>
                  <p>发货时间：2018-11-05 11:55:09</p>
                </div>
                <div class="m-modal-btn-box" style="margin-top:0.3rem; ">
                  <span class="m-btn active" @click="saveChange(scope.$index,true,scope.row)">保存</span>
                  <span class="m-btn"  @click="saveChange(scope.$index,false)">取消</span>
                </div>
              </div>
              <span class="m-table-link m-bd name-wrapper" slot="reference"  @click="manageClick(scope.$index)">管理</span>

            </el-popover>
            <span class="m-table-link">删除</span>
          </template>
        </el-table-column>
      </el-table>


      <div class="m-bottom">
        <pagination :total="total_page" @pageChange="pageChange"></pagination>
      </div>
    </div>
    <div class="m-modal" v-if="add_admin">
      <div class="m-absolute-modal m-add-modal" >
        <p>管理员数据管理</p>
        <div class="m-admin-input-box">
          <el-input v-model="new_admin.adname" placeholder="用户名" class="m-input-xs"></el-input>
          <el-select v-model="new_admin.adlevel" class="m-input-xs" placeholder="管理员">
            <el-option
              v-for="item in level"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input v-model="new_admin.adtelphone" placeholder="账号/手机号" class="m-input-xs"></el-input>
          <el-input v-model="new_admin.adpassword" type="password" placeholder="密码" class="m-input-xs"></el-input>
        </div>
        <div class="m-modal-btn-box">
          <span class="m-btn active" @click.stop="addAdmin(true)">同意</span>
          <span class="m-btn " @click.stop="addAdmin(false)">驳回</span>
        </div>
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
        input:'',
        add_admin:false,
        new_admin:{
          adname:'',
          adpassword:'',
          adlevel:'',
          adtelphone:''
        },
        admin_data:[],
        total_page:0,
        level:[],
        loading:false
      }
    },
    components:{
      Pagination
    },
    mounted(){
      this.getAdmin(1);
      this.getType()
    },
    methods:{
      //  获取会员列表
      getAdmin(num){
        this.loading = true;
        axios.get(api.get_admin_list,{
          params: {
            token: localStorage.getItem('token'),
            page_num:num || 1,
            page_size:10
          }}).then(res => {
          if(res.data.status == 200){
            let arr = [].concat(res.data.data);
            for(let i=0;i<arr.length;i++){
              arr[i].click=false;
            }
            this.admin_data = [].concat(arr);
            this.total_page = res.data.total_page;
            this.loading = false;
          }else{
            this.$message.error(res.data.message);
          }
        })
      },
      //获取管理员身份
      getType(){
        axios.get(api.get_admin_all_type).then(res => {
          let level = [];
          for(let key in res.data.data){
            level.push({text:res.data.data[key],value:res.data.data[key],code:key})
          }
          this.level = [].concat(level);
          console.log(this.level,'adadssa')
        })
      },
      //筛选
      filterTag(value, row) {
        return row.adlevel === value;
      },
      // /点击管理
      manageClick(index){
        let arr = [].concat(this.admin_data);
        if(arr[index].click){
          arr[index].click = !arr[index].click;
        }else{
          for(let i=0;i<arr.length;i++){
            arr[i].click=false;
          }
          arr[index].click = true;
        }
        this.admin_data = [].concat(arr);
      },
      //保存 取消
      saveChange(index,bool,a){
        let arr = [].concat(this.admin_data);
        if(bool){
          let params = JSON.parse(JSON.stringify(a));
          for(let i=0;i< this.level.length;i++){
            if(this.level[i].text ==params.adlevel ){
              params.adlevel = this.level[i].code
            }
          }
          console.log(params,this.level)
          axios.post(api.update_admin+'?token='+localStorage.getItem('token'),params).then(res => {
            if(res.data.status == 200){
              arr[index].click = false;
              this.admin_data = [].concat(arr);
              this.$notify.success(res.data.message)
            }else{
              this.$message.error(res.data.message);
            }
          })
        }else{
          arr[index].click = false;
          this.admin_data = [].concat(arr);
        }

      },
      //分页
      pageChange(num){
        this.getAdmin(num)
      },
      //点击弹出新增会员
      addEdit(){
        this.add_admin = true;
      },
      //新增会员保存
      addAdmin(bool){
        if(bool){
          let params = JSON.parse(JSON.stringify(this.new_admin));
          for(let i=0;i< this.level.length;i++){
            if(this.level[i].text ==params.adlevel ){
              params.adlevel = this.level[i].code
            }
          }
          axios.post(api.add_admin_by_superadmin + '?token='+localStorage.getItem('token'),params).then(res => {
            if(res.data.status ==200){
              this.$notify.success(res.data.message)
              this.add_admin = false;
              this.new_admin = {
                adname:'',
                adpassword:'',
                adlevel:'',
                adtelphone:''
              };
              this.getAdmin(1);
            }else{
              this.$message.error(res.data.message);
            }
          })
        }else{
          this.add_admin = false;
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
.m-changeApprove{
  .m-part-title{
    margin-bottom: 0.2rem;
  }

}
  .m-modal-text{
    display: inline-block;
    /*position: relative;*/

  }
  .m-modal{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

  }
  .m-absolute-modal{
    /*position: absolute;*/
    background-color: #fff;
    top: 0;
    /*left: -4.3rem;*/
    width: 6.4rem;
    height: 6.5rem;
    /*box-shadow:0 3px 6px rgba(0,0,0,0.16);*/
    /*border-radius: 10px;*/
    z-index: 100;
    /*padding: 0.37rem 0.26rem 0.5rem 0.44rem;*/
    text-align: left;
    &.m-add-modal{
      position: absolute;
      top: 50%;
      left: 50%;
      box-shadow:0 3px 6px rgba(0,0,0,0.16);
      border-radius: 10px;
      transform: translateX(-2.5rem) translateY(-1.5rem);
      padding: 0.37rem 0.26rem 0.5rem 0.44rem;
    }
    .m-admin-input-box{
      margin: 0.3rem 0 0.1rem;
      .m-input-xs{
        width: 2rem;
        margin-right: 0.1rem;
        display: inline-block;
        margin-bottom: 0.2rem;
      }
    }


  }
</style>

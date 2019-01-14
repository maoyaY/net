<template>
  <div class="m-admin">
    <h3 class="m-part-title">
      <span class="m-part-title-icon"></span>
      <span>配送管理</span>
    </h3>
    <div class="m-search-box">
      <div>
          <span class="m-btn active" @click="addEdit">
            <span class="m-btn-icon m-add"></span>
            <span>新增物流模板</span>
          </span>
      </div>
      <div>
        <el-input v-model="input" class="m-input-s" placeholder="物流"></el-input>
        <span class="m-btn m-search-btn">
            <span class="m-btn-icon m-search"></span>
            <span>搜索</span>
          </span>
      </div>
    </div>

    <div class="m-content">
      <el-table :data="admin_data" v-loading="loading" class="m-table" stripe  :default-sort = "{prop: 'logintime', order: 'descending'}" style="width: 100%">
        <el-table-column align="center" prop="adnum" label="物流公司"  :filters="level" :filter-method="filterTag"></el-table-column>
        <el-table-column align="center" prop="adname" label="基础运费"></el-table-column>
        <el-table-column align="center" prop="adtelphone"  label="第二档运费" ></el-table-column>
        <el-table-column align="center" prop="adtelphone"  label="第三档运费" ></el-table-column>
        <el-table-column align="center" prop="adlevel" label="第四档运费"  ></el-table-column>
        <el-table-column align="center" prop="logintime"  label="更多运费" ></el-table-column>
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
        this.$router.push('/dispatching/addDispatching');
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

</style>

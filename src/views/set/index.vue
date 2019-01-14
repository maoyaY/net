<template>
  <div class="container">

    <h3 class="m-part-title m-flex-start form-section-title">
      <span class="m-part-title-icon"></span>
      <span>配置设置</span>
    </h3>
        <el-form label-width="1.8rem" label-position="left">
          <!--基本信息-->

          <el-form-item label="客户服务：">
            <el-input placeholder="123456789@163.com" v-model="email" class="m-input-m"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input placeholder="CN+86 13900000000" v-model="telephone" class="m-input-m"></el-input>
          </el-form-item>
          <el-form-item label="药品防伪查询网站：">
            <el-input placeholder="http://**************" v-model="href" class="m-input-m"></el-input>
          </el-form-item>

          <el-form-item label="物流免运费：">
            <span>$</span>
            <el-input placeholder="" v-model="no_expressed" class="m-input-m"></el-input>
          </el-form-item>
        </el-form>


    <div class="m-form-btn-box">
      <span class="m-form-btn active" @click="submitSure">确定</span>
      <span class="m-form-btn" @click="changeRoute('-1')"> 取消</span>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import api from '../../api/api'
  export default {
    name: "couponEdit",

    components: {},

    data() {
      return {
        email:'',
        telephone:'',
        href:'',
        no_expressed:'',
        list:[
          {
            name:'custom_email',
            value:'email'
          },
          {
            name:'custom_phone',
            value:'telephone'
          },
          {
            name:'medicine_get',
            value:'href'
          },
          {
            name:'without_expressed',
            value:'no_expressed'
          }
        ]

      }
    },

    computed: {},

    methods: {
      changeRoute(v){
        this.$router.go(v)
      },
      //确定
      submitSure(){
        for(let i=0;i<this.list.length;i++){
          axios.post(api.update_config +'?select_name='+this.list[i].name,{
            select_value:this[this.list[i].value]
          }).then(res => {
            if(res.data.status == 200){
              this.$message({
                type: 'success',
                duration:1000,
                message: res.data.message
              });
            }else{
              this.$message({
                type: 'warning',
                duration:1000,
                message: res.data.message
              });
            }
          })
        }

      },
      getInfo(){
        for(let i=0;i<this.list.length;i++){
          axios.get(api.get_config,{
            params:{
              select_name:this.list[i].name
            }
          }).then(res => {
            if(res.data.status == 200){
              this[this.list[i].value] = res.data.data.select_value;
            }else{
              this.$message({
                type: 'warning',
                duration:1000,
                message: res.data.message
              });
            }
          })
        }

      },
    },

    created() {
      this.getInfo();
    },
  }
</script>

<style lang="less" scoped>
  @import "../../common/css/index";

  .container {




  }
</style>

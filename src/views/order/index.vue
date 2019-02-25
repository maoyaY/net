<template>
  <div class="all-order">
    <h3 class="m-part-title">
        <span>
           <span class="m-part-title-icon"></span>
           <span>Orders Management</span>
        </span>
    </h3>
    <div class="all-order-content" >
      <div class="all-order-search m-flex-between">
        <div class="m-search-input-box">
          <div>
            <el-input v-model="form.ordermain_no" class="m-input-xs" placeholder="Order No"></el-input>
            <el-date-picker
              v-model="form.ordermain_paytime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="Order time">
            </el-date-picker>
          </div>
          <div class="m-mr-top">
            <el-input v-model="form.ordermain_expressno" class="m-input-xs" placeholder="Logistics inquiry No."></el-input>
            <el-input v-model="form.ordermain_name" class="m-input-xs" placeholder="Recipient"></el-input>
            <el-input v-model="form.ordermain_telphone" class="m-input-xs" placeholder="Recipient Contact"></el-input>
          </div>
        </div>
        <div class="tr">
          <p>
            <span class="m-btn m-search-btn" @click="topSearch(1)">
              <span class="m-btn-icon m-search"></span>
              <span>Search</span>
            </span>
          </p>
          <p class="m-mr-top">

          </p>
        </div>
      </div>


      <div class="all-order-tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <div v-for="item in tabList">
            <el-tab-pane :label="item.name" :name="item.name" :value="item.status" :lazy="lazyStatus">
              <span slot="label"> {{item.name}}</span>
              <all-order-table ref="child" :order="order" @toPage="getData"></all-order-table>
            </el-tab-pane>
          </div>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import allOrderTable from '../../components/common/all-order-table';
  import api from '../../api/api';
  import {Message} from 'element-ui';
  import axios from 'axios';
  import index from "../../router";
  export default {
    data() {
      return {
        name: '所有订单',
        activeName: 'All',
        form:{
          ordermain_no:'',
          ordermain_paytime:'',
          ordermain_expressno:'',
          ordermain_name:'',
          ordermain_telphone:''
        },

        OMtime: null,
        OMlogisticsNameSearch: '',
        OMlogisticsNameList: [],
        lazyStatus: false,
        PRnameSearch: '',
        OMidSearch: '',
        orderList: [],
        search: {},
        order: {},
        page_size: 10,
        OMstatus: '',
        OMstartTime: '',
        OMendTime: '',
        tabList:[
          {
            name:'All',
            status:''
          },
          {
            name:'Unpaid',
            status:5
          },
          {
            name:'Paid',
            status:10
          },
          {
            name:'Delivering',
            status:15
          },
          {
            name:'Received',
            status:20
          },
          {
            name:'Completed',
            status:25
          },
          // {
          //   name:'售后中',
          //   status:30
          // },
          {
            name:'Canceled',
            status:-15
          },
          {
            name:'Abnormal',
            status:-99
          }
        ],
        // tabList: ['全 部', '已取消','未支付','支付中', '已支付','已发货','已收货', '已完成','已评价','退款中'],
        index: 0
      }
    },
    components: {  allOrderTable },
    mounted(){
      // this.getStatus();
      this.getData(1)
    },
    methods: {
      // 页面刷新
      freshClick(){
        console.log('fresh');
      },
      // 获取点击tab的label
      handleClick(tab) {
        // 判断要调用哪个子组件的方法
        if(tab.index == 8) {
          this.index = 0
        }else {
          this.index = parseInt(tab.index) + 1
        }

        // this.tabList = ['全 部', '已取消','未支付','支付中', '已支付','已发货','已收货', '已完成','已评价','退款中']
        // tab.label含"0"则不调用接口
        // if(tab.label.indexOf("0") == -1) {
          this.getData(1,tab.$attrs.value)
        // }
      },
      // 获取订单数据
      getData(v,status){
        let params = {
          ordermain_status: status,
          page_num: v,
          page_size: this.page_size,
          // OMid: '',
          // OMlogisticsName: '',
          // PRname: '',
          // OMstartTime: '',
          // OMendTime: ''
        }
        Object.assign(params,this.form);
        // if(this.search != '') {
        //   params.OMid =  this.search.OMid
        //   params.OMlogisticsName =  this.search.OMlogisticsName
        //   params.PRname =  this.search.PRname
        //   params.OMstartTime = this.search.OMstartTime
        //   params.OMendTime =  this.search.OMendTime
        // }
        axios.get(api.get_order_list,{params:params}).then(res => {
          if(res.data.status == 200) {
            this.orderList = res.data;
            this.order = res.data;
            // 仅在查询和点击“全部”Tab标签时，对tabList进行一次添加数量操作
            // if(this.tabList[0].length == 3) {
            //   this.getTabs(this.order.OMcount)
            // }
          }else{
            this.$message.error(res.data.message);
          }
        })
      },
      // 头部查询条件
      topSearch() {
       let status = '';
        for(let i=0;i<this.tabList.length;i++){
          if(this.tabList[i].name == this.activeName){
            status = this.tabList[i].status;
          }
        }
        this.getData(1,status);
      },
      getOMlogisticsNameList() {
        axios.get(api.get_omfilter).then(res => {
          if(res.data.status == 200) {
            for(let i=0;i<res.data.data.length;i++) {
              if(res.data.data[i].key == "OMlogisticsName") {
                this.OMlogisticsNameList = res.data.data[i].value
              }
            }
          }else{
            this.$message.error(res.data.message);
          }
        })
      }
    },
    created() {
      // this.getData(1)
      // this.getOMlogisticsNameList()
    },
    watch: {
      // 依据order变化来传递对应的新的order给对应的this.index的子组件，并调用该子组件的getOrderList方法
      order(newValue, oldValue) {
        console.log(newValue,'asdasd')
        console.log(this.$refs.child[this.index])
        this.$refs.child[this.index].getOrderList(newValue)
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/css/_variate.less";
  .all-order {
    background-color: @bgMainColor;
    .all-order-content {
      background-color: @bgMainColor;
      .all-order-search {
        margin: 0.15rem 0.2rem 0 0.2rem;
        .m-mr-top{
          margin-top: 0.3rem;
        }
        .m-excel-btn{
          display: inline-block;
          padding: 0 0.08rem;
          border: 1px solid @mainColor;
          border-radius: 5px;
          color: #595757;
          height: 0.35rem;
          line-height: 0.35rem;
          font-size: 0.16rem;
          .m-icon-make-report{
            display: inline-block;
            width: 0.25rem;
            height: 0.25rem;
            background: url("../../common/images/icon-make-report.png") no-repeat;
            background-size: 100% 100%;
            vertical-align: middle;
          }
        }
      }
      .all-order-tabs {
        width: 100%;
        background-color: @bgMainColor;
        margin-top: 0.2rem;
        .el-tabs {
          padding: 0.2rem;
        }
      }
    }
  }
  .search-text-input {
    float: left;
    width: 3.2rem;
    margin-bottom: 0.1rem;
    .search-text {
      float: left;
      margin-left: 0.4rem;
      line-height: 0.22rem;
      font-size: 14px;
    }
    .search-text-middle {
      float: left;
      font-size: 14px;
      line-height: 0.22rem;
      margin: 0 0.1rem 0 0.1rem;
    }
    .el-input {
      float: left;
      width: 1.6rem;
    }
  }
</style>


<template>
    <div class="m-profile">
      <!--<h3 class="m-page-title">概况</h3>-->
      <!--<h3 class="m-part-title">-->
        <!--<span class="m-part-title-icon"></span>-->
        <!--<span>待办事项</span>-->
      <!--</h3>-->
      <!--<ul class="m-page-label-ul">-->
        <!--<li @click="changeRoute('/profile/changeApprove')">-->
          <!--<span>退换货审批 </span>-->
          <!--<span>21</span>-->
        <!--</li>-->
      <!--</ul>-->

      <h3 class="m-part-title">
        <span class="m-part-title-icon"></span>
        <span>交易数据</span>
      </h3>

      <div class="m-search-box ">
        <div>
          <el-date-picker
            v-model="value4"
            type="month"
            placeholder="选择月">
          </el-date-picker>
          <span class="m-btn m-search-btn" @click="getUser(page_info.page_num)">
            <span class="m-btn-icon m-search"></span>
            <span>搜索</span>
          </span>
        </div>
      </div>
      <ul class="m-order-label-ul">
        <li>
          <div class="m-icon-price-box">
            <span class="m-icon"></span>
            <div>
              <p>今日交易额</p>
              <p class="m-order-price m-red">${{detail_info.sale_today}}</p>
            </div>
          </div>
          <p class="m-order-bottom">
            <span>昨日</span>
            <span>${{detail_info.sale_yesteday}}
              <!--<span class="m-order-up"></span>-->
            </span>
          </p>
          <p class="m-order-bottom">
            <span>当月</span>
            <span>${{detail_info.price_tomonth}}
              <!--<span class="m-order-up"></span>-->
            </span>
          </p>
          <p class="m-order-all">
            <span>全部交易额</span>
            <span class="m-order-price">${{detail_info.sale_total}}</span>
          </p>
        </li>
        <li>
          <div class="m-icon-price-box">
            <span class="m-icon m-order-num"></span>
            <div>
              <p>今日订单数</p>
              <p class="m-order-price">{{detail_info.today_order}}</p>
            </div>
          </div>
          <p class="m-order-bottom">
            <span>昨日</span>
            <span>{{detail_info.sale_yesteday}}
            <!--<span class="m-order-up m-down"></span>-->
            </span>
          </p>
          <p class="m-order-bottom">
            <span>当月</span>
            <span>{{detail_info.order_tomonth}}
              <!--<span class="m-order-up"></span>-->
            </span>
          </p>
          <p class="m-order-all">
            <span>全部订单数</span>
            <span >{{detail_info.yesteday_order}}</span>
          </p>
        </li>
        <li>
          <div class="m-icon-price-box">
            <span class="m-icon m-order-pay"></span>
            <div>
              <p>用户人数</p>
              <p class="m-order-price">{{detail_info.user_num}}</p>
            </div>
          </div>
          <p class="m-order-bottom">
            <span>昨日</span>
            <span >{{detail_info.yesteday_user}}</span>
          </p>
          <p class="m-order-bottom">
            <span>当月新增</span>
            <span>{{detail_info.user_tomonth}}
              <!--<span class="m-order-up"></span>-->
            </span>
          </p>
        </li>
        <li>
          <div class="m-icon-price-box">
            <span class="m-icon m-order-pay"></span>
            <div>
              <p>下单用户人数</p>
              <p class="m-order-price">{{detail_info.make_order_user}}</p>
            </div>
          </div>
          <!--<p class="m-order-bottom">-->
            <!--<span>昨日</span>-->
            <!--<span >{{detail_info.yesteday_user}}</span>-->
          <!--</p>-->
          <p class="m-order-bottom">
            <span>当月</span>
            <span>{{detail_info.make_order_user_tomonth}}
              <!--<span class="m-order-up"></span>-->
            </span>
          </p>
        </li>
      </ul>
    </div>
</template>

<script>
  import axios from 'axios';
  import api from '../../api/api';
    export default {
        data(){
          return{
            detail_info:null,
            value4:''
          }
        },
       components:{

       },
      mounted(){
          this.getInfo();
      },
      methods:{
          changeRoute(v){
            this.$router.push(v)
          },
        getInfo(){
          axios.get(api.get_software_data).then(res => {
            if(res.data.status == 200){
              this.detail_info = res.data.data;
            }
          })
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/css/index";
.m-profile{
  .m-page-title{
    font-size: 0.15rem;
    font-weight: bold;
    margin-bottom: 0.2rem;
  }
  .m-page-label-ul{
    .flex-row(space-start);
    padding: 0.29rem 0;
    border-top: 1px solid @borderColor;
    margin-top: 0.2rem;
    li{
      width: 2.16rem;
      height: 0.83rem;
      line-height: 0.83rem;
      border-radius: 5px;
      box-shadow:0 5px 10px rgba(0,0,0,0.16);
      margin-right: 0.17rem;
      background-color: #CB7E88;
      color: #FFFFFF;
      text-align: center;
      font-size: 0.21rem;
      &.orange{
        background-color: #D18E62;
      }
      &.green{
        background-color: #C7D687;
      }
      &.blue{
        background-color: #87ACD6;
      }
      &.purple{
        background-color: #C397CB;
      }
      &.purple{
        background-color: #C397CB;
      }
    }
  }
  .m-order-label-ul{
    .flex-row(flex-start);
    border: 1px solid @borderColor;
    width: 90%;
    margin: 0.3rem 0;
    /*height: 190px;*/
    li{
      width: 33%;
      height: 2rem;
      padding: 0.4rem 0.5rem 0.24rem;
      border-right: 1px solid @borderColor;
      &:last-child{
        border-right: none;
      }
      .m-icon-price-box{
        .flex-row(flex-start);
        margin-bottom: 0.4rem;
        font-size: 0.18rem;
        .m-icon{
          display: block;
          width: 0.66rem;
          height: 0.66rem;
          background: url("../../common/images/order-money.png") no-repeat;
          background-size: 100% 100%;
          margin-right: 0.2rem;
          &.m-order-num{
            background: url("../../common/images/order-num.png") no-repeat;
            background-size: 100% 100%;
          }
          &.m-order-pay{
            background: url("../../common/images/order-pay.png") no-repeat;
            background-size: 100% 100%;
          }
          &.m-order-back{
            background: url("../../common/images/order-back.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .m-order-price{
          font-size: 0.17rem;
          margin-top: 0.2rem;
          &.m-red{
            color: #D80000;
          }
        }
      }
      .m-order-bottom{
        .flex-row(space-between);
        font-size: 0.17rem;
        color: #999999;
        .m-order-up{
          display: inline-block;
          width: 0.17rem;
          height: 0.17rem;
          background: url("../../common/images/icon-order-up.png") no-repeat;
          background-size: 100% 100%;
          vertical-align: text-top;
          &.m-down{
            background: url("../../common/images/icon-order-down.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .m-order-all{
        border-top: 1px solid @borderColor;
        padding: 0.1rem 0.1rem 0.1rem 0;
        font-size: 0.18rem;
        margin-top: 0.2rem;
        .flex-row(space-between);
        .m-order-price{
            color: #D80000;
        }
      }
    }

  }

}
</style>

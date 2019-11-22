<template>
  <div class="container">
    <section class="profile-block profile-todos-block">
      <block-title title="待办事项"></block-title>
      <div class="todo-line"></div>

      <ul class="todo-list">
        <li class="todo-item" v-for="item in todos" v-if="item.approval_num != 0" :key="item.ptid" @click="gotoTodoPage(item)">
          <span class="label">{{item.ptname}}</span>
          <span class="num">{{item.approval_num}}</span>
        </li>
      </ul>
    </section>

    <section class="profile-block">
      <block-title title="交易数据"></block-title>
      <ul class="m-order-label-ul">
        <li>
          <div class="m-icon-price-box click-cursor" @click="gotoOrderWithParam(1,'today')">
            <img class="static-icon" src="/static/images/order-money.png" alt="">
            <div class="icon-price-box-main">
              <p class="label">今日交易额</p>
              <p class="m-order-price m-red">￥{{todaySaleData.day_total}}</p>
            </div>
          </div>

          <p class="m-order-bottom click-cursor" @click="gotoOrderWithParam(1,'yesterday')">
            <span>昨日</span>
            <section class="m-order-bottom-right">
              <span>{{yesterdaySaleData.day_total}}</span>
              <img
                :src="todaySaleData.day_total > yesterdaySaleData.day_total ? '/static/images/icon-order-up.png' : '/static/images/icon-order-down.png'"
                alt="">
            </section>
          </p>

          <p class="m-order-all click-cursor" @click="gotoOrderWithParam(1,'')">
            <span>总交易额</span>
            <span class="m-order-price">￥{{totalSaleData.day_total}}</span>
          </p>
        </li>
        <li>
          <div class="m-icon-price-box click-cursor" @click="gotoOrderWithParam(1,'today')">
            <img class="static-icon" src="/static/images/order-num.png" alt="">
            <div class="icon-price-box-main">
              <p class="label">今日订单数</p>
              <p class="m-order-price">{{todaySaleData.day_count}}</p>
            </div>
          </div>

          <p class="m-order-bottom click-cursor" @click="gotoOrderWithParam(1,'yesterday')">
            <span>昨日</span>
            <section class="m-order-bottom-right">
              <span>{{yesterdaySaleData.day_count}}</span>
              <img
                :src="todaySaleData.day_count > yesterdaySaleData.day_count ? '/static/images/icon-order-up.png' : '/static/images/icon-order-down.png'"
                alt="">
            </section>
          </p>

          <p class="m-order-all click-cursor" @click="gotoOrderWithParam(2,'')">
            <span>总订单数</span>
            <span class="m-order-price">{{totalSaleData.day_count}}</span>
          </p>
        </li>
        <li>
          <div class="m-icon-price-box click-cursor" @click="gotoOrderWithParam(3,'today')">
            <img class="static-icon" src="/static/images/order-pay.png" alt="">
            <div class="icon-price-box-main">
              <p class="label">待付款订单数</p>
              <p class="m-order-price">{{todaySaleData.wai_pay_count}}</p>
            </div>
          </div>
        </li>
        <li>
          <div class="m-icon-price-box click-cursor" @click="gotoOrderWithParam(4,'today')">
            <img class="static-icon" src="/static/images/order-back.png" alt="">
            <div class="icon-price-box-main">
              <p class="label">退款订单数</p>
              <p class="m-order-price">{{todaySaleData.in_refund}}</p>
            </div>
          </div>
          <p class="m-order-bottom click-cursor" @click="gotoOrderWithParam(4,'yesterday')">
            <span>昨日</span>
            <span>{{yesterdaySaleData.in_refund}}</span>
          </p>
        </li>
      </ul>
    </section>

    <div id="index_charts" style="width: 90%;height: 300px;"></div>
    <!--<block-title title="订单趋势"></block-title>-->
    <!--<echarts :id="id" :option="option" :width="1300"></echarts>-->
  </div>
</template>

<script>
  import VueEcharts from "src/components/VueEcharts";
  import permission from 'src/directive/permission/index.js' // 权限判断指令
  import checkPermission from 'src/utils/permission' // 权限判断函数
  import {level0, level2} from "src/router";


  export default {
    name: 'ProfileIndex',

    components: {
      echarts: VueEcharts
    },

    directives: {permission},

    data() {
      return {
        level0,
        level2,

        todos: [],

        todaySaleData: {},
        yesterdaySaleData: {},
        totalSaleData: {},
        upUrl: '',
        downUrl: '',

        id: 'profile_echart',
        option: {
          color: ['#CB7E88', '#F2DA7A', '#97ADCB'],
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['邮件营销', '联盟广告', '视频广告']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'line',
              stack: '总量',
              data: [150, 232, 201, 154, 190, 330, 410]
            }
          ]
        },
      }
    },

    computed: {},

    methods: {
      checkPermission,

      getDealingApproval() {
        this.todos = [];
        this.$http.get(this.$api.get_dealing_approval, {
          params: {}
        }).then(
          res => {
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;
              this.todos = this.todos.concat(data);
            }
          }
        );
        this.$http.get(this.$api.get_all_order, {
          params: {
            omstatus: 10,
          }
        }).then(
          res => {
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.todos.push({
                ptid: 'towaitdelivery',
                ptname: '待发货订单',
                approval_num: resData.total_count
              });
            }
          }
        );
        this.$http.get(this.$api.get_all_order, {
          params: {
            omstatus: 10,
            omfrom: '30,40,50,60,70,80,90'
          }
        }).then(
          res => {
            if (res.data.status == 200) {
              let resData = res.data,
                data = res.data.data;

              this.todos.push({
                ptid: 'towaitdeliveryactivity',
                ptname: '待发货活动订单',
                approval_num: resData.total_count
              });
            }
          }
        );
        if(this.$store.state.user.userInfo.level != 'supplizer'){
          this.$http.get(this.$api.data_overview).then(
            res => {
              if (res.data.status == 200) {
                this.option.series = res.data.data.series;
                for(let i in this.option.series){
                  this.option.series[i].type = 'line';
                }
                this.option.xAxis.data = res.data.data.days;
                var myChart = this.$echarts.init(document.getElementById('index_charts'));
                myChart.setOption(this.option);
              }
            }
          );
        }

      },

      gotoTodoPage(item) {
        console.log(item.ptid)
        switch (item.ptid) {
          //  激活码和新代理全交由平台
          case 'toactivationcode':
            this.$router.push('/approval/activationCodeActi')
            break;
          case 'toagent':
            this.$router.push('/approval/agentAudit')
            break;

          //  圈子
          case 'topublish':
            if (this.$store.getters.roles[0] != 'supplizer') {
              this.$router.push('/approval/circleAudit')
            }else{
              this.$router.push('/circle/circle')
            }
            break;
          //  圈子打赏
          case 'tonewsaward':
            if (this.$store.getters.roles[0] != 'supplizer') {
              this.$router.push('/approval/circleRewardAudit')
            }
            break;
          //  4个活动
          case 'tofreshmanfirstproduct':
            if (this.$store.getters.roles[0] != 'supplizer') {
              this.$router.push('/approval/firstOrderActiAudit')
            } else {
              this.$router.push('/activity/firstOrder')
            }
            break;
          case 'toguessnum':
            if (this.$store.getters.roles[0] != 'supplizer') {
              this.$router.push('/approval/guessActiAudit')
            } else {
              this.$router.push('/activity/guess')
            }
            break;
          case 'togroupgoods':
            if (this.$store.getters.roles[0] != 'supplizer') {
              this.$router.push('/approval/groupActiAudit')
            } else {
              this.$router.push('/activity/groupGuess')
            }
            break;
          case 'tomagicbox':
            if (this.$store.getters.roles[0] != 'supplizer') {
              this.$router.push('/approval/magicGiftBoxAudit')
            } else {
              this.$router.push('/activity/magicGiftBox')
            }
            break;
          case 'totrialcommodity':
            if (this.$store.getters.roles[0] != 'supplizer') {
              this.$router.push('/approval/trialProductAudit')
            } else {
              this.$router.push('/activity/trialProduct')
            }
            break;

          case 'toshelves':
            if (this.$store.getters.roles[0] != 'supplizer') {
              this.$router.push('/approval/productAudit')
            }else{
              this.$router.push({
                name: 'ProductIndex',
                params: {
                  prstatus: 'auditing'
                }
              })
            }
            break;
          case 'totimelimited':
            if (this.$store.getters.roles[0] != 'supplizer') {
              this.$router.push('/approval/limitedProductAudit');
            }else{
              this.$router.push('/activity/limitedFix');
            }

            break;
          case 'tointegral':
              this.$router.push('/approval/starAudit');
            break;
          case 'toreturn':
            this.$router.push('/approval/returnProductAudit')
            break;

          case 'tocash':
            if (this.$store.getters.roles[0] != 'supplizer') {
              this.$router.push('/approval/withdrawAudit')
            }else{
              this.$router.push('/personSetting/withdraw')
            }
            break;
          case 'tosettlenment':
            if (this.$store.getters.roles[0] != 'supplizer') {
              this.$router.push('/approval/supplizerBalanceApplyAudit')
            }else{
              this.$router.push('/personSetting/balance')
            }
            break;
          case 'totoilet':
            this.$router.push('/approval/toiletAudit');
            break;
          case 'toguide':
            this.$router.push('/approval/guideAudit');
            break;

          //    自定义:发货订单,不在审批流内,合并显示
          case 'towaitdelivery':
            this.$router.push({
              name: 'OrderIndex',
              params: {
                omstatus:10
              }
            })
            break;

          case 'towaitdeliveryactivity':
            this.$router.push({
              name: 'ActiOrder',
              params: {
                omstatus:10,
                omfrom:'30,40,50,60,70,80'
              }
            })
            break;
        }
      },

      async getHistoryDetail(days) {
        let res = await this.$http.get(this.$api.history_detail, {
          params: {
            days: days,
          }
        });

        if (res.data.status == 200) {
          let resData = res.data,
            data = res.data.data;

          return data
        }
      },

      async setSaleData() {
        let today = new Date(),
          yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

        let twoDaysData = await this.getHistoryDetail(this.formatDate(yesterday) + ',' + this.formatDate(today));
        let allData = await this.getHistoryDetail();

        this.yesterdaySaleData = twoDaysData[0];
        this.todaySaleData = twoDaysData[1];
        this.totalSaleData = allData[0];
      },

      gotoOrderWithParam(type, dateType) {
        let query = {
          omstatus: ''
        }

        let today = new Date(),
          yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

        if (dateType == 'today') {
          query.searchDate = this.formatDate(today)
        } else if (dateType == 'yesterday') {
          query.searchDate = this.formatDate(yesterday)
        }

        switch (type) {
          case 1:
          case 2:
            break
          case 3:
            query.omstatus = '0'
            break
          case 4:
            query.omstatus = '40'
            break
        }

        this.$router.push({
          // path: '/order/order',
          // query
          name: 'AllOrder',
          params: query
        })
      },

      formatDate: function (date) {
        var arr = [];
        arr[0] = date.getFullYear();
        arr[1] = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        arr[2] = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return `${arr[0]}-${arr[1]}-${arr[2]}`
      },

    },

    async created() {
      this.getDealingApproval();

      await this.setSaleData();

    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";

  .container {
    .marquee-block {
      position: fixed;
      height: 100px;
      width: 100%;

    }

    .profile-block {
      margin-bottom: 20px;
    }

    .profile-todos-block {
      .todo-line {
        height: 2px;
        background: @borderColor;
        margin-bottom: 20px;
      }

      .todo-list {
        .fj(flex-start);
        flex-wrap: wrap;

        .todo-item {
          cursor: pointer;
          .sc(20px, white);
          padding: 20px 40px;
          box-sizing: border-box;
          margin-right: 20px;
          background: #CB7E88;
          border-radius: 10px;
          .bs(10px, 5px, 10px);
          .fj();
          align-items: flex-end;
          white-space: nowrap;

          &:nth-child(2) {
            background: #D18E62;
          }

          &:nth-child(3) {
            background: #C7D687;
          }

          &:nth-child(4) {
            background: #87ACD6;
          }

          &:nth-child(5) {
            background: #CB7E88;
          }

          &:nth-child(6) {
            background: #C397CB;
          }

          .label {
            margin-right: 10px;
          }

          .num {
            .fz(22px);
          }
        }
      }
    }

    .m-order-label-ul {
      .fj(flex-start);
      border: 1px solid @borderColor;
      width: 100%;

      li {
        flex: 1;
        padding: 40px 40px 10px;
        border-right: 1px solid @borderColor;

        &:last-child {
          border-right: none;
        }
        .m-icon-price-box {
          .fj(flex-start);
          align-items: center;
          margin-bottom: 40px;
          font-size: 18px;

          .static-icon {
            .wl(66px, 66px);
            margin-right: 20px;
          }

          .icon-price-box-main {
            .fjc();
            color: #595757;

            .m-order-price {
              font-size: 17px;
              margin-top: 20px;
              &.m-red {
                color: #D80000;
              }
            }
          }

        }
        .m-order-bottom {
          .fj();

          font-size: 17px;
          color: #999999;

          .m-order-bottom-right {
            .fj();

            img {
              .wl(17px, 17px);
            }
          }
        }
        .m-order-all {
          border-top: 1px solid @borderColor;
          padding: 10px 10px 10px 0;
          font-size: 18px;
          margin-top: 20px;
          .fj();
          color: #595757;

          .m-order-price {
            color: #D80000;
          }
        }
      }

    }

  }
</style>

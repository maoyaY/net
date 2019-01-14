<template>
  <div class="container">
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/marketing'}" replace>优惠券首页</el-breadcrumb-item>
      <el-breadcrumb-item>优惠券编辑</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row>
      <el-col :span="16">
        <el-form label-width="100px" label-position="left">
          <!--基本信息-->
          <h3 class="m-part-title m-flex-start form-section-title">
            <span class="m-part-title-icon"></span>
            <span>基本信息</span>
          </h3>
          <el-form-item label="优惠券名称：">
            <el-input placeholder="优惠券名称"></el-input>
          </el-form-item>

          <el-form-item label="优惠内容：">
            <section>
              <el-radio v-model="privilegeType" label="1">减价</el-radio>
              <el-radio v-model="privilegeType" label="2">打折</el-radio>
            </section>

            <section v-if="privilegeType == 1" class="input-section-wrap">
              <span>减</span>
              <el-input>
                <span slot="prefix">￥</span>
              </el-input>
              <span>元</span>
            </section>
            <section v-if="privilegeType == 2" class="input-section-wrap">
              <el-input>
                <span slot="prefix">￥</span>
              </el-input>
              <span>折</span>
            </section>
          </el-form-item>

          <el-form-item label="生效条件：">
            <section>
              <el-radio v-model="effectTerm" label="1">无条件</el-radio>
              <el-radio v-model="effectTerm" label="2">满减条件</el-radio>
            </section>

            <section v-if="effectTerm == 2" class="input-section-wrap">
              <span>满</span>
              <el-input>
                <span slot="prefix">￥</span>
              </el-input>
              <span>元减</span>
            </section>
          </el-form-item>

          <el-form-item label="有效期限：">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="起始日期"
                              style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="middle-line" :span="2">
                -
            </el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="结束日期"
                              style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item label="活动范围：">
            <section>
              <el-radio v-model="scopeType" label="1">全平台参与</el-radio>
              <el-radio v-model="scopeType" label="2">自选商品</el-radio>
            </section>
            <section v-if="scopeType==2">
              <span class="m-btn" @click="handleAddActionProd">
                <span class="m-btn-icon m-add"></span>
                <span>添加商品</span>
              </span>

              <ul class="in-action-product-list">
                <li class="in-action-product-item" v-for="item in 4">
                  <img class="product-img" src="/static/images/test_bg.jpg" alt="">

                  <section class="remove-img"></section>
                </li>
              </ul>
            </section>
          </el-form-item>

          <h3 class="m-part-title m-flex-start form-section-title">
            <span class="m-part-title-icon"></span>
            <span>领取设置</span>
          </h3>
          <el-form-item label="领取限制：">
            <section>
              <el-radio v-model="limitType" label="1">不限</el-radio>
              <el-radio v-model="limitType" label="2">限制</el-radio>
            </section>

            <section v-if="limitType == 2" class="input-section-wrap">
              <el-input></el-input>
              <span>张</span>
            </section>
          </el-form-item>

          <h3 class="m-part-title m-flex-start form-section-title">
            <span class="m-part-title-icon"></span>
            <span>使用须知</span>
          </h3>
          <el-input type="textarea"></el-input>

          <h3 class="m-part-title m-flex-start form-section-title">
            <span class="m-part-title-icon"></span>
            <span>优惠券标签</span>
          </h3>

          <el-checkbox :indeterminate="isLabelIndeterminate" v-model="checkAllCouponLabel"
                       @change="handleCheckAllCouponLabelChange">全选
          </el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCouponLabel" @change="handleCheckedCouponLabelChange">
            <el-checkbox v-for="item in allCouponLabel" :label="item" :key="item">
              {{item}}
            </el-checkbox>
          </el-checkbox-group>
          <div style="margin: 15px 0;"></div>
          <el-input ref="inputCouponLabel" class="input-new-tag" v-if="inputCouponLabelVisible" v-model.trim="inputCouponLabelVal"
            size="small" @keyup.enter.native="addCouponLabel" @blur="inputCouponLabelVisible=false" placeholder="回车保存新的尺码">
          </el-input>
          <el-tooltip v-else class="item" effect="dark" content="点击后切换成输入框,不能重名!"
                      placement="right">
            <el-button type="=primary" size="small" @click="showCouponLabelSize" icon="el-icon-plus">
              新增尺码
            </el-button>
          </el-tooltip>
        </el-form>
      </el-col>
    </el-row>

    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-table ref="prodTable" :data="gridData" @row-click="handleClickProdRow">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column property="date" label="商品" width="150"></el-table-column>
        <el-table-column property="date" label="商品编号" width="150"></el-table-column>
        <el-table-column property="name" label="价格" width="200"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "couponEdit",

    components: {},

    data() {
      return {
        formData: {},

        privilegeType: '1',   //  优惠内容
        effectTerm: '1',    //  生效条件
        scopeType: '1',   //  生效范围
        limitType: '1', //  领取限制

        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,

        checkAllCouponLabel: false,
        isLabelIndeterminate: false,
        allCouponLabel: ['全场通用', '满减优惠券'],
        // allSizesName: [],
        checkedCouponLabel: [],

        inputCouponLabelVisible: false,
        inputCouponLabelVal: '',

      }
    },

    computed: {},

    methods: {
      handleAddActionProd(){
          this.dialogTableVisible  = true;
      },
      handleClickProdRow(row){
        this.$refs.prodTable.toggleRowSelection(row);
      },

      handleCheckAllCouponLabelChange(val){
        this.checkedCouponLabel = val ? this.allCouponLabel : [];
        this.isLabelIndeterminate = false;
      },
      handleCheckedCouponLabelChange(value){
        let checkedCount = value.length;

        this.checkAllCouponLabel = checkedCount === this.allCouponLabel.length;
        this.isLabelIndeterminate = checkedCount > 0 && checkedCount < this.allCouponLabel.length;
      },

      showCouponLabelSize(){
        this.inputCouponLabelVisible = true;
        this.$nextTick(_ => {
          this.$refs.inputCouponLabel.focus();
        });
      },
      addCouponLabel(){
          this.allCouponLabel.push(this.inputCouponLabelVal);
          this.inputCouponLabelVisible = false;
          this.inputCouponLabelVal = '';
      },
    },

    created() {

    },
  }
</script>

<style lang="less" scoped>
  @import "../../common/css/index";

  .container {
    .breadcrumb {
      margin-bottom: .6rem;
    }

    .form-section-title {
      margin-top: .26rem;
      margin-bottom: .1rem;
    }

    .input-section-wrap {
      .fj(flex-start);

      .el-input {
        margin: 0 .1rem;
        width: 3rem;
      }
    }

    .middle-line{
      font-size: large;
      text-align: center;
      font-weight: bold;
    }

    .in-action-product-list {
      .fj(flex-start);

      .in-action-product-item{
        margin-right: .14rem;
        position: relative;
        .wl(.8rem, .8rem);

          img.product-img{
            .wl(.8rem, .8rem);
          }

          .remove-img{
            position: absolute;
            right: 0;
            bottom: 0;
            .wl(.3rem, .3rem);
            background-size: 100% 100%;
            background-image: url("../../common/images/icon-label-delete-active.png");
          }

      }
    }

  }
</style>

<template>
  <div class="container">
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/discounts'}" replace>配送管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增物流模板</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row>
      <el-col :span="16">
        <el-form label-width="100px" label-position="left">
          <!--基本信息-->
          <h3 class="m-part-title m-flex-start form-section-title">
            <span class="m-part-title-icon"></span>
            <span>运费模板编辑</span>
          </h3>
          <div class="m-box">
            <el-form-item label="优惠内容：">
              <el-select v-model="value"  placeholder="物流公司：">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="基础运费：">
              <el-input placeholder="$"></el-input>
            </el-form-item>
          </div>
          <div class="m-box">
            <el-form-item label="第二档运费：">
            </el-form-item>
            <el-form-item label="有效期限：">
              <el-col :span="11">
                <el-input placeholder="$"></el-input>
              </el-col>
              <el-col class="middle-line" :span="2">
                -
              </el-col>
              <el-col :span="11">
                <el-input placeholder="$"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="基础运费：">
              <el-input placeholder="$"></el-input>
            </el-form-item>
          </div>
          <p>
            <span class="m-link-text">+新建运费模板</span>
          </p>

        </el-form>
      </el-col>
    </el-row>


  </div>
</template>

<script>
  export default {
    name: "couponEdit",

    components: {},

    data() {
      return {
        formData: {},
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
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
  .container{
    .form-section-title{
      margin-top: 0.2rem ;
    }
  }
 .m-box{
   padding-top: 0.2rem;
   border-bottom: 1px solid @borderColor;
   margin-bottom: 0.2rem;
 }
  .middle-line{
    text-align: center;
  }
</style>

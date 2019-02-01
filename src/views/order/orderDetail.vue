<template>
  <div class="m-step">
    <h3 class="m-part-title m-flex-between">
        <span>
           <span class="m-part-title-icon"></span>
           <span>订单详情</span>
        </span>
      <span class="m-excel-btn" @click="getPdf()">
        <span class="m-icon-make-report"></span>
        <span>生成报表</span>
      </span>
    </h3>
    <div class="m-order-excel" id="pdfDom">
      <div class="m-order-excel-top">
        <h3 class="m-order-excel-h3">ORDER DETAILS</h3>
        <p>
          No.:{{order.ordermain_no}}
        </p>
        <p>
          Date:{{order.ordermain_createtime}}
        </p>
      </div>
      <div>
        <h3 class="m-order-excel-product-title">Product Information</h3>
        <el-table
          :data="order.sku_list"
          style="width: 100%"
          class="m-no-top-color"
        >
          <el-table-column align="left" prop="sku_pic" width="1000" label="Product">
            <template slot-scope="scope">
              <img  :src="scope.row.sku_pic" alt="" style="width: 1rem;height: 1rem;margin-right: 0.2rem;">
              <span>{{scope.row.products_name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="sku_detail"
            label="Specification"
            >
          </el-table-column>
          <el-table-column
            prop="product_num"
            label="Quantity"
          >
          </el-table-column>
        </el-table>
        <p style="font-size: 0.18rem;text-align: right;margin: 0.2rem 2rem 0.4rem 0;">
          total:  {{total_count}}
        </p>
        <div class="m-order-excel-info">
          <div class="m-order-excel-ifo-content">
            <h3 class="m-order-excel-product-title">Shipping Address </h3>
            <ul class="m-order-detail-text">
              <li>
                <span class="m-order-label">Name：</span>
                <span>{{order.ordermain_englishname}}</span>
              </li>
              <li>
                <span class="m-order-label">Phone：</span>
                <span>{{order.ordermain_telphone}}</span>
              </li>
              <li>
                <span class="m-order-label">ID Card No：</span>
                <span>{{order.ordermain_cardno}}</span>
              </li>
              <li>
                <span class="m-order-label">Address：</span>
                <span>{{order.ordermain_englishmessage}}</span>
              </li>
              <li>
                <span class="m-order-label">Postcode：</span>
                <span>{{order.ordermain_message}}</span>
              </li>
            </ul>
          </div>
          <div class="m-order-excel-ifo-content">
            <h3 class="m-order-excel-product-title">收件信息</h3>
            <ul class="m-order-detail-text">
              <li>
                <span class="m-order-label">姓名：</span>
                <span>{{order.ordermain_name}}</span>
              </li>
              <li>
                <span class="m-order-label">联系方式：</span>
                <span>{{order.ordermain_telphone}}</span>
              </li>
              <li>
                <span class="m-order-label">身份证号：</span>
                <span>{{order.ordermain_cardno}}</span>
              </li>
              <li>
                <span class="m-order-label">收货地址：</span>
                <span>{{order.ordermain_address}}</span>
              </li>
              <li>
                <span class="m-order-label">邮政编码：</span>
                <span>{{order.address_levelno}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="m-step-content">
      <div class="m-step-part">
        <step :list="step"></step>
      </div>
      <div class="m-flex-between">
        <div class="details-middle-left">
          <div class="m-step-part">
            <h4>订单详情</h4>
            <ul class="m-order-detail-text">
              <li>
                <span class="m-order-label">订单编号：</span>
                <span>{{order.ordermain_no}}</span>
              </li>
              <li>
                <span class="m-order-label">买家：</span>
                <span>{{order.ordermain_name}}</span>
              </li>
              <li>
                <span class="m-order-label">配送方式：</span>
                <span>EMS</span>
              </li>
              <li>
                <span class="m-order-label">收货信息：</span>
                <span>{{order.ordermain_address}}</span>
              </li>
              <li>
                <span class="m-order-label">买家留言：</span>
                <span>{{order.ordermain_message}}</span>
              </li>
              <li>
                <span class="m-order-label">英文留言：</span>
                <span>{{order.ordermain_englishmessage}}</span>
              </li>
              <li>
                <el-button class="right-button dialog-footer"  slot="footer" style="background-color: #7B95B8;color: #fff;" @click="messageShow = true">英文备注</el-button>
                <el-dialog  :visible.sync="messageShow" title="添加英文备注" width="6rem">
                  <div>
                    <el-input v-model="ordermain_englishname"  placeholder="请输入英文名称"></el-input>
                  </div>
                  <div style="margin-top: 0.2rem;">
                    <el-input v-model="ordermain_englishmessage"  placeholder="请输入英文地址"></el-input>
                  </div>

                  <div style="margin-top: 0.2rem;text-align: right;">
                    <el-button class="right-button"  @click="messageShow = false">取 消</el-button>
                    <el-button class="right-button" style="background-color: #7B95B8;color: #fff;" @click="messageSure">确 定</el-button>
                  </div>

                </el-dialog>

              </li>
            </ul>
          </div>
        </div>
        <div class="details-middle-right">
          <div class="m-step-part">
            <div class="right-top-top">
              <div class="left-icon"><img src="../../assets/images/toSend.png" height="50"/></div>
              <div class="right-text">
                <div class="right-top">订单状态：{{orderStatus}}</div>
                <!--<div class="right-bottom">{{reminder}}</div>-->
              </div>
            </div>
            <div class="right-middle">
              <!--发货弹出框-->
              <el-dialog title="收货地址" :visible.sync="toSendForm" style="padding: 0">
                <div class="buyer-info">
                  <div class="buyer-info-title">买家收货信息</div>
                  <div class="info-left-text-div">
                    <div class="info-text">订单编号：</div>
                    <div class="info-text">联系对象：</div>
                    <div class="info-text">联系方式：</div>
                    <div class="info-text">收货地址：</div>
                    <div class="info-text">下单时间：</div>
                    <div class="info-text">备注：</div>
                  </div>
                  <div class="info-right-text-div">
                    <div class="info-text-value">{{order.ordermain_no}}</div>
                    <div class="info-text-value">{{order.ordermain_name}}</div>
                    <div class="info-text-value">{{order.ordermain_telphone}}</div>
                    <div class="info-text-value">{{order.ordermain_address}}</div>
                    <div class="info-text-value">{{order.ordermain_createtime}}</div>
                    <div class="info-text-value">{{order.ordermain_message}}</div>
                  </div>
                </div>
                <div class="send-info">
                  <el-form :model="form" class="send-info-form">
                    <el-form-item label="物流公司:" label-width="1.2rem">
                      <el-select v-model="form.region" placeholder="" style="width: 1.7rem" size="small">
                        <el-option label="EMS" value="EMS"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="快递单号:" label-width="1.2rem">
                      <el-input v-model="ordermain_expressno" auto-complete="off" style="width: 1.7rem" size="small"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div slot="footer" style="text-align: center;margin-bottom: 0.2rem">
                  <el-button class="right-button" style="background-color: #fff;color: #000" @click="toSendForm = false">取 消</el-button>
                  <el-button class="right-button" @click="toSend">确 定</el-button>
                </div>
              </el-dialog>
              <!--备注弹出框-->
              <el-dialog title="备 注" :visible.sync="memoForm" width="4rem">
                <el-form :model="memoForms">
                  <el-form-item label="备 注：" :label-width="formLabelWidth">
                    <el-input v-model="memoForms.name" auto-complete="off" size="small" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" style="width: 90%"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button class="right-button" style="background-color: #fff;color: #000" @click="memoForm = false">取 消</el-button>
                  <el-button class="right-button" @click="memoForm = false">确 定</el-button>
                </div>
              </el-dialog>
              <!--显示物流信息弹出框-->
              <el-dialog title="物流信息" :visible.sync="searchWhere"  width="6rem">
                <div v-for="where in whereList" class="where-list">
                  {{where.datetime}} {{where.remark}}
                </div>
                <span slot="footer" class="dialog-footer" @click="getLog">
                <el-button class="right-button" @click="searchWhere=false">确 定</el-button>
              </span>
              </el-dialog>
              <!--判断订单状态后显示相应的操作按钮-->
              <div v-if="order.ordermain_status=='已取消'">
                <div style="height: 0.3rem">用户已取消订单</div>
              </div>
              <div v-if="order.ordermain_status=='未支付'">
                <!--<div style="height: 0.3rem">用户已支付</div>-->
                <el-button class="right-button" @click="havePay">用户已支付</el-button>
              </div>
              <div v-if="order.ordermain_status=='支付中'">
                <div style="height: 0.3rem">等待支付款项到账</div>
              </div>
              <div v-if="order.ordermain_status=='已支付'">
                <el-button class="right-button" @click="toSendForm=true">发 货</el-button>
                <!--<el-button class="right-button" @click="" style="margin-left: 0.2rem;" @click="memoForm=true">备 注</el-button>-->
              </div>
              <div v-if="order.ordermain_status=='已发货' || order.ordermain_status=='配送中'">
                <el-button class="right-button" @click="searchWhere=true">查看物流进度</el-button>
              </div>
              <div v-if="order.ordermain_status=='已签收'">
                <div style="height: 0.3rem">用户已收货</div>
              </div>
              <div v-if="order.ordermain_status=='已完成'">
                <div style="height: 0.3rem">该订单已完成</div>
              </div>
              <div v-if="order.ordermain_status=='售后中'">
                <div style="height: 0.3rem">该订单售后中</div>
              </div>
              <div v-if="order.ordermain_status=='异常单'">
                <div style="height: 0.3rem">该订单异常</div>
              </div>
            </div>
            <div class="right-bottom-text">
              <div class="bottom-title">温馨提示</div>
              <div class="bottom-text">•如果无法发货，请及时与买家联系并说明情况后进行退款；</div>
              <div class="bottom-text">•买家申请退款后，需征得卖家同意后再发货，否则卖家有权拒收货物；</div>
              <div class="bottom-text">•买家付款后超过7天仍未发货，将有权申请平台客服介入发起退款维权。</div>
            </div>
          </div>
        </div>
      </div>

      <div class="details-bottom">
        <el-table class="details-table" :data="order.sku_list" border style="width: 100%" stripe size="mini">
          <el-table-column align="center" prop="sku_pic" label="商品图片">
            <template slot-scope="scope">
              <img  :src="scope.row.sku_pic" alt="" style="width: 0.5rem;height: 0.5rem">
            </template>
          </el-table-column>
          <el-table-column align="center" prop="products_name" label="商品名称">
          </el-table-column>
          <el-table-column align="center"  label="商品规格">
            <template slot-scope="scope">
              <span>{{scope.row.sku_detail}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="sku_price" label="单价">
          </el-table-column>
          <el-table-column align="center" prop="product_num" label="数量">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  // 0: "已取消", 7: "未支付", 14: "支付中", 21: "已支付",28: "已发货", 35: "已收货", 42: "已完成", 49: "已评价", 56: "退款中"
  import allOrder from "../../common/json/allOrder";
  import step from '../../components/common/step';
  import api from '../../api/api';
  import {Message} from 'element-ui';
  import axios from 'axios';
  export default {
    name: "orderDetails",
    data() {
      return {
        order: '',
        OMid: '',
        step:[],
        orderStatus: '',
        searchWhere: false,
        messageShow:false,
        whereList: [],
        star: 0,
        toSendForm: false,
        memoForm: false,
        ordermain_expressno:'',
        form: {
          name: '',
          region: ''
        },
        memoForms: {
          name: ''
        },
        formLabelWidth: '0.6rem',
        total_count:0,
        ordermain_englishname:'',
        ordermain_englishmessage:''
      }
    },
    components: {
      'step': step
    },
    mounted(){
    },
    methods: {
      freshClick(){
        console.log('fresh');
      },
      // 获取订单详情
      getData(OMid){
        let params = {
          ordermain_id: OMid
        };
        axios.get(api.get_order_message,{params:params}).then(res => {
          if(res.data.status == 200) {
            this.order =res.data.data;
            this.total_count = res.data.data.sku_list.length;
            // console.log(this.order)
            if(this.order.ordermain_expressno){
              this.getLog()
            }
            this.setStep()
          }else{
            this.$message.error(res.data.message);
          }
        },error => {
          this.$message.error(error.data.message);
        })
      },
      // 将已支付的订单发货，使之变成已发货
      toSend() {
        this.toSendForm = false
        if(this.order.ordermain_status == '已支付') {
          let params = {
            ordermain_id: this.omid,
            ordermain_expressno: this.ordermain_expressno
          }
          axios.post(api.update_order + '?status=0' ,params).then(res=>{
            if(res.data.status == 200){
              this.order.ordermain_status = '已发货'
              this.orderStatus = this.order.ordermain_status;
              this.order.ordermain_expressno = this.ordermain_expressno;
              this.getLog();
              this.setStep()
              this.$message({ message: res.data.message, type: 'success' });
            }else{
              this.$message.error(res.data.message);
            }
          }, res=>{
            this.$message.error(res.data.message);
          });
        }
      },
      // 依据订单状态设置页面上部的step步骤条
      setStep() {
        if(this.order.ordermain_status == '已取消') {
          this.step = [
            { name:'买家下单', time: this.order.OMtime, active:true, next:true },
            { name:'买家支付', time: '订单已取消', active:false, next:false },
            { name:'商家发货', time: '订单已取消', active:false, next:false },
            { name:'交易完成', time: '未完成', active:false, next:false }]
          this.orderStatus = this.order.ordermain_status
        }else if(this.order.ordermain_status == '未支付') {
          this.step = [
            { name:'买家下单', time: this.order.OMtime, active:true, next:true },
            { name:'买家支付', time: '待支付', active:false, next:false },
            { name:'商家发货', time: '待发货', active:false, next:false },
            { name:'交易完成', time: '未完成', active:false, next:false }]
          this.orderStatus = this.order.ordermain_status
        }else if(this.order.ordermain_status == '支付中') {
          this.step = [
            { name:'买家下单', time: this.order.OMtime, active:true, next:true },
            { name:'买家支付', time: '支付中', active:true, next:true },
            { name:'商家发货', time: '待发货', active:false, next:false },
            { name:'交易完成', time: '未完成', active:false, next:false }]
          this.orderStatus = this.order.ordermain_status
        }else if(this.order.ordermain_status == '已支付') {
          this.step = [
            { name:'买家下单', time: this.order.OMtime, active:true, next:true },
            { name:'买家支付', time: '已支付', active:true, next:true },
            { name:'商家发货', time: '待发货', active:false, next:false },
            { name:'交易完成', time: '未完成', active:false, next:false }]
          this.orderStatus = this.order.ordermain_status
        }else if(this.order.ordermain_status == '已发货') {
          this.step = [
            { name:'买家下单', time: this.order.OMtime, active:true, next:true },
            { name:'买家支付', time: '已支付', active:true, next:true },
            { name:'商家发货', time: '已发货', active:true, next:true },
            { name:'交易完成', time: '未完成', active:false, next:false }]
          this.orderStatus = this.order.ordermain_status
        }else if(this.order.ordermain_status == '已收货') {
          this.step = [
            { name:'买家下单', time: this.order.OMtime, active:true, next:true },
            { name:'买家支付', time: '已支付', active:true, next:true },
            { name:'买家收货', time: '已收货', active:true, next:true },
            { name:'交易完成', time: '未完成', active:false, next:false }]
          this.orderStatus = this.order.ordermain_status
        }else if(this.order.ordermain_status == '已完成') {
          this.step = [
            { name:'买家下单', time: this.order.OMtime, active:true, next:true },
            { name:'买家支付', time: '已支付', active:true, next:true },
            { name:'买家收货', time: '已收货', active:true, next:true },
            { name:'交易完成', time: '已完成', active:true, next:true }]
          this.orderStatus = this.order.ordermain_status
        }else if(this.order.ordermain_status == '已评价') {
          this.step = [
            { name:'买家下单', time: this.order.OMtime, active:true, next:true },
            { name:'买家支付', time: '已支付', active:true, next:true },
            { name:'交易完成', time: '已完成', active:true, next:true },
            { name:'填写评价', time: '已评价', active:true, next:true }]
          this.orderStatus = this.order.ordermain_status
        }else if(this.order.ordermain_status == '退款中') {
          this.step = [
            { name:'买家下单', time: this.order.OMtime, active:true, next:true },
            { name:'买家支付', time: '已支付', active:true, next:true },
            { name:'买家收货', time: '已收货', active:true, next:true },
            { name:'退款完成', time: '退款中', active:false, next:true }]
          this.orderStatus = this.order.ordermain_status
        }
      },
    //  获取物流
      getLog(){
        axios.get(api.get_logistics,{
          params:{
            ordermain_expressno:this.order.ordermain_expressno
          }
        }).then(res => {
          if(res.data.status == 200){
            this.whereList = res.data.data;
          }
        })
      },
      messageSure(){
        axios.post(api.update_order +'?status=2',{
          ordermain_englishname:this.ordermain_englishname,
          ordermain_englishmessage:this.ordermain_englishmessage,
          ordermain_id: this.omid
        }).then(res => {
          if(res.data.status == 200){
            this.messageShow = false;
            this.order.ordermain_englishname = this.ordermain_englishname;
            this.order.ordermain_englishmessage = this.ordermain_englishmessage;
            this.$message({ message: res.data.message, type: 'success' });
          }else{
            this.$message.error(res.data.message);
          }
        }, res=>{
          this.$message.error(res.data.message);
        });
      },
    //  用户已支付
      havePay(){
        this.$confirm('确定此订单已经支付?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            ordermain_id: this.omid,
          }
          axios.post(api.update_order + '?status=4' ,params).then(res=>{
            if(res.data.status == 200){
              this.order.ordermain_status = '已支付'
              this.orderStatus = this.order.ordermain_status;
              this.setStep()
              this.$message({ message: res.data.message, type: 'success' });
            }else{
              this.$message.error(res.data.message);
            }
          }, res=>{
            this.$message.error(res.data.message);
          });
        }).catch(() => {

        });
      }
    },
    created() {
      // this.order = this.$route.query.order;
      this.omid = this.$route.query.omid;
      this.getData(this.omid)
      // console.log(this.OMid)
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/css/_variate.less";
  /*@import "../../common/css/activity";*/
  .m-step {
    .m-step-content {
      .el-button--primary {
        background-color: #ef636e;
      }
      /*height: 5rem;*/
      .details-middle-left {
        width: 45%;
        .m-step-part {
          border: 1px solid @borderColor;
          padding: 0.1rem 0 0.15rem 0.2rem;
          h4{
            font-size: 0.18rem;
            margin-bottom: 0.2rem;
          }
          .m-order-detail-text{
            li{
              font-size: 0.15rem;
              color: #808080;
              margin-bottom: 0.1rem;
              .m-order-label{
                display: inline-block;
                width: 0.8rem;
                text-align: right;
              }
            }
          }
        }

      }
      .details-middle-right {
        width: 53%;
        .m-step-part {
          border: 1px solid @borderColor;
          .right-top-top {
            padding: 0.1rem;
            .left-icon {
              width: 10%;
              float: left;
              margin-left: 0.1rem;
              margin-top: 0.1rem;
            }
            .right-text {
              float: left;
              .right-top {
                font-size: 18px;
                font-weight:bold;
                margin-top: 0.17rem;
              }
            }
          }
          .right-middle {
            margin: 0.6rem 0.8rem 0 0.8rem;
            .where-list {
              margin: 0 0 0.1rem 0.3rem;
            }
            .right-button {
              /*width: 0.8rem;*/
              /*height: 0.3rem;*/
              /*line-height: 0.3rem;*/
              font-size: 14px;
              background-color: @btnActiveColor;
              color: @bgMainColor;
            }
            .buyer-info {
              width: 50%;
              float: left;
              margin: -0.1rem 0.2rem 0.2rem 0.2rem;
              border: 1px solid @borderColor;
              border-radius: 5px;
              .buyer-info-title {
                margin: 0 0 0.15rem 0.15rem;
                font-size: 18px;
                color: @red;
              }
              .info-left-text-div {
                width: 30%;
                float: left;
              }
              .info-right-text-div {
                width: 70%;
                float: right;
              }
              .info-text {
                text-align: right;
                font-size: 0.16rem;
                color: @greyColor;
                line-height: 0.22rem;
                margin: 0 0 0.05rem 0.1rem;
              }
              .info-text-value {
                text-align: left;
                font-size: 0.16rem;
                color: @greyColor;
                line-height: 0.22rem;
                margin: 0 0 0.05rem 0.1rem;
              }
            }
            .send-info-form {
              width: 40%;
              float: right;
              padding: 1% 3% 0 0;
            }
          }
          .right-bottom-text {
            padding: 0.2rem;
            .bottom-title {
              color: @red;
              font-size: 16px;
              margin-bottom: 0.1rem;
            }
            .bottom-text {
              font-size: 14px;
              color: @greyColor;
              margin-top: 0.05rem;
            }
          }
        }
      }
      .details-bottom {
        margin-top: 0.2rem;
        .bottom-total {
          float: right;
          font-size: 16px;
          margin: 0 0.1rem 0.1rem 0;
        }
      }
    }
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
    cursor: pointer;
    .m-icon-make-report{
      display: inline-block;
      width: 0.25rem;
      height: 0.25rem;
      background: url("../../common/images/icon-make-report.png") no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
    }
  }

  .m-order-excel{
    padding: 0.5rem;
    position: absolute;
    top:-300%;
    width: 100%;
    .m-order-excel-top{
      padding-bottom: 0.2rem;
      margin-bottom: 0.2rem;
      border-bottom: 1px solid #eee;
      p{
        line-height: 0.32rem;
        font-size: 0.16rem;
      }
    }
    .m-order-excel-product-title{
      font-size: 0.24rem;
      margin-bottom: 0.2rem;
    }
    .m-order-excel-info{
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: flex-start;
      border-top: 1px solid #eee;
      padding-top: 0.4rem;
      .m-order-excel-ifo-content{
        width: 49%;
        &:last-child{
          border-left: 1px solid #eee;
          padding-left: 0.1rem;
        };
        .m-order-detail-text{
          font-size: 0.16rem;
          line-height: 0.36rem;
        }
      }
    }
    .m-order-excel-h3{
      text-align: center;
      font-size: 0.3rem;
      margin-bottom: 0.2rem;
    }
  }
</style>

<template>
    <div class="m-profile">
      <h3 class="m-part-title">
        <span class="m-part-title-icon"></span>
        <span>审批流管理</span>
      </h3>
      <ul class="m-page-label-ul">
        <li>
          <span>提现审批 </span>
        </li>
        <li class="orange">
          <span>退货审批 </span>
        </li>
        <li class="green">
          <span>代理商审批 </span>
        </li>
        <li class="blue">
          <span>商品上架 </span>
        </li>
        <li class="purple">
          <span>采购退货 </span>
        </li>
        <li >
          <span>推文审核 </span>
        </li>
      </ul>
    </div>

</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                name: ''
            }
        },
        components: {},
        methods: {},
        created() {

        }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/css/index";
  .m-profile{
    .m-page-label-ul{
      .flex-row(space-start);
      padding: 0.29rem 0;
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
  }

</style>

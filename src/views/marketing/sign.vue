<template>
  <div class="m-sign">
    <h3 class="m-part-title">
      <span class="m-part-title-icon"></span>
      <span>基本信息</span>
    </h3>
    <el-form ref="form" :model="form" :rules="rules" label-width="1.3rem" label-position="left" class="demo-ruleForm">
      <el-form-item label="签到积分：">
        <el-radio-group v-model="form.resource">
          <el-radio label="开启"></el-radio>
          <el-radio label="关闭"></el-radio>
        </el-radio-group>
      </el-form-item>
      <!--<el-form-item>-->
      <div class="m-inter-form-item m-flex-start">
        <span class="m-label">连续签到</span>
        <el-input v-model="form.name" class="m-input-s"></el-input>
        <span>天后，每日获得</span>
        <el-input v-model="form.name" class="m-input-s"></el-input>
        <span>积分</span>
        <span class="m-link-text">删除</span>
      </div>
      <div class="m-inter-form-item m-flex-start">
        <span class="m-label">连续签到</span>
        <el-input v-model="form.name" class="m-input-s"></el-input>
        <span>天后，每日获得</span>
        <el-input v-model="form.name" class="m-input-s"></el-input>
        <span>积分</span>
        <span class="m-link-text">删除</span>
      </div>
      <p class="m-link-text m-add-text">+新增一级签到积分</p>
      <!--</el-form-item>-->
      <el-form-item label="生效条件：">
        <el-radio-group v-model="form.resource">
          <el-radio label="无条件"></el-radio>
          <el-radio label="满减条件"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-form-item prop="date1">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="起始日期" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="middle-line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="结束日期" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          resource: '',
          date1: '',
          name: ''
        },
        rules: {
          PRname: [
            {required: true, message: '请输入商品名称', trigger: 'blur'}
          ]
        },
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .m-sign {
    .m-part-title {
      margin-bottom: 0.1rem;
    }
    .m-inter-form-item {
      padding: 0 0 0.1rem;
      .m-label {
        display: inline-block;
        width: 1.2rem;
        text-align: right;
      }
      .m-input-s {
        margin: 0 0.1rem;
      }
    }
    .m-link-text {
      margin-left: 0.5rem;
      &.m-add-text {
        margin: 0.1rem 0 0.4rem 1.3rem;
      }
    }

    .middle-line{
      font-size: large;
      text-align: center;
      font-weight: bold;
    }
  }
</style>

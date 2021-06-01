<template>
  <div class="pickdetail">
    <Bread :crumnName="crumnName" :crumnNames="crumnNames"></Bread>
    <div class="pickdetail-box">
      <div class="pickdetail-head">
        <div class="pickdetail-btn">
          <el-button class="el-button" type="primary" size="small">询价</el-button>
          <el-button class="el-button" type="primary" size="small">提交</el-button>
        </div>
        <div class="pickdetail-active">
          <ul>
            <li :class="[active !== 2 ? 'active' : '']">草稿</li>
            <li :class="[active !== 2 ? '' : 'active']">询价</li>
            <li :class="[active == 1 ? 'active' : '']">审批中</li>
          </ul>
        </div>
      </div>
      <div class="pickdetail-content">
        <h4><span>名称：哈哈哈哈</span></h4>
        <div class="pickdetail-lefts">
          <el-form ref="form" :model="form" label-width="80px">
            <el-row>
              <el-col :span="8">
              <el-form-item label="申请人">
                <el-select v-model="form.applicant" placeholder="请选择活动区域">
                  <el-option label="刚刚" value="shanghai"></el-option>
                  <el-option label="哈哈哈" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              </el-col>
              <el-col :span="8">
              <el-form-item label="类型">
                <el-select v-model="form.pickking_type" placeholder="请选择活动区域">
                  <el-option label="刚刚" value="shanghai"></el-option>
                  <el-option label="哈哈哈" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row>
            <el-col :span="8">
              <el-form-item label="创建日期">
                <el-select v-model="form.create_time" placeholder="请选择活动区域">
                  <el-option label="信息部" value="shanghai"></el-option>
                  <el-option label="研究部" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="完成日期">
                <el-select v-model="form.date_done" placeholder="请选择活动区域">
                  <el-option label="信息部" value="shanghai"></el-option>
                  <el-option label="研究部" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
            <el-row>
            <el-col :span="8">
              <el-form-item class="input" label="参考">
                <el-input v-model="form.origin" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  label="返回单据">
                <el-select v-model="form.backorder_id" placeholder="请选择活动区域">
                  <el-option label="信息部" value="shanghai"></el-option>
                  <el-option label="研究部" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          </el-form>
        </div>
      </div>
      <el-table :data="tableData" border style="width: 1127px; margin-top: 20px" @row-click="tab">
        <el-table-column prop="date" label="序号" width="100"> </el-table-column>
        <el-table-column prop="sku" label="产品" width="180"> </el-table-column>
        <el-table-column prop="count" label="订购数量"> </el-table-column>
        <el-table-column prop="price" label="单价"> </el-table-column>
        <el-table-column prop="uom" label="单位"></el-table-column>
        <el-table-column prop="total_amount" label="合计"> </el-table-column>
        <el-table-column prop="freight" label="运费"> </el-table-column>
        <el-table-column prop="real_total_amount" label="实际总价"> </el-table-column>
        <el-table-column prop="estimated_arrival_date" label="预计到货日期"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Bread from '../../../../../components/bread.vue'
export default {
  name: 'personal',
  components: { Bread },
  data() {
    return {
      active: 1,
      crumnName: [
        {
          name: '入库单列表', // 名称,自定
          path: 'picklist' // 路由导航,自定
        }
      ], // 面包屑数据
      crumnNames: '入库单详情',
      form: {
        create_uid: '', //申请人
        department: '', //部门
        project: '', //项目
        supplier: '', //供应商
        total_amount: '5000' //合计
      },
      tableData: [
        {
          date: '1',
          sku: 'sku',
          count: 'count',
          price: 'price',
          uom: 'uom',
          total_amount: 'total_amount',
          freight: 'freight',
          real_total_amount: 'real_total_amount',
          estimated_arrival_date: 'estimated_arrival_date'
        },
        {
          date: '2',
          sku: 'sku',
          count: 'count',
          price: 'price',
          uom: 'uom',
          total_amount: 'total_amount',
          freight: 'freight',
          real_total_amount: 'real_total_amount',
          estimated_arrival_date: 'estimated_arrival_date'
        }
      ]
    }
  },
  created() {
    this.active = 2
  }
}
</script>

<style scoped>

.pickdetail {
  width: 100%;
  min-height: 850px;
  background: #fff;
  text-align: center;
}
.pickdetail::-webkit-scrollbar {
  width: 0px;
  background: none;
}
.pickdetail-box {
  width: 1100px;
  margin: 0 auto;
}
.pickdetail-head {
  height: 50px;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.pickdetail-btn {
  flex: 1;
  margin: 10px;
  text-align: left;
}
.pickdetail-btn .el-button {
  width: 100px;
  height: 30px;
  border-radius: 10px;
}
.pickdetail-active {
  flex: 1;
  width: 100px;
  text-align: right;
}
.pickdetail-active ul {
  width: 270px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}
.pickdetail-active ul li {
  flex: 1;
  border-radius: 10px;
}
.active {
  flex: 1;
  background: #409eff;
  color: #fff;
}
.pickdetail-content {
  width: 1100px;
  text-align: left;
}
.pickpickdetail-lefts {
  margin-top: 40px;
}
.input >>> .el-input__inner {
  border: 0;
}
</style>
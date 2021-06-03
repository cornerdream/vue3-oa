<template>
  <div class="detail">
    <Bread :crumnName="crumnName" :crumnNames="form.name"></Bread>
    <div class="detail-box">
      <div class="detail-head">
        <div class="detail-btn">
          <el-button
            v-if="form.state == 'draft' && flag == false"
            class="el-button"
            type="primary"
            size="small"
            @click="sent"
            >询价</el-button
          >
          <el-button
            v-if="form.state == 'sent' && flag == false"
            class="el-button"
            type="primary"
            size="small"
            @click="submit"
            >提交</el-button
          >
          <el-button
            v-if="form.state == 'to_approve'"
            class="el-button"
            type="primary"
            size="small"
            @click="roolback"
            >审批撤销</el-button
          >
          <el-button
            v-if="form.state == 'sent'"
            class="el-button"
            type="primary"
            size="small"
            @click="draft"
            >询价撤销</el-button
          >
        </div>
        <div class="detail-active">
          <ul>
            <li
              v-for="(item, index) in form.states"
              :key="index"
              :class="[form.state == item[0] ? 'active' : '']">
              <span></span>
              <span></span>
              {{ item[1] }}
            </li>
          </ul>
        </div>
      </div>
      <div class="detail-content">
        <div class="detail-left">
          <h4>
            <span>名称：{{ form.name }}</span>
          </h4>

          <el-form ref="form" :model="form" label-width="100px">
            <el-row>
              <el-col :span="12">
                <el-form-item class="input" label="申请人">
                  <span>{{ form.create_uid ? form.create_uid.name : '' }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="input" label="部门">
                  <span>{{ form.department ? form.department.name : '' }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="input" label="项目">
                  <span>{{ form.project ? form.project.name : '' }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="input" label="供应商">
                  <span>{{ form.supplier ? form.supplier.name : '' }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="input" label="合计">
                  <span>{{ form.total_amount }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="detail-right">
          <div class="app-argent">
            <div class="app-all">
              <div class="app-conts">
                <div class="app-listCard" v-for="(item, index) in form.workflowtask" :key="index"  :class="[index == 0 ? 'first' : '']">
                  <div class="user">
                    <div class="block">
                      <el-avatar :size="50" :src="item.appro_user.image"></el-avatar>
                    </div>
                  </div>
                  <div class="list-contr">
                    <ul>
                      <li>
                        <span>状态</span>：<span>{{ item.state[1] }}</span>
                      </li>
                      <li v-if="state == 'orders'"><span>意见</span>：<span>同意</span></li>
                      <li>
                        <span>用户</span>：<span>{{ item.appro_user.name }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-table :data="form.line" border style="width: 100%; margin: 20px">
        <el-table-column prop="" type="index" label="序号" width="80"> </el-table-column>
        <el-table-column prop="sku" label="产品" width="330">
          <template #default="scope">
            <span>{{ scope.row.sku ? scope.row.sku.name : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="订购数量" width="100">
          <template #default="scope">
            {{ scope.row.count ? scope.row.count : '' }}
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价" width="100">
          <template #default="scope">
            <span>{{ scope.row.price ? scope.row.price : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="uom" label="单位" width="100">
          <template #default="scope">
            {{ scope.row.uom ? scope.row.uom.name : '' }}
          </template></el-table-column
        >
        <el-table-column prop="total_amount" label="合计" width="100">
          <template #default="scope">
            {{ scope.row.total_amount ? scope.row.total_amount : '' }}
          </template></el-table-column
        >
        <el-table-column prop="freight" label="运费" width="150">
          <template #default="scope">
            <span> {{ scope.row.freight ? scope.row.freight : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="real_total_amount" label="实际总价" width="150">
          <template #default="scope">
            {{ scope.row.real_total_amount ? scope.row.real_total_amount : '' }}
          </template>
        </el-table-column>
        <el-table-column prop="estimated_arrival_date" label="预计到货日期" >
          <template #default="scope">
            <span>
              {{ scope.row.estimated_arrival_date ? scope.row.estimated_arrival_date : '' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="100"
          v-if="form.state == 'sent' || form.state == 'draft'"
        >
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <deitlist
        ref="form"
        :is-add="false"
        :id="id"
        :state="form.state"
        @func="getMsgFormSon"
      ></deitlist>
    </div>
  </div>
</template>

<script>
import Bread from '../../../../../components/bread.vue'
import deitlist from './list.vue'
import { buyerid, roolback, sent, draft, roolcommit } from '../../../../../api/buyer'
import { ElMessage } from 'element-plus'
export default {
  name: 'personal',
  components: { Bread, deitlist },
  data() {
    return {
      menus: [],
      name: '',
      price: '',
      freight: '',
      isedit: false,
      crumnName: [
        {
          name: '采购订单', // 名称,自定
          path: 'personal' // 路由导航,自定
        }
      ], // 面包屑数据
      form: {},
      tableData: [],
      flag: false,
      isshow: true,
      supplist: [],
      projectlist: [],
      treelist: [],
      id: ''
    }
  },
  created() {
    this.buyerdetail()
    this.id = this.$route.query.id
    console.log(this.$route.query.id)
  },
  mounted() {},
  methods: {
    async buyerdetail() {
      let vm = this
      const { data } = await buyerid(vm.$route.query.id)
      if (data.code !== 200) {
        ElMessage.error(data.error)
      } else {
        this.form = data.data
        this.form.states = data.data.states.slice(0, 5)
        this.form.state = data.data.state[0]
        this.form.name = data.data.name
      }
    },
    async sent() {
      //草稿状态：询价
      const { data } = await sent(this.$route.query.id)
      if (data.code !== 200) {
        ElMessage.error(data.error)
      } else {
        this.form = data.data
        this.form.states = data.data.states.slice(0, 5)
        this.form.state = data.data.state[0]
        this.form.name = data.data.name
      }
    },
    async submit() {
      //询价提交
      const { data } = await roolcommit(this.$route.query.id)
      if (data.code !== 200) {
        ElMessage.error(data.error)
      } else {
        this.form = data.data
        this.form.states = data.data.states.slice(0, 5)
        this.form.state = data.data.state[0]
        this.form.crumnNames = data.data.name
      }
    },
    async roolback() {
      //审批撤销
      const { data } = await roolback(this.$route.query.id)
      if (data.code !== 200) {
        ElMessage.error(data.error)
      } else {
        this.form = data.data
        this.form.states = data.data.states.slice(0, 5)
        this.form.state = data.data.state[0]
        this.form.name = data.data.name
      }
    },
    async draft() {
      //询价撤销
      const { data } = await draft(this.$route.query.id)
      if (data.code !== 200) {
        ElMessage.error(data.error)
      } else {
        this.form = data.data
        this.form.states = data.data.states.slice(0, 5)
        this.form.state = data.data.state[0]
        this.form.crumnNames = data.data.name
      }
    },
    handleEdit(item) {
      const vm = this.$refs.form
      vm.form = {
        id: item.id,
        price: item.price,
        freight: item.freight,
        estimated_arrival_date: item.estimated_arrival_date,
        sku: item.sku,
        department: this.form.department,
        project: this.form.project,
        supplier: this.form.supplier
      }
      this.$refs.form.is_deleted = true
    },
    getMsgFormSon(data) {
      this.form = data
      this.form.states = data.states.slice(0, 5)
      this.form.state = data.state[0]
      this.form.crumnNames = data.name
    }
  }
}
</script>

<style scoped>
.detail {
  width: 100%;
  min-height: 800px;
  background: #fff;
  text-align: center;
}
.detail::-webkit-scrollbar {
  width: 0px;
  background: none;
}
.detail-box {
  width: 1400px;
  margin: 0 auto;
}
.detail-head {
  height: 50px;
  line-height: 40px;
  display: flex;
  border-bottom: 1px solid #ccc;
}
.detail-btn {
  flex: 1;
  margin: 10px;
  text-align: left;
}
.detail-btn .el-button {
  width: 100px;
  height: 30px;
  border-radius: 5px;
}
.detail-active {
  text-align: right;
}
.detail-active ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}
.detail-active ul li {
  width: 80px;
  border-radius: 10px;
}
.active {
  flex: 1;
  background: #409eff;
  color: #fff;
}
.detail-content {
  margin-top: 20px;
  display: flex;
  text-align: center;
}
.detail-left {
  flex: 1;
  text-align: left;
  border-right: 1px solid #ccc;
}
.detail-left h4 {
  height: 30px;
}
.detail-left h4 span {
  margin-left: 30px;
  font-size: 18px;
}
.detail-btns {
  text-align: right;
  margin: 20px;
}
.detail-right {
  flex: 1;
}
.input >>> .el-input__inner {
  border: 0;
}
.app-argent {
  display: flex;
  text-align: left;
}
.app-listCard {
  display: flex;
  align-items: center;
  margin: 20px;
  padding: 5px;
}
.app-conts {
  margin: 20px;
}
.list-contr {
  margin-left: 20px;
}
.first {
  width: 200px;
  height: 80px;
  background: cornflowerblue;
  border-radius: 10px;
  color: #fff;
}
</style>
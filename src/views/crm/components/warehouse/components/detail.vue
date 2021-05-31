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
              :class="[form.state == item[0] ? 'active' : '']"
            >
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

          <el-form ref="form" :model="form" label-width="80px">
            <el-row>
              <el-col :span="12">
                <el-form-item class="input" label="申请人">
                  <span>{{ form.create_uid ? form.create_uid.name : '' }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="input" label="部门" v-if="isshow || form.state != 'draft'">
                  <span>{{ form.department ? form.department.name : '' }}</span>
                </el-form-item>
                <el-form-item label="部门" v-if="flag && form.state == 'draft'">
                  <el-select
                    v-model="form.department.name"
                    filterable
                    placeholder="请选择部门"
                    @focus="departmentmag"
                  >
                    <el-option
                      v-for="(item, index) in treelist.children"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="input" label="项目" v-if="isshow || form.state != 'draft'">
                  <span>{{ form.project ? form.project.name : '' }}</span>
                </el-form-item>
                <el-form-item label="项目" v-if="flag && form.state == 'draft'">
                  <el-select
                    v-model="form.project.name"
                    filterable
                    placeholder="请选择项目"
                    @focus="projectmag"
                  >
                    <el-option
                      v-for="(item, index) in projectlist"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="input" label="供应商" v-if="isshow">
                  <span>{{ form.supplier ? form.supplier.name : '' }}</span>
                </el-form-item>
                <el-form-item label="供应商" v-if="flag">
                  <el-select
                    v-model="form.supplier"
                    filterable
                    placeholder="请选择供应商"
                    @focus="suppliermag"
                  >
                    <el-option
                      v-for="(item, index) in supplist"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
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
          <div class="detail-btns" v-if="form.state == 'draft' || form.state == 'sent'">
            <el-button class="el-button" @click="isEdit" plain size="mini">编辑</el-button>
            <el-button class="el-button" type="primary" size="mini" @click="save">保存</el-button>
          </div>
          <div class="app-argent">
            <div class="app-all">
              <div class="app-conts">
                <div class="app-listCard" v-for="(item, index) in form.workflowtask" :key="index">
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
      <el-table :data="form.line" border style="width: 100%; margin: 20px" @row-click="tab">
        <el-table-column prop="" type="index" label="序号" width="50"> </el-table-column>
        <el-table-column prop="sku" label="产品" width="180">
          <template #default="scope">
            <span v-if="isshow || form.state != 'draft'">{{
              scope.row.sku ? scope.row.sku.name : ''
            }}</span>
            <el-input
              v-if="flag && form.state == 'draft'"
              type="text"
              v-model="scope.row.sku.name"
              @focus="skuname(scope.row)"
            >
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="订购数量">
          <template #default="scope">
            {{ scope.row.count ? scope.row.count : '' }}
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价" width="140">
          <template #default="scope">
            <el-input
              placeholder="请输入内容"
              v-model="scope.row.price"
              oninput="value=value.replace(/[^\d.]/g,'')"
              @blur="changeNum(scope.row)"
              v-if="flag"
            >
            </el-input>
            <span v-if="isshow">{{ scope.row.price ? scope.row.price : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="uom" label="单位" width="50">
          <template #default="scope">
            {{ scope.row.uom ? scope.row.uom.name : '' }}
          </template></el-table-column
        >
        <el-table-column prop="total_amount" label="合计">
          <template #default="scope">
            {{ scope.row.total_amount ? scope.row.total_amount : '' }}
          </template></el-table-column
        >
        <el-table-column prop="freight" label="运费" width="140">
          <template #default="scope">
            <el-input
              oninput="value=value.replace(/[^\d.]/g,'')"
              placeholder="请输入内容"
              v-if="flag"
              @blur="changeNums(scope.row)"
              v-model="scope.row.freight"
            >
            </el-input>
            <span v-if="isshow"> {{ scope.row.freight ? scope.row.freight : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="real_total_amount" label="实际总价">
          <template #default="scope">
            {{ scope.row.real_total_amount ? scope.row.real_total_amount : '' }}
          </template>
        </el-table-column>
        <el-table-column prop="estimated_arrival_date" label="预计到货日期" width="200">
          <template #default="scope">
            <span v-if="isshow">
              <!-- {{ scope.row.estimated_arrival_date ? scope.row.estimated_arrival_date : '' }} -->
            </span>
            <el-date-picker
              v-if="flag"
              v-model="scope.row.estimated_arrival_date"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              @change="fromDate(val, scope.row)"
            >
            </el-date-picker>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Bread from '../../../../../components/bread.vue'
import {
  buyerid,
  save,
  roolback,
  sent,
  draft,
  roolcommit,
  supplierList,
  projectList,
  departmentList
} from '../../../../../api/buyer'
import { ElMessage } from 'element-plus'
import { dateToMs, msToDate } from '../../../../../utils/index'
export default {
  name: 'personal',
  components: { Bread },
  data() {
    return {
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
      treelist: []
    }
  },
  created() {
    // this.active =2
    this.buyerdetail()
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
    isEdit() {
      //编辑
      this.flag = true
      this.isshow = false
    },
    save(id) {
      //保存
      this.flag = false
      this.isshow = true
      let list = {
        supplier: this.form.supplier ? this.form.supplier.id : '',
        line: this.tableData,
        department: this.form.department.id,
        project: this.form.project.id
      }
      save(this.$route.query.id, list)
        .then((res) => {
          this.form = res.data.data
          this.form.states = res.data.data.states.slice(0, 5)
          this.form.state = res.data.data.state[0]
          this.$message({
            showClose: true,
            type: 'success',
            message: '保存成功!',
            duration: 2500
          })
          this.Loading = false
        })
        .catch((err) => {
          this.Loading = false
          console.log(err)
        })
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
        console.log(data.data)
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
        console.log(data.data)
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
        console.log(data.data)
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
        console.log(data.data)
      }
    },
    changeNum(row, index) {
      row.total_amount = row.count * row.price
      this.price = row.price
      let line = []
      let obj = {}
      obj.id = row.id
      obj.price = row.price
      obj.freight = row.freight
      // obj.estimated_arrival_date = msToDate(dateToMs(row.estimated_arrival_date)).withoutTime
      obj.estimated_arrival_date = row.estimated_arrival_date
      line.push(obj)
      this.tableData = line
      console.log(this.tableData, 'line', line, this.form.line)
      row.real_total_amount = parseInt(row.total_amount) + parseInt(row.freight)
    },
    changeNums(row) {
      let line = []
      let obj = {}
      obj.id = row.id
      obj.price = row.price
      obj.freight = row.freight
      obj.estimated_arrival_date = row.estimated_arrival_date
      line.push(obj)
      this.tableData = line
      row.real_total_amount = parseInt(row.total_amount) + parseInt(row.freight)
    },
    fromDate(val, row) {
      let line = []
      let obj = {}
      obj.id = row.id
      obj.price = row.price
      obj.freight = row.freight
      obj.estimated_arrival_date = row.estimated_arrival_date
      line.push(obj)
      this.tableData = line
    },
    skuname(row) {
      let line = []
      let obj = {}
      obj.id = row.id
      obj.price = row.price
      obj.freight = row.freight
      obj.estimated_arrival_date = row.estimated_arrival_date
      obj.sku = row.sku.id
      console.log(obj.sku, 'dkhjk')
      line.push(obj)
      this.tableData = line
    },
    suppliermag() {
      //供应商
      supplierList().then((res) => {
        if (res.data.code == 200) {
          this.supplist = res.data.data.results
        }
      })
    },
    projectmag() {
      projectList().then((res) => {
        if (res.data.code == 200) {
          this.projectlist = res.data.data.results
        }
      })
    },
    departmentmag() {
      departmentList().then((res) => {
        if (res.data.code == 200) {
          this.treelist = res.data.data[0]
        }
      })
    }
  }
}
</script>

<style scoped>
.detail {
  width: 100%;
  min-height: 850px;
  background: #fff;
  text-align: center;
}
.detail::-webkit-scrollbar {
  width: 0px;
  background: none;
}
.detail-box {
  width: 1100px;
  margin: 0 auto;
}
.detail-head {
  height: 50px;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
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
  border-radius: 10px;
}
.detail-active {
  flex: 1;
  width: 100px;
  text-align: right;
}
.detail-active ul {
  /* width: 270px; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}
.detail-active ul li {
  flex: 1;
  border-radius: 10px;
}
.active {
  flex: 1;
  background: #409eff;
  color: #fff;
}
.detail-content {
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
  margin-top: 40px;
}
.app-listCard {
  display: flex;
  align-items: center;
}
.app-conts {
  margin: 20px;
}
.list-contr {
  margin-left: -30px;
}
</style>
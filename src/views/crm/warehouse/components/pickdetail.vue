<template>
  <div class="pickdetail">
    <Bread :crumnName="crumnName" :crumnNames="crumnNames"></Bread>
    <div class="pickdetail-head">
      <div class="pickdetail-btn">
        <el-button
          class="el-button"
          type="primary"
          size="mini"
          v-if="form.state == 'draft'"
          @click="check"
          >检查</el-button
        >
        <el-button
          class="el-button"
          type="primary"
          size="mini"
          v-if="form.state == 'assigned'"
          @click="commit"
          >确认</el-button
        >
        <el-button
          class="el-button"
          type="primary"
          size="mini"
          v-if="form.state == 'assigned'"
          @click="reserved"
          >撤销</el-button
        >
      </div>
      <div class="pickdetail-active">
        <ul>
          <li
            v-for="(item, index) in form.states"
            :key="index"
            class="disable"
            :class="[form.state == item[0] ? 'btn-primary' : '']"
          >
            {{ item[1] }}
          </li>
        </ul>
      </div>
    </div>
    <div class="pickdetail-box">
      <div class="pickdetail-content">
        <h4>
          <span>名称：{{ form.name }}</span>
        </h4>
        <div class="pickdetail-lefts">
          <el-form ref="form" :model="form" label-width="90px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="申请人：">
                  <span>{{ form.applicant ? form.applicant.name : '' }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="类型：">
                  <span>{{ form.picking_type ? form.picking_type.name : '' }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="创建日期：">
                  <span>{{ form.create_time }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="完成日期：">
                  <span></span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="input" label="参考：">
                  <span>{{ form.origin ? form.origin : '' }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="返回单据：">
                  <span></span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="eltable">
          <el-button @click="fnadd">添加产品</el-button>
          <el-table
            :data="tableData"
            border
            style="width: 1127px; margin-top: 20px"
            @row-click="tab"
          >
            <el-table-column prop="date" type="index" label="序号" width="100"> </el-table-column>
            <el-table-column prop="sku" label="产品">
              <template #default="scope">
                {{ scope.row.sku ? scope.row.sku.name : '' }}
              </template>
            </el-table-column>
            <el-table-column prop="count" label="需求数量" width="80">
              <template #default="scope">
                {{ scope.row.product_qty ? scope.row.product_qty : '' }}
              </template>
            </el-table-column>
            <el-table-column prop="price" label="完成数量" width="80">
              <template #default="scope">
                {{ scope.row.quantity_done ? scope.row.quantity_done : '' }}
              </template>
            </el-table-column>
            <el-table-column prop="uom" label="单位" width="80">
              <template #default="scope">
                {{ scope.row.uom ? scope.row.uom.name : '' }}
              </template>
            </el-table-column>
            <el-table-column prop="total_amount" label="仓库" width="80"
              ><template #default="scope">
                {{ scope.row.warahouse ? scope.row.warahouse.name : '' }}
              </template>
            </el-table-column>
            <el-table-column prop="freight" label="批次/序列号" width="120"
              ><template #default="scope">
                {{ scope.row.lot_id ? scope.row.lot_id : '' }}
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              fixed="right"
              width="100"
              v-if="form.state == 'draft' || form.state == 'assigned'"
            >
              <template #default="scope">
                <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <deitlist
            ref="form"
            :id="id"
            :isbsy="isbsy"
            :state="form.state"
            @funcs="getMsgFormSon"
          ></deitlist>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bread from '@/components/bread.vue'
import { pickid, check, commit, reserved } from '@/api/picking'
import { transdate, timestampToTime } from '@/utils/index'
import deitlist from './detailed.vue'
export default {
  name: 'personal',
  components: { Bread, deitlist },
  data() {
    return {
      active: 1,
      crumnName: [
        {
          name: '', // 名称,自定
          path: '' // 路由导航,自定
        }
      ], // 面包屑数据
      crumnNames: '',
      form: {},
      tableData: [],
      id: '',
      isbsy:false
    }
  },
  created() {
    this.id = this.$route.query.id
    let a = sessionStorage.getItem('picking_type')
    let type = JSON.parse(a)
    for (let i in this.crumnName) {
      this.crumnName[i].name = type.name + '列表'
      this.crumnName[i].path = 'picklist?id=' + type.id
    }
  },
  mounted() {
    pickid(this.$route.query.id).then((res) => {
      if (res.data.code == 200) {
        this.list(res.data.data)
      }
    })
  },
  methods: {
    fnadd(item) {
         const vm = this.$refs.form
      // console.log(item.id, 'idddd')
      vm.form = {
        id: '',
        quantity_done:item.quantity_done,
        product_qty:'',
        warahouse: '',
        sku:  '',
        uom:item.uom,
        lot_id: ''
      }
      this.isbsy =false
       this.$refs.form.is_deleted = true
      // this.tableData.push(row)
    },
    list(data) {
      this.form = data
      this.form.state = data.state[0]
      this.form.states = data.states.reverse()
      this.form.create_time = data.create_time.slice(0, 10)
      // this.form.date_done = data.date_done.slice(0,10)
      this.crumnNames = this.form.name
      let id = sessionStorage.setItem('picking_type', JSON.stringify(data.picking_type))
      for (let i in this.crumnName) {
        this.crumnName[i].name = this.form.picking_type.name + '列表'
        this.crumnName[i].path = 'picklist?id=' + this.form.picking_type.id
      }
      this.tableData = this.form.lines
    },
    check() {
      //检查
      let obj = {
        id: this.$route.query.id
      }
      check(obj).then((res) => {
        if (res.data.code == 200) {
          this.list(res.data.data)
        }
        console.log(res, res.data)
      })
    },
    commit() {
      //提交
      let obj = {
        id: this.$route.query.id
      }
      commit(obj).then((res) => {
        if (res.data.code == 200) {
          this.list(res.data.data)
        }
        console.log(res, res.data)
      })
    },
    reserved() {
      //撤销
      let obj = {
        id: this.$route.query.id
      }
      reserved(obj).then((res) => {
        if (res.data.code == 200) {
          this.list(res.data.data)
        }
        console.log(res, res.data)
      })
    },
    handleEdit(item) {
      const vm = this.$refs.form
      console.log(item.id, 'idddd')
      vm.form = {
        id: item.id,
        applicant: this.form.applicant ? this.form.applicant.id : '',
        picking_type: this.form.picking_type ? this.form.picking_type.id : '',
        product_qty: item.product_qty,
        warahouse: item.warahouse ? item.warahouse.id : '',
        sku: item.sku ? item.sku.id : '',
        lot_id: item.lot_id,
        // quantity_done:item.quantity_done
      }
      this.isbsy =true
      this.$refs.form.is_deleted = true
    },
    getMsgFormSon(data) {
      console.log(data, 'fdd')
      this.list(data)
    }
  }
}
</script>

<style scoped>
.pickdetail {
  width: 100%;
  min-height: 850px;
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
  width: 100%;
  margin-top: -20px;
  display: flex;
  border-bottom: 1px solid #ccc;
  background: #fff;
}
.pickdetail-btn {
  flex: 1;
  text-align: left;
}
.pickdetail-btn .el-button {
  margin-top: 6px;
  margin-left: 10px;
  border-radius: 5px;
}
.pickdetail-active {
  text-align: left;
  text-align: -webkit-right;
  position: relative;
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
ul {
  height: 40px;
  display: flex;
  margin-left: auto;
  flex-flow: row-reverse wrap-reverse;
  text-align: -webkit-center;
}
li {
  width: 56px;
  min-height: 40px;
  line-height: 40px;
  font-size: 11px;
  font-weight: bold;
  position: relative;
  padding-left: 22px;
  color: #000;
  border-width: 0 0 0;
  border-radius: 0;
  transition: all 0.1s ease 0s;
}
li:first-child {
  padding-right: 16px;
  overflow-x: hidden;
}
.btn-primary {
  color: #fff;
  font-size: 11px;
  background-color: #409eff;
  cursor: default;
}
ul > li:not(:first-child):before {
  right: -11px;
  border-left-color: #ccc;
}
li:not(:first-child):before,
li:not(:first-child):after {
  content: ' ';
  display: block;
  position: absolute;
  top: 0;
  left: auto;
  bottom: auto;
  right: -10px;
  border-top: 18px solid transparent;
  border-bottom: 23px solid transparent;
  border-right: none;
  border-left: 11px solid white;
  transition: border 0.2s ease 0s;
}
ul > li.btn-primary:after {
  border-left-color: #409eff;
}
li .disable {
  opacity: 1;
  color: #adb5bd;
  pointer-events: none;
  border-left: 1px solid #ccc;
}
.pickdetail-content {
  width: 1100px;
  min-height: 500px;
  text-align: initial;
  margin-top: 20px;
  background: #fff;
  box-sizing: border-box;
  box-shadow: 1px 2px 3px 4px #ccc;
}
.pickdetail-content h4 {
  height: 30px;
  padding: 20px;
}
.pickdetail-content h4 span {
  margin-left: 30px;
  font-size: 18px;
}
.pickdetail-lefts {
  margin: 40px;
}
.input >>> .el-input__inner {
  border: 0;
}
.eltable {
  margin: 20px;
}
</style>
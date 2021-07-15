<template>
  <div class="detail">
    <Bread :crumnName="crumnName" :crumnNames="form.name"></Bread>
    <div class="detail-head">
      <div class="detail-btn"></div>
      <div class="detail-active">
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
     <div class="detail-box">
      <div class="detail-content">
        <div class="detail-left">
          <h4>
            <span>名称：{{ form.name }}</span>
          </h4>
          <el-form ref="form" :model="form" label-width="100px">
            <el-row>
              <el-col :span="12">
                <el-form-item class="input" label="申请人：">
                  <span>{{ form.create_uid ? form.create_uid.name : '' }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="input" label="部门：">
                  <span>{{ form.department ? form.department.name : '' }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="input" label="项目：">
                  <span>{{ form.project ? form.project.name : '' }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="input" label="供应商：">
                  <span>{{ form.supplier ? form.supplier.name : '' }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="input" label="合计：">
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
                <div
                  class="app-listCard"
                  v-for="(item, index) in form.workflowtask"
                  :key="index"
                  :class="[item.is_approving_user == true ? 'first' : '']"
                >
                  <div class="user">
                    <div class="block">
                      <el-avatar :size="50" :src="`${$url}`+item.appro_user.image"></el-avatar>
                    </div>
                  </div>
                  <div class="list-contr">
                    <div>
                      <p>
                        <span>状态</span>：<span>{{ item.state[1] }}</span>
                      </p>
                      <p v-if="state == 'orders'"><span>意见</span>：<span>同意</span></p>
                      <p>
                        <span>用户</span>：<span>{{ item.appro_user.name }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="eltable">
        <el-table :data="form.line" border style="width: 80%; margin-bottom: 20px">
          <el-table-column prop="" type="index" label="序号" width="80"> </el-table-column>
          <el-table-column prop="sku" label="产品">
            <template #default="scope">
              <span>{{ scope.row.sku ? scope.row.sku.name : '' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="count" label="订购数量" width="100">
            <template #default="scope">
              {{ scope.row.count ? scope.row.count : '' }}
            </template>
          </el-table-column>
          <!-- <el-table-column prop="price" label="单价" width="100">
            <template #default="scope">
              <span>{{ scope.row.price ? scope.row.price : '' }}</span>
            </template>
          </el-table-column> -->
          <el-table-column prop="uom" label="单位" width="100">
            <template #default="scope">
              {{ scope.row.uom ? scope.row.uom.name : '' }}
            </template></el-table-column
          >
          <!-- <el-table-column prop="total_amount" label="合计" width="100">
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
          </el-table-column> -->
          <el-table-column prop="estimated_arrival_date" label="预计到货日期">
            <template #default="scope">
              <span>
                {{ scope.row.estimated_arrival_date ? scope.row.estimated_arrival_date : '' }}
              </span>
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="操作"
            fixed="right"
            width="100"
            v-if="form.state == 'sent' || form.state == 'draft'"
          >
            <template #default="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import Bread from '@/components/bread.vue'
import { buyerid } from '@/api/buyer'
export default {
  name: 'detail',
  components: { Bread },
  inject:['$url'],
  data() {
    return {
      crumnName: [
        {
          name: '我的订单', // 名称,自定
          path: 'orders' // 路由导航,自定
        }
      ], // 面包屑数据
      crumnNames: 'jjj',
      form: {}
    }
  },
  created() {},
  mounted() {
    this.buyerdetail()
    this.id = this.$route.query.id
  },
  methods: {
    arry(data) {
      if (data.code !== 200) {
        ElMessage.error(data.error)
      } else {
        this.form = data.data
        this.form.states = data.data.states.slice(0, 5).reverse()
        this.form.state = data.data.state[0]
        this.form.name = data.data.name
      }
    },
    async buyerdetail() {
      let vm = this
      const { data } = await buyerid(vm.$route.query.id)
      this.arry(data)
    }
  }
}
</script>

<style scoped>
.detail {
  width: 100%;
  min-height: 800px;
  text-align: center;
}
.detail::-webkit-scrollbar {
  width: 0px;
  background: none;
}
.detail-head {
  width: 100%;
  display: flex;
  margin-top: -20px;
  border-bottom: 1px solid #ced4da;
  background: #fff;
}
.detail-btn {
  flex: 1;
}
.detail-active {
  text-align: right;
  text-align: -webkit-right;
  position: relative;
  border-right: 1px solid #ced4da;
  border-left: 1px solid #ced4da;
}
.detail-active ul {
  height: 34px;
  display: flex;
  margin-left: auto;
  flex-flow: row-reverse wrap-reverse;
  text-align: -webkit-center;
}
.detail-active ul li {
  /* width: 56px; */
  min-height: 34px;
  line-height:34px;
  font-size: 11px;
  font-weight: bold;
  position: relative;
  padding-left: 22px;
  color: #000;
  border-width: 0 0 0;
  border-radius: 0;
  transition: all 0.1s ease 0s;
}
.detail-active ul li:first-child {
  padding-right: 16px;
  overflow-x: hidden;
}
.detail-active ul .btn-primary {
  color: #fff;
  font-size: 11px;
  background-color: #409eff;
  cursor: default;
}
.detail-active > ul > li:not(:first-child):before {
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
  border-top: 17px solid transparent;
  border-bottom: 17px solid transparent;
  border-right: none;
  border-left: 11px solid white;
  transition: border 0.2s ease 0s;
}
ul > li.btn-primary:after {
  border-left-color: #409eff;
}
li > .disable {
  opacity: 1;
  color: #adb5bd;
  pointer-events: none;
  border-left: 1px solid #ccc;
}
.detail-box {
  width: 1300px;
  margin: 0 auto;
  min-height: 700px;
  text-align: initial;
  margin-top: 20px;
  background: #fff;
  box-sizing: border-box;
  box-shadow: 1px 2px 3px 4px #ccc;
}
.detail-content {
  display: flex;
  text-align: center;
}
.detail-left {
  flex: 1;
  text-align: left;
  border-right: 1px solid #ccc;
  margin: 5px;
}
.detail-left h4 {
  height: 30px;
  padding: 20px;
}
.detail-left h4 span {
  margin-left: 30px;
  font-size: 18px;
}
.detail-btns {
  text-align: right;
  margin: 40px;
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
  margin-top: 30px;
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
.eltable {
  margin: 20px;
  margin-bottom: 20px;
}
</style>
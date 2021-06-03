<!--待我审批 rengaoli 2021/5/18 -->
<template>
  <div class="approving">
    <div class="appcontent">
      <h4>待我审批</h4>
      <div class="flow-content infinite-list-wrapper" style="overflow: auto">
        <div
          class="app-list"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
          v-for="(item, index) in arrlist"
          :key="index"
          @click="detail(item, index)"
        >
          <div class="user">
            <div class="block">
              <el-avatar :size="60" :src="item.user_id.image"></el-avatar>
            </div>
          </div>
          <div class="list-cont">
            <ul>
              <li>
                <span>单号</span> ：<span>{{ item.req_id.name }}</span>
                <span :class="[item.state[0] == 'approving' ? 'flag' : 'code']">{{
                  item.state[1]
                }}</span>
              </li>
              <li>
                <span>申请人</span>：<span>{{ item.user_id.name }}</span>
              </li>
              <li>
                <span>申请时间</span>：<span>{{ create_time }}</span>
              </li>
              <li>
                <span>部门</span>：<span> {{ item.department.name }}</span>
              </li>
            </ul>
          </div>
        </div>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p> 
      </div>
    </div>
    <div class="apprconte">
      <div class="content" v-if="show">
        <h4>{{ mag }}</h4>
        <div class="app-box">
          <div class="app-lists">
            <div class="list-policy">
              <h4>单号：{{ order.name }}</h4>
            </div>
          </div>
          <div class="app-lists">
            <div class="user">
              <div class="block">
                <el-avatar :size="50" :src="order.create_uid.image"></el-avatar>
              </div>
            </div>
            <div class="list-contr">
              <ul>
                <li>
                  <span>申请人</span>：<span>{{ order.create_uid.name }}</span>
                </li>
                <li>
                  <span>创建时间</span>：<span>{{ order.create_time }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="app-listss">
            <div class="list-conts">
              <p class="font">基础信息：</p>
              <div class="user-devep">
                <div>
                  <p>
                    <span>项目</span> ： <span>{{ order.project.name }}</span>
                  </p>
                  <p>
                    <span>供应商</span> ：<span v-if="order.supplier != null">{{
                      order.supplier.name
                    }}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span>部门</span> ：<span>{{ order.department.name }}</span>
                  </p>
                  <p><span>总价</span> ： <span>{{order.total_amount}}</span></p>
                </div>
              </div>
            </div>
          </div>
          <div class="app-listss">
            <div class="list-conts">
              <p class="font">物品信息：</p>
              <el-table
                :data="tableData"
                border
                style="width: 600px; text-align: center; margin: 10px"
              >
                <el-table-column prop="skuname" width="180px" label="物品"> </el-table-column>
                <el-table-column prop="count" label="数量"> </el-table-column>
                <el-table-column prop="uom" label="单位"> </el-table-column>
                <el-table-column prop="price" label="单价"> </el-table-column>
                <el-table-column prop="total_amount" label="合计"> </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="app-argent">
            <div class="app-all">
              <p class="font">审批详情：</p>
              <div class="app-conts">
                <div
                  class="app-listCard"
                  v-for="(item, index) in workflowtask"
                  :key="index"
                  :class="[item.is_approving_user == true ? 'first' : '']"
                >
                  <div class="user">
                    <div class="block">
                      <el-avatar :size="50" :src="item.appro_user.image"></el-avatar>
                    </div>
                  </div>
                  <div class="list-contr">
                    <ul>
                      <li>
                        <span>{{ item.state[1] }}</span>
                      </li>
                      <li>
                        <span>用户</span>：<span>{{ item.appro_user.name }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="app-alls">
            <p class="font">审批意见：</p>
            <el-input
              class="textarea"
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="apply_comment"
            >
            </el-input>
            <div class="app-btn">
              <el-button type="primary" size="mini" @click="agree">同意</el-button>
              <el-button size="mini" @click="refuse">拒绝</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="hide" v-else>请选择一个已有订单</div>
    </div>
  </div>
</template>

<script >
import { sworkflowtask, worflowre, approve, approving } from '../../../../api/approval'
import { transdate, timestampToTime } from '../../../../utils/index'
export default {
  name: 'personal',
  data() {
    return {
      loading: false,
      is_approve: '', //同意拒绝
      task_id: '', //任务id
      apply_comment: '', // 审批意见
      search: '',
      ordering: '',
      page: 1,
      size: 10,
      create_time: '', // 申请时间
      value: '',
      arrlist: [],
      show: false,
      mag: '',
      order: {},
      tableData: [],
      workflowtask: []
    }
  },
  computed: {
    noMore() {
      return this.size >= 20
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  created() {
    this.swork()
  },
  mounted() {},
  methods: {
    async swork() {
      await approving(this.search, this.ordering, this.page, this.size).then((res) => {
        this.arrlist = res.data.data.results
        this.is_approve = res.data.data.results[0].is_approved
        this.create_time = timestampToTime(transdate(res.data.data.results[0].create_time))
        console.log(res.data.data, 'res.data.data', this.count)
      })
    },
    load() {
      this.loading = true
      setTimeout(() => {
        this.size += 10
        this.swork()
        this.loading = false
        console.log(this.size, 'jkfhjk', this.count)
      }, 2000)
    },
    async detail(item, index) {
      console.log(item, 'item', index)
      let type_id = item.type_id.id
      let req_id = item.req_id.id
      this.mag = item.type_id.name
      const { data } = await worflowre(type_id, req_id)
      this.order = data.data
      let datalist = []
      let list = data.data.line
      for (let i in list) {
        let obj = {}
        obj.skuname = list[i].sku.name
        obj.count = list[i].count
        obj.uom = list[i].uom.name
        obj.price = list[i].price
        obj.total_amount = list[i].total_amount
        datalist[i] = obj
      }
      this.tableData = datalist
      this.order.create_time = timestampToTime(transdate(data.data.create_time))
      this.workflowtask = data.data.workflowtask
      this.task_id = data.data.task_id
      this.apply_comment = ''
      this.show = true
    },
    agree() {
      let obj = {
        is_approve: this.is_approve,
        task_id: this.task_id,
        apply_comment: this.apply_comment
      }
      if (obj.apply_comment != '') {
        this.$confirm('确定同意吗?', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: ''
        })
          .then(() => {
            approve(obj).then((res) => {
              console.log(res.data)
              if (res.data.code == 200) {
                this.show = false
                this.swork()
              }
            })
          })
          .catch(() => {})
      } else {
        this.$message({
          type: 'error',
          message: '审批意见不能为空'
        })
      }
    },
    refuse() {
      let obj = {
        is_approve: this.is_approve,
        task_id: this.task_id,
        apply_comment: this.apply_comment
      }
      if (obj.apply_comment != '') {
        approve(obj).then((res) => {
          if (res.data.code == 200) {
            this.show = false
            this.swork()
          }
        })
      } else {
        this.$message({
          type: 'error',
          message: '审批意见不能为空'
        })
      }
    }
  }
}
</script>
<style scoped>
.approving {
  text-align: center;
  background: #fff;
  display: flex;
}
.approving::-webkit-scrollbar {
  width: 0px;
  background: none;
}
.appcontent {
  width: 25%;
  border-right: 1px solid #ccc;
}
.appcontent > h4 {
  font-size: 24px;
  font-weight: 400;
  height: 28px;
  line-height: 28px;
  border-bottom: 1px solid #ccc;
  background: ghostwhite;
}
.app-ul {
  display: flex;
  justify-content: space-around;
}
.app-ul li {
  flex: 1;
  width: 100px;
}
.flow-content {
  height:770px;
  overflow: auto;
  margin-top:20px;
}

.flow-content::-webkit-scrollbar {
  width: 0px;
  background: none;
}
.app-list {
  display: flex;
  border-bottom: 1px solid #ccc;
  align-items: center;
}
.user {
  margin: 10px;
}
.list-cont {
  text-align: left;
}
.list-cont ul li span:nth-child(1) {
  width: 60px;
  display: inline-block;
  text-align-last: justify;
}
.block {
  margin-top: 10px;
}
.block img {
  width: 100%;
  height: 100%;
}
.flag {
  margin-left: 10px;
  width: 80px;
  display: inline-block;
  text-align: center;
  border-radius: 10px;
  color: #fff;
  background: cornflowerblue;
}
.code {
  margin-left: 10px;
  width: 100px;
  display: inline-block;
  text-align: center;
  border-radius: 10px;
  color: #fff;
  background: chocolate;
}
.apprconte {
  width: 75%;
  text-align: left;
  overflow: auto;
}
.apprconte::-webkit-scrollbar {
  width: 0px;
  background: none;
}
.app-box {
  margin: 20px;
  margin-top: -50px;
}
.content h4 {
  text-align: center;
  font-size: 24px;
  font-weight: 400;
}
.app-lists {
  display: flex;
  align-items: center;
}
.app-listCard {
  display: flex;
  align-items: center;
}
.list-policy h4 {
  font-size: 18px;
  font-weight: 600;
}
.list-contr {
  /* margin-left: -44px; */
}
.first {
  width: 200px;
  background: cornflowerblue;
  border-radius: 10px;
  color: #fff;
}
.user-devep {
  margin-top: 10px;
  width: 400px;
  display: flex;
  justify-content: center;
}
.user-devep div:nth-child(1) {
  flex: 1;
}
.user-devep div p {
  padding: 10px;
}
.user-devep div p span:nth-child(1) {
  width: 60px;
  display: inline-block;
  text-align-last: justify;
}
.font {
  font-weight: 600;
}
.app-argent {
  display: flex;
  text-align: left;
}
.app-all {
  flex: 1;
}
.app-conts {
  margin: 20px;
}
.textarea {
  width: 300px;
  margin: 10px;
}
.app-btn {
  text-align: left;
  margin: 10px;
}
.hide {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -50px 0 0 -50px;
}
</style>
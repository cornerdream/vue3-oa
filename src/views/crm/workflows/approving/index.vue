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
          <div class="block">
            <el-avatar :size="50" :src="`${$url}`+item.user_id.image"></el-avatar>
          </div>
          <div class="list-cont">
            <ul>
              <li>
                <span>单号</span>：<span>{{ item.req_id?item.req_id.name:'' }}</span>
              </li>
              <li>
                <span>申请人</span>：<span>{{ item.user_id?item.user_id.name:'' }}</span>
              </li>
              <li>
                <span>申请时间</span>：
                <span>{{create_time?create_time:'' }}</span>
              </li>
              <li>
                <span>部门</span>：<span> {{ item.department?item.department.name:'' }}</span>
              </li>
            </ul>
          </div>
          <p class="app-right">
            <span :class="[item.state[0] == 'approving' ? 'flag' : ' ']">{{ item.state[1] }}</span>
          </p>
        </div>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </div>
    </div>
    <div class="apprconte">
      <div class="content" v-if="show">
        <h4>{{ mag }}</h4>
        <div class="app-box">
          <div class="box-lefts">
            <div class="app-lists">
              <h3>单号：{{ order.name }}</h3>
              <div class="list-conts">
                <div class="block">
                  <el-avatar :size="50" :src="`${$url}`+order.create_uid.image"></el-avatar>
                </div>
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
              <p class="font">基础信息：</p>
              <div class="user-devep">
                <div>
                  <p>
                    <span class="project">项目</span> ： <span>{{ order.project.name }}</span>
                  </p>
                  <p>
                    <span class="project">供应商</span> ：<span v-if="order.supplier != null">{{
                      order.supplier.name
                    }}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span class="project">部门</span> ：<span>{{ order.department?order.department.name:'' }}</span>
                  </p>
                  <p>
                    <span class="project">总价</span> ： <span>{{ order.total_amount }}</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="app-listss">
              <p class="font">物品信息：</p>
              <el-table
                :data="tableData"
                border
                style="width: 600px; text-align: center; margin: 10px"
              >
                <el-table-column prop="skuname" label="物品"> </el-table-column>
                <el-table-column prop="count" label="数量" width="100px"> </el-table-column>
                <el-table-column prop="uom" label="单位" width="100px"> </el-table-column>
                <el-table-column prop="price" label="单价" width="100px"> </el-table-column>
                <el-table-column prop="total_amount" label="合计" width="100px"> </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="box-right">
            <div class="app-listss">
              <p class="font">审批详情：</p>
              <div class="list-contss" v-for="(item, index) in workflowtask" :key="index">
                <div class="block">
                  <el-avatar :size="50" :src="`${$url}`+item.appro_user.image"></el-avatar>
                </div>
                <ul>
                  <li>
                    <span>审批状态</span>：<span>{{ item.state[1] }}</span>
                  </li>
                  <li>
                    <span>用户</span>：<span>{{ item.appro_user.name }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="app-listss">
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
      </div>
      <div class="hide" v-else>请选择一个已有订单</div>
    </div>
  </div>
</template>

<script >
import {worflowre, approve, approving } from '@/api/approval'
export default {
  name: 'personal',
  inject:['$url'],
  data() {
    return {
      loading: false,
      is_approve: '', //同意拒绝
      task_id: '', //任务id
      apply_comment: '', // 审批意见
      obj:{
      search: '',
      ordering: '',
      page: 1,
      size: 10,
      },
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
      await approving(this.obj).then((res) => {
        if(res.data.code ==200 && res.data.data.results!=[]){  
        this.arrlist = res.data.data.results
         for (let i=0;i< res.data.data.results.length;i++){
          //  console.log(res.data.data.results[0].is_approved,'jl')
          //   this.is_approve = res.data.data.results[0].is_approved
        this.create_time = res.data.data.results[0].create_time.slice(0, 10)
        }
       
        console.log(res.data.data, 'res.data.data', this.count)
        }
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
      this.order.create_time = data.data.create_time.slice(0, 10)
      this.workflowtask = data.data.workflowtask
      this.task_id = data.data.task_id
      this.apply_comment = ''
      this.show = true
      console.log(data.data,'this.task_idthis.task_id返回数据')
    },
    agree() {
      let obj = {
        is_approve:true,
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
        is_approve: false,
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
  padding: 5px;
  font-size: 22px;
  font-weight: 400;
  /* height: 28px; */
  line-height: 28px;
  border-bottom: 1px solid #ccc;
  background: ghostwhite;
}
.flow-content {
  height: 770px;
  overflow: auto;
}
.flow-content::-webkit-scrollbar {
  width: 0px;
  background: none;
}
.app-list {
  height: 100px;
  display: flex;
  align-items: center;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.block {
  flex: 1;
}
.list-cont {
  flex: 2;
  text-align: left;
}
.app-right {
  flex: 1;
  margin-top: -60px;
  text-align: right;
  margin-right: 10px;
}
.list-cont ul li {
  height: 20px;
}
.list-cont ul li span:nth-child(1) {
  width: 60px;
  display: inline-block;
  text-align-last: justify;
}
.flag {
  width: 80px;
  display: inline-block;
  text-align: center;
  border-radius: 10px;
  color: #fff;
  background: cornflowerblue;
}
.apprconte {
  width: 75%;
  height: 818px;
  text-align: left;
  overflow: auto;
}
.apprconte::-webkit-scrollbar {
  width: 0px;
  background: none;
}
.content h4 {
  text-align: center;
  font-size: 24px;
  font-weight: 400;
  margin: 10px;
}
.app-box {
  display: flex;
  justify-content: space-around;
}
.box-lefts {
  flex: 1;
  text-align: left;
}
.app-lists {
  margin: 20px;
}
.app-lists h3 {
  margin-bottom: 10px;
}
.list-conts {
  width: 210px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.app-listss {
  margin: 20px;
}
.user-devep {
  display: flex;
  margin: 10px;
}
.user-devep > div {
  flex: 1;
  line-height: 20px;
}
.project {
  width: 60px;
  display: inline-block;
  text-align-last: justify;
}
.font {
  font-weight: 600;
}
.box-right {
  flex: 1;
  text-align: left;
}
.list-contss {
  margin: 10px;
  width: 180px;
  display: flex;
  align-items: center;
}
.list-contss ul li {
  margin: 5px;
 width: 200px;
 line-height: 20px;
}
.app-box::-webkit-scrollbar {
  width: 0px;
  background: none;
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
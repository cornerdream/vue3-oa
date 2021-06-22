<!--出库单 rengaoli 2021/5/26 -->
<template>
  <div class="picking">
    <Bread :crumnName="crumnName" :crumnNames="crumnNames"></Bread>
    <div class="order-handle">
      <el-input
        v-model="search"
        placeholder="输入关键字搜索"
        size="small"
        @keyup.enter="onQuery"
      ></el-input>
      <el-select
        v-model="value2"
        multiple
        size="small"
        style="margin-left: 20px"
        @change="handleCommissioer"
        placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button class="btnquery" type="primary" icon="el-icon-search" size="small" @click="onQuery">搜索</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%; margin-top: 30px" @row-click="tab">
      <el-table-column prop="date" label="序号" type="index" width="100"> </el-table-column>
      <el-table-column prop="name" label="名称" width="180">
        <template #default="scope">
          {{ scope.row.name ? scope.row.name : '' }}
        </template>
      </el-table-column>
      <el-table-column prop="origin" label="源文档">
        <template #default="scope">
          {{ scope.row.origin ? scope.row.origin : '' }}
        </template>
      </el-table-column>
      <el-table-column prop="applicant" label="申请人">
        <template #default="scope">
          {{ scope.row.applicant ? scope.row.applicant : '' }}
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建日期">
        <template #default="scope">
          {{ scope.row.create_time ? scope.row.create_time : '' }}
        </template>
      </el-table-column>
      <el-table-column prop="date_done" label="完成日期">
        <template #default="scope">
          {{ scope.row.date_done ? scope.row.date_done : '' }}
        </template>
      </el-table-column>
      <el-table-column prop="receiver" label="操作人">
        <template #default="scope">
          {{ scope.row.receiver ? scope.row.receiver : '' }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.state[0] === 'done'? 'danger': scope.row.state[0] === 'confirmed' || scope.row.state[0] === 'draft'? ' ': 'success'"
            >{{ scope.row.state[1] }}</el-tag
          >
        </template>
      </el-table-column>
    </el-table>
    <Pagenation
      :total="page_total"
      @pageChange="pageChange"
      :page_index="page_index"
      v-if="page_total != []"
    ></Pagenation>
  </div>
</template>

<script >
import Bread from '@/components/bread.vue'
import Pagenation from '@/components/pageNation.vue'
import { picktype, search,state } from '@/api/picking'
import { transdate, timestampToTime } from '@/utils/index'
export default {
  name: 'picking',
  components: { Bread, Pagenation },
  data() {
    return {
      active: 0,
      search: '',
      page_index: 1, // 页数
      page_total: 1, // 总页数
      page_size: 10,
      crumnName: [
        {
          name: '库存概览', // 名称,自定
          path: 'picking' // 路由导航,自定
        }
      ], // 面包屑数据
      crumnNames: '',
      tableData: [],
      picktype: '',
      create: '',
      date: '',
      options: [],
      value1: [],
      value2: []
    }
  },
  mounted() {
    let a = sessionStorage.getItem('picking_type')
    this.picktype = JSON.parse(a)
    this.crumnNames = this.picktype.name
    this.initData()
    this.state()
  },
  methods: {
    initData() {
      picktype(this.picktype.id,this.search, this.value2,this.page_index, this.page_size).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.results
          this.page_total = res.data.data.count
          this.table(this.tableData)
        }
      })
    },
    tab(item) {
      this.$router.push({ name: 'pickdetail', query: { id: item.id } })
    },
    onQuery() {
      console.log(this.value2,'zhuangtai')
      search(this.picktype.id,this.search, this.value2,this.page_index, this.page_size).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.results
          this.page_total = res.data.data.count
          console.log(this.page_total,'高房价')
          this.table(this.tableData)
        }
      })

    },
    table(tableData) {
      for (let i = 0; i < tableData.length; i++) {
        if (tableData != null) {
          if (tableData[i].date_done && tableData[i].create_time) {
            tableData[i].create_time = tableData[i].create_time.slice(0, 10)
            tableData[i].date_done = tableData[i].date_done.slice(0, 10)
            console.log(tableData[i].create_time.slice(0, 10), tableData[i].date_done.slice(0, 10))
          }
          if (tableData[i].date_done) {
            tableData[i].date_done = tableData[i].date_done.slice(0, 10)
          } else if (tableData[i].create_time) {
            tableData[i].create_time = tableData[i].create_time.slice(0, 10)
          }
        }
      }
    },
    pageChange(item) {
      this.page_index = item.page_index
      this.page_size = item.page_limit
      this.initData() //改变页码，重新渲染页面
      this.onQuery()
      console.log(item)
    },
    state(){
       state().then((res)=>{
      console.log(res)
      this.options = res.data.data
    })
    },
    handleCommissioer(val){
      this.value2 =val
     console.log(val,'vvvvvv')
    }
  }
}
</script>
<style scoped>
.picking {
  height: 780px;
  padding: 20px;
  background: #fff;
}
.order-handle .el-input {
  width: 200px;
  margin-right: 10px;
}
.title {
  font-size: 20px;
  font-weight: 600;
  padding: 20px;
}
.content-head {
  margin: 30px 60px;
}

.btnquery{
  margin-left: 30px;
}
</style>
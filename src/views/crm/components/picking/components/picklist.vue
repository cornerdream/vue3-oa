<!--出库单 rengaoli 2021/5/26 -->
<template>
  <div class="picking">
    <Bread :crumnName="crumnName" :crumnNames="crumnNames"></Bread>
    <div class="order-handle">
      <el-input
        v-model="search"
        placeholder="输入关键字搜索"
        size="small"
        @keyup.enter.native="onQuery"
      ></el-input>
      <el-button type="primary" icon="el-icon-search" size="small" @click="onQuery">搜索</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%; margin-top: 30px" @row-click="tab">
      <el-table-column prop="date" label="序号" width="100"> </el-table-column>
      <el-table-column prop="name" label="名称" width="180"> </el-table-column>
      <el-table-column prop="origin" label="原文档"> </el-table-column>
      <el-table-column prop="applicant" label="申请人"> </el-table-column>
      <el-table-column prop="create_time" label="创建日期"></el-table-column>
      <el-table-column prop="data_done" label="完成日期"> </el-table-column>
      <el-table-column prop="receiver" label="操作人"> </el-table-column>
      <el-table-column prop="state" label="状态"> </el-table-column>
    </el-table>

    <!-- <div class="content"> -->
    <!-- <div class="title">RK20-04-24</div> -->
    <!-- <information></information> -->
    <!-- <detailed></detailed> -->
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import Bread from '../../../../../components/bread.vue'
export default {
  name: 'picking',
  components: { Bread },
  data() {
    return {
      active: 0,
      search: '',
      crumnName: [
        {
          name: '库存概览', // 名称,自定
          path: 'picking' // 路由导航,自定
        }
      ], // 面包屑数据
      crumnNames: '收货入库',
      tableData: [
        {
          date: '1',
          name: 'name',
          origin: 'origin',
          applicant: 'applicant',
          create_time: 'create_time',
          data_done: 'data_done',
          receiver: 'receiver',
          state: 'state'
        },
        {
          date: '2',
          name: 'name',
          origin: 'origin',
          applicant: 'applicant',
          create_time: 'create_time',
          data_done: 'data_done',
          receiver: 'receiver',
          state: 'state'
        }
      ]
    }
  },
  methods: {
    tab(item) {
      this.$router.push({ path: '/pickdetail', query: { id: 1 } })
      console.log(item, 'item')
    },
    onQuery() {
      console.log('查询')
      // this.loadOrder();
    }
  }
}
</script>
<style scoped>
.picking {
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
h4 {
  margin: 10px;
}
</style>
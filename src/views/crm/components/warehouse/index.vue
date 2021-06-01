<!--采购单列表 rengaoli 2021/5/18 -->
<template>
  <div class="personal">
    <el-table :data="tableData"  height="650" border style="width: 100%;" @row-click="tab">
      <el-table-column prop="" type="index" label="序号" width="100"> </el-table-column>
      <el-table-column prop="name" label="名称" width="180">
        <template #default="scope">
          {{ scope.row.name ? scope.row.name : '' }}
        </template>
      </el-table-column>
      <el-table-column prop="department" label="部门">
        <template #default="scope">
          {{ scope.row.department ? scope.row.department.name : '' }}
        </template>
      </el-table-column>
      <el-table-column prop="porject" label="项目">
        <template #default="scope">
          {{ scope.row.project ? scope.row.project.name : '' }}
        </template>
      </el-table-column>
      <el-table-column prop="create_uid" label="申请人">
        <template #default="scope">
          {{ scope.row.id ? scope.row.create_uid.name : '' }}
        </template>
      </el-table-column>
      <el-table-column prop="supplier" label="供应商">
        <template #default="scope">
          {{ scope.row.supplier ? scope.row.supplier.name : '' }}
        </template>
      </el-table-column>
      <el-table-column prop="buyer" label="采购员">
        <template #default="scope"> {{ scope.row.buyer ? scope.row.buyer.name : '' }} </template>
      </el-table-column>
      <el-table-column prop="total_amount" label="合计">
        <template #default="scope"> {{ scope.row.buyer ? scope.row.buyer.name : '' }} </template>
      </el-table-column>
      <el-table-column prop="state" label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.state[0] === 'orders' ? 'danger' :scope.row.state[0] === 'sent'|| scope.row.state[0] === 'draft'? ' ': 'success'">{{
            scope.row.state[1]
          }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import Bread from '../../../../components/bread.vue'
import { buyerlist } from '../../../../api/buyer'
export default {
  name: 'personal',
  components: { Bread },
  data() {
    return {
      active: 0,
      tableData: []
    }
  },
  created() {
    this.buyer()
  },
  mounred() {},
  methods: {
    async buyer() {
      await buyerlist().then((res) => {
        if (res.data.code !== 200) {
          ElMessage.error(res.data.error)
        } else {
          this.tableData = res.data.data
        }
        console.log('resssss', res.data.data)
      })
    },
      tab(item: { id: any }) {
        this.$router.push({ path: '/detail', query: { id: item.id } })
        console.log('fjhf')
    }
  }
}
</script>
<style scoped>
.personal {
  padding: 20px;
  background: #fff;
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

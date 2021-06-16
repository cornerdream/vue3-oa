<!-- -->
<template>
  <div class="orderList">
    <el-table
      :data="orderList"
      height="650"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="订单号"> </el-table-column>
      <el-table-column prop="create_uid" label="申请人">
        <template #default="scope">
          {{ scope.row.create_uid ? scope.row.create_uid.name : '' }}
        </template>
      </el-table-column>
      <el-table-column prop="buyer" label="采购员">
        <template #default="scope">
          {{ scope.row.buyer ? scope.row.buyer.name : '' }}
        </template>
      </el-table-column>
      <el-table-column prop="department" label="部门">
        <template #default="scope">
          {{ scope.row.department ? scope.row.department.name : '' }}
        </template>
      </el-table-column>
      <el-table-column prop="project" label="项目">
        <template #default="scope">
          {{ scope.row.project ? scope.row.project.name : '' }}
        </template>
      </el-table-column>
      <el-table-column prop="supplier" label="供应商">
        <template #default="scope">
          {{ scope.row.supplier ? scope.row.supplier.name : '' }}
        </template>
      </el-table-column>
      <el-table-column prop="notes" label="备注"> </el-table-column>
      <el-table-column prop="state" label="状态">
        <template #default="scope">
          <el-tag type="success">{{scope.row.state[scope.row.state.length-1]}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'orderList',
  props:['orderList'],
  data() {
    return {}
  },
  created() {},
  mounted() {}
}
</script>
<style scoped>
.orderList {
  margin: 10px 0;
}
.cell .el-tag {
  margin: 2px;
}
</style>

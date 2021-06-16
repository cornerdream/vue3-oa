<!-- -->
<template>
  <div class="organizeList">
    <el-table
      :data="organizeList"
      height="650"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="名称" width="180"> </el-table-column>
      <el-table-column prop="type" label="类型"> </el-table-column>

      <el-table-column label="操作" fixed="right" width="100">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            :disabled="scope.row.id === 1"
            type="danger"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.page"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="query.size"
      layout="total, sizes, prev, pager, next"
      :total="total">
  </el-pagination> -->
    <createOrEdit
      ref="form"
      :organize="organize"
      :is-add="false"
      :row-id="organizeId"
    />
  </div>
</template>

<script >
import createOrEdit from './createOrEdit.vue'
import {  del } from '@/api/organization'
export default {
  name: 'organizeList',
  components: {
    createOrEdit
  },
  props:['organizeList','organize','total','query'],
  data() {
    return {
      organizeId: 0,
      selectedOptions:[],
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleEdit(item) {
      console.log(item);
      const _this = this.$refs.form;
      _this.form = {
        id: item.id,
        name: item.name,
        type: item.type,
        pid: item.pid
      };
      this.organizeId = item.id;
      this.$refs.form.dialogVisible = true
    },
    handleDelete(item) {
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          del(item.id).then(()=>{
            this.$message.success('删除成功');
            this.$emit('initList') // 更新数据列表
          });
          
          
        })
        .catch((err) => {
          this.$message.info('已取消删除')
        })
    }
  }
}
</script>
<style scoped>
.organizeList {
  margin: 10px 0;
}
.cell .el-button {
  margin: 2px;
}
</style>

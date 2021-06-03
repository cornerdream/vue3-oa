<!-- -->
<template>
  <div class="accessList">
    <el-table
      :data="accessList"
      height="650"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="名称"> </el-table-column>
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
      :menus="accessList"
      :is-add="false"
      :row-id="accessId"
    />
  </div>
</template>

<script lang="ts">
import createOrEdit from './createOrEdit.vue'
import { edit, del } from '../../../../../../api/permission'
export default {
  name: 'accessList',
  components: {
    createOrEdit
  },
  props: {
    accessList: [],
    // access: [],
    total: 0,
    query: {}
  },
  data() {
    return {
      accessId: 0
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleEdit(item: any) {
      console.log(item);
      const _this = (this as any).$refs.form;
      _this.form = {
        id: item.id,
        name: item.name,
        pid: item.pid
      };
      (this as any).accessId = item.id;
      (this as any).$refs.form.dialogVisible = true;
    },
    handleDelete(item: any) {
      (this as any).$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {   
           del(item.id).then(()=>{
            (this as any).$message.success('删除成功');
            (this as any).$emit('initList') // 更新数据列表
          });       
         
          
        })
        .catch((err:any) => {
          (this as any).$message.info('已取消删除')
        })
    }
  }
}
</script>
<style scoped>
.accessList {
  margin: 10px 0;
}
.cell .el-button {
  margin: 2px;
}
</style>

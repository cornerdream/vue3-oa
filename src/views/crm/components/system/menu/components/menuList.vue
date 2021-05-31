<!-- -->
<template>
  <div class="menuList">
    <el-table
      :data="menuList"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="名称" width="180"> </el-table-column>
      <el-table-column prop="icon" label="图标" width="80">
        <template #default="scope">
          <i :class="`iconfont icon-${scope.row.icon}`"></i>
        </template>
      </el-table-column>

      <el-table-column prop="sort" label="排序" width="80">
        <template #default="scope">
          <el-tag disable-transitions>{{ scope.row.sort }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="path" label="链接地址" width="180"> </el-table-column>
      <el-table-column prop="component" label="组件路径" width="180"> </el-table-column>
      <el-table-column prop="is_frame" label="内部菜单" width="80"> </el-table-column>
      <el-table-column prop="is_show" label="是否显示" width="80"> </el-table-column>

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
    <createOrEdit ref="form" :menus="menus" :is-add="false" :row-id="menuId" />
  </div>
</template>

<script lang="ts">
import createOrEdit from './createOrEdit.vue'
import { edit, del } from '../../../../../../api/menu'
export default {
  name: 'menuList',
  components: {
    createOrEdit
  },
  props: {
    menuList: [],
    menus: [],
    total: 0,
    query: {}
  },
  data() {
    return {
      menuId: 0
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleEdit(item: any) {
      const _this = this.$refs.form
      _this.form = {
        id: item.id,
        component: item.component,
        name: item.name,
        sort: item.sort,
        pid: item.pid,
        path: item.path,
        is_show: item.is_show.toString(),
        is_frame: item.is_frame.toString(),
        icon: item.icon
      }
      console.log(item.id)
      console.log(this.$refs.form)
      this.menuId = item.id
      this.$refs.form.dialogVisible = true
    },
    handleDelete(item: any) {
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(async () => {
          // 确认执行这里
          // 请求删除操作
          const { data } = await del(item.id)
          console.log(data)
          // if (data.code === '000000') {
          this.$message.success('删除成功')
          this.$emit('initList') // 更新数据列表
          // this.$emit('initMenu'); // 更新侧边栏菜单列表
          this.$store.dispatch('GetUserMenu').then(() => {})
          // }
        })
        .catch((err) => {
          // 取消执行这里
          console.log(err)
          this.$message.info('已取消删除')
        })
    }
  }
}
</script>
<style scoped>
.menuList {
  margin: 10px 0;
}
.cell .el-button {
  margin: 2px;
}
</style>

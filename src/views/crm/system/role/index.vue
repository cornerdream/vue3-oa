<!-- -->
<template>
  <div class="role">
    <div class="role-handle">
      <el-input
        v-model="filterParams.search"
        placeholder="输入关键字搜索"
        size="small"
        @input="onQuery"
      ></el-input>
      <el-button type="primary" icon="el-icon-search" size="small" @click="onQuery">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="onAdd">新增</el-button>

      <!-- <el-button :loading="downloadLoading" size="mini" class="filter-item" type="primary" icon="el-icon-download" @click="onDownload">导出</el-button> -->
    </div>
    <roleList :roleList="roles" :total="total" :query="filterParams" @initList="loadRoles" />

    <createOrEdit ref="form" :roles="roles" :is-add="true" :sup_this="sup_this" />
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import roleList from './components/roleList.vue'
import createOrEdit from './components/createOrEdit.vue'
import { getRoles } from '@/api/role'
export default {
  name: 'role',
  components: {
    roleList,
    createOrEdit
  },
  data() {
    return {
      roles: [],
      total: '',
      sup_this: this,
      filterParams: {
        search: '',
        ordering: '',
        page: 1,
        size: 100
      } // 查询条件
    }
  },
  created() {
    this.loadRoles()
  },
  mounted() {},
  methods: {
    async loadRoles() {
      const { data } = await getRoles(this.filterParams)
      if (data.code !== 200) {
        ElMessage.error(data.error)
      } else {
        this.roles = data.data.results
        this.total = data.data.count
      }
    },
    onQuery() {
      this.loadRoles()
    },

    onAdd() {
      this.$refs.form.dialogVisible = true
    }
  }
}
</script>
<style scoped>
.role {
  padding: 20px;
}
.role-handle .el-input {
  width: 200px;
  margin-right: 10px;
}
</style>

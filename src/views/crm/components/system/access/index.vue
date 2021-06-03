<!-- -->
<template>
  <div class="access">
    <div class="access-handle">
      <el-input
        v-model="filterParams.search"
        placeholder="输入关键字搜索"
        size="small"
        @keyup.enter.native="onQuery"
      ></el-input>
      <el-button type="primary" icon="el-icon-search" size="small" @click="onQuery">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="onAdd">新增</el-button>
    </div>
    <accessList
      :accessList="accessList"
      :menus="accessList"
      :total="total"
      :query="filterParams"
      @initList="loadAccess"
    />

    <createOrEdit ref="form" :menus="accessList" :is-add="true" :sup_this="sup_this" />
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import accessList from './components/accessList.vue'
import createOrEdit from './components/createOrEdit.vue'
import { getPermissionTree } from '../../../../../api/permission'
export default {
  name: 'access',
  components: {
    accessList,
    createOrEdit
  },
  data() {
    return {
      accessList: [],
      // access: [],
      total: '',
      sup_this: this,
      filterParams: {
        search: '',
        ordering: '',
        page: 1,
        size: 100
      }
    }
  },
  created() {
    this.loadAccess();
  },
  mounted() {},
  methods: {
    async loadAccess() {
      const { data } = await getPermissionTree(this.filterParams)
      if (data.code !== 200) {
        ElMessage.error(data.error)
      } else {
        this.accessList = data.data.results;
        // this.access = data.data.results;
        this.total = data.data.count
      }
    },
    onQuery() {
      this.loadAccess();
    },
    onAdd() {
      (this as any).$refs.form.dialogVisible = true
    }
  }
}
</script>
<style scoped>
.access {
  padding: 20px;
}
.access-handle .el-input {
  width: 200px;
  margin-right: 10px;
}
</style>

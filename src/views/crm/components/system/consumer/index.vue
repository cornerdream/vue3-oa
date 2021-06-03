<!-- -->
<template>
  <div class="consumer">
    <div class="consumer-handle">
      <el-input v-model="input" placeholder="输入关键字搜索" size="small"></el-input>
      <el-select v-model="value" placeholder="请选择" size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" size="small" @click="onQuery">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="onAdd">新增</el-button>
      <!-- <el-button type="primary" icon="el-icon-download" size="small" @click="onDownload">导出</el-button> -->
    </div>
    <consumerList
      :userList="userList"
      :roles="roles"
      :organizations="organizations"
      :orgusers="orgusers"
      :total="total"
      @initList="loadUsers"
    />
    <createOrEdit
      ref="form"
      :select="selectedOptions"
      :menus="userList"
      :roles="roles"
      :organizations="organizations"
      :orgusers="orgusers"
      :is-add="true"
      :sup_this="sup_this"
    />
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import consumerList from './components/consumerList.vue'
import createOrEdit from './components/createOrEdit.vue'
import { getUser } from '../../../../../api/user'
import { getRoles } from '../../../../../api/role'
import { getOrganizationTree } from '../../../../../api/organization'
export default {
  name: 'consumer',
  components: {
    consumerList,
    createOrEdit
  },
  data() {
    return {
      selectedOptions:[],  
      roles: [], //角色
      organizations: [], //部门
      orgusers: [], //上级主管
      userList: [], //用户列表
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
    this.loadRole()
    this.loadOrganization()
    this.loadUsers()
  },
  mounted() {},
  methods: {
    async loadRole() {
      const { data } = await getRoles(this.filterParams)
      if (data.code !== 200) {
        ElMessage.error(data.error)
      } else {
        console.log(data)
        this.roles = data.data.results
        console.log(this.roles)
      }
    },
    async loadOrganization() {
      const { data } = await getOrganizationTree(this.filterParams)
      if (data.code !== 200) {
        ElMessage.error(data.error)
      } else {
        console.log(data)
        this.organizations = data.data.results
        console.log(this.organizations)
      }
    },
    async loadUsers() {
      const { data } = await getUser(this.filterParams)
      if (data.code !== 200) {
        ElMessage.error(data.error)
      } else {
        this.userList = data.data.results;
        this.orgusers = data.data.results;
      }
    },
    onQuery() {
      this.loadUsers();
    },
    onAdd() {
      (this as any).$refs.form.dialogVisible = true;
    },
    onDownload() {}
  }
}
</script>
<style scoped>
.consumer {
  padding: 20px;
}
.consumer-handle .el-input {
  width: 200px;
}
.consumer-handle .el-select {
  width: 200px;
  margin: 0 10px;
}
</style>

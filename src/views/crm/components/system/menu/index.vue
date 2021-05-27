<!-- -->
<template>
  <div class="menu">
    <div class="menu-handle">
      <el-input
        v-model="filterParams.search"
        placeholder="输入关键字搜索"
        size="small"
        @keyup.enter.native="onQuery"
      ></el-input>
      <el-button type="primary" icon="el-icon-search" size="small" @click="onQuery">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="onAdd">新增</el-button>
    </div>
    <menuList
      :menuList="menus"
      :menus="menusTree"
      :total="total"
      :query="filterParams"
      @initList="loadMenus"
    />

    <createOrEdit ref="form" :menus="menusTree" :is-add="true" :sup_this="sup_this" />
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import menuList from './components/menuList.vue'
import createOrEdit from './components/createOrEdit.vue'
import { getMenuTree, getMenus } from '../../../../../api/menu'
export default {
  name: 'menu',
  components: {
    menuList,
    createOrEdit
  },
  data() {
    return {
      menus: [],
      menusTree: [],
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
    this.loadMenusTree()
    this.loadMenus()
  },
  mounted() {},
  methods: {
    async loadMenusTree() {
      const { data } = await getMenuTree()
      console.log(data)
      if (data.code !== 200) {
        ElMessage.error(data.error)
      } else {
        this.menusTree = data.data.results
        this.total = data.data.count
      }
    },
    async loadMenus() {
      const { data } = await getMenus(this.filterParams);
      if (data.code !== 200) {
        ElMessage.error(data.error)
      } else {
        this.menus = data.data.results
        this.total = data.data.count
      }
    },
    onQuery() {
      this.filterParams.page = 1;
      this.loadMenus();
    },
    onAdd() {
      (this as any).$refs.form.dialogVisible = true
    }
  }
}
</script>
<style scoped>
.menu {
  padding: 20px;
}
.menu-handle .el-input {
  width: 200px;
  margin-right: 10px;
}
</style>

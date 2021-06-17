<!-- -->
<template>
  <div class="organize">
    <div class="organize-handle">
      <el-input
        v-model="filterParams.search"
        placeholder="输入关键字搜索"
        size="small"
        @keyup.enter.native="onQuery"
      ></el-input>
      <el-button type="primary" icon="el-icon-search" size="small" @click="onQuery">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="onAdd">新增</el-button>
    </div>
    <organizeList
      :organizeList="organize"
      :organize="organize"
      :total="total"
      :query="filterParams"
      @initList="loadOrganize"
    />

    <createOrEdit ref="form" :organize="organize"  :is-add="true" :sup_this="sup_this" />
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import organizeList from './components/organizeList.vue'
import createOrEdit from './components/createOrEdit.vue'
import { getOrganizationTree } from '@/api/organization'
export default {
  name: 'organize',
  components: {
    organizeList,
    createOrEdit
  },
  data() {
    return {
      organize: [],  
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
    this.loadOrganize()
  },
  mounted() {},
  methods: {
    
    async loadOrganize() {
      console.log('loadinit');
      const { data } = await getOrganizationTree(this.filterParams);
      if (data.code !== 200) {
        ElMessage.error(data.error)
      } else {
        this.organize = data.data.results;
        this.total = data.data.count;
      }
    },
    onQuery() {
      this.loadOrganize();
    },
    onAdd() {
      this.$refs.form.dialogVisible = true
    }
  }
}
</script>
<style scoped>
.organize {
  padding: 20px;
}
.organize-handle .el-input {
  width: 200px;
  margin-right: 10px;
}
</style>

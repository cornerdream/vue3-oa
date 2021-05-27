<!-- -->
<template>
  <div class="layout">
    <el-container>
      <el-header height="auto"><app-header /></el-header>
      <el-main><router-view /></el-main>
    </el-container>
  </div>
</template>

<script>
import appHeader from './components/app-header.vue'
export default {
  name: 'layout',
  displayName: 'default',
  components: { appHeader },
  data() {
    return {}
  },
  created() {},
  mounted() {}
}
</script>
<style scoped>
.layout {
  min-height: 100vh;
  min-width: 980px;
  display: flex;
  flex-flow: row nowrap;
}

.layout .el-header,
.layout .el-main {
  padding: 0;
  position: relative;
}
.layout .el-main {
  flex-grow: 1;
  padding:0 20px;
}
</style>

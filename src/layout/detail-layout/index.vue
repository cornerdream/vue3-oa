<!-- -->
<template>
  <div class="layout">
     <div class="layout-menu">
          <app-menu/>
        </div>
    <el-container>

      <el-header style="height:auto"><app-header /></el-header>
      
      <el-main>
       
        <router-view :key="$route.name"/>
        </el-main>
      <el-footer style="height:auto;padding:0"><app-footer/></el-footer>
      <!-- <el-header height="auto"><app-header /></el-header>
      <el-main><router-view :key="$route.name"/></el-main> -->
    </el-container>
  </div>
</template>

<script>
import appHeader from './components/app-header.vue'
import appFooter from './components/app-footer.vue'
import appMenu from '@/components/menu/index.vue'
export default {
  name: 'layout',
  components: { appHeader,appFooter,appMenu },
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
  position: relative;
}

.layout .el-header,
.layout .el-main {
  padding: 0;
  position: relative;
}
.layout .el-main {
  flex-grow: 1;
  /* padding:0 20px; */
}
.layout-menu{
  position: absolute;
  left:0;
  top:300px;
  z-index: 8888;
}
</style>

<!-- -->
<template>
  <div class="header">
    <el-container>
      <!-- <el-header height="auto"><app-top /></el-header> -->
      <el-header style="padding:0;height:auto" ><app-tab /></el-header>
    </el-container>
  </div>
</template>

<script>
// import appTop from './app-top.vue'
import appTab from './app-tab.vue'
export default {
  components: { appTab },
  name: 'app-header',
  data() {
    return {}
  },
  created() {},
  mounted() {}
}
</script>
<style scoped>
</style>

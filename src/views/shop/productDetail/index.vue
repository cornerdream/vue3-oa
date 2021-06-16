<!-- -->
<template>
  <div class="productDetail">
    <!-- <el-container> -->
      <!-- <el-aside width="200px"> -->
        <!-- <ad /> -->
      <!-- </el-aside> -->
      <!-- <el-main> -->
        <detail />
      <!-- </el-main> -->
    <!-- </el-container> -->
  </div>
</template>

<script>
// import ad from './components/ad.vue'
import detail from './components/detail/index.vue'
export default {
  name: 'productDetail',
  components: {
    // ad,
    detail
  },
  data() {
    return {}
  },
  created() {},
  mounted() {}
}
</script>
<style scoped>
.productDetail{
  padding:3rem 10rem;
}
</style>

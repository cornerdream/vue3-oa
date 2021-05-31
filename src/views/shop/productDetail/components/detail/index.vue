<!-- -->
<template>
  <div class="detail">
    <div class="clearfix">
      <!-- <productBig/> -->
      <!-- <productDetail/> -->
    </div>
    <productDetail />
    <div class="tabBox">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="商品详情" name="first">商品详情</el-tab-pane>
        <el-tab-pane label="商品参数" name="second">商品参数</el-tab-pane>
        <el-tab-pane label="商品评论" name="third">商品评论</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import productBig from './components/product-big.vue'
import productDetail from './components/product-detail.vue'

export default {
  name: 'detail',
  components: {
    productBig,
    productDetail
  },
  data() {
    return {}
  },
  created() {},
  mounted() {}
}
</script>
<style scoped>
.detail {
}
</style>

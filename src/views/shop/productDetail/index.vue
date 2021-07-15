<!-- -->
<template>
  <div class="productDetail">
        <detail />
  </div>
</template>

<script>
import detail from './components/detail/index.vue'
export default {
  name: 'productDetail',
  components: {
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

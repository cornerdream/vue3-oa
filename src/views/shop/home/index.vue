<!-- -->
<template>
  <div class="home">
    <newsCarousel />
    <product />
  </div>
</template>

<script>
import newsCarousel from './components/news-carousel.vue'
import product from './components/product.vue'
export default {
  components: { newsCarousel, product },
  name: 'home',
  data() {
    return {}
  },
  created() {},
  mounted() {}
}
</script>
<style scoped>

</style>

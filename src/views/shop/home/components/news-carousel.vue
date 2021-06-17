<!-- -->
<template>
  <div class="news-carousel">
    <news />
    <carousel />
  </div>
</template>

<script>
import news from './news.vue'
import carousel from './carousel.vue'
export default {
  name: 'news-carousel',
  components: { news, carousel },
  data() {
    return {}
  },
  created() {},
  mounted() {}
}
</script>
<style scoped>
.news-carousel {
  display: flex;
  padding-left:10rem;
  /* height: 53rem; */
}
</style>

<!-- -->
<template>
  <div class="carousel">
    <img :src="homeLogo" alt="">
  </div>
</template>

<script>
import img1 from '@/assets/images/home-logo.png'
export default {
  name: 'carousel',
  data() {
    return {
      homeLogo:img1
    }
  },
  created() {},
  mounted() {}
}
</script>
<style >
.carousel {
  display: flex;
  justify-content: flex-end;
  flex: 1;
}
 .carousel img{
   border: none;
}
/*.el-carousel {
  height: 100%;
}
.el-carousel__container {
  height: 100%;
}
.el-carousel__item {
  height: 100%;
}
.el-carousel__item img{
  width: 100%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
</style>

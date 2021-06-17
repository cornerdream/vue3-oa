<!-- -->
<template>
  <div class="carousel">
    <img :src="homeLogo" alt="">
    <!-- <el-carousel :interval="5000" arrow="always" >
      <el-carousel-item v-for="item in images" :key="item" >
        
        <img :src="item" >
        
        
      </el-carousel-item>
    </el-carousel> -->
  </div>
</template>

<script>
import img1 from '@/assets/images/home-logo.png'
import img2 from '@/assets/images/2.jpg'
import img3 from '@/assets/images/3.jpg'
import img4 from '@/assets/images/4.jpg'
export default {
  name: 'carousel',
  data() {
    return {
      images:[img1,img2,img3,img4],
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
  /* width: 100%; */
  /* height: 100%; */
}
.el-carousel {
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
  /* height: 100%; */
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
}
</style>

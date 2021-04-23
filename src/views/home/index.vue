<!-- -->
<template>
<div class="home">
    
    <newsCarousel/>
    <product/>
</div>
</template>

<script lang="ts">
import newsCarousel from './components/news-carousel.vue'
import product from './components/product.vue'
export default {
  components: { newsCarousel,product },
       name:"home",
       data(){
return {

}
},
       created(){

},
       mounted(){

}
}
</script>
<style scopted>
.home {
    /* height: 400px; */
    /* display: flex; */
    /* flex-wrap: wrap; */
}
</style>
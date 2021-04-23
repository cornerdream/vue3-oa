<!-- -->
<template>
<div class="news-carousel">
    <news/>
    <carousel/>
</div>
</template>

<script lang="ts">
import news from './news.vue'
import carousel from './carousel.vue'
export default {
       name:"news-carousel",
       components: { news,carousel },
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
.news-carousel {
    display: flex;
}   
</style>
<!-- -->
<template>
<div class="productList">
    <cate/>
    
    <search/>
    <sort/>
    <order/>
</div>
</template>

<script lang="ts">
import cate from './components/productCate.vue'
import order from './components/productOrder.vue'
import search from './components/productSearch.vue'
import sort from './components/productSort.vue'
export default {
       name:"productList",
       components:{
           cate,order,search,sort
       },
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

</style>
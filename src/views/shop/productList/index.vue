<!-- -->
<template>
<div class="productList">
    <tab/>
    
    <list/>   
</div>
</template>

<script lang="ts">
import tab from './components/tab.vue'
import list from './components/list.vue'
import {getProductClassify} from '../../../api/product'
export default {
       name:"productList",
       components:{
           tab,list
       },
       data(){
              return {
                     category_id:this.$route.query.id
              }
       },
       created(){
              this.loadProductClassify();
       },
       mounted(){

       },
       methods:{
              async loadProductClassify(){
                     const {data} = await getProductClassify(this.category_id);
                     console.log(data);
              }
       }
}
</script>
<style scopted>

</style>
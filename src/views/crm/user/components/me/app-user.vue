<!-- -->
<template>
<div class="app-user">
    <cardState/>
    <cardCollect/>
    <cardOrder/>
    <cardFoot/>
</div>
</template>

<script lang="ts">
import cardState from './card-state.vue'
import cardCollect from './card-collect.vue'
import cardOrder from './card-order.vue'
import cardFoot from './card-foot.vue'
export default {
       name:"app-user",
       components:{cardState,cardCollect,cardOrder,cardFoot},
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
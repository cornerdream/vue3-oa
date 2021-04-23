<!-- -->
<template>
<div class="header">
  
          <app-top/>
          <app-tab/>
  
    
</div>
</template>

<script lang="ts">
import appTop from './app-top.vue'
import appTab from './app-tab.vue'
export default {
    components: { appTop,appTab },
    name:"app-header",
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
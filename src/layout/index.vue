<!-- -->
<template>
<div class="layout">
  
   
      <app-header/>
     
      <router-view/>
      
      
   
  
</div>
</template>

<script>

import appHeader from './components/app-header.vue'

export default {
  components: { appHeader },
    name,
    AppMain:"layout",
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

.layout {
  min-height: 100vh;
  min-width: 980px;
}

.el-aside {
  background: #d3dce6;
}

.el-header {
  height: 120px;
  background: #fff;
}

.el-main {
  background: #e9eef3;
}
</style>
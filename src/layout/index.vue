<!-- -->
<template>
<div class="layout">
  
  <el-container>
    <el-header height="auto"><app-header/></el-header>
    <el-main><router-view/></el-main>
  </el-container>
    <!-- <app-header/>
      
    <router-view/>  -->
      
      
    
   
  
</div>
</template>

<script>

import appHeader from './components/app-header.vue'

export default {
  
    name:"layout",
    components: { appHeader },
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
  display: flex;
  flex-flow: row nowrap;
}

.layout .el-header,.layout .el-main{
  padding:0;
}
..layout .el-header{
  
}
.layout .el-main{
  flex-grow: 1;
}
</style>
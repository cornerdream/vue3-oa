<!-- -->
<template>
<div>
    <el-container> 
    <el-aside width="200px">
        <app-aside/>
    </el-aside>
    <el-main>
        <!-- <app-main/> -->
        <router-view/>
    </el-main>
    </el-container>
</div>
</template>

<script lang="ts">
import appAside from './components/app-aside.vue'
// import appMain from './components/me/app-user.vue'
export default {
       name:"user",
       components: { appAside},
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
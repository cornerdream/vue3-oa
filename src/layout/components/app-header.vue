<!-- -->
<template>
<div class="header">
    <el-container>
        <el-header height="auto"><app-top/></el-header>
        <el-header height="auto"><app-tab/></el-header>
    </el-container>
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
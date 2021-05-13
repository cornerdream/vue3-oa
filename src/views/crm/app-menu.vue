<!-- -->
<template>
<div class="app-menu">
   
      <template v-for="(item) in menuList" >
        <el-submenu v-if="item.children&&item.children.length>0" :key="item.id" :index="item.path">
            <!-- <template #title>
                <menu-icon v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
            </template> -->
          <template #title>
            <!-- <svg-icon icon-class="item.meta.icon"/> -->
            <!-- <i v-if="item.meta.icon==null" ></i> -->
            <i :class="`iconfont icon-${item.meta.icon}`"></i>
            
            <span>{{item.name}}</span>
          </template>
          <app-menu :menuList="item.children"/> 
        </el-submenu>
        <el-menu-item v-else :key="item.id" :index="item.path">
          <i :class="`iconfont icon-${item.meta.icon}`"></i>
            
          <span>{{item.name}}</span>
        </el-menu-item>
      </template>
    

</div>
</template>

<script lang="ts">
import {ElMessage } from 'element-plus'
// import menuIcon from './app-icon.vue'
export default {
  name:"appMenu",
  components:{
  //    menuIcon
  },
  props: {
    menuList: {}
  },
  data(){
    return {
        
    }
  },
  created(){
        
    
  },
  mounted(){

  },
  methods:{

  }

}
</script>
<style scopted>

</style>
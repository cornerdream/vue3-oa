<!-- -->
<template>
<div class="aside" style="height:100%"> 
    <el-menu
      unique-opened="true"
      default-active="activeIndex"
      @open="handleOpen"
      @close="handleClose"
      background-color="#303133"
      text-color="#fff"
      active-text-color="#409EFF"
      router
      style="height:100%"
      @select="handleSelect"
    >
      <el-submenu index="me">       
        <template #title>
          <i class="iconfont icon-me"></i>
          <span>我的主页</span>
        </template>
        <el-menu-item index="/cart">
          <i class="iconfont icon-cart"></i>
          <span slot="title">我的购物车</span>
        </el-menu-item>
        <el-menu-item index="/order">
          <i class="iconfont icon-order"></i>
          <span slot="title">我的订单</span>
        </el-menu-item>       
      </el-submenu>
      <app-menu :menuList="menus" />
      <!-- <el-submenu index="2">
        <template #title>
          <i class="el-icon-location"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/system/consumer">
          <i class="el-icon-setting"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/system/menu">
          <i class="el-icon-setting"></i>
          <span slot="title">菜单管理</span>
        </el-menu-item>  
        <el-menu-item index="/system/access">
          <i class="el-icon-setting"></i>
          <span slot="title">权限管理</span>
        </el-menu-item> 
        <el-menu-item index="/system/role">
          <i class="el-icon-setting"></i>
          <span slot="title">角色管理</span>
        </el-menu-item> 
        <el-menu-item index="/system/organize">
          <i class="el-icon-setting"></i>
          <span slot="title">组织架构</span>
        </el-menu-item>     
      </el-submenu>
      
      <el-submenu index="3">
        <template #title>
          <i class="el-icon-location"></i>
          <span>配置管理</span>
        </template>
        <el-menu-item index="/advert">
          <i class="el-icon-setting"></i>
          <span slot="title">资产管理</span>
        </el-menu-item>
        <el-menu-item index="/advert-space">
          <i class="el-icon-setting"></i>
          <span slot="title">业务管理</span>
        </el-menu-item>
      </el-submenu> -->
    </el-menu>
</div>
</template>

<script lang="ts">
import router  from '../../router'
import store from '../../store'

// import {ElMessage } from 'element-plus'
// import { getUserMenu } from '../../api/login'
// import {filterAsyncRouter} from '../../store'
import appMenu from "./app-menu.vue";
export default {
    name:"app-side",
    components:{
      appMenu
    },
    props:{
      menus:[]
    },
    data(){
        return {
          activeIndex:'me'
          // userMenu:{}
        }
    },
    created(){
      // this.loadUserMenu()
    },
    mounted(){

    },
    methods:{
      handleSelect(key,keyPath){
        this.activeIndex = key;
        console.log(key, keyPath);
      }
      //  async loadUserMenu () {       
      //       console.log(this.userMenu);
      //       const { data } = await getUserMenu();
      //       console.log(data);           
      //       if(data.code !== 200){
      //           ElMessage.error(data.error);
      //       }else{              
      //           (this as any).$store.commit('setUserMenu',data.data);                
      //           this.userMenu = data.data              
      //       }
      // },
    }
}
</script>
<style  scopted>
.aside  {
    /* min-height: 100vh */
   
   /* justify-content: center; */
  
}
</style>
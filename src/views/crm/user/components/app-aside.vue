<!-- -->
<template>
<div class="aside"> 
    <el-menu
      default-active="2"
      @open="handleOpen"
      @close="handleClose"
      background-color="#EBEBEB"
      text-color="#727375"
      active-text-color="#3296FA"
      router
      >
      <el-submenu index="1">
        <template #title>
          <i class="el-icon-location"></i>
          <span>我的主页</span>
        </template>
        <el-menu-item-group>
          <template #title>分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template #title>选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <template #title>采购管理</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <template #title>库存管理</template>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <template #title>员工管理</template>
      </el-menu-item>
    </el-menu>
</div>
</template>

<script lang="ts">
export default {
    name:"app-side",
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
<style  scopted>
.aside 
  .el-menu {
    min-height: 100vh
  
}
</style>
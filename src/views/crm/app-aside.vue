<template>
  <div class="aside" style="height: 100%">
    <el-menu
      unique-opened="true"
      default-active="activeIndex"
      @open="handleOpen"
      @close="handleClose"
      background-color="#303133"
      text-color="#fff"
      active-text-color="#409EFF"
      router
      style="height: 100%"
      @select="handleSelect"
    >
      <el-submenu index="me">
        <template #title>
          <i class="iconfont icon-me"></i>
          <span>我的主页</span>
        </template>
        <!-- <el-menu-item index="/cart">
          <i class="iconfont icon-cart"></i>
          <span slot="title">我的购物车</span>
        </el-menu-item> -->
        <el-menu-item index="/order">
          <i class="iconfont icon-order"></i>
          <span slot="title">我的订单</span>
        </el-menu-item>
      </el-submenu>
      <app-menu :menuList="menus" />
    </el-menu>
  </div>
</template>

<script lang="ts">
import appMenu from './app-menu.vue'
export default {
  name: 'app-side',
  components: {
    appMenu
  },
  props: {
    menus: []
  },
  data() {
    return {
      activeIndex: 'me'
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key
    }
  }
}
</script>
<style scoped></style>

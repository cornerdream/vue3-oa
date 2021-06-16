<template>
  <div class="aside" style="height: 100%">
    <el-menu
      ref="menu"
      unique-opened="true"
      :default-active="activeNav"
      :default-openeds="activeOpen"
      @open="handleOpen"
      @close="handleClose"
      background-color="#303133"
      text-color="#fff"
      active-text-color="#409EFF"
      :router="true"
      style="height: 100%"
      @select="handleSelect"
    >
      <el-submenu  index="me">
        <template #title>
          <i class="iconfont icon-me"></i>
          <span>我的主页</span>
        </template>
        <!-- <el-menu-item index="/cart">
          <i class="iconfont icon-cart"></i>
          <span slot="title">我的购物车</span>
        </el-menu-item> -->
        <el-menu-item  index="orders">
          <i class="iconfont icon-order"></i>
          <span>我的订单</span>
        </el-menu-item>
      </el-submenu>
      <app-menu :menuList="menus" />
    </el-menu>
  </div>
</template>

<script lang="ts">
import {mapGetters} from 'vuex'
import appMenu from './app-menu.vue'
import {toRaw} from 'vue'
export default {
  name: 'app-side',
  components: {
    appMenu
  },
  computed:{
    ...mapGetters(['activeNav','activeOpen'])
  },
  props: {
    menus: []
  },
  watch: {     
     
  },
  data() {
    return {
      activeIndex: ['me'],
      openeds:['me']
    }
  },
  created() {
    
  },
  mounted() {},
  methods: {
    handleSelect(key:any,keyPath:any) {     
      (this as any).$store.dispatch('GetActiveNav',key);
      (this as any).$store.dispatch('GetActiveOpen',keyPath)
    }
  }
}
</script>
<style scoped></style>

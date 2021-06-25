<template>
  <div class="aside" style="height: 100%">
    <el-menu
      ref="menu"
      :unique-opened="true"
      :default-active="activeNav"
      :default-openeds="activeOpen"
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
        <el-menu-item  index="orders">
          <i class="iconfont icon-order"></i>
          <span>我的订单</span>
        </el-menu-item>
      </el-submenu>
      <app-menu :menuList="menus" />
    </el-menu>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import appMenu from './app-menu.vue'
export default {
  name: 'app-side',
  components: {
    appMenu
  },
  computed:{
    ...mapGetters(['activeNav','activeOpen'])
  },
  props: ['menus'],
  watch: {     
     
  },
  data() {
    return {
    }
  },
  created() {
    
  },
  mounted() {},
  methods: {
    handleSelect(key,keyPath) {     
      this.$store.dispatch('GetActiveNav',key);
      this.$store.dispatch('GetActiveOpen',keyPath)
    }
  }
}
</script>
<style scoped></style>

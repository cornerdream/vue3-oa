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
        <el-menu-item  index="order">
          <i class="iconfont icon-order"></i>
          <span slot="title">我的订单</span>
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
      // activeNav(newv){
      //   console.log(newv);
      //   this.activeIndex = newv
      // },
      // activeOpen(newv){
      //   console.log(newv);
      //   this.openeds = newv
      // }
  },
  data() {
    return {
      activeIndex: ['me'],
      openeds:['me']
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      this.activeIndex = key;
      console.log(key, keyPath);
    },
    handleSelect(key,keyPath) {
      console.log(this.activeNav);
      console.log(this.activeOpen);
      console.log(key);
      console.log(keyPath);
      // console.log(this.activeIndex);
      // console.log(this.openeds);
      this.$store.dispatch('GetActiveNav',key);
      this.$store.dispatch('GetActiveOpen',keyPath)
      // this.activeNav = key;
      // this.activeOpen = keyPath;
      // this.activeIndex = key;
      // this.openeds = [];
      // this.openeds=keyPath
      // toRaw(this.openeds)
      console.log(this.activeNav);
      console.log(this.activeOpen);
      // this.$refs.menu.open(key)
      
    }
  }
}
</script>
<style scoped></style>

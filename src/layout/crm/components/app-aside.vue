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
      <el-menu-item index="orders">
        <i class="iconfont icon-order"></i>
        <span>我的订单</span>
      </el-menu-item>
      <app-menu :menuList="menus" />
       <!-- <el-menu-item :route="false" @click="fnhref">
        <i class="el-icon-link"></i>
        <span>OA系统</span>
      </el-menu-item> -->
      <p class="infont"  @click="fnhref"> <i class="el-icon-link"></i> OA系统</p>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import appMenu from './app-menu.vue'
import $ from 'jquery'
export default {
  name: 'app-side',
  components: {
    appMenu
  },
  computed: {
    ...mapGetters(['activeNav', 'activeOpen'])
  },
  props: ['menus'],
  watch: {},
  data() {
    return {}
  },
  created() {},
  mounted() {
    console.log(this.menus,'风纪扣')
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$store.dispatch('GetActiveNav', key)
      this.$store.dispatch('GetActiveOpen', keyPath)
    },
    fnhref(){
      $('.infont').css('color','#409eff')
      window.location.href="http://192.168.1.218:8000" 
    }
  }
}
</script>
<style scoped>
.infont {
  color: #fff;
  width: 85px;
  text-align: center;
  margin-top: 8px;
  margin-left: 10px;
  display: inline-block;
}
.tag{
  color: rgb(64, 158, 255);
}
/* rgb(64, 158, 255) */
</style>

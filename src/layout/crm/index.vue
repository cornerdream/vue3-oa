<!-- -->
<template>
  <div class="crm">
    <el-container style="height: 100vh">
      
      <el-header height="auto"><app-header /></el-header>
      <el-container style="height: 100%">
        <el-aside width="200px" style="height: 100%">
          <app-aside :menus="userMenu" />
        </el-aside>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import appHeader from './components/app-header.vue'
import appAside from './components/app-aside.vue'
import appBread from './components/app-bread.vue'
export default {
  name: 'crm',
  components: {
    appHeader,
    appAside,
    appBread
  },
  computed: {
    ...mapGetters(['userMenu'])
  },
  created() {
    this.loadUserMenu()
  },
  mounted() {},
  methods: {
    async loadUserMenu() {
      this.$store.dispatch('GetUserMenu').then((res) => {console.log('急急急',res.data.data)})
    }
  }
}
</script>
<style scoped>
.crm {
  height: 100%;
}
.el-header{
  padding: 0;
}
</style>

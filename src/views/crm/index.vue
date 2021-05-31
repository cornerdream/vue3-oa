<!-- -->
<template>
  <div class="crm">
    <el-container style="height: 100%">
      <el-aside width="200px" style="height: 100%">
        <app-aside :menus="userMenu" />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import appAside from './app-aside.vue'
import appBread from './app-bread.vue'
export default {
  name: 'crm',
  components: {
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
      this.$store.dispatch('GetUserMenu').then(() => {})
    }
  }
}
</script>
<style scoped>
.crm {
  height: 100%;
}
</style>

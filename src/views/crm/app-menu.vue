<!-- -->
<template>
  <div class="app-menu">
    <template v-for="item in menuList">
      <el-submenu
        v-if="item.children && item.children.length > 0"
        :key="item.id"
        :index="item.path">
        
        <template #title>
          <i :class="`iconfont icon-${item.meta.icon}`"></i>
          <span>{{ item.name }}</span>
        </template>
        <app-menu :menuList="item.children" />
      </el-submenu>
      <el-menu-item v-else :key="item.id" :index="item.path">
        <i :class="`iconfont icon-${item.meta.icon}`"></i>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script lang="ts">
export default {
  name: 'appMenu',
  components: {
    
  },
  props: {
    menuList: {}
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style scoped></style>

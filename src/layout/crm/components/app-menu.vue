<!-- -->
<template>
  <div class="app-menu">
    <template v-for="item in menuList">
      <el-submenu
        v-if="item.children && item.children.length > 0"
        :key="item.path "
        :index="item.path "
      >
        <template #title :index="item.path ">
          <i :class="`iconfont icon-${item.meta.icon}`"></i>
          <span>{{ item.meta.title }}</span>
        </template>
        <el-menu-item
          v-for="items in item.children"
          :key="items.path "
          :index="items.path "
          >{{ items.name }}</el-menu-item
        >
      </el-submenu>
      <el-menu-item
        v-if="item.children && item.children.length < 0"
        :key="item.path"
        :index="item.path "
      >
        <span>{{ item.name }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: 'appMenu',
  components: {},
  props: ['menuList'],
  data() {
    return {
      list: {}
    }
  },
  computed: {
  },
  created() {},
  mounted() {
  },
  methods: {}
}
</script>
<style scoped></style>

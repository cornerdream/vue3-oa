<!-- -->
<template>
  <div class="app-bread">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(item, index) in breadList"
        :key="index"
        :to="{ path: item.path }"
        >{{ item.meta.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
export default {
  name: 'app-bread',
  data() {
    return {
      breadList: []
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb();
  },
  mounted() {},
  methods: {
    getBreadcrumb() {
      this.breadList = [];
      let matched = this.$route.matched.splice(1);
      (this as any).breadList = matched;
    }
  }
}
</script>
<style scoped>
.app-bread {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

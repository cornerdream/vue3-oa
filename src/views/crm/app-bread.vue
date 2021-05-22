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
  created() {},
  mounted() {},
  methods: {
    getBreadcrumb() {
      this.breadList = []
      console.log(this.$route.matched)
      let matched = this.$route.matched.splice(1)
      console.log(this.$route)
      console.log(matched)

      this.breadList = matched
    }
  },
  created() {
    this.getBreadcrumb()
  }
}
</script>
<style scopted>
.app-bread {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

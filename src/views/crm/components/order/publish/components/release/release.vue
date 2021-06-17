<template>
  <div>
    <el-button @click="rele">eee</el-button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      activeName: 'categories'
    }
  },
  mounted() {},
  methods: {
    rele() {
      this.$emit('func', this.activeName)
    }
  }
}
</script>

<style scoped>
</style>
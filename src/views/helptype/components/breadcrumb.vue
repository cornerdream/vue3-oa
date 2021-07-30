<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(list,index) in currentPath" :key="index">{{ list }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="listBox" v-html="listBox"></div>
  </div>
</template>  
<style>
</style>
<script>
import { mapGetters } from 'vuex'
export default {
  inject: ['$url'],
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['listMenu'])
  },
  props: ['currentPath', 'listBox'],
  mounted() {},
  methods: {
  }
}
</script>
<style scoped>
.el-breadcrumb {
  background-color: #fff;
  width: 100%;
  line-height: 50px;
  padding: 0 16px;
  border: 1px solid #efefef;
  box-sizing: border-box;
  box-shadow: 1px 2px 4px #ced4da;
  margin-bottom: 20px;
}
</style>
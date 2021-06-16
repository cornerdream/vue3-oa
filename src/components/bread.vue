<template>
  <div class="bread">
    <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item v-for="(item, index) in crumnName" :key="index" :to="{ path: '/'+item.path }">{{item.name}}</el-breadcrumb-item>
  <el-breadcrumb-item>{{crumnNames}}</el-breadcrumb-item>
 <!-- <el-breadcrumb-item v-for="(item, index) in fromFather" :key="index" :to="{ path: '/' + item.path }">{{item.name}}</el-breadcrumb-item>
-->
</el-breadcrumb> 
  </div>
</template>
 
<script>
export default {
  name: 'bread',
  props:{
     crumnName: {},
     crumnNames:{ type: String },
  },
  data() {
    return {
    }
  },
  created(){
  }
}
</script>
<style scoped>
.bread {
  background-color: #fff;
  width: 100%;
  height: 50px;
  padding: 0 16px;
  border: 1px solid #efefef ;
  box-sizing: border-box;
  box-shadow: 1px 2px 4px #bababa;
  margin-bottom: 20px;
}
.el-icon-arrow-right:before {
  color: #000;
}
.el-breadcrumb__item {
  line-height: 50px;
}
.el-breadcrumb__inner {
  cursor: pointer !important;
}
</style>
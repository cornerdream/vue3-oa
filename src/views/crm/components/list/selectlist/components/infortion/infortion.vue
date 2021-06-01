<template>
  <div class="infortion">
    <header>当前分类：</header>
    <fromtitle></fromtitle>
    <fromations></fromations>
    <fromarelease></fromarelease>
  </div>
</template>

<script>
import fromtitle from './componetns/from-title.vue'
import fromations from './componetns/from-ations.vue'
import fromarelease from './componetns/from-release.vue'
export default {
  name: 'infortion',
  components: { fromtitle, fromations, fromarelease },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.infortion {
  background: #fff;
  text-align: left;
}
.el-tabs__content {
  text-align: left;
  background: #fff;
}
P {
  color: #000;
}
a {
  color: #409eff;
}
.footer {
  text-align: center;
  margin-top: 300px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.jichu {
  margin: 20px;
}
</style>

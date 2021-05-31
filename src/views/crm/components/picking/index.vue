<template>
  <div class="picking">
    <div class="picking-content">
      <ul>
        <li>收货入库</li>
        <li>
          <el-button class="el-button" type="primary" size="small" @click="pickDetail"
            >待处理：4</el-button
          >
        </li>
        <li><el-button class="el-button" size="small">总数：520</el-button></li>
      </ul>
      <ul>
        <li>交货入库</li>
        <li><el-button class="el-button" type="primary" size="small">待处理：4</el-button></li>
        <li><el-button class="el-button" size="small">总数：530</el-button></li>
      </ul>
      <ul>
        <li>内部挑拨</li>
        <li><el-button class="el-button" type="primary" size="small">待处理：4</el-button></li>
        <li><el-button class="el-button" size="small">总数：540</el-button></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Bread from '../../../../components/bread.vue'
export default {
  name: 'picking',
  components: { Bread },
  data() {
    return {}
  },
  methods: {
    pickDetail() {
      this.$router.push('/picklist')
    }
  }
}
</script>

<style scoped>
.picking {
  width: 100%;
  min-height: 850px;
  background: #fff;
}
.picking-content {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.picking-content ul {
  width: 240px;
  height: 140px;
  line-height: 40px;
  border: 1px solid #ccc;
  box-shadow: 1px 2px 4px #bababa;
  border-radius: 10px;
  margin-left: 20px;
}
.picking-content ul li {
}
.el-button {
  width: 100px;
  height: 20px;
  border-radius: 10px;
}
</style>
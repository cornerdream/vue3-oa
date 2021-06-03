<template>
  <div class="picking">
    <div class="picking-content">
      <ul v-for="item in list" :key="item" @click="pickDetail(item)">
        <li>{{ item.name }}</li>
        <li>
          <el-button class="el-button" type="primary" size="small"
            >待处理：{{ item.pending }}</el-button
          >
        </li>
        <li>
          <el-button class="el-button" size="small">总数：{{ item.count }}</el-button>
        </li>
      </ul>
      <!-- <ul>
        <li>交货入库</li>
        <li><el-button class="el-button" type="primary" size="small">待处理：4</el-button></li>
        <li><el-button class="el-button" size="small">总数：530</el-button></li>
      </ul>
      <ul>
        <li>内部调拨</li>
        <li><el-button class="el-button" type="primary" size="small">待处理：4</el-button></li>
        <li><el-button class="el-button" size="small">总数：540</el-button></li>
      </ul> -->
    </div>
  </div>
</template>

<script>
import Bread from '../../../../components/bread.vue'
import { pickist } from '../../../../api/picking'
export default {
  name: 'picking',
  components: { Bread },
  data() {
    return {
      list: [],
      page: '',
      page_size: ''
    }
  },
  created() {},
  mounted() {
    this.fnPick()
  },
  methods: {
    pickDetail(item) {
      let id = sessionStorage.setItem('picking_type', JSON.stringify(item) )
      console.log(id,'id',item)
      this.$router.push({ path: '/picklist' })
    },
    async fnPick() {
      await pickist(this.page, this.page_size).then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.data.results
        }
      })
    }
  }
}
</script>

<style scoped>
.picking {
  min-height: 800px;
  background: #fff;
  text-align: center;
}
.picking-content {
  width: 1200px;
  height: 200px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 auto;
  background: #fff;
}
.picking-content ul {
  width: 240px;
  height: 160px;
  line-height: 40px;
  border: 1px solid #ccc;
  box-shadow: 1px 2px 4px #bababa;
  border-radius: 10px;
  margin: 20px;
  text-align: left;
}
.picking-content ul li {
  margin: 10px;
}
.el-button {
  width: 100px;
  height: 20px;
  border-radius: 10px;
}
</style>
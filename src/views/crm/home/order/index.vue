<!-- -->
<template>
  <div class="order">
    <div class="order-handle">
      <el-input
        v-model="filterParams.search"
        placeholder="输入关键字搜索"
        size="small"
        @keyup.enter.native="onQuery"
      ></el-input>
      <el-button type="primary" icon="el-icon-search" size="small" @click="onQuery">搜索</el-button>
    </div>
    <orderList :orderList="orderList" />
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import orderList from './components/orderList.vue'
import { getOrder } from '@/api/order'
export default {
  name: 'order',
  components: {
    orderList
  },
  data() {
    return {
      orderList: [],
      total: '',
      filterParams: {
        search: '',
        ordering: '',
        page: 1,
        size: 10
      }
    }
  },
  created() {
    this.loadOrder()
  },
  mounted() {},
  methods: {
    async loadOrder() {
      const { data } = await getOrder(this.filterParams)
      console.log(data.data,'我的订单')
      if (data.code !== 200) {
        ElMessage.error(data.error)
      } else {
        this.orderList = data.data
        this.total = data.data.count
      }
    },
    onQuery() {
      this.loadOrder()
    }
  }
}
</script>
<style scoped>
.order {
  padding: 20px;
}
.order-handle .el-input {
  width: 200px;
  margin-right: 10px;
}
</style>

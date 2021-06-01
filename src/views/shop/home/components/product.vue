<!-- -->
<template>
  <div class="product">
    <div class="productTitle">热销产品</div>
    <el-row :gutter="10" v-for="item in 2" :key="item">
      
      <el-col 
      :span="4"
      v-for="o in productList"
      :key="o"
      :id="o.id"
      >
        <div class="grid-content">
          <el-card @click="onClick(o.id)">
            <img v-if="!o.default_image_url" :src="defaultImage" class="image" />
            <img v-else :src="o.default_image_url" class="image" />
            <div class="productResult">
              <p class="card-title">{{ o.name }}</p>
              <div class="bottom">
                <p class="price">{{ '¥' + o.price }}</p>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    
  </div>
</template>

<script lang="ts">
import defaultImg from '../../../../assets/images/mouse.png'
import { getProductList } from '../../../../api/product'
export default {
  name: 'product',
  data() {
    return {
      defaultImage: defaultImg,
      productList: []
    }
  },

  created() {
    this.loadProductList()
  },
  mounted() {},
  methods: {
    async loadProductList() {
      const { data } = await getProductList()
      this.productList = data.data.results
    },
    onClick(id:any) {
      this.$router.push({ name: 'productDetail', query: { id } })
    }
  }
}
</script>
<style lang="scss" scoped>
.product {
  padding: 20px;
}
.product .productTitle {
  margin: 10px 0;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.grid-content {
  padding: 10px;
  margin-bottom: 10px;
  text-align: center;
}
.product .image {
  height: 100%;
  width: 100%;
}
.product .card-title {
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 1;
  max-height: 36px;
}
.product .bottom {
  margin-top: 5px;
  flex: 0 0 0 20px;
}
</style>

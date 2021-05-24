<!-- -->
<template>
  <div class="product">
    <div class="productBox" v-for="item in 2" :key="item">
      <div class="productTitle">热销产品</div>
      <div class="productList" >
        <!-- <el-row> -->

        <el-card :body-style="{ padding: '10px',width:'180px'}" v-for="o in productList" :key="o" :id="o.id" @click="onClick(o.id)">
          <img v-if="!o.default_image_url" :src="defaultImage" class="image" />
          <img v-else :src="o.default_image_url" class="image" />
          <div style="padding: 14px" class="productResult">
            <p class="card-title">{{ o.name }}</p>
            <div class="bottom">
              <p class="price">{{ '¥' + o.price }}</p>
              <!-- <el-button type="text" class="button">操作按钮</el-button> -->
            </div>
          </div>
        </el-card>

        <!-- </el-row>     -->
      </div>
    </div>
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
      const { data } = await getProductList();
      this.productList = data.data.results
    },
    onClick(id) {
      this.$router.push({ name: 'productDetail', query: { id } })
    }
  }
}
</script>
<style scopted>
.product {
  /* margin-top: 20px; */
}
.product .productBox {
  padding: 20px;
  overflow: hidden;
}
.product .productTitle {
  margin: 10px 0;
}
.product .productList {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.product .el-card{
  margin:10px;
}
.product .el-card__body {
  display: flex;
  /* justify-content: center; */
  align-items: center;
}
.product .image {
  width: 80px;
  height: 80px;
}
.product .productResult {
  text-align: center;
  /* display: flex;
  flex-direction: column;
  align-self: flex-start; */
}
.product .card-title {
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 1;
  max-height: 60px;
}
.product .bottom {
  margin-top: 5px;
  flex: 0 0 0 20px;
}
</style>

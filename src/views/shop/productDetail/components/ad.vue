<!-- -->
<template>
  <div class="ad">
    <div class="adBox">
      <div class="adTitle">热销产品</div>
      <div class="adList" v-for="o in 2" :key="o">
        <el-card
          :body-style="{ padding: '10px', width: '180px' }"
          v-for="o in productList"
          :key="o"
          :id="o.id"
          @click="onClick(o.id)"
        >
          <img v-if="!o.default_image_url" :src="defaultImage" class="image" />
          <img v-else :src="o.default_image_url" class="image" />
          <div style="padding: 14px" class="productResult">
            <p class="card-title">{{ o.name }}</p>
            <div class="bottom">
              <p class="price">{{ '¥' + o.price }}</p>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import defaultImg from '@/assets/images/mouse.png'
export default {
  name: 'ad',
  data() {
    return {
      defaultImage: defaultImg
    }
  },
  created() {},
  mounted() {}
}
</script>
<style scoped>
.ad {
  margin-top: 20px;
}
.adBox {
  padding: 5px;
  overflow: hidden;
}
.adTitle {
  margin: 10px 0;
}
</style>

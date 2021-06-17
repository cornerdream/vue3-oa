<!-- -->
<template>
  <div class="product">
    
    <div v-for="item in title" :key="item" class="product-wrap">
      <div class="productTitle">
        <img :src="item.img" alt="">
        <span class="title">{{item.title}}</span>
      </div>
      <el-col 
      :xs="8" 
      :sm="8" 
      :md="6" 
      :lg="6" 
      :xl="4"
      
      v-for="o in productList"
      :key="o"
      :id="o.id"
      >
      <!-- <div class="product-box"> -->
        <div class="grid-content" >
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
      <!-- </div>   -->
      </el-col>
    </div>
    
  </div>
</template>

<script>
import defaultImg from '@/assets/images/mouse.png'
import titleImg1 from '@/assets/images/home-logo1.png'
import titleImg2 from '@/assets/images/home-logo2.png'
import { getProductList } from '@/api/product'
export default {
  name: 'product',
  data() {
    return {
      title:[
        {
          title:'热销产品',
          img:titleImg1
        },
         {
          title:'促销产品',
          img:titleImg2
        }
      ],
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
    onClick(id) {
      this.$router.push({ name: 'productDetail', query: { id } })
    }
  }
}
</script>
<style lang="scss" scoped>
.product {
  padding: 0 10rem 5rem 10rem;
  display: flex;
  flex-direction: column;
}
.product-wrap{
  margin-bottom:2rem;
}
.product .productTitle {
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
}
.title{
  font-size: 1.6rem;
  margin-left:1.5rem
}
.product-box{
  display: flex;
  justify-content: space-between;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.grid-content {
  width:25rem;
  // height: 22rem;
  border-radius: 6px;
  margin:0 2rem 3rem 0 ;
  text-align: center;
}
.el-card__body, .el-main {
  padding: 3rem;
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

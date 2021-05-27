<!-- -->
<template>
  <div class="detail">
    <div class="clearfix">
      <!-- <productBig/> -->
      <!-- <productDetail/> -->
    </div>
    <productDetail :productInfo="productInfo" :productParam="productParam" :images="images" @initDetail="loadProductDetail"/>
    <div class="tabBox">
      <el-tabs v-model="activeName" type="card" >
        <el-tab-pane label="商品详情" name="first">
          <div class="descript" >
            
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="second">
          <div class="param" >
           
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品评论" name="third">商品评论</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import productBig from './components/product-big.vue'
import productDetail from './components/product-detail.vue'
import { getProductDetail} from '../../../../../api/product'
import $ from 'jquery'
export default {
  name: 'detail',
  components: {
    productBig,
    productDetail
  },
  data() {
    return {
      activeName: 'first',
      id:this.$route.query.id,
      productInfo: {
        id: -1,
        name: '',
        price: '',
        default_image_url: ''
      },
      productParam: [],
      descript:'',
      param:'',
      images:[]
    }
  },
  watch:{
    descript(){
      this.$nextTick(()=>{        
        $('.descript').html(this.descript);
        $('.param').html(this.param);
        const src =  $('.descript').find('img').attr('src')
        console.log(src)
        $('.descript').find('img').attr('src','http://192.168.1.218:8000'+src);
    })
    }
  },
  created() {
    this.loadProductDetail(this.id);
  },
  mounted() {
   
  },
  methods:{
    async loadProductDetail(cData) {
      const { data } = await getProductDetail(cData);
      this.productInfo = data.data.sku;
      this.descript = data.data.sku.desc_detail;
      this.param = data.data.sku.desc_pack;
      this.images = data.data.sku.images;
      this.productParam = data.data.specs;
    }
  }
}
</script>
<style scoped>
</style>

<!-- -->
<template>
  <div class="detail">
    <div class="clearfix">
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

<script>
import productDetail from './components/product-detail.vue'
import { getProductDetail} from '@/api/product'
import $ from 'jquery'
export default {
  name: 'detail',
  components: {
    productDetail
  },
  inject:['$url'],
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

  },
  created() {
  },
  mounted() {
    this.loadProductDetail(this.id);
  },
  methods:{
    async loadProductDetail(cData) {
      const { data } = await getProductDetail(cData);
      this.productInfo =data.data.sku;
      this.descript = data.data.sku.desc_detail;
      this.param = data.data.sku.desc_pack;
      this.images = data.data.sku.images;
      this.productParam = data.data.specs;
      console.log(data.data,'data.daat',this.productInfo)
      this.loadhtml()
    },
    loadhtml(){
      console.log('jinlai')
      $('.el-tabs__content').show()
      $('.descript').html('');        
      $('.param').html('');   
      $('.descript').html(this.descript);
      $('.param').html(this.param);
      console.log(this.$url)
      const srcdescript =  $('.descript').find('img').attr('src') || $('.descript').find('a').attr('href');
       if(srcdescript && !srcdescript.includes('https')){
        console.log('meyouhttp','跳转')
        $('.descript').find('img').attr('src',this.$url+srcdescript);
        $('.descript').find('a').attr('href',this.$url+srcdescript);
      }
      console.log(this.$url+srcdescript,'this.$url+srcdescriptthis.$url+srcdescriptthis.$url+srcdescript')
      // srcdescript?(srcdescript.includes('http')?null:$('.descript').find('img').attr('src',this.$url+srcdescript)|| $('.descript').find('a').attr('href',this.$url+srcdescript)) :null;
      const srcparam =  $('.param').find('img').attr('src') || $('.param').find('a').attr('href');
     
      if(srcparam && !srcparam.includes('http')){
        console.log('meyouhttp','跳转')
        $('.param').find('img').attr('src',this.$url+srcparam);
        $('.param').find('a').attr('href',this.$url+srcparam)
      }
    }
  }
}
</script>
<style >
.tabBox{
  margin-top: 7rem;
}
.tabBox > .el-tabs--card>.el-tabs__header {
  border-bottom: 1px solid #0D2140;
 
}
.tabBox > .el-tabs--card>.el-tabs__header .el-tabs__nav {
  border: 1px solid #0D2140;
  background: #0D2140;
  
}
.tabBox > .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    border-bottom-color: #0D2140;
}
.tabBox .el-tabs__item {
  color: #fff;
}
.tabBox  .el-tabs__item.is-active {
    color: #409EFF;
}
</style>

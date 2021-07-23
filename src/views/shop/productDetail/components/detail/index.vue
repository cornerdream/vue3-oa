<!-- -->
<template>
  <div class="detail">
    <div class="clearfix"></div>
    <productDetail
      :productInfo="productInfo"
      :productParam="productParam"
      :images="images"
      @initDetail="loadProductDetail"
    />
    <div id="box">
      <!--点击设置msg的值  如果msg等于0，第一个a添加cur类名，如果msg等于1，第二个a添加cur类名，以此类推。
            添加了cur类名，a就会改变样式 @click,:class ,v-show这三个是vue常用的指令或添加事件的方式-->
      <div class="tab-tit">
        <p href="javascript:;" @click="msg = 0" :class="{ cur: msg === 0 }">商品详情</p>
        <p href="javascript:;" @click="msg = 1" :class="{ cur: msg === 1 }">内部数据</p>
        <!-- <p href="javascript:;" @click="msg = 2" :class="{ cur: msg === 2 }">商品评论</p> -->
      </div>
      <!--根据msg的值显示div,如果msg等于0，第一个div显示，其它三个div不显示。
                如果msg等于1，第二个div显示，其它三个div不显示。以此类推-->
      <div class="tab-con">
        <div v-show="msg === 0" class="descript"></div>
        <div v-show="msg === 1" class="param"></div>
        <!-- <div v-show="msg === 2">商品评论</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import productDetail from './components/product-detail.vue'
import { getProductDetail } from '@/api/product'
import $ from 'jquery'
export default {
  name: 'detail',
  components: {
    productDetail
  },
  inject: ['$url'],
  data() {
    return {
      activeName: 'first',
      id: this.$route.query.id,
      productInfo: {
        id: -1,
        name: '',
        price: '',
        default_image_url: ''
      },
      productParam: [],
      descript: '',
      param: '',
      images: [],
      msg: 0
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.loadProductDetail(this.id)
  },
  methods: {
    async loadProductDetail(cData) {
      const { data } = await getProductDetail(cData)
      this.productInfo = data.data.sku
      this.descript = data.data.sku.desc_detail
      this.param = data.data.sku.desc_pack
      this.images = data.data.sku.images
      this.productParam = data.data.specs
      this.loadhtml()
    },
    loadhtml() {
      $(document).off()
      $('.el-tabs__content').show()
      $('.descript').html('')
      $('.param').html('')
      $('.descript').html(this.descript)
      $('.param').html(this.param)
      const srcdescript = $('.descript').find('a')||$('.descript').find('img')
        for (let i = 0; i < srcdescript.length; i++) {
          let a = srcdescript.eq(i).attr('href')
            if (!a.includes('https')) {
              srcdescript.eq(i).attr('href',this.$url+a)
              srcdescript.eq(i).attr('src',this.$url+a)
            }
        }
        const list = $('.param').find('img')||$('.param').find('a')
         for (let i = 0; i < list.length; i++) {
          let b = list.eq(i).attr('src')
            if (!b.includes('https')) {
              list.eq(i).attr('src',this.$url+b)
              list.eq(i).attr('href',this.$url+b)
            }
        }
      // const srcdescript =
      //   $('.descript').find('img').attr('src') || $('.descript').find('a').attr('href')
      // const url1 = $('.descript').find('.o_image').eq(0).attr('href')
      // const url2 = $('.descript').find('.o_image').eq(1).attr('href')
      // $('.descript').find('img').attr('src', srcdescript)
      // $('.descript')
      //   .find('.o_image')
      //   .eq(0)
      //   .attr('href', this.$url + url1)
      // $('.descript')
      //   .find('.o_image')
      //   .eq(1)
      //   .attr('href', this.$url + url2)
      // const srcparam = $('.param').find('img').attr('src') || $('.param').find('a').attr('href')
      // $('.param').find('img').attr('src', srcparam)
      // const url3 = $('.param').find('.o_image').eq(0).attr('href')
      // const url4 = $('.param').find('.o_image').eq(1).attr('href')
      // $('.param')
      //   .find('.o_image')
      //   .eq(0)
      //   .attr('href', this.$url + url3)
      // $('.param')
      //   .find('.o_image')
      //   .eq(1)
      //   .attr('href', this.$url + url4)
    }
  }
}
</script>
<style scoped>
.descript a {
  color: #409eff;
}
#box {
  margin-top: 7rem;
}
.tab-tit {
  font-size: 0;
  width: 600px;
}
.tab-tit p {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  width: 25%;
  font-size: 18px;
  text-align: center;
  background: #0d2140;
  color: #fff;
  text-decoration: none;
}
.tab-tit .cur {
  color: #09f;
}
.tab-con {
}
.tab-con div {
  margin: 0 10px;
  padding-top: 20px;
  min-height: 400px;
}
.o_image {
  width: 100px;
  height: 100px;
  background: #000;
}
</style>
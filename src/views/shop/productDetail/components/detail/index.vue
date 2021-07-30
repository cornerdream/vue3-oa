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
        <p href="javascript:;" @click="msg = 2" :class="{ cur: msg === 2 }">商品评价</p>
      </div>
      <!--根据msg的值显示div,如果msg等于0，第一个div显示，其它三个div不显示。
                如果msg等于1，第二个div显示，其它三个div不显示。以此类推-->
      <div class="tab-con">
        <div v-show="msg === 0" class="descript"></div>
        <div v-show="msg === 1" class="param"></div>
        <div v-show="msg === 2">
          <div class="evaluate" v-for="(item, index) in evaluate" :key="index">
            <div class="left">
              <div class="left-cont">
                <img class="border-img" :src="`${$url}` + item.create_uid.image" :alt="name" />{{item.create_uid.name}}
              </div>
            </div>
            <div class="right">
              <star :score="item.product_evaluate"></star>
              <p class="evaluate_text"></p>
              <p>{{ item.create_time }}</p>
            </div>
          </div>
          <Pagenation
            class="pagenation"
            :total="total"
            @pageChange="pageChange"
            :page_index="page"
            v-if="total != []"
          ></Pagenation>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productDetail from './components/product-detail.vue'
import { getProductDetail, getevaluate } from '@/api/product'
import $ from 'jquery'
import star from '@/components/star.vue'
import Pagenation from '@/components/pageNations.vue'
import { formatName } from '@/utils/index'
export default {
  name: 'detail',
  components: {
    productDetail,
    star,
    Pagenation
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
      msg: 0,
      total: '',
      page: 1,
      size: 12,
      evaluate: [],
      texts: '',
      name: ''
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.loadProductDetail(this.id)
    let obj = {
      sku: this.id,
      page: this.page,
      size: this.size
    }
    this.evaluates(obj)
    this.loadhtml()
  },
  methods: {
    pageChange(item) {
      this.page = item.page_index
      this.size = item.page_limit
      let obj = {
        page: this.page,
        size: this.size
      }
      this.evaluates(obj)
    },
    async loadProductDetail(cData) {
      const { data } = await getProductDetail(cData)
      this.productInfo = data.data.sku
      this.descript = data.data.sku.desc_detail
      this.param = data.data.sku.desc_pack
      this.images = data.data.sku.images
      this.productParam = data.data.specs
      this.loadhtml()
    },
    evaluates(obj) {
      getevaluate(obj).then((res) => {
        this.evaluate = res.data.data.result
        for (let i in this.evaluate) {
          this.texts = this.evaluate[i].evaluate_text
          // this.name = formatName(this.evaluate[i].create_uid.name)  脱敏显示
        }
        this.total = res.data.data.count
        this.loadhtml()
      })
    },
    loadhtml() {
      $(document).off()
      $('.el-tabs__content').show()
      $('.descript').html('')
      $('.param').html('')
      $('.evaluate_text').html('')
      $('.descript').html(this.descript)
      $('.param').html(this.param)
      $('.evaluate_text').html(this.texts)

      const srcdescript = $('.descript').find('a') || $('.descript').find('img')
      for (let i = 0; i < srcdescript.length; i++) {
        let a = srcdescript.eq(i).attr('href')
        if (a != undefined) {
          if (!a.includes('http') && !a.includes('https')) {
            srcdescript.eq(i).attr('href', this.$url + a)
            srcdescript.eq(i).attr('src', this.$url + a)
          }
        }
      }
      const evals = $('.evaluate_text').find('img')
      for (let i = 0; i < evals.length; i++) {
        let b = evals.eq(i).attr('src')
        if (!b.includes('http') && !b.includes('https')) {
          evals.eq(i).attr('src', this.$url + b)
        }
      }
      const list = $('.param').find('img') || $('.param').find('a')
      for (let i = 0; i < list.length; i++) {
        let b = list.eq(i).attr('src')
        if (!b.includes('http') && !b.includes('https')) {
          list.eq(i).attr('src', this.$url + b)
          list.eq(i).attr('href', this.$url + b)
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
.tab-con div {
  margin: 0 10px 10px 0;
  padding-top: 20px;
}
.o_image {
  width: 100px;
  height: 100px;
  background: #000;
}
.evaluate {
  display: flex;
  border-bottom: 1px solid #ddd;
}
.border-img {
  border-radius: 50%;
  width: 30px;
  margin-right: 10px;
}
.right {
  text-align: left;
}
.left-cont {
  display: flex;
  align-items: center;
  justify-items: center;
}
.pagenation {
  text-align: right;
}
</style>
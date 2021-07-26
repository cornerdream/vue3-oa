<!-- -->
<template>
  <div class="product">
    <div class="search-keywords">
      <p class="keywords">
        <strong> 关键词：</strong>
      </p>

      <ul id="type">
        <li class="typeli" v-for="(item, index) in checkList" :key="index">
          <span class="type-key"
            ><strong>{{ item.name }}</strong></span
          >
          <ul class="type-value">
            <li
              class="valueli"
              v-for="(items, index) in item.lines"
              :key="index"
              @click="handelCheck(items,items.id)"
            >
              <el-checkbox-group v-model="items.checked" >
                <el-checkbox :label="items.id" >{{ items.name }}</el-checkbox>
              </el-checkbox-group>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div v-for="item in title" :key="item" class="product-wrap">
      <div class="productTitle">
        <img :src="item.img" alt="" />
        <span class="title">{{ item.title }}</span>
      </div>
       <ul class="box-ul">
        <li class="box-li" v-for="o in productList" :key="o" :id="o.id" @click="onClick(o.id)">
          <div class="box-img">
            <img v-if="!o.default_image_url" :src="defaultImage" />
            <img v-else :src="`${$url}` + o.default_image_url" />
          </div>
          <p class="productResult">
            <span>{{ o.name }}</span> <span>{{ '¥' + o.price }}</span>
          </p>
        </li>
      </ul>
    </div>
      <Pagenation
      class="pagenation"
      :total="total"
      @pageChange="pageChange"
      :page_index="page"
      v-if="total != []"
    ></Pagenation>
  </div>
</template>

<script>
// import $ from 'jquery'
import defaultImg from '@/assets/images/mouse.png'
import titleImg1 from '@/assets/images/home-logo1.png'
import titleImg2 from '@/assets/images/home-logo2.png'
import { getProductList } from '@/api/product'
import authImgs from '@/components/img.vue'
import { keyword } from '../../../../api/search'
import Pagenation from '@/components/pageNations.vue'
import { toRaw } from '@vue/reactivity'
export default {
  components: { authImgs,Pagenation },
  name: 'product',
  inject: ['$url'],
  data() {
    return {
      title: [
        {
          title: '热销产品',
          img: titleImg1
        },
        // {
        //   title: '促销产品',
        //   img: titleImg2
        // }
      ],
      defaultImage: defaultImg,
      productList: [],
      checkList: [],
      query:[],
      page:1,
      size:12,
      total: ''
    }
  },

  created() {
       this.query.push({
      page: this.page,
      size: this.size
    })
    this.loadProductList(this.query)
    this.getList()
  },
  mounted() {
    this.$nextTick(() => {})
  },
  methods: {
     pageChange(item) {
      this.page = item.page_index
      this.size = item.page_limit
      this.query.push({
      page: this.page,
      size: this.size
    })
      this.loadProductList( this.query)
    },
    loadProductList(obj){
       getProductList(obj).then((res)=>{
         this.productList = res.data.data.results
         this.total = res.data.data.count
       })
    },
    onClick(id) {
      this.$router.push({ name: 'productDetail', query: { id } })
    },
    handelCheck(val,id) {
      val.checked =!val.checked
      if(val.checked ==true){
           const oItem = this.query.find((item)=>{
             return item['key']
           })
           if(oItem){
            oItem['key'] +=','+id
           }else {
             let o = {key:id,page: this.page, size: this.size}
             this.query.push(o)
           }
      }else {
        let oItem = this.query.find((item) => {
        return item['key']
      })
       const option = oItem['key']
        const str = String(option).indexOf(',')
        if(str>=0){
          let optionArr = option.split(',')
          let newArr = optionArr.filter((item) => item !=id)
          console.log(newArr)
          let newOption
          if (newArr.length == 1) {
            newOption = newArr.toString()
          } else {
            newOption = newArr.join(',')
          }
          oItem['key'] = newOption
        }else {
          this.query.splice(this.query.indexOf(oItem), 1)
        }
     
      }
      this.loadProductList(this.query)
    },
    getList() {
      keyword().then((res) => {
        let list = res.data.data
          list.map((items) => {
            let allTags = items.lines
           
            allTags.map((item) => {
              item.checked = false
              return item
            })
            this.checkList = list
            console.log(this.checkList, 'this.checkList')
          })
      })
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
.product-wrap {
  margin-bottom: 2rem;
}
.product .productTitle {
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
}
.title {
  font-size: 1.6rem;
  margin-left: 1.5rem;
}
.product-box {
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
  width: 25rem;
  // height: 22rem;
  height: 260px;
  border-radius: 6px;
  margin: 0 2rem 3rem 0;
  text-align: center;
}
.el-card__body,
.el-main {
  padding: 3rem;
}
.product .image {
  // height: 260px;
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
#section .el-breadcrumb {
  display: flex;
  align-items: center;
}
#section .el-breadcrumb__inner {
  color: #0d2140;
}
#section .el-breadcrumb__item {
  display: flex;
  align-items: center;
}
#type {
  width: 1400px;
  background: #fff;
  margin: 2rem 0 5rem 0;
  border-radius: 10px;
  box-shadow: 2px 2px 5px #0d2140;
}

#type .typeli {
  display: flex;
  border-bottom: 1px solid #0d2140;
  &:last-child {
    border-bottom: 0;
  }
}
#type .typeli:nth-of-type(odd) ul {
  background: #fff;
}
#type .typeli:nth-of-type(even) ul {
  background: #b6bdc9;
}
#type .typeli:first-of-type .type-key {
  border-radius: 10px 0 0 0;
}
#type .typeli:last-of-type .type-key {
  border-radius: 0 0 0 10px;
}
#type .typeli:first-of-type .type-value {
  border-radius: 0 10px 0 0;
}
#type .typeli:last-of-type .type-value {
  border-radius: 0 0 10px 0;
}
.type-key {
  float: left;
  width: 60px;
  white-space: nowrap;
  overflow: hidden;
  background: #0d2140;
  text-align: center;
  color: #fff;
  flex: 0 0 12rem;
  line-height: 5rem;
}
.type-value {
  flex: 1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  zoom: 1;
  background: #fff;
}
.type-value .valueli {
  padding: 0.8rem 1.2rem;
  margin: 1rem;
}
.type-value .valueli a {
  color: #0d2140;
  width: 10rem;
  height: 3rem;
}
.type-value .valueli a > img {
  width: 100%;
  height: 100%;
}
.type-value .logoLi {
  border: 1px solid #0d2140;
  border-radius: 10px;
  text-align: center;
  width: 11rem;
  height: 3rem;
  padding: 0.4rem 1rem;
}
.type-value .logoLi a i {
  display: none;
}
.type-value .logoLi:hover {
  border: 1px solid #ef7854;
}
.type-value .logoLi:hover a i {
  display: block;
}
.type-value .logoLi:hover a img {
  display: none;
}
.logoLi a {
  width: 10rem;
  height: 3rem;
  line-height: 1.5rem;
}
.search-keywords {
  margin-top: -30px;
}
.box-ul {
  width: 1600px;
  flex-wrap: wrap;
  justify-content: space-around;
}
.box-li {
  height: 320px;
  float: left;
  margin: 10px;
  background: #fff;
  position: relative;
}
.box-img {
  width: 200px;
  padding: 10px;
}
.box-img > img {
  width: 100%;
  height: 100%;
}
.box-li > p {
  margin: 5px;
}
.productResult {
  position: absolute;
  bottom: 0;
  text-align: left;
}
.productResult > span {
  display: block;
}
</style>

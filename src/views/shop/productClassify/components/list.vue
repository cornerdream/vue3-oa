<template>
  <div class="list">
    <section id="section">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="(item, index) in productTag"
          :key="item"
          @click.native="onBread(item.id)"
        >
          <span class="productTitle" v-if="index == 0">
            <span class="img"><img :src="classifyImg" alt="" /></span>
            <span class="title">{{ item.name }}</span>
          </span>
          <span class="title" v-else>{{ item.name }}</span>
        </el-breadcrumb-item>
        <nav id="choose" v-if="tagShow">
          <el-tag
            :key="tag"
            v-for="tag in productNav"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag.name }}
          </el-tag>
        </nav>
      </el-breadcrumb>
      <ul id="type" v-if="listShow">
        <li v-for="item in productFilter" :key="item" class="typeli">
          <span class="type-key"
            ><strong>{{ item.name }}：</strong></span
          >
          <ul class="type-value">
            <li
              class="valueli"
              v-for="o in item.options"
              :key="o"
              :class="{ logoLi: item.params == 'brand' }"
              @click="onAddItem(o.name, item.params, o.id)"
            >
              <a href="javascript:;">
                <img :src="o.logo" alt="" v-if="o.logo" />
                <i>{{ o.name }}</i>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <section class="container" v-if="listShow">
      <el-col :xs="8" :sm="8" :md="6" :lg="6" :xl="4" v-for="o in productList" :key="o" :id="o.id">
        <div class="grid-content">
          <el-card @click="onClick(o.id)">
            <div class="image-box">
              <img v-if="!o.default_image_url" :src="defaultImage" class="image" />
              <img v-else :src="`http://192.168.1.212:8000` + o.default_image_url" class="image" />
            </div>

            <div class="productResult">
              <p class="card-title">{{ o.name }}</p>
              <div class="bottom">
                <p class="price">{{ '¥' + o.price }}</p>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </section>
    <section class="result" v-else>
      <el-result title="404" subTitle="抱歉，请求没有数据">
        <template #icon>
          <el-image :src="defaultImage" class="result-image"></el-image>
        </template>
        <template #extra>
          <el-button type="primary" size="medium" @click="onBack">返回</el-button>
        </template>
      </el-result>
    </section>
  </div>
</template>

<script>
import defaultImg from '@/assets/images/mouse.png'
import classifyImg from '@/assets/images/detail-logo.png'
export default {
  name: 'list',
  props: ['productTag', 'productNav', 'productFilter', 'productList'],
  data() {
    return {
      classifyImg: classifyImg,
      tagShow: false,
      listShow: true,
      defaultImage: defaultImg,
      dynamicTags: this.productNav,
      tagData: this.productTag,
      filterData: this.productFilter,
      listData: this.productList,
      query: [
        {
          category_id: this.$route.query.id
        }
      ]
    }
  },
  watch: {
    productList(newVal, oldVal) {
      if (newVal.length == 0) {
        this.listShow = false
      } else {
        this.listShow = true
      }
    },
    $route(to, from) {
      this.query = [{ category_id: to.query.id }]
    }
  },
  created() {},
  mounted() {},

  methods: {
    onBread(id) {
      console.log({ name: 'productClassify', query: { id } })
      this.$router.push({ name: 'productClassify', query: { id } })
      this.query[0]['category_id'] = id
      this.$emit('initProductTag', this.query)
    },
    handleClose(tag) {
      console.log(tag)
      console.log(this.query)
      let oItem = this.query.find((item) => {
        return item[tag.params]
      })
      console.log(oItem)
      if (tag.params == 'option') {
        const option = oItem[tag.params]
        console.log(option)
        const str = String(option).indexOf(',')
        console.log(str)
        if (str >= 0) {
          let optionArr = option.split(',')
          console.log(optionArr)
          let newArr = optionArr.filter((item) => item != tag.id)
          console.log(newArr)
          let newOption
          if (newArr.length == 1) {
            newOption = newArr.toString()
          } else {
            newOption = newArr.join(',')
          }
          console.log(newOption)
          oItem[tag.params] = newOption
          console.log(this.query)
        } else {
          this.query.splice(this.query.indexOf(oItem), 1)
        }
      } else {
        this.query.splice(this.query.indexOf(oItem), 1)
      }
      console.log(this.query)
      this.$emit('initProductTag', this.query)
      if (this.query.length == 1) {
        this.tagShow = false
      }
    },

    onAddItem(tag, params, id) {
      this.tagShow = true

      if (params == 'brand') {
        this.query.push({
          brand: id
        })
      } else {
        const oItem = this.query.find((item) => {
          return item['option']
        })
        console.log(oItem)
        if (oItem) {
          oItem['option'] += ',' + id
        } else {
          let o = { option: id }
          this.query.push(o)
        }
      }
      console.log(this.query)
      this.$emit('initProductTag', this.query)
    },
    onClick(id) {
      this.$router.push({ name: 'productDetail', query: { classifyId: this.$route.query.id, id } })
    },
    onBack() {
      this.$router.back()
    }
  }
}
</script>
<style lang="scss" scoped>
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

.productTitle {
  display: flex;
  align-items: center;
}
.productTitle .img {
  width: 2.8rem;
  height: 3.5rem;
}
.title {
  padding: 0 1.5rem;
  font-size: 3rem;
  color: #0d2140;
}
.list {
  padding: 20px;
}
.list img {
  width: 100%;
  height: 100%;
}
#section .el-breadcrumb {
  line-height: 34px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.el-divider--horizontal {
  margin: 6px 0;
}
#type {
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
  width: 100px;
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  background: #0d2140;
  text-align: center;
  color: #fff;
  flex: 0 0 18rem;
  // height: 5rem;
  line-height: 5rem;
}

.type-value {
  flex: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
  zoom: 1;
  background: #fff;
}

.type-value .valueli {
  padding: 0.8rem 1.2rem;
  margin: 0 5rem;
}
.type-value .valueli a {
  color: #0d2140;
  width: 10rem;
  height: 3rem;
}
.type-value .logoLi {
  border: 1px solid #0d2140;
  border-radius: 10px;
  text-align: center;
  width: 10rem;
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
  line-height: 3rem;
}
.logoLi a img {
  vertical-align: top;
}
.navbar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.nav-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-item-name {
  padding: 10px;
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
.grid-content .el-card .image-box {
  width: 100%;
  height: 100%;
}
.grid-content .el-card .image {
  width: 100%;
  height: 100%;
}
.grid-content .el-card .card-title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.result {
  max-height: 500px;
  max-width: 500px;
  margin: 0 auto;
}
</style>

<template>
  <div class="list">
    <section id="search"></section>
    <section id="section">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item, index) in productTag" :key="item">
          <span v-if="index == 0">{{ item }}</span>
          <span v-else style="margin-left: 10px">{{ '"' + item + '"' }}</span>
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
      <el-divider></el-divider>
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
                <img :src="`${$url}` + o.logo" alt="" v-if="o.logo" />
                <i>{{ o.name }}</i>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <div class="list-box" v-if="listShow">
      <ul class="box-ul">
        <li class="box-li" v-for="o in productList" :key="o" :id="o.id" @click="onClick(o.id)">
          <div class="box-img">
            <img v-if="!o.default_image_url" :src="defaultImage" />
            <img v-else :src="`${$url}` + o.default_image_url" />
          </div>
          <p class="productResult">
            <span>{{ o.name }}</span>
            <!-- <span>{{ '¥' + o.price }}</span> -->
          </p>
        </li>
      </ul>
      <Pagenation
        :total="total"
        @pageChange="pageChange"
        :page_index="page"
        v-if="total != []"
      ></Pagenation>
    </div>
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
import Pagenation from '@/components/pageNations.vue'
export default {
  name: 'list',
  props: ['productTag', 'productNav', 'productFilter', 'productList', 'total'],
  inject: ['$url'],
  components: { Pagenation },
  data() {
    return {
      tagShow: false,
      listShow: true,
      defaultImage: defaultImg,
      dynamicTags: this.productNav,
      tagData: this.productTag,
      filterData: this.productFilter,
      listData: this.productList,
      query: [
        {
          text: this.$route.query.text
        }
      ],
      page: '1',
      size: '12'
    }
  },
  watch: {
    productList(newVal, oldVal) {
      if (newVal.length == 0) {
        this.listShow = false
      } else {
        this.listShow = true
      }
    }
  },
  created() {},
  mounted() {},

  methods: {
    pageChange(item) {
      this.page = item.page_index
      this.size = item.page_limit
      this.query.push({
        page: this.page,
        size: this.size
      })
      this.$emit('initProductTag', this.query)
    },
    onBread(id) {
      this.$router.push({ name: 'productClassify', query: { id } })
      this.query[0]['category_id'] = id
      this.$emit('initProductTag', this.query)
    },
    handleClose(tag) {
      let oItem = this.query.find((item) => {
        return item[tag.params]
      })
      if (tag.params == 'option') {
        const option = oItem[tag.params]
        const str = String(option).indexOf(',')
        if (str >= 0) {
          let optionArr = option.split(',')
          let newArr = optionArr.filter((item) => item != tag.id)
          let newOption
          if (newArr.length == 1) {
            newOption = newArr.toString()
          } else {
            newOption = newArr.join(',')
          }
          oItem[tag.params] = newOption
        } else {
          this.query.splice(this.query.indexOf(oItem), 1)
        }
      } else {
        this.query.splice(this.query.indexOf(oItem), 1)
      }
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
        if (oItem) {
          oItem['option'] += ',' + id
        } else {
          let o = { option: id }
          this.query.push(o)
        }
      }
      this.$emit('initProductTag', this.query)
    },
    onClick(id) {
      this.$router.push({ name: 'productDetail', query: { id } })
    },
    onBack() {
      this.$router.back()
    }
  }
}
</script>
<style lang="scss" scoped>
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
  line-height: 1.5rem;
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
.result {
  max-width: 500px;
  margin: 0 auto;
}
.list-box {
  position: relative;
}
.box-ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  text-align: left;
}
.box-li {
  width: 14%;
  height: 14rem;
  margin: 10px;
  background: #fff;
  position: relative;
  border: 1px solid #dadada;
}
.box-img > img {
  width: 100%;
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
.pagenation {
  float: left;
  width: 100%;
  height: 50px;
  text-align: right;
  margin-top: 10px;
}
</style>

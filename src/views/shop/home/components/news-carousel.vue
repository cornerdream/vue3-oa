<!-- -->
<template>
  <div class="news-carousel">
    <div class="news-home">
      <div class="news-home-left">
        <p class="news-home-left-top">欢迎</p>
        <p class="news-home-left-center">来到 Yiconmed 商城</p>
        <div class="search">
          <el-input
            placeholder=""
            v-model="filterParams.text"
            @change="onSearch"
            class="search-input"
          >
            <template #append>
              <el-button icon="el-icon-search" class="search-button"></el-button>
            </template>
          </el-input>
        </div>
      </div>
    </div>
    <div class="carousel">
      <img :src="homeLogo" alt="" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { keyword } from '../../../../api/search'
import img1 from '@/assets/images/home-logo.png'
export default {
  name: 'news-carousel',
  data() {
    return {
      tabPosition: 'left',
      filterParams: {
        text: ''
      },
      list: [],
      num: 0,
      homeLogo: img1
    }
  },
  computed: {
    ...mapGetters(['options'])
  },
  created() {},
  mounted() {
    this.$nextTick(() => {})
    keyword().then((res) => {
      this.list = res.data.data
})
  },
  methods: {
    onSearch() {
      this.$router.push({ name: 'search', query: { text: this.filterParams.text } })
    }
  }
}
</script>
<style scoped>
.news-carousel {
  display: flex;
  padding-left: 10rem;
}
.news-home {
  flex: 1;
  color: #0d2140;
}
.news-home-left-top {
  /* margin: 9rem 0 5rem 0; */
  font-size: 10rem;
}
.news-home-left-center {
  font-size: 3rem;
}
.search {
  width: 100%;
  margin: 1rem 0;
}
.search-input {
  border: 2px solid #0d2140;
  border-radius: 6px;
}
.el-input-group__append button.el-button.search-button {
  background: #0d2140;
  color: #fff;
  border: none;
  border-radius: 0;
  margin-right: -21px;
}
.carousel {
  /* margin-top: 8px; */
  flex: 1;
}
.carousel img {
  border: none;
  height: 300px;
  /* width: 100%; */
}
</style>

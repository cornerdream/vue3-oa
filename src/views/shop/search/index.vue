<!-- -->
<template>
  <div class="search">
    
    <list
      :product-tag="tagData"
      :product-nav="navData"
      :product-filter="filterData"
      :product-list="listData"
      @initProductTag="loadProductTag"
    />
  </div>
</template>

<script>
import list from './components/list.vue'
import { searchProductTag, searchProductClassify } from '@/api/search'
import { toRaw } from '@vue/reactivity'
export default {
  name: 'search',
  components: {
    list
  },
  data() {
    return {
      filterParams:{
        text: this.$route.query.text,
      },
      tagData: [],
      navData:[],
      filterData: [],
      listData: [],
    }
  },
  watch: {},
  created() {
    this.loadProductTag(this.filterParams)
  },
  mounted() {},
  methods: {
    async loadProductTag(param) {
      console.log(param)
      param = toRaw(param)
       const {data} = await searchProductTag(param);
      this.tagData = data.data.category;
      this.navData = data.data.navigation;
      this.filterData = data.data.filter;
      const res = await searchProductClassify(param);
      console.log(res)
      this.listData =res.data.data.results;
    }
    
  }
}
</script>
<style scoped>
.search{
  padding:3rem 10rem;
}
</style>

<!-- -->
<template>
  <div class="productClassify">
    <!-- <tab /> -->

    <list :productTag="tagData" :productFilter="filterData" :productList="listData" @initProductTag="loadProductTag" @initProductList="loadProductClassify"/>
  </div>
</template>

<script lang="ts">
import tab from './components/tab.vue'
import list from './components/list.vue'
import { getProductTag,getProductClassify} from '../../../api/product'
export default {
  name: 'productClassify',
  components: {
    tab,
    list
  },
  data() {
    return {
      category_id: this.$route.query.id,
      tagData:[],
      filterData:[],
      listData:[]
     
    }
  },
  watch:{
    
  },
  created() {
    this.loadProductTag()
    this.loadProductClassify()
  },
  mounted() {},
  methods: {
    async loadProductTag() {
      const param = arguments.length==0?this.category_id:arguments;
      const { data } = await getProductTag(param);
      this.tagData = data.data.category;
      this.filterData = data.data.filter;
    },
    async loadProductClassify() {
      const param = arguments.length==0?this.category_id:arguments;
      const { data } = await getProductClassify(param)
      this.listData = data.data.results;
    }
  }
}
</script>
<style scoped></style>

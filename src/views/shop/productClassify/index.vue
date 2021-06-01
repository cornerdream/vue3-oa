<!-- -->
<template>
  <div class="productClassify">
    <!-- <tab /> -->

    <list
      :productTag="tagData"
      :productNav="navData"
      :productFilter="filterData"
      :productList="listData"
      @initProductTag="loadProductTag"
      @initProductList="loadProductClassify"
    />
  </div>
</template>

<script lang="ts">
import tab from './components/tab.vue'
import list from './components/list.vue'
import { getProductTag, getProductClassify } from '../../../api/product'
import { toRaw } from '@vue/reactivity'
export default {
  name: 'productClassify',
  components: {
    tab,
    list
  },
  data() {
    return {
      category_id: this.$route.query.id,
      tagData: [],
      navData:[],
      filterData: [],
      listData: [],
    }
  },
  watch: {},
  created() {
    this.loadProductTag()
    this.loadProductClassify()
  },
  mounted() {},
  methods: {
    async loadProductTag() {
      console.log(arguments);
      let argArr = toRaw(arguments[0]);
      console.log(argArr);
      let len;
      if(!argArr){
        len = 0;
      }else if(argArr.indexOf('option')){
        len = argArr.length;
      }else{
        len = 1
      }
      console.log(len);
      let param;
      switch(len){
        case 0:
          param = this.category_id;
          break;
        case 1:
          const arg = argArr[0];       
          const argId = arg['category_id'];
          param = argId;
          break;
        default:
          param = arguments
      }
      console.log(param);
      // let param = arguments.length == 0 ? this.category_id : arguments
      const { data } = await getProductTag(param);
      this.tagData = data.data.category;
      this.navData = data.data.navigation;
      this.filterData = data.data.filter;
    },
    async loadProductClassify() {
      console.log(arguments);
      const argArr = toRaw(arguments[0]);
      console.log(argArr);
      let len;
      if(!argArr){
        len = 0;       
      }else if(argArr.indexOf('option')){
        len = argArr.length;
      }else{
        len = 1
      }
      console.log(len);
      let param;
      switch(len){
        case 0:
          console.log(0);
          param = this.category_id;
          break;
        case 1:
          console.log(1);
           const arg = argArr[0];
          const argId = arg['category_id'];
          param = argId;
          break;
        default:
          console.log(2);
          param = arguments
      }
      console.log(param);
      // param = arguments.length == 0 ? this.category_id : arguments
      const { data } = await getProductClassify(param);
      this.listData = data.data.results;
    }
  }
}
</script>
<style scoped></style>

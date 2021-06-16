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
    />
  </div>
</template>

<script>
import list from './components/list.vue'
import { mapGetters } from 'vuex'
// import { getProductTag, getProductClassify } from '@/api/product'
import { toRaw } from '@vue/reactivity'
export default {
  name: 'productClassify',
  computed: {
    ...mapGetters(['tagData','navData','filterData','listData'])
  },
  components: {
    list
  },
  data() {
    return {
      category_id: this.$route.query.id,
      // tagData: [],
      // navData:[],
      // filterData: [],
      // listData: [],
    }
  },
  watch: {},
  created() {
    this.loadProductTag()
  },
  mounted() {
    this.$nextTick(()=>{
      // this.loadProductTag()
    })
  },
  methods: {
    async loadProductTag() {
      console.log('classify')
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
          param = this.$route.query.id;
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
      this.$store.dispatch('GetProductTag',param);
      this.$store.dispatch('GetProductClassify',param);
    }
    
  }
}
</script>
<style scoped>
.productClassify{
  padding:3rem 10rem;
}
</style>

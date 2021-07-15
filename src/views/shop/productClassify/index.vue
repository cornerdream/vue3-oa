<!-- -->
<template>
  <div class="productClassify">
    <list
      :productTag="tagData"
      :productNav="navData"
      :productFilter="filterData"
      :productList="listData"
      :total="total"
      @initProductTag="loadProductTag"
    />
  </div>
</template>

<script>
import list from './components/list.vue'
import { mapGetters } from 'vuex'
import { toRaw } from '@vue/reactivity'
export default {
  name: 'productClassify',
  computed: {
    ...mapGetters(['tagData', 'navData', 'filterData', 'listData'])
  },
  components: {
    list
  },
  data() {
    return {
      total: '',
      category_id: this.$route.query.id
    }
  },
  watch: {},
  created() {
    this.loadProductTag()
  },
  mounted() {
    this.$nextTick(() => {})
  },
  methods: {
    pageChange(item) {
      this.page = item.page_index
      this.size = item.page_limit
      // this.loadOrder() //改变页码，重新渲染页面
      this.loadProductTag()
      console.log(item)
    },
    async loadProductTag() {
      let argArr = toRaw(arguments[0])
      let len
      if (!argArr) {
        len = 0
      } else if (argArr.indexOf('option')) {
        len = argArr.length
      } else {
        len = 1
      }

      let param
      let obj
      switch (len) {
        case 0:
          param = this.$route.query.id
          break
        case 1:
          const arg = argArr[0]
          const argId = arg['category_id']
          param = argId
          break
        default:
          param = arguments
          console.log()
      }
      this.$store.dispatch('GetProductTag', param)
      this.$store.dispatch('GetProductClassify', param).then((res) => {
        this.total = res.data.data.count
      })
    }
  }
}
</script>
<style scoped>
.productClassify {
  padding: 3rem 10rem;
}
</style>

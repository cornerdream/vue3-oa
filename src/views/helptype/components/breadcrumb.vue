<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(list,index) in currentPath" :key="index">{{ list }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="listBox" v-html="listBox"></div>
  </div>
</template>  
<style>
</style>
<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'
export default {
  inject: ['$url'],
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['listMenu'])
  },
  props: ['currentPath', 'listBox'],
  mounted() {},
  methods: {
    loadhtml() {
      $(document).off()
      $('.el-tabs__content').show()
      $('.listBox').html('')
      $('.listBox').html(this.listBox)
      // const srcdescript =
      //   $('.listBox').find('img').attr('src') || $('.listBox').find('a').attr('href')
      // $('.descript').find('img').attr('src', this.$url+srcdescript)
      // const url1 = $('.listBox').find('.img-fluid').eq(0).attr('src')
      // //  $('.listBox').find('.img-fluid').eq(0).attr('src', this.$url + url1)
      //  let arr =  $('.listBox').find('.img-fluid')
      //  $.map(arr,function(index,value){
      //     $('.listBox').find('.img-fluid').index.attr('src', this.$url + url1)
      //  })
    }
  }
}
</script>
<style scoped>
.el-breadcrumb {
  background-color: #e9eef3;
  width: 100%;
  line-height: 50px;
  padding: 0 16px;
  border: 1px solid #efefef;
  box-sizing: border-box;
  box-shadow: 1px 2px 4px #ced4da;
  margin-bottom: 20px;
}
</style>
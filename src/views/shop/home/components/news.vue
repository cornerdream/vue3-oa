<!-- -->
<template>
  <div class="news-home">
    <div class="news-home-left">
      <p class="news-home-left-top">欢迎</p>
      <p class="news-home-left-center">来到 Yiconmed 商城</p>
      <div class="search">
        <el-input placeholder="" v-model="filterParams.text" @change="onSearch" class="search-input">
          <template #append>
            <el-button icon="el-icon-search" class="search-button"></el-button>
          </template>
        </el-input>
      </div>
      <div class="search-keywords">
        <p class="keywords">关键词：<span class="keywords-tab keywords-tab-active">肿瘤</span><span class="keywords-tab">免疫</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default {
  name: 'news',
  computed: {
    ...mapGetters(['options'])
  },
  data() {
    return {
      tabPosition: 'left',
      filterParams:{
        text: '',
      }
    }
  },
  created() {
  },
  mounted() {
    this.$nextTick(()=>{
 })
  },
  methods: {
    onSearch(){    
      this.$router.push({name:'search',query:{text:this.filterParams.text}})
    },
  }
}
</script>
<style scoped>
.news-home {
  color:#0D2140;
  flex: 0 0 60rem;
}
.news-home-left-top{
  margin:18rem 0 5rem 0;
  font-size: 10rem;
}
.news-home-left-center{
  font-size:3rem;
}
.search{
  margin:7rem 0 4rem 0;
}
.search-input{
  border:2px solid #0D2140;
  border-radius: 6px;
}
.el-input-group__append button.el-button.search-button{
  background: #0D2140;
  color: #fff;
  border: none;
  border-radius: 0;
  margin-right:-21px;
}
.search-keywords{
  font-size: 1.5rem;
}
.keywords-tab{
  border:1px solid #0D2140;
  padding:.2rem 1rem;
  border-radius: 5rem;
  margin: 0 3rem;
}
.keywords-tab-active{
  
  background: #0D2140;
  color: #fff;
}
/* .news-el-tabs {
  height: 100%;
}
.news .news-el-tabs .el-tabs__content {
  height: 100%;
  background-color: #409eff;
  text-align: left;
  color: #fff;
}
.item {
  padding: 0 20px;
  height: 40px; 
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 40px;
  font-size: 14px;
  font-weight: 500;
  position: relative;
  cursor: pointer;
} */
</style>

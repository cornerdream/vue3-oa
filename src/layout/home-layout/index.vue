<!-- -->
<template>
  <div class="layout">
     <div class="layout-menu">
          <app-menu/>
        </div>
    <el-container>

      <el-header style="height:101px"><app-header /></el-header>
      
      <el-main>
       
        <router-view :key="$route.name"/>
        </el-main>
      <el-footer style="height:auto;padding:0"><app-footer/></el-footer>
      <!-- <el-header height="auto"><app-header /></el-header>
      <el-main><router-view :key="$route.name"/></el-main> -->
    </el-container>
  </div>
</template>

<script>
import appHeader from './components/app-header.vue'
import appFooter from './components/app-footer.vue'
import appMenu from '@/components/menu/index.vue'
import $ from 'jquery'
export default {
  name: 'layout',
  components: { appHeader,appFooter,appMenu },
  data() {
    return {}
  },
  created() {},
  mounted() {
    this.$nextTick(()=>{
      const totalH = $(document).innerHeight();
      const divH = $('.layout-menu').height();
      $('.layout-menu').css('top',totalH/2-divH)
      $(document).on('scroll',function(){
        const scrollH = $(document).scrollTop();
        $('.layout-menu').css('top',(totalH/2+scrollH-divH))
      })
    })
  }
}
</script>
<style scoped>
.layout {
  min-height: 100vh;
  min-width: 980px;
  display: flex;
  flex-flow: row nowrap;
  position: relative;
}

.layout .el-header,
.layout .el-main {
  height: auto;
  padding: 0;
  position: relative;
}
.layout .el-main {
  flex-grow: 1;
  /* padding:0 20px; */
}
.layout-menu{
  position: absolute;
  left:0;
  top:300px;
  z-index: 8888;
}
</style>

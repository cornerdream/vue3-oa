<template>
  <div class="selectlist">
    <div class="list">
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="选择分类" name="categories"> <categories></categories> </el-tab-pane
      ><el-tab-pane label="基础信息" name="infortion">
        <infortion></infortion>
      </el-tab-pane>
      <el-tab-pane label="发布商品" name="release">
        <release></release>
      </el-tab-pane>
    </el-tabs> -->
    <div class="main-container" >
        <el-tabs v-model="currentView"  >
            <el-tab-pane label="选择分类" name="categories">
              <categories @func="handleClicks"></categories>
            </el-tab-pane>
            <el-tab-pane label="基础信息" name="infortion"> <infortion @funcs="handleClicks"></infortion></el-tab-pane>
            <el-tab-pane label="发布商品" name="release"> <release @func="handleClicks"></release></el-tab-pane>
        </el-tabs>
        <!--:is 的作用：会将div标签转换成 currentView 变量绑定的这个组件-->
        <div :is="currentView" keep-alive></div>
    </div>
    </div>


    <!-- <router-link to="/categories" >
        <span>选择分类</span>
      </router-link> 
      <router-link to="/infortion">
        <span>基础信息</span>
      </router-link> 
      <router-link to="/release">
        <span>发布商品</span>
      </router-link> 
      <router-view></router-view> -->
  </div>
</template>

<script>
import categories from './components/categories/categories.vue'
import infortion from './components/infortion/infortion.vue'
import release from './components/release/release.vue'
export default {
  name: 'selectlist',
  components: { categories, infortion, release },
  data() {
    return {
      activeName: 'categories',
      currentView: 'categories', //当前组件
    }
  },
  created() {
    console.log()
  },
  mounted() {},
  methods: {
    handleClicks(name) {
      console.log(name,'index')
      this.currentView = name
    }
  }
}
</script>

<style scoped>
.selectlist {
  /* margin: 20px; */
  background: #fff;
  color: #000;
}
.list{
  padding: 20px;
}
ul {
  display: flex;
  width: 240px;
  text-align: center;
}
li {
  width: 80px;
}

li.active {
  color: #409eff;
  transition: all 0.8s;
}
a {
  color: #000;
  width: 80px;
  height: 100px;
}
span {
  display: inline-block;
  width: 80px;
}
a.active {
  color: #409eff;
  transition: all 0.8s;
}
</style>

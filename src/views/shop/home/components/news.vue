<!-- -->
<template>
  <div class="news">
    <el-tabs :tab-position="tabPosition" ref="navTabs" class="news-el-tabs">
      <el-tab-pane v-for="item in options" :key="item">
        <template #label>
          <span v-for="o in item.channels" :key="o" @click="onClick(o.id)" style="padding:5px">{{o.name}}</span>         
        </template>
       
        <div class="transition-box" v-for="sub in item.sub_cats" :key="sub">
          <p  class="item" @click="onClick(sub.id)">
            {{sub.name}}
            <span v-if="sub.child">> <span v-for="c in sub.child" :key="c" @click="onClick(c.id)" style="padding:5px"> {{ c.name }}</span></span>
          </p>
        </div>
        
       
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import {mapGetters} from 'vuex'
export default {
  name: 'news',
  computed:{
    ...mapGetters(['options'])
  },
  data() {
    return {
      tabPosition: 'left',
    }
  },
  created() {
    this.loadProduct()
  },
  mounted() {
    
  },
  methods: {
    async loadProduct() {
      this.$store.dispatch('GetProductTree').then(() => {})
    },
    onClick(id) {
      this.$router.push({ name: 'productClassify', query: { id } })
    }
  }
}
</script>
<style scoped>
.news {
  flex: 0 0 900px;
}
.news-el-tabs {
  height: 100%;
}
.news-el-tabs .el-tabs__content {
  height: 100%;
  background-color: #409eff;
  text-align: left;
  color: #fff;
}
.news-el-tabs .item {
  padding: 0 20px;
  /* height: 40px; */
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  /* line-height: 40px; */
  /* font-size: 14px; */
  /* font-weight: 500; */
  position: relative;
  cursor: pointer;
}
</style>

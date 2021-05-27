<!-- -->
<template>
  <div class="news">
    <el-tabs :tab-position="tabPosition" ref="navTabs" class="news-el-tabs" @mouseover="tabHover(true)" @mouseout="tabHover(false)">
      <el-tab-pane v-for="item in options" :key="item">
        <template #label>
          <span v-for="o in item.channels" :key="o" @click="onClick(o.id)" style="padding: 5px">{{
            o.name
          }}</span>
        </template>

        <div class="transition-box" v-for="sub in item.sub_cats" :key="sub">
          <p class="item">
            <span @click="onClick(sub.id)">{{ sub.name }}</span>
            <span v-if="sub.child">
              >
              <span v-for="c in sub.child" :key="c" @click="onClick(c.id)" style="padding: 5px">
                {{ c.name }}</span>
              </span>
          </p>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default {
  name: 'news',
  computed: {
    ...mapGetters(['options'])
  },
  data() {
    return {
      tabPosition: 'left'
    }
  },
  created() {
    this.loadProduct()
  },
  mounted() {
    this.$nextTick(()=>{
      $('.el-tabs__content').hide();
      $('.news,.el-tabs').css({'flex':'0 0 190px'});
      
    })
  },
  methods: {
    tabHover(bool:Boolean){
      // console.log(e);
      if(bool){
        $('.el-tabs__content').show();
        $('.news,.el-tabs').css({'flex':'0 0 900px'});
        $('.el-tabs__item').on('mouseenter',function(){       
          const typeId = $(this).attr('id');
          const id = (typeId as String).split('-')[1];
          const paneId = 'pane-'+id;
          $('.el-tabs__active-bar').css({'transform': 'translateY('+Number(id)*40+'px)'});
          $('#'+paneId).show().siblings().hide();
        })
      }else{
        $('.el-tabs__content').hide();
        $('.news,.el-tabs').css({'flex':'0 0 190px'})
      }
      
    },
    async loadProduct() {
      (this as any).$store.dispatch('GetProductTree').then(() => {})
    },
    onClick(id:any) {
      this.$router.push({ name: 'productClassify', query: { id } })
    }
  }
}
</script>
<style lang="scss">
.news {
  flex: 0 0 900px;
}
.news-el-tabs {
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
}
</style>

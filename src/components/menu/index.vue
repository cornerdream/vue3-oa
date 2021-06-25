<template>
    <div class="menu">
        <button size="small" class="menu-button" >MENU</button>
        <div class="news">
            <el-tabs :tab-position="tabPosition" ref="navTabs" class="news-el-tabs"  @mouseover="tabHover(true)" @mouseout="tabHover(false)">
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
        
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import $ from 'jquery'
import { toRaw } from '@vue/reactivity'
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
      $('.news').hide();  
      $('.el-tabs__content').hide();
      $('.news,.el-tabs').css({'flex':'0 0 190px'});
      $('.menu-button').on('click',function(){
          $('.news').show();
          return false;
      })
      $(document).on('click',function(){
          $('.news').hide();
          return false
      })
    })
  },
  methods: {
    tabHover(bool){
      if(bool){    
        $('.el-tabs__content').show();
        $('.news,.el-tabs').css({'flex':'0 0 900px'});
        $('.el-tabs__item').on('mouseenter',function(){               
          const typeId = $(this).attr('id');      
          const id = typeId.split('-')[1];        
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
      this.$store.dispatch('GetProductTree').then(() => {})
    },
    onClick(id) {
      console.log({ name: 'productClassify', query: { id } });
      
      this.loadProductTag(id);
      this.$router.push({ name: 'productClassify', query: { id } })
      
    },
    async loadProductTag() {


      console.log(arguments);
      let argArr = toRaw(arguments[0]);
      console.log(argArr);
      let len;
      if(!isNaN(argArr)){
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
          param = argArr;
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
      this.$store.dispatch('GetProductClassify',param)
    }  
  }
}
</script>
<style >
.menus{
    display: flex;
}
.menu-button{
    width: 30px;  
    padding:12px 4px;
    margin: 0 auto;  
    line-height: 20px;  
    font-size: 20px; 
    word-wrap: break-word;
    border:none;
    border-radius: 0 6px 6px 0;
    box-shadow: 0 1px 3px 1px #000;
    background: #0D2140;
    color:#fff;
}
.news {
  z-index: 9999;
  flex: 0 0 900px;
  margin-top:-250px;
}
.news-el-tabs {
  height: 100%;
  background: #fff;
}
.el-tabs--left .el-tabs__header.is-left{
    background: rgba(13, 33, 64, 0.9);
    margin-right: 0;
}
.news-el-tabs .el-tabs__item {
    color:#fff;
}
.news-el-tabs .el-tabs__content {
  height: 100%;
  text-align: left;
  color: #0D2140;
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
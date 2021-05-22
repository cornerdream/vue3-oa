<template>
  <div class="list">
    <section id="section">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }" v-for="(item) in productTag" :key="item">{{item.name}}</el-breadcrumb-item>
        <nav id="choose" v-if="tagShow">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.name}}
          </el-tag>
        </nav>
        
      </el-breadcrumb>
      
      <el-divider></el-divider>
      <ul id="type">
        <li v-for="(item) in productFilter" :key="item">
          <span class="type-key"><strong>{{item.name}}：</strong></span>
          <ul class="type-value" >
            <li v-for="(o) in item.options" :key="o" :class="{'logoLi': item.params=='brand'}" @click="onAddItem(o.name,item.params,o.id)">
              <a href="javascript:;">
                <img :src="o.logo" alt="" v-if="o.logo">
                <!-- <span v-else>{{o.name}}</span> -->
                <i>{{o.name}}</i>
                
              </a>
            </li>
          </ul>
          <el-divider></el-divider>
        </li>       
      </ul>
    </section>
    <section class="container">
      <!-- <ul class="navbar">
        <li class="nav-item">
          <span class="nav-item-name">商城排序</span>
        </li>
        <el-divider direction="vertical"></el-divider>
        <li class="nav-item">
          <span class="nav-item-name">价格</span>
        </li>
        <el-divider direction="vertical"></el-divider>
        <li class="nav-item">
          <span class="nav-item-name">时间</span>
        </li>
        <el-divider direction="vertical"></el-divider>
        <li class="nav-item">
          <span class="nav-item-name">销量</span>
        </li>
      </ul> -->

      <div class="productBox">
        <el-card :body-style="{ padding: '10px',width:'180px'}" v-for="o in productList" :key="o" :id="o.id" @click="onClick(o.id)">
          <img v-if="!o.default_image_url" :src="defaultImage" class="image" />
          <img v-else :src="o.default_image_url" class="image" />
          <div style="padding: 14px" class="productResult">
            <p class="card-title">{{ o.name }}</p>
            <div class="bottom">
              <p class="price">{{ '¥' + o.price }}</p>
            </div>
          </div>
        </el-card>
         
      </div>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: 'list',
  props:{
    productTag:[],
    productFilter:[],
    productList:[]
  },
  data() {
    return {
      tagShow:false,
      dynamicTags: [],
      tagData:this.productTag,
      filterData:this.productFilter,
      listData:this.productList,
      query:[{
        'category_id':this.$route.query.id
      }]
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag.name), 1);
      const itemKey = tag.params;
      const itemVal = tag.id;
      const item = {};
      item[itemKey]= itemVal;
      this.query.splice(this.query.indexOf(item),1);
      this.$emit('initProductTag',this.query);
      this.$emit('initProductList',this.query);
      if(this.query.length==1){
        this.tagShow = false;
      }
    },
    onAddItem(tag,params,id){
      const obj = {
        name:tag,
        params,
        id
      }
      this.dynamicTags.push(obj);
      this.tagShow = true; 
      if(params=='brand'){
        this.query.push({
          'brand':id
        })
      }else{
        this.query.push({
          'option':id
        })
      }
      this.$emit('initProductTag',this.query);
      this.$emit('initProductList',this.query);     
    },
    onClick(id){
      this.$router.push({name:'productDetail',query:{classifyId:this.$route.query.id,id}})
    }
    
  }
}
</script>
<style scopted>
.list {
  padding: 20px;
}
#section .el-breadcrumb{
  line-height: 34px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.el-divider--horizontal {
  margin: 6px 0;
}
#type {
  background: #fff;
  margin-bottom: 10px;
}

#type li {
  position: relative;
  line-height: 34px;
  background: #f3f3f3;
}
.type-key {
  float: left;
  width: 100px;
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
}
.type-value {
  display: flex;
  margin-left: 110px;
  padding-right: 130px;
  padding-left: 10px;
  overflow: hidden;
  zoom: 1;
  background: #fff;
}
.type-value li{
  float: left;
  margin-right: 50px;
  margin-bottom: 4px;
  height: 26px;
  line-height: 26px;
}
.type-value li a{
  float: left;
  white-space: nowrap;
  zoom: 1;
  color: #005aa0;
}
.type-value li.logoLi{
  float: left;
  width: 116px;
  height: 48px;
  padding: 0;
  border: 1px solid #DDD;
  margin:0 0 0 0;
  background: #FFF;
  text-align: center;
}
.type-value li.logoLi a i{
  display: none;
}
.type-value li.logoLi:hover{
  width:114px;
  height: 46px;
  border: 2px solid red;
}
.type-value li.logoLi:hover a i{
  display: block;
}
.type-value li.logoLi:hover a img{
  display: none;
}
.logoLi a {
  display: block;
  height: 46px;
  width: 114px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  zoom: 1;
  color: #005aa0;
  line-height: 48px;
}
.logoLi a img{
  margin: 5px 6px;
  vertical-align: top;
}
.navbar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.nav-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-item-name {
  padding: 10px;
}

.container .productBox {
  display: flex;
  flex-wrap: wrap;
  margin: 10px auto;
}

.container .productBox .el-card {
  margin-right: 1%;
  margin-bottom: 10px;
  width: 19.2%;
  text-align: center;
}

.container .productBox .el-card:nth-child(5n + 5) {
  margin-right: 0;
}

.container .productBox .el-card .card-title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>

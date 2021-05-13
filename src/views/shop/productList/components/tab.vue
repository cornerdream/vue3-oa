<!-- -->
<template>
<div class="cate">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
       <el-menu-item index="1" @click="show=!show">全部商品分类</el-menu-item>

       <el-menu-item index="2"><a href="#" target="_blank">手机</a></el-menu-item>     
       <el-menu-item index="3"><a href="#" target="_blank">消息中心</a></el-menu-item>
       <el-menu-item index="4"><a href="#" target="_blank">订单管理</a></el-menu-item>
    </el-menu>
    <transition name="el-fade-in-linear">
    <el-tabs :tab-position="tabPosition" class="tab" v-if="show">
        <el-tab-pane v-for="item in options" :key="item" :label="item.label">      
            <div class="transition-box" >
                <p  v-for="o in item.children" :key="o" class="item" @click="onClick(item.id)">
                    {{ o.label }}                   
                </p>
            </div>
        </el-tab-pane>
        
    </el-tabs>   
    </transition>
</div>
</template>

<script lang="ts">
import {getProductTree} from '../../../../api/product'
export default {
       name:"tab",     
       props:{
              menu:[]
       },
       data(){
              return {
                     activeIndex:1,
                     tabPosition:'left',
                     options: [],
                     show:false
              }
       },
       created(){
             this.loadProduct();
       },
       mounted(){

       },
       methods:{
              async loadProduct(){ 
                     const {data} = await getProductTree();                             
                     data.data.map((item,index)=>{       
                            console.log(item);           
                            let obj = {id:'',value:'',label:'',children:[],show:false};
                            
                            obj.value = index;              
                            item.channels.forEach(Item => {
                            obj.id = Item.id;
                            return obj.label+=" "+Item.name
                            });
                            
                            if(item.sub_cats){         
                            item.sub_cats.forEach((el,i) => {
                                   let childObj = {value:'',label:''};                       
                                   childObj.value = i;
                                   childObj.label = el;
                                   obj.children.push(childObj);
                            });                       
                            }
                            
                            this.options.push(obj); 
                            
                      })
            
              }, 
       }
}
</script>
<style scopted>
.el-dropdown-menu__item, .el-menu-item{
       padding:0 40px;
}
.tab{
       /* display: flex;
       justify-content: space-between;
       align-items: center; */
}
.el-tabs{
    display: flex;
}
.el-tabs__content{
    flex: 1;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
}
.item{
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
<!-- -->
<template>
<div class="product">
    <div class="productBox" v-for="item in 2" :key="item">
        <div class="productTitle">热销产品</div>
        <div class="productList" v-for="o in productList" :key="o" >
        <!-- <el-row> -->
            
            <el-card :body-style="{ padding: '0px' }" :id="o.id" @click="onClick(o.id)">
                <img v-if="!o.default_image_url" :src="defaultImage"  class="image">
                <img v-else :src="o.default_image_url" class="image" >
                <div style="padding: 14px;" class="productResult">
                    <p>{{o.name}}</p>
                    <div class="bottom">
                    <p class="price">{{'¥'+ o.price }}</p>
                    <!-- <el-button type="text" class="button">操作按钮</el-button> -->
                    </div>
                </div>
            </el-card>
        
        <!-- </el-row>     -->
        </div>
    </div>
    
</div>
</template>

<script lang="ts">
import defaultImg from '../../../../assets/images/mouse.png'
import {getProductList} from '../../../../api/product'
export default {
    name:"product",
    data(){
        return {
            defaultImage:defaultImg,
            productList:[]
        }
    },
   
    created(){
        this.loadProductList();
        
    },
    mounted(){
        
    },
    methods:{
       
        async loadProductList(){
            const {data} = await getProductList();
            console.log(data);
            this.productList = data.data.results;
        },
        onClick(id){
            console.log(id);
            this.$router.push({name:'productDetail',query:{id}});
        }
    }
}
</script>
<style scopted>
.product{
    /* margin-top: 20px; */
}
.productBox{
    padding:20px;
    overflow: hidden;
}
.productTitle{
    margin:10px 0;
}
.productList{
    
    /* display: flex;
    justify-content: space-around;
    align-items: center; */
    
}
.productList .el-card{
    margin:0 20px 20px 0;
    float: left;
}
.image{
    width: 80px;
    height: 80px;
}
.productResult{
   text-align: center;
}
.bottom{
    margin-top:5px;
}
</style>
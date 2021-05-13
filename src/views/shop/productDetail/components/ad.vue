<!-- -->
<template>
<div class="ad">
    <div class="adBox">
        <div class="adTitle">热销产品</div>
        <div class="adList" v-for="o in 2" :key="o">
        <!-- <el-row> -->
            
            <el-card :body-style="{ padding: '0px' }">
            <img src="../../../../assets/images/mouse.png" class="image">
            <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
                </div>
            </div>
            </el-card>
        
        <!-- </el-row>     -->
        </div>
    </div>
</div>
</template>

<script lang="ts">
export default {
       name:"ad",
       data(){
return {

}
},
       created(){

},
       mounted(){

}
}
</script>
<style scopted>
.ad{
    margin-top: 20px;
}
.adtBox{
    padding:20px;
    overflow: hidden;
}
.adTitle{
    margin:10px 0;
}
.adList{
    
    /* display: flex;
    justify-content: space-around;
    align-items: center; */
    
}
.adList .el-card{
    margin:0 20px 20px 0;
    float: left;
}
</style>
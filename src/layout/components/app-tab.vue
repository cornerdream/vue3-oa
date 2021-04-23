<!-- -->
<template>

<div class="app-tab">
    
                <p class="logo"></p>
                <ul class="tabLink">
                    <li>首页</li>
                    <li>专题</li>
                    <li>帮助</li>
                    
                </ul>
            
                <div class="search">
                    <el-input placeholder="请输入内容" v-model="input2">
                        <template #append>
                            <el-button icon="el-icon-search"></el-button>
                        </template>
                    </el-input>
                </div>
           
    
       
    
</div>

</template>

<script lang="ts">
export default {
       name:"app-tab",
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
.app-tab{
    /* width: 100%; */
    padding: 10px;
    background: #000;
    /* overflow: hidden; */
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.logo{
    width:100px;
    height:20px;
    border:1px solid #eee;
    /* float: left; */
}
.tabLink{
    /* float: left; */
    color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.tabLink li{
    float: left;
    margin-right: 20px;
}
/* .search{
    width: 400px;
    float: right;
} */
</style>
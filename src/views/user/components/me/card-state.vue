<!-- -->
<template>
<div class="card-state">
    <el-card :body-style="{ padding: '20px' }">
            <img width="50px" height="50px" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
            <div style="padding: 14px;">
            <el-badge :value="12" class="item">
              待处理
              </el-badge>
            </div>
    </el-card>
    <el-card :body-style="{ padding: '20px' }">
            <img width="50px" height="50px" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
            <div style="padding: 14px;">
            <el-badge :value="12" class="item">
              待收货
              </el-badge>
            </div>
    </el-card>
    <el-card :body-style="{ padding: '20px' }">
            <img width="50px" height="50px" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
            <div style="padding: 14px;">
            <el-badge :value="12" class="item">
              已收货
              </el-badge>
            </div>
    </el-card>
    <el-card :body-style="{ padding: '20px' }">
            <img width="50px" height="50px" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
            <div style="padding: 14px;">
            <el-badge :value="12" class="item">
              退款
              </el-badge>
            </div>
    </el-card>
</div>
</template>

<script lang="ts">
export default {
       name:"card-state",
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

</style>
<!-- -->
<template>
<div class="cart">
    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    max-height="600"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="pic"
      label="商品"
      width="120">
      <template v-slot="scope">
        <img :src="scope.row.pic" alt="" min-width="70" height="70">
        
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="商品名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="price"
      label="商品价格"
      width="120"
      :formatter="formatPrice"
      >
      
      
    </el-table-column>
    <el-table-column
      prop="count"
      label="商品数量"
      width="300">
      <template v-slot="scope">
        <el-input-number size="mini" v-model="scope.row.count"></el-input-number>
      </template>
    </el-table-column>
    <el-table-column
      prop="handle"
      label="操作"
      fixed="right">
      <template v-slot="scope">
      <el-button v-for="(item) in scope.row.handle" :key="item" @click="handleClick(scope.row)" type="text" size="small">{{item}}</el-button>
      </template>
    </el-table-column>
  </el-table>
  <p class="totalPrice">
    商品总价格：<span></span>
  </p>
  <div class="account">
    <el-button size="medium">下单</el-button>
  </div>
  
</div>
</template>

<script lang="ts">
export default {
       name:"cart",
       computed:{
        
       },
       data(){
        return {
          tableData: [{
          pic: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '王小虎',
          price:'41.999',
          count:0,
          handle: ['删除']
        }, {
          pic: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '王小虎',
          price:'',
          count:0,
          handle: ['删除']
        }],
        multipleSelection: []
        }
},
       created(){

},
       mounted(){

},
methods: {
      formatPrice(row,column){
        const price = Number(parseFloat(row.price));
        return '￥' + (isNaN(price) ? 0 :price.toFixed(2))
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        
      }
    }
}
</script>
<style scopted>
.cart{
  
}
.totalPrice{
  position: absolute;
  bottom: 50px;
  right:10px;
}
.account{
  position: absolute;
  bottom:10px;
  right: 10px;
}
</style>
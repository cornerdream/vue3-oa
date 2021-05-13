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
      <el-button v-for="(item) in scope.row.handle" :key="item" @click="handleDel(scope.row)" type="text" size="small">{{item}}</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-row type="flex" class="row-bg" justify="end">
  <el-col :span="6">
    <div class="grid-content bg-purple">
     
        商品总价格：<span class="totalPrice"></span>
      
    </div>
  </el-col>
  <el-col :span="6">
    <div class="grid-content bg-purple-light">
      
        <el-button class="account" size="medium" @click="onOrder">下单</el-button>
      
      </div>
  </el-col>
  
  </el-row>
  
  
  
  
</div>
</template>

<script lang="ts">
// import del from './components/del.vue'
export default {
  name:"cart",
  computed:{
        
  },
  data(){
    return {
      tableData: [{
        pic: '../../../../mouse.png',
        name: '王小虎',
        price:'41.999',
        count:0,
        handle: ['删除']
      }, {
        pic: '../../../../mouse.png',
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
      
    },
    handleDel(item:any){
      
    },
    onOrder(){
      this.$router.push('/order');
    }
  }
}
</script>
<style scopted>
.cart{
  
}

/* .totalPrice{
  position: absolute;
  bottom: 50px;
  right:10px;
}
.account{
  position: absolute;
  bottom:10px;
  right: 10px;
} */
</style>
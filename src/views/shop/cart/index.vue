<!-- -->
<template>
  <div class="cart">
    <div class="productTitle">
      <img :src="cartImg" alt="">
      <span class="title">购物车({{totalNum}})</span>
    </div>
    
    <el-table
      :header-cell-style="{background:'#0D2140',color:'#fff'}"
      id="multipleTable"
      ref="multipleTable"
      :data="cartList"
      tooltip-effect="dark"
      style="width: 100%"
      max-height="600"
      :row-key="
        (row) => {
          return row.id
        }
      "
      @select="handleSingleSelectionChange"
      @select-all="handleAllSelectionChange"
      @selection-change="handleSelectionChange"
      @header-click="handleAllSelectionClick"
      >
      <el-table-column type="selection" :reserve-selection="true" width="55">
      </el-table-column>  
      

      <el-table-column prop="default_image_url" label="商品" width="120" type="index">
        <template v-slot="scope">
          <img :src="scope.row.default_image_url" alt="" min-width="70" height="70" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" width="120"> </el-table-column>
      <el-table-column prop="price" label="商品价格" width="120" :formatter="formatPrice">
      </el-table-column>
      <el-table-column prop="count" label="商品数量" width="200">
        <template v-slot="scope">
          <el-input-number
            size="mini"
            :min="1"
            v-model="scope.row.count"
            @change="changeGateway(scope.row, scope.column, scope.row.count)"
            :row="scope.row"
            ref="inputNumber"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column prop="buyer" label="采购员" width="140">
        <template v-slot="scope">
          <el-select v-model="scope.row.buyer.name" placeholder="请选择" >
            <el-option
              v-for="item in buyer"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              @click.native="changeGateway(scope.row, scope.column, item)"
            >
            </el-option>
          </el-select>

          <!-- <span @click="handleCellClick($event, scope.row, scope.column)">{{
            scope.row.buyer.name
          }}</span> -->
        </template>
      </el-table-column>
      <el-table-column prop="notes" label="备注" width="120">
        <template v-slot="scope">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="scope.row.notes"
            @blur.native="changeGateway(scope.row, scope.column, scope.row.notes)"
          >
          </el-input>
          <!-- <span @click="handleCellClick($event, scope.row, scope.column)">{{
            scope.row.notes
          }}</span> -->
        </template>
      </el-table-column> 
      <el-table-column prop="project" label="项目" width="120">
        <template v-slot="scope">
          <el-select v-model="scope.row.project.name" placeholder="请选择" >
            <el-option
              v-for="item in project"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              @click.native="changeGateway(scope.row, scope.column, item)"
            >
            </el-option>
          </el-select>
          <!-- <span @click="handleCellClick($event, scope.row, scope.column)">{{
            scope.row.project.name
          }}</span> -->
        </template>
      </el-table-column>
      <el-table-column prop="handle" label="操作" fixed="right">
        <template v-slot="scope">
          <el-button type="text" size="small" @click="handleDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <div class="cart-footer">
      <div class="grid-content bg-purple order-price">
        合计：<span class="totalPrice">¥ {{ totalPrice }}</span>
      </div>
      <el-button type="primary" size="medium" @click="onOrder" class="order">结算</el-button>
    </div>

    <el-dialog title="订单创建成功" v-model="dialogSuccessVisible" @close="handleClose">
      <el-result icon="success" title="成功提示" subTitle="请根据提示进行操作">
        <template #extra>
          <el-button type="primary" size="medium" @click="onRetainCart">继续采购</el-button>
          <el-button type="primary" size="medium" @click="onPushOrder">查看订单</el-button>
        </template>
      </el-result>
    </el-dialog>
    <el-dialog title="订单创建错误" v-model="dialogErrorVisible">
      <el-result icon="error" title="错误提示" :subTitle="error">
        <template #extra>
          <el-button type="primary" size="medium" @click="dialogErrorVisible = false"
            >返回</el-button
          >
        </template>
      </el-result>
    </el-dialog>
  </div>
</template>

<script>
import cartImg from '@/assets/images/cart-logo.png'
import { mapGetters } from 'vuex'
import { save } from '@/api/order'
import $ from 'jquery'
import { toRaw } from '@vue/reactivity'
export default {
  name: 'cart',
  computed: {
    ...mapGetters(['cartList', 'totalPrice','totalNum', 'selectAll','project', 'buyer', 'id'])
  },
  data() {
    return {
      
      cartImg:cartImg,
      buyerShow: false,
      notesShow: false,
      projectShow: false,
      multipleSelection: [],
      isAllSelect:this.selectAll,
      currentRow:'',
      _this:this,
      value1: '',
      value2: '',
      value3: '',
      span: '',
      select: '',
      dialogSuccessVisible: false,
      dialogErrorVisible: false,
      error: ''
    }
  },
  watch:{
    cartList(newv){
      this.$refs.multipleTable.clearSelection();
      newv.forEach((row) => {
        this.$refs.multipleTable.toggleRowSelection(row,row.selected);
      })
      this.selectAll = newv.every(item=>item.selected)
    }
  },
  created() {
    this.loadCartInfo()
  },
  mounted() {
    this.$nextTick(() => {
      this.cartList.forEach((row) => {
        this.$refs.multipleTable.toggleRowSelection(row,row.selected);
      })
      
    })
  },
  methods: {
    handleCellClick(row, column, cell, event) {
      
      
      
      // if (
      //   column.property == 'buyer' ||
      //   column.property == 'project' ||
      //   column.property == 'notes'
      // ) {
      //   this.span.classList.add('input-box');
      //   this.select.classList.add('current-cell');
      //}
    },
    changeGateway(row, column, item) {
      console.log(row);
      console.log(column);
      console.log(item);
      if (column.property == 'buyer') {
        row.buyer = item
      } else if (column.property == 'project') {
        row.project = item
      } else if (column.property == 'notes') {
        row.notes = item
      } else if (column.property == 'count') {
        row.count = item
      }
      const data = row;
      const { id, count, project, buyer, notes } = data;
      const param = {
        sku_id: id,
        count: count,
        project: project.id,
        buyer: buyer.id,
        notes: notes
      };
      console.log(param);
      this.$store.dispatch('Update', param);
      // if (
      //   column.property == 'buyer' ||
      //   column.property == 'project' ||
      //   column.property == 'notes'
      // ) {
      //   this.span.classList.remove('input-box');
      //   this.select.classList.remove('current-cell');
      // }
    },
    async loadCartInfo() {
    },
    formatPrice(row) {
      const price = Number(parseFloat(row.price));
      return '￥' + (isNaN(price) ? 0 : price.toFixed(2));
    },
    handleSingleChange(row){
      console.log(row)
      row.selected = !row.selected;
      const data = row;
      const { id, count, project, buyer, notes, selected } = data;
      const param = {
        sku_id: id,
        count: count,
        project: project.id,
        buyer: buyer.id,
        notes: notes,
        selected: selected
      };
      console.log(param)
      this.$store.dispatch('Update', param);
    },
    handleSingleSelectionChange(selection,row) {
      console.log(selection)
      console.log(row)
      console.log(this.currentRow)
      row.selected = !row.selected;
      const data = row;
      const { id, count, project, buyer, notes, selected } = data;
      const param = {
        sku_id: id,
        count: count,
        project: project.id,
        buyer: buyer.id,
        notes: notes,
        selected: selected
      };
      console.log(param)
      // if(param.selected){
      //   this.$nextTick(()=>{
      //     $('.el-checkbox,.el-checkbox__input').addClass('is-checked')
      //   })
        
      // }else{
      //   this.$nextTick(()=>{
      //     $('.el-checkbox,.el-checkbox__input').removeClass('is-checked')
      //   })
        
      // }
      this.$store.dispatch('Update', param);
    },
    handleAllSelectionClick(column, event){
      if(column.type=='selection'){
        if(this.selectAll){
          this.$store.dispatch('Select', { selected: !this.selectAll });
          this.$nextTick(()=>{
            $('.el-checkbox,.el-checkbox__input').removeClass('is-checked')
          })
        }else{
          this.$store.dispatch('Select', { selected: !this.selectAll });
          this.$nextTick(()=>{
            $('.el-checkbox,.el-checkbox__input').addClass('is-checked')
          })
        }
        setTimeout(() => {
          this.$store.dispatch('GetCart');
        }, 200); 
        
      }
      
    },
    handleAllSelectionChange(selection) {
       console.log('全选', selection)
      if (this.cartList.length == this.multipleSelection.length) {
        this.$store.dispatch('Select', { selected: true });
      } else {
        this.$store.dispatch('Select', { selected: false });
      }
      this.$store.dispatch('GetCart');
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDel(id) {
      this.$store.dispatch('Delete', { sku_id: id }).then(() => {
        this.$store.dispatch('GetCart');
      })
    },
    onOrder() {
      console.log(this.cartList);
      console.log(this.multipleSelection);
      if (this.multipleSelection.length>0 && this.cartList.length > 0) {
        save(this.id)
          .then((res) => {
            this.dialogSuccessVisible = true
            Promise.resolve(res)
          })
          .catch((err) => {
            this.dialogErrorVisible = true
            this.error = err
            Promise.reject(err)
          })
      } else {
        this.$alert('还没有商品，添加后再来下单', '温馨提示', {
          confirmButtonText: '确定',
          callback: (action) => {
            this.$message({
              type: 'info',
              message: `已取消`
            })
          }
        })
      }
    },
    handleClose(){
      this.dialogSuccessVisible = false;
      this.$store.dispatch('GetCart').then(() => {});
    },
    onRetainCart() {
      this.dialogSuccessVisible = false;
      this.$store.dispatch('GetCart').then(() => {});
      this.$router.push('/');
    },
    onPushOrder() {
      this.dialogSuccessVisible = false;
      this.$store.dispatch('GetCart').then(() => {});
      this.$router.push('/orders');
    }
  }
}
</script>

<style scoped>
.cart{
  padding:3rem 10rem;
}
.productTitle {
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
}
.title{
  font-size: 1.6rem;
  margin-left:1.5rem
}
#multipleTable{
  border-radius: 10px;
  box-shadow: 2px 2px 5px #0D2140;
}

.cart-footer{
  position: absolute;
  bottom: 20px;
  right: 20px;
}
.order-price{
  margin-left: -4rem;
}
.totalPrice{
  color: #EF7854;
  font-size: 2.5rem;
}
.order {
  width:112px;
  height: 43px;
  border: none;
  margin-top: 20px;
  background: url('@/assets/images/cart-logo1.png') no-repeat;
  background-size: 100% 100%;
}
.input-box {
  display: none;
}
.current-cell {
  display: block;
}
</style>

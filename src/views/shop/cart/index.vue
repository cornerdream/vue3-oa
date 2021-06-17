<!-- -->
<template>
  <div class="cart">
    <el-table
      ref="multipleTable"
      :data="$store.state.cart.cartList"
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
    >
      <el-table-column type="selection" fixed="left" :reserve-selection="true" width="55">
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
      <div class="grid-content bg-purple">
        商品总价格：<span class="totalPrice">{{ totalPrice }}</span>
      </div>
      <el-button type="primary" size="medium" @click="onOrder" class="order">下单</el-button>
    </div>
    <!-- {{cartList}} -->
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

<script >
// import func from 'vue-editor-bridge'
import { mapGetters } from 'vuex'
import { save } from '../../../api/order'
export default {
  name: 'cart',
  computed: {
    ...mapGetters(['cartList', 'totalPrice', 'project', 'buyer', 'id'])
  },
  data() {
    return {
      buyerShow: false,
      notesShow: false,
      projectShow: false,
      multipleSelection: [],
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
  created() {
    this.loadCartInfo()
  },
  mounted() {
    this.$nextTick(() => {
      this.cartList.forEach((row) => {
        if (row.selected) {
          this.$refs.multipleTable.toggleRowSelection(row);
        } else {
          this.$refs.multipleTable.toggleRowSelection(row, false);
        }
      })
    })
  },
  methods: {
    handleCellClick(event, row, column) {
      this.span = event.target
      this.select = event.target.previousSibling
      if (
        column.property == 'buyer' ||
        column.property == 'project' ||
        column.property == 'notes'
      ) {
        this.span.classList.add('input-box');
        this.select.classList.add('current-cell');
      }
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
    async loadCartInfo() {},
    formatPrice(row) {
      const price = Number(parseFloat(row.price));
      return '￥' + (isNaN(price) ? 0 : price.toFixed(2));
    },
    handleSingleSelectionChange(selection, row) {
      console.log('单选', selection, row);
      let select = selection.length && selection.indexOf(row) !== -1 ? true : false; //为true时选中，为 0 时（false）未选中
      row.selected = select;
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
      this.$store.dispatch('Update', param);
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
      console.log('选择', val)
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
      this.$router.push('/order');
    }
  }
}
</script>
<style scoped>

.cart-footer{
  position: absolute;
  bottom: 20px;
  right: 20px;
}
.order {
  margin-top: 20px;
}
.input-box {
  display: none;
}
.current-cell {
  display: block;
}
</style>

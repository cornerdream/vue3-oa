<!-- -->
<template>
  <div class="product-detail">
    <div class="goods_detail_pic"><img :src="productInfo.default_image_url" /></div>
    <div class="goods_detail_list">
      <h3>{{ productInfo.name }}</h3>
      <p>
        
      </p>
      <div class="prize_bar">
        <span class="show_pirze"
          >¥<em>{{ productInfo.price }}</em></span
        >
        <a href="javascript:;" class="goods_judge"></a>
      </div>
      <div class="goods_num">
        <div class="num_name">数 量：</div>
        <div class="num_add">
          <el-input-number size="mini" v-model="num"></el-input-number>
        </div>
      </div>
      <div class="type_select" v-for="(item,index) in productParam" :key="item.id">
        <label>{{item.name}}:</label>
        <!-- <el-check-tag @change="onChange" :checked="checked" size="medium">点我切换</el-check-tag> -->
        <a href="javascript:;" :class="{select:i==0}" v-for="(o,i) in item.options" :key="o.id"  @click="onSelect(o.sku_id,$event)" >{{o.value}}</a>        
      </div>     
      <div class="total">总价：<em>{{productInfo.price*num}}元</em></div>
      <div class="operate_btn">
        <a href="javascript:;" class="buy_btn">立即购买</a>
        <a href="javascript:;" class="add_cart" id="add_cart" @click="onCart">加入购物车</a>
      </div>
    </div>
    <el-dialog title="采购信息" v-model="dialogFormVisible" width="600px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="采购员" >
          <el-select v-model="value1" style="width: 360px" placeholder="请选择采购人员">
            <el-option
              v-for="item in buyer"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" >
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="value2" style="width: 360px">
          </el-input>
        </el-form-item>
        <el-form-item label="项目" >
          <el-select v-model="value3" style="width: 360px" placeholder="请选择项目">
            <el-option
              v-for="item in project"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { getProductDetail,getProductProject,getProductBuyer } from '../../../../../../api/product'
import { mapGetters} from 'vuex'
export default {
  name: 'product-detail',
   computed: {
    ...mapGetters([     
      'project',
      'buyer'
    ]),  
  },
  data() {
    return {
      checked: false,
      productInfo: {
        id: -1,
        name: '',
        price: '',
        default_image_url: ''
      },     
      num: 1,
      productParam:[],
      dialogFormVisible:false,
      value1:'',
      value2:'',
      value3:''
    }
  },
  created() {
    this.loadProductDetail();
    // this.loadProductProject();
    // this.loadProductBuyer();
  },
  mounted() {},
  methods: {
    onSelect(id,e) {
      if (e.target.className=='select') {
        e.target.className='';  
      }else{
        e.target.className='select'
      }
    },
    async loadProductDetail() {      
      const { data } = await getProductDetail(this.$route.query.id)     
      this.productInfo = data.data.sku;
      this.productParam = data.data.specs;      
    },
    async loadProductProject() {   
      this.$store.dispatch('GetProject');       
    },
    async loadProductBuyer() {  
      this.$store.dispatch('GetBuyer');    
    },
    onCart() {     
      this.dialogFormVisible = true; 
    },
    onSubmit(){
      this.dialogFormVisible = false;      
      this.$store.dispatch('Save',{sku_id:this.productInfo.id,count:this.num,buyer:this.value1,notes:this.value2,project:this.value3})             
    }

  }
}
</script>
<style scopted>
.product-detail {
  display: flex;
  justify-content: center;
  align-content: center;
}

.goods_detail_pic {
  width: 350px;
  height: 350px;
  margin: 24px 10px 0 24px;
  border: 1px solid #ededed;
}
.goods_detail_pic img {
  width: 350px;
  height: 350px;
}
.goods_detail_list {
  flex: 1;
  min-width: 450px;
  margin: 24px 24px 0 0;
}
.goods_detail_list h3 {
  font-size: 24px;
  line-height: 24px;
  color: #666;
  font-weight: normal;
}
.goods_detail_list p {
  color: #666;
  line-height: 40px;
}
.prize_bar {
  height: 72px;
  /* background-color: #fff5f5; */
  line-height: 72px;
}
.prize_bar .show_pirze {
  font-size: 20px;
  color: #ff3e3e;
  padding-left: 20px;
}
.prize_bar .show_pirze em {
  font-style: normal;
  font-size: 36px;
  padding-left: 10px;
}
.prize_bar .show_unit {
  padding-left: 150px;
}
/* .prize_bar .goods_judge {
  float: right;
  border-left: 1px solid #999;
  height: 20px;
  line-height: 20px;
  margin-right: 20px;
  padding-left: 20px;
  margin-top: 40px;
}
.prize_bar .goods_judge:hover {
  text-decoration: underline;
} */

.goods_num {
  display: flex;
  align-items: center;
}
.goods_num .num_name{width:70px;height:52px;line-height:52px;}
/* .goods_num .num_add{width:75px;height:50px;border:1px solid #dddddd}
.goods_num .num_add input{width:49px;height:50px;text-align:center;line-height:50px;border:0px;outline:none;font-size:14px;color:#666}
.goods_num .num_add .add,.goods_num .num_add .minus{width:25px;line-height:25px;text-align:center;border-left:1px solid #ddd;border-bottom:1px solid #ddd;color:#666;font-size:14px}
.goods_num .num_add .minus{border-bottom:0px} */

.total {
  height: 35px;
  line-height: 35px;
  margin-top: 25px;
}
.total em {
  font-style: normal;
  color: #ff3e3e;
  font-size: 18px;
}

.operate_btn {
  height: 40px;
  margin-top: 25px;
  margin-bottom: 20px;
  font-size: 0;
  position: relative;
}
.operate_btn .buy_btn,
.operate_btn .add_cart {
  display: inline-block;
  width: 178px;
  height: 38px;
  border: 1px solid #c40000;
  font-size: 14px;
  color: #c40000;
  line-height: 38px;
  text-align: center;
  background-color: #ffeded;
}
.operate_btn .add_cart {
  background-color: #c40000;
  color: #fff;
  margin-left: 10px;
  position: relative;
  z-index: 10;
}

.type_select {
  overflow: hidden;
  margin-top: 10px;
}
.type_select label {
  float: left;
  width: 70px;
  line-height: 42px;
}
.type_select a {
  float: left;
  line-height: 40px;
  border: 1px solid #ccc;
  padding: 0px 10px;
  color: #5e5e5e;
  margin-right: 10px;
  margin-bottom:10px
}
.type_select a:hover {
  border: 1px solid #e3101e;
  color: #e3101e;
}
.type_select .select {
  border: 1px solid #e3101e;
  background: url('src/assets/images/selected.png') right bottom no-repeat;
}
</style>

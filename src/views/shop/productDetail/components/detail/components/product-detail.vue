<!-- -->
<template>
  <div class="product-detail">
    <div class="goods_detail_pic">
      
        <div class="lit_box"  @mousemove="move($event)" @mouseover="display(true)" @mouseout="display(false)">
          <div class="mask"  :class="mask_hide"></div>
          <img :src="productInfo.default_image_url" class="lit_img"/>

        </div>
        <div class="images_list">
          <i class="el-icon-arrow-left arrow-prev" @click="tabClick(true)"></i>
          <i class="el-icon-arrow-right arrow-next" @click="tabClick(false)"></i>
          <div class="images_list_box">
            <ul class="images_list_ul">
              <li v-for="o in images" :key="o.sku" class="images_list_li" @mouseover="liHover(o.image,$event)" >
                <img :src="o.image" class="images_list_img">
              </li>
            </ul>
          </div>
        </div>
        <div class="big_box" :class="mask_hide">
          <img :src="productInfo.default_image_url" />
        </div>
      
      
      
      
      
    </div>
    
    <div class="goods_detail_list">
      <h3>{{ productInfo.name }}</h3>
      <p></p>
      <div class="prize_bar">
        <span class="show_pirze"
          >¥<em>{{ productInfo.price }}</em></span
        >
        <a href="javascript:;" class="goods_judge"></a>
      </div>
      <div class="goods_num">
        <div class="num_name">数 量：</div>
        <div class="num_add">
          <el-input-number size="mini" v-model="num" :min="1"></el-input-number>
        </div>
      </div>
      <div class="type_select" v-for="(item) in productParam" :key="item.id">
        <label>{{ item.name }}:</label>
        <a
          href="javascript:;"
          :class="{ select: o.sku_id == $route.query.id,select_null:o.sku_id == null }"
          v-for="(o) in item.options"
          :key="o.sku_id"
          @click="onSelect(o.sku_id, $event)"
          >{{ o.value }}</a
        >
      </div>
      <div class="total">
        总价：<em>{{ productInfo.price * num }}元</em>
      </div>
      <div class="operate_btn">
        <!-- <a href="javascript:;" class="buy_btn">立即购买</a> -->
        <a href="javascript:;" class="add_cart" id="add_cart" @click="onCart">加入购物车</a>
      </div>
    </div>
    <el-dialog title="采购信息" v-model="dialogFormVisible" width="600px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="采购员" prop="value1">
          <el-select v-model="form.value1" style="width: 360px" placeholder="请选择采购人员">
            <el-option v-for="item in buyer" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.value2"
            style="width: 360px"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="项目" prop="value3">
          <el-select v-model="form.value3" style="width: 360px" placeholder="请选择项目">
            <el-option v-for="item in project" :key="item.id" :label="item.name" :value="item.id">
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
    <el-dialog title="购物车加入错误" v-model="dialogErrorVisible">
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

<script lang="ts">
import {offset} from '../../../../../../utils'
import { mapGetters } from 'vuex'
import $ from 'jquery'
import func from 'vue-editor-bridge'
import { off } from 'node:process'
export default {
  name: 'product-detail',
  computed: {
    ...mapGetters(['project', 'buyer'])
  },
  props:[
    'productInfo','productParam','images'
  ],
  data() {
    return {
      mask_hide:{
        "hide":true
      },
      step:0,
      num: 1,
      dialogFormVisible: false,
      dialogErrorVisible: false,
      error:'',
      form:{
        value1: '',
        value2: '',
        value3: '',
      },
      rules: {
        value1: [{ required: true, message: '请选择采购员', trigger: 'change' }],
        value3: [{ required: true, message: '请选择项目', trigger: 'change' }]
      }
    }
  },
  created() {
    
  },
  mounted() {
  },
  methods: {
    tabClick(bool:boolean){     
      const wrapper = $('.images_list_ul');
      const len = $('.images_list_li').length-4;
      if(len<=0){return}
      if(bool){      
        if (this.step === 0) {
          return
        }
        this.step--;
        wrapper.css({'transitionDuration':'0.3s'});
        wrapper.css({'left':-this.step* 64+ 'px'});   
      }else{
        if (this.step === len) {
          return
        }
        this.step++;
        wrapper.css({'transitionDuration':'0.3s'});
        wrapper.css({'left':-this.step * 64 + 'px'});     
      }
    },
    liHover(image:any,e:any){
      this.productInfo.default_image_url = image;
      $(e.target).parent().addClass('hover_images_list_li')
      $(e.target).parent().siblings().removeClass('hover_images_list_li');
    },
    move(e:any){
      let lit = document.querySelector('.lit_box'),
      mask = document.querySelector('.mask'),
      big = document.querySelector('.big_box'),
      bigImg = big.querySelector('img');
      let o = offset(lit);
      let l = e.pageX - o.l - mask.clientWidth/2,
          t = e.pageY - o.t - mask.clientHeight/2;
      let maxL = lit.clientWidth - mask.clientWidth,
          maxT = lit.clientHeight - mask.clientHeight;   
      l = l < 0 ? 0 : (l > maxL ? maxL : l); 
      if(t < 0){
        t = 0
      }else if(t > maxT){
        t = maxT
      }else{
        t = t;
      }   
      mask.style.left = l + 'px';
      mask.style.top = t + 'px';   
      let n = big.clientHeight / mask.clientHeight;
      bigImg.style.left = -l*n +'px';
      bigImg.style.top = -t*n +'px';
    },
    display(bool:boolean){
      this.mask_hide.hide=!bool;
    },
    onSelect(id:number, e:any) {
      const aNode = e.target;
      if(id==null){        
        $(aNode).attr('disabled',"disabled");
      }
      if($(aNode).attr('disabled') !== 'disabled') {
        $(aNode).addClass('select');
        $(aNode).siblings().removeClass('select');
        
        let newQuery= JSON.parse(JSON.stringify(this.$route.query));
        newQuery.id = id;      
        this.$router.replace({
          query: newQuery
        })   

        this.$emit('initDetail',id);
      }  
    },
    onCart() {
      this.dialogFormVisible = true;
    },
    async onSubmit() {
      await (this.$refs.form as any).validate();
      (this as any).$store.dispatch('Save', {
        sku_id: this.productInfo.id,
        count: this.num,
        buyer: this.form.value1,
        notes: this.form.value2,
        project: this.form.value3
      }).then(()=>{
        this.resetForm();
        (this as any).$message({
            showClose: true,
            type: 'success',
            message: '加入成功!',
            duration: 2500
          })
          // this.dialogFormVisible = false;
      }).catch((err:any)=>{
            this.dialogErrorVisible = true
            this.error = err;
            this.dialogFormVisible = false;
            Promise.reject(err);      
      })
    },
    resetForm() {
      this.dialogFormVisible = false;
      (this as any).$refs.form.resetFields()
      this.form = { value1: '', value2: '', value3: '' }
    }
  }
}
</script>
<style scoped>
.product-detail {
  display: flex;
  /* justify-content: center;
  align-content: center; */
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
.hide{
  display:none;
}
.lit_box{
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
  position: relative;
}
.lit_box .mask{
  position: absolute;
  cursor: move;
  left: 0;
  top:0;
  width:100px;
  height: 100px;
  background: rgba(0, 0, 0, 0.5);
}
.lit_box img{
  width: 100%;
  height: 100%;
}
.big_box{
  width: 400px;
  height: 400px;
  border:1px solid #ccc;
  position: relative;
  left: 300px;
  top:-400px;
  overflow: hidden;
  z-index: 999;
}
.big_box img{
  width: 1200px;
  height: 1200px;
  position: absolute;
}
.images_list{
  width: 300px;
  position: relative;
}
.images_list_box{
  position: relative;
  width: 256px;
  height: 70px;
  overflow: hidden;
  margin: 10px 15px;
}
.images_list_box .images_list_ul{
  position: absolute;
  width: 406px;
  height: 70px;
  top: 0px;
  left: 0px;
}
.images_list_box .images_list_ul .images_list_li {
  float: left;
  margin: 0 5px;
  width: 50px;
  height: 64px;
  border: 2px solid #fff;
}
.images_list_box .images_list_ul .images_list_li .images_list_img {
  width: 100%;
  height: 100%;  
}
.images_list_box .images_list_ul .hover_images_list_li{
  border: 2px solid red;
}
.arrow-prev ,.arrow-next{
  display: block;
  width: 22px;
  height: 32px;
  float: left;
  position: absolute;
  cursor: pointer;
  top: 50%;
  margin-top: -10px;
}
.arrow-prev {
  left: 0;
}
.arrow-next {
  right: 0;
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
.goods_num .num_name {
  width: 70px;
  height: 52px;
  line-height: 52px;
}
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
  margin-bottom: 10px;
}
.type_select a:hover {
  border: 1px solid #e3101e;
  color: #e3101e;
}
.type_select .select {
  border: 1px solid #e3101e;
  background: url('src/assets/images/selected.png') right bottom no-repeat;
}
.type_select .select_null{
  border:1px dashed #ccc;
}
</style>

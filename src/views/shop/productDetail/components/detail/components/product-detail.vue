<!-- -->
<template>
<div class="product-detail">
    <div class="goods_detail_pic"><img :src="productInfo.default_image_url"></div>
    <div class="goods_detail_list">
        <h3>{{productInfo.name}}</h3>
			<p>【全新2017款】MacBook Pro,一身才华，一触，即发 了解【黑五返场特惠】 更多产品请点击【美多官方Apple旗舰店】</p>
			<div class="prize_bar">
				<span class="show_pirze">¥<em>{{productInfo.price}}</em></span>
				<a href="javascript:;" class="goods_judge">449人评价</a>
			</div>
			<div class="goods_num">
				<div class="num_name ">数 量：</div>
				<div class="num_add ">
					<el-input-number size="mini" v-model="num"></el-input-number>	
				</div> 
			</div>
			<div class="type_select">
				<label>屏幕尺寸:</label>
				<a href="javascript:;" class="select">13.3英寸</a>
				<a href="javascript:;">15.4英寸</a>
			</div>
			<div class="type_select">
				<label>颜色:</label>
				<a href="javascript:;" class="select">深灰色</a>
				<a href="javascript:;">银</a>
			</div>
			<div class="type_select">
				<label>版本:</label>
				<a href="javascript:;" class="select">core i5/8G内存/256G存储</a>
				<a href="javascript:;">core i5/8G内存/128G存储</a>
				<a href="javascript:;">core i5/8G内存/512G存储/Multi-Touch Bar</a>
			</div>
			<div class="total">总价：<em>11388.00元</em></div>
			<div class="operate_btn">
				<a href="javascript:;" class="buy_btn">立即购买</a>
				<a href="javascript:;" class="add_cart" id="add_cart" @click="onCart">加入购物车</a>				
			</div>
    </div>
    <!-- <p>ICR</p>
    <P>类别</P>
    <p>编号</p>
    <p>价格</p>
    <p>促销</p>
    <p>积分</p>
    <div class="handleBox">
        <p>
            性别
             <el-radio v-model="radio" label="1">备选项</el-radio>
            <el-radio v-model="radio" label="2">备选项</el-radio>
        </p>
        <p>
            数量 
            <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
        </p>
        <p>
            <el-button type="primary">立即购买</el-button>
            <el-button type="success" @click="onCart">加入购物车</el-button>
        </p>
    </div> -->
    
</div>
</template>

<script lang="ts">
import {getProductDetail} from '../../../../../../api/product'
export default {
    name:"product-detail",
    data(){
        return {
            productInfo:{
                id:-1,
                name:'',
                price:'',
                default_image_url:''
            },
            num:1

        }
    },
    created(){
        this.loadProductDetail();
    },
    mounted(){

    },
    methods:{
        async loadProductDetail(){
            // console.log(this.$route.params.id);
            const {data} = await getProductDetail(this.$route.query.id);
            console.log(data.data.sku);
            this.productInfo = data.data.sku;
        },
        onCart(){
            this.$router.push({name:'cart'});
        }
    }
}
</script>
<style scopted>
.product-detail{
    display: flex;
    justify-content: center;
    align-content: center;
}

.goods_detail_pic{
    width:350px;
    height:350px;
    margin:24px 10px 0 24px;
    border:1px solid #ededed;
}
.goods_detail_pic img{width:350px;height:350px;}
.goods_detail_list{
	flex:1;
    min-width: 450px;
    margin:24px 24px 0 0;
}
.goods_detail_list h3{font-size:24px;line-height:24px;color:#666;font-weight:normal;}
.goods_detail_list p{color:#666;line-height:40px;}
.prize_bar{height:72px;background-color:#fff5f5;line-height:72px;}
.prize_bar .show_pirze{font-size:20px;color:#ff3e3e;padding-left:20px}
.prize_bar .show_pirze em{font-style:normal;font-size:36px;padding-left:10px}
.prize_bar .show_unit{padding-left:150px}
.prize_bar .goods_judge{float:right;border-left:1px solid #999;height:20px;line-height:20px;margin-right:20px;padding-left:20px;margin-top:40px;}
.prize_bar .goods_judge:hover{text-decoration:underline}

.goods_num{
    display: flex;
    align-items: center;
}
/* .goods_num .num_name{width:70px;height:52px;line-height:52px;} */
/* .goods_num .num_add{width:75px;height:50px;border:1px solid #dddddd}
.goods_num .num_add input{width:49px;height:50px;text-align:center;line-height:50px;border:0px;outline:none;font-size:14px;color:#666}
.goods_num .num_add .add,.goods_num .num_add .minus{width:25px;line-height:25px;text-align:center;border-left:1px solid #ddd;border-bottom:1px solid #ddd;color:#666;font-size:14px}
.goods_num .num_add .minus{border-bottom:0px} */

.total{height:35px;line-height:35px;margin-top:25px;}
.total em{font-style:normal;color:#ff3e3e;font-size:18px}

.operate_btn{height:40px;margin-top:25px;margin-bottom:20px;font-size:0;position:relative;}
.operate_btn .buy_btn,.operate_btn .add_cart{display:inline-block;width:178px;height:38px;border:1px solid #c40000;font-size:14px;color:#c40000;line-height:38px;text-align:center;background-color:#ffeded;}
.operate_btn .add_cart{background-color:#c40000;color:#fff;margin-left:10px;position:relative;z-index:10;}

.type_select{overflow:hidden;margin-top:10px;}
.type_select label{float:left;width:70px;line-height:42px;}
.type_select a{float:left;line-height:40px;border:1px solid #ccc;padding:0px 10px;color:#5e5e5e;margin-right:10px;}
.type_select a:hover{border:1px solid #e3101e;color:#e3101e}
.type_select .select{border:1px solid #e3101e;background:url('src/assets/images/selected.png') right bottom no-repeat;}
</style>
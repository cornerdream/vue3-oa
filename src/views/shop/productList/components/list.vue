<template>
<div class="list">
       <section id="section">
              <nav id="choose">
                     <span class="choose-key"><strong>你的选择:</strong></span>
                    
                            <el-tag
                            :key="tag"
                            v-for="tag in dynamicTags"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)">
                                   {{tag}}
                            </el-tag>
                        
                     
              </nav>
              <el-divider></el-divider>
              <ul id="type">
                     <li>
                            <span class="type-key"><strong>品牌：</strong></span>
                            <ul class="type-value">
                                   <li>
                                      <a href="javascript:;" >苹果</a>
                                   </li>
                                    <li>
                                      <a href="javascript:;" >苹果</a>
                                   </li>
                            </ul>
                            <el-divider></el-divider>
                            
                            
                     </li>
                     <li>
                            <span class="type-key"><strong>品牌：</strong></span>
                            <ul class="type-value">
                                   <li>
                                      <a href="javascript:;" >苹果</a>
                                   </li>
                            </ul>
                            <el-divider></el-divider>
                     </li>
                    
              </ul>
	</section>
       <section class="container">
		
              <ul class="navbar">
                     <li class="nav-item">
                            <span class="nav-item-name">商城排序</span>
                           
                            <i class="arrow-top"></i>
                            <!-- <i class="arrow-bottom"></i> -->
                            
                     </li>
                     <el-divider direction="vertical"></el-divider>
                     <li class="nav-item">
                            <span class="nav-item-name">价格</span>
                           
                            <i class="arrow-top"></i>
                            <!-- <i class="arrow-bottom"></i> -->
                            
                     </li>
                     <el-divider direction="vertical"></el-divider>
                     <li class="nav-item">
                            <span class="nav-item-name">时间</span>
                           
                            <i class="arrow-top"></i>
                            <!-- <i class="arrow-bottom"></i> -->
                            
                     </li>
                     <el-divider direction="vertical"></el-divider>
                     <li class="nav-item">
                            <span class="nav-item-name">销量</span>
                           
                            <i class="arrow-top"></i>
                            <!-- <i class="arrow-bottom"></i> -->
                            
                     </li>
              </ul>
			
		
		<div class="productBox">
                     <el-row>
                            <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
                                   <el-card :body-style="{ padding: '0px' }">
                                   <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                                   <div style="padding: 14px;">
                                          <span>好吃的汉堡</span>
                                          <div class="bottom">
                                          <time class="time">{{ currentDate }}</time>
                                          <el-button type="text" class="button">操作按钮</el-button>
                                          </div>
                                   </div>
                                   </el-card>
                            </el-col>
                     </el-row>
			<!-- <div class="card">
				<img src="images/1.jpg" class="card-img-top" alt="">
				<div class="card-body">
					<h5 class="card-title">HUAWEI Mate 10 4GB+64GB 全网通版（亮黑色）</h5>
					<p class="card-text">价格：￥1998.00</p>
					<p class="card-text">销量：1087</p>
					<p class="card-text">时间：2019/08/17</p>
				</div>
			</div> -->
		</div>
	</section>
</div>
</template>

<script lang="ts">
export default {
       name:"list",
       data(){
              return {
                     dynamicTags: ['品牌：苹果', '标签二', '标签三'],
              }
       },
       created(){

       },
       mounted(){

       },
       methods: {
              handleClose(tag) {
                     this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
              },

              
       }
}
</script>
<style scopted>
.list{
    padding: 20px;   
}
#section {
       
}

#choose {
    padding-top: 15px;
    margin-bottom: 5px;
    z-index: 6;  
    line-height: 24px;
    padding-right: 125px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.choose-key{
    font-size: 18px;
    font-weight: 700;
    font-family: "microsoft yahei";
    padding-right:10px;
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.el-divider--horizontal{
    margin:6px 0;
}
#type {
   
    background: #FFF;
    margin-bottom: 10px;
}

#type li {
    position: relative;  
    line-height: 34px;   
    background: #f3f3f3;
}
.type-key {
    float: left;
    width: 100px;
    padding-left: 10px;
    white-space: nowrap;
    overflow: hidden;
}
.type-value {
    display: flex;   
    margin-left: 110px;
    padding-right: 130px;
    padding-left: 10px;
    overflow: hidden;
    zoom: 1;
    background: #fff;

}
.type-value a{
    margin-right: 10px;
    color: #409EFF;
}
.navbar{
       display: flex;
       justify-content: flex-start;
       align-items: center;
}
.nav-item{
      display: flex;
      justify-content: center;
      align-items: center;
}
.nav-item-name{
       padding:10px;
}
.arrow-top{
       width:0;
       height:0;
	border-right:5px solid transparent;
	border-left:5px solid transparent;
	border-bottom:5px solid red;
}
.arrow-bottom{
       width:0;
	height:0;
	border-right:5px solid transparent;
	border-left:5px solid transparent;
	border-top:5px solid red;
}
.productBox {
	display: flex;
	flex-wrap: wrap;
	margin: 10px auto;
}

.productBox .card {
	margin-right: 1%;
	margin-bottom: 10px;
	width: 19.2%;
}

.productBox .card:nth-child(5n+5) {
	margin-right: 0;
}

.productBox .card .card-title {
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
</style>
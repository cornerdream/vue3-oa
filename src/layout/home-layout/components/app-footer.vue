<!-- -->
<template>
<div class="footer">
    <!-- <el-row :gutter="10"> -->
    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="4">
        <div class="footer-left">
            <div class="footer-left-top">
                <div class="footer-left-top-left">
                    <img :src="footerLeft" alt="">
                </div>
                <div class="footer-left-top-right">

                </div>
            </div>
        <el-col :xs="16" :sm="20" :md="20" :lg="24" :xl="24">
            <div class="footer-left-bottom">
                <ul class="tabLink">
                    <li>
                        <router-link :to="{ name: 'home' }" >
                        <span >首页</span>
                        </router-link>
                    </li>
                    <!-- <li>专题</li> -->
                    <li>
                        <router-link :to="{ name: 'help' }">
                        <span>帮助</span>
                        </router-link>  
                    </li>
                </ul>
            </div>
        </el-col>
        </div>
    </el-col>
    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="20">
        <div class="footer-right">
            <div class="footer-right-left">
                <p class="footer-right-left-top">联系我们</p>
                <ul class="footer-right-left-bottom">
                    <li>地址：北京经济技术开发区隆庆街9号1号楼</li>
                    <li>邮编：100176</li>
                    <li>电话：+86(10)6786-4680</li>
                    <li>邮箱：HR@yiconmed.com</li>
                </ul>
            </div>
            <div class="footer-right-right">
                <div class="footer-right-right-top">
                    <img :src="footerRight" alt="">
                </div>
                <div class="footer-right-right-bootom">扫一扫，关注我们</div>
            </div>
        </div>    
        
    
    </el-col>
    <!-- <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">

    </el-col>
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">

    </el-col> -->
    <!-- </el-row> -->
   
    
</div>
</template>
<script>
import footerLeftLogo from '@/assets/images/footer-logo.png'
import footerRightLogo from '@/assets/images/footer-logo1.png'
export default {
name: 'footer',
data() {
return {
    footerLeft:footerLeftLogo,
    footerRight:footerRightLogo
}
},
created() {},
mounted() {}
}
</script>
<style scoped>
.footer{
    padding:4rem 9rem;
    background: #0D2140;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.footer-left{
    display: flex;
    flex-direction: column;
    /* justify-content: flex-start;
    align-items: center; */
}
.footer-left-top{
    padding:3rem .5rem;
}
.footer-left-bottom{
    /* width:69rem; */
    border-top:1px solid #fff;
    padding:2rem 0
}
.tabLink{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.tabLink li{
    padding:0 2rem;
    border-right:1px solid #fff;
}
.tabLink li:last-child{
    border-right:0;
}
.tabLink a{
    color: #fff;
}
.footer-right{
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
}
.footer-right-left{
    margin:0 6rem;
}
.footer-right-left-top{
    margin-bottom:2rem;
}
.footer-right-left-bottom li{
   margin-bottom:.5rem;
}
.footer-right-right{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>

<!-- -->
<template>
<div class="app-top">
    
                <div class="helloMsg">您好，欢迎来到YICONMED商城</div>
            
        
                <div class="userManger" v-if="isLogin">
       
                    <router-link :to="{name:'user'}">
                        <span>个人中心</span> 
                    </router-link>
                    
                
                    <router-link :to="{name:'cart'}">
                        <span>购物车</span>
                    </router-link>
            
      
                </div>
                <div class="user" v-else>
                        
                            <router-link :to="{name:'login'}">
                                <span>登录</span> 
                            </router-link>   
                            
                        
                    
                            <!-- <router-link :to="{name:'register'}">
                                <span>注册 </span>
                            </router-link> -->
                            
                    
                </div>
            
        
</div>
</template>

<script lang="ts">
export default {
       name:"app-top",
       data(){
        return {
            isLogin:false//未登录
        }
        },
            created(){

        },
            mounted(){

        }
}
</script>
<style scopted>
.app-top{
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}


a.router-link-exact-active{
   color: #000;
} 
</style>
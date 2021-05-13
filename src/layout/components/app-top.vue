<!-- -->
<template>
<div class="app-top">
    
    <div class="helloMsg">您好，欢迎来到YICONMED商城</div>
            
        
        <div class="userManger" >
       
            <router-link :to="{name:'me'}" active-class="" exact-active-class="" class="userMe">
                <el-avatar :size="small" :src="image" class="userImg"></el-avatar>
                <el-dropdown>
                    
                    <span class="el-dropdown-link">
                        个人中心<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item icon="el-icon-plus">{{ username }}</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-circle-plus" @click.native="onLoginOut">退出</el-dropdown-item>                                    
                        </el-dropdown-menu>
                    </template>
                    </el-dropdown>
            </router-link>
            
        
            <router-link :to="{name:'cart'}">
                <!-- <span>购物车</span> -->               
                <el-dropdown>
                    
                    <span class="el-dropdown-link">
                        购物车<i class="el-icon-shopping-cart-2"></i>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu max-height="200">
                            <el-dropdown-item v-show="cartList">购物车空空，快添加~</el-dropdown-item>
                            <el-dropdown-item v-for="item in getCartTree" :key="item">{{ item.username }}</el-dropdown-item>
                                                                
                        </el-dropdown-menu>
                    </template>
                    </el-dropdown>
            </router-link>
            
      
        </div>
        <!-- <div class="user" v-else>
                
            <router-link :to="{name:'login'}">
                <span>登录</span> 
            </router-link>   
            
        
    
            <router-link :to="{name:'register'}">
                <span>注册 </span>
            </router-link>
                    
            
        </div> -->
            
        
</div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
// import { getUserInfo } from '../../api/login'
import { getCartTree } from '../../api/cart'
export default {
//   components: { appHeader },
    name:"app-top",
    computed: {
        ...mapGetters([
            // 'userInfo'
            'id',
            'username',
            'email',
            'image'
            // 'avatar',
            
            // 'createTime'
        ])
    },
    data(){
        return {
            
            // userInfo: {} ,
            cartList:[]
        }
    },
    created(){
            this.loadUserInfo();
            this.loadCartInfo();
        },
        mounted(){

        },
        methods:{

            async loadUserInfo () {
                // if(this.$store.state.user){ 
                //     // const { data } = this.$store.dispatch('getUserInfo');                   
                //     const { data } = await getUserInfo();
                //     console.log(data);
                //     this.userInfo = data.data;
                //     this.isLogin = true;
                // }
                // console.log(this.isLogin)
                this.$store.dispatch('GetUserInfo').then(() => {})
                // console.log(username);
            },
            async loadCartInfo () {
                if(this.$store.state.user.token){ 
                    // const { data } = this.$store.dispatch('getUserInfo');                   
                    const { data } = await getCartTree();
                    // console.log(data);
                    this.cartList = data.data;
                    
                }
                
                
            },
            onLoginOut(){
                this.$confirm('确认退出吗？', '退出提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {  
                    this.$store.dispatch('LogOut').then(() => {
                        this.isLogin = false;                        
                        this.$router.push('/login');
                    })
                    this.$message({
                    type: 'success',
                    message: '退出成功!'
                    })
                }).catch(() => { 
                    this.$message({
                    type: 'info',
                    message: '已取消退出'
                    })
                })
            }
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
.userManger{
    display: flex;
    justify-content: center;
    align-items: center;
}

a.active{
   color: rgba(235, 14, 14, 0.384);
} 
.userImg{
    margin-right: 5px;
}
.userMe{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
}
</style>
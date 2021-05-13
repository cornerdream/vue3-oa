<!-- -->
<template>
<div class="crm">
    <el-container style="height:100%"> 
        <el-aside width="200px" style="height:100%">
            <app-aside :menus="userMenu" />
        </el-aside>
        <!-- <el-container>  -->
            <!-- <el-header><app-bread/></el-header> -->
            <el-main> 
                <router-view/>               
            </el-main>
        <!-- </el-container>     -->
    </el-container>
</div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import appAside from './app-aside.vue'
import appBread from './app-bread.vue'
import {ElMessage } from 'element-plus'
// import { getUserMenu } from '../../api/login'
export default {
    name:"crm",
    components: { 
        appAside,appBread
    },        
    computed:{
        ...mapGetters([
            'userMenu'
        ])
        // menus(){
        //     return this.$store.state.userMenu||{} 
        // }
    },
    created(){
        this.loadUserMenu()
    },
    mounted(){

    },
    methods:{
        async loadUserMenu () {
            //  this.$store.dispatch('getUserInfo').then(() => {
            
                
            //   }).catch(() => {
                
            //   })
                // console.log(this.menus);
                // const { data } = await getUserMenu();
                // console.log(data);
                // // getUserMenu().then(res => {
                // //   const asyncRouter = filterAsyncRouter(res.data)
                // //   asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
                // //   store.dispatch('GenerateRoutes', asyncRouter).then(() => { // 存储路由
                // //     router.addRoutes(asyncRouter) // 动态添加可访问路由表
                // //     next({ ...to, replace: true })// hack方法 确保addRoutes已完成
                // //   })
                // // })
                // // this.userMenu = data.data
                // if(data.code !== 200){
                //     ElMessage.error(data.error);
                // }else{
                //     //console.log(1);
                //     (this as any).$store.commit('setUserMenu',data.data);
                //     //console.log(this.$route.query);
                //     //this.$router.push(this.$route.query.redirect as string || '/');
                //     //ElMessage.success('菜单成功');
                //     // this.menus = data.data
                //     // const asyncRouter = filterAsyncRouter(data.data)
                //     // asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
                //     // store.dispatch('GenerateRoutes', asyncRouter).then(() => { // 存储路由
                //     //   router.addRoutes(asyncRouter) // 动态添加可访问路由表
                //     //   next({ ...to, replace: true })// hack方法 确保addRoutes已完成
                //     // })
                // }
                this.$store.dispatch('GetUserMenu').then(() => {})
        },
    }    
}
</script>
<style scopted>
.crm{
    height: 100%;
}
</style>
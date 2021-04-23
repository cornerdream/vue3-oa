import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw
} from 'vue-router'

import Layout from '@/layout/index.vue'
import User from '@/views/user/index.vue'

const routes:Array<RouteRecordRaw> =[
    {
        path:'/login',
        name:'login',
        component:()=>import(/*webpackChunkName:'login'*/'@/components/login.vue')
    },
    {
        path:'/',
        component:Layout,
        children:[
            {
                path:'',
                name:'home',
                component:()=>import(/*webpackChunkName:'home'*/'@/views/home/index.vue')
            },
            {
                path:'/user',                
                component:User,
                children:[
                    {
                        path:'',
                        name:'user',
                        component:()=>import(/*webpackChunkName:'user'*/'@/views/user/components/me/app-user.vue'),
                    },
                    {
                        path:'/cart',
                        name:'cart',
                        component:()=>import(/*webpackChunkName:'cart'*/'@/views/user/components/cart/index.vue')
                    }
                ]
            }
            
        ]
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})
export default router

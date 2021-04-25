import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw
} from 'vue-router'

import Layout from '@/layout/index.vue'
import User from '@/views/crm/user/index.vue'

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
                path:'/home',
                name:'home',
                component:()=>import(/*webpackChunkName:'home'*/'@/views/shop/home/index.vue')
            },
            {
                path:'/productList',
                name:'productList',
                component:()=>import(/*webpackChunkName:'home'*/'@/views/shop/productList/index.vue')
            },
            {
                path:'/productDetail',
                name:'productDetail',
                component:()=>import(/*webpackChunkName:'home'*/'@/views/shop/productDetail/index.vue')
            },
            {
                path:'/user',                
                component:User,
                children:[
                    {
                        path:'',
                        name:'user',
                        component:()=>import(/*webpackChunkName:'user'*/'@/views/crm/user/components/me/app-user.vue'),
                    },
                    {
                        path:'/cart',
                        name:'cart',
                        component:()=>import(/*webpackChunkName:'cart'*/'@/views/crm/user/components/cart/index.vue')
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

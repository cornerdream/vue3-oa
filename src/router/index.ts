import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw
} from 'vue-router'

import Layout from '@/layout/index.vue'

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
                name:'user',
                component:()=>import(/*webpackChunkName:'home'*/'@/views/user/index.vue')
            }
        ]
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})
export default router

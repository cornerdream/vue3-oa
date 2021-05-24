import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw
} from 'vue-router'

import store from '../store'

// import Vue from 'vue'
// import Router from 'vue-router'

// Vue.use(Router)
/*
*商城、后台样式
*/ 
import Layout from '../layout/index.vue'
import crm from '../views/crm/index.vue'

const Login = ()=>import(/*webpackChunkName:'login'*/'../components/login/index.vue');
/*
*商城
*/ 
const Home = ()=>import(/*webpackChunkName:'shop'*/'../views/shop/home/index.vue');
const ProductList = ()=>import(/*webpackChunkName:'shop'*/'../views/shop/productList/index.vue');
const ProductDetail = ()=>import(/*webpackChunkName:'shop'*/'../views/shop/productDetail/index.vue');
/*
*后台我的
*/ 
const Me = ()=>import(/*webpackChunkName:'home'*/'../views/crm/components/home/me/index.vue');
const Cart = ()=>import(/*webpackChunkName:'home'*/'../views/crm/components/home/cart/index.vue');
const Order = ()=>import(/*webpackChunkName:'home'*/'../views/crm/components/home/order/index.vue');
//入库单
const personal  = ()=>import(/*webpackChunkName:'home'*/'../views/crm/components/warehouse/index.vue');
const publish  = ()=>import(/*webpackChunkName:'home'*/'../views/crm/components/list/selectlist/index.vue');
const categories  = ()=>import(/*webpackChunkName:'home'*/'../views/crm/components/list/selectlist/components/categories/categories.vue');
const infortion  = ()=>import(/*webpackChunkName:'home'*/'../views/crm/components/list/selectlist/components/infortion/infortion.vue');
const release  = ()=>import(/*webpackChunkName:'home'*/'../views/crm/components/list/selectlist/components/release/release.vue');
// 审批管理

const approving  = ()=>import(/*webpackChunkName:'home'*/'../views/crm/components/approving/index.vue');
const approved  = ()=>import(/*webpackChunkName:'home'*/'../views/crm/components/approved/index.vue');


/*
*系统设置
*/ 
const Consumer = ()=>import(/*webpackChunkName:'system'*/'../views/crm/components/system/consumer/index.vue');
const Menu = ()=>import(/*webpackChunkName:'system'*/'../views/crm/components/system/menu/index.vue');
const Access = ()=>import(/*webpackChunkName:'system'*/'../views/crm/components/system/access/index.vue');
const Role = ()=>import(/*webpackChunkName:'system'*/'../views/crm/components/system/role/index.vue');
const Organize = ()=>import(/*webpackChunkName:'system'*/'../views/crm/components/system/organize/index.vue');

// console.log(Role);

const routes =[
    {
        path:'/login',
        name:'login',
        component:Login
    },
    {
        path:'/',
        // redirect: 'index',
        name:'layout',
        component:()=>Layout,
        meta: {
            requiresAuth: true
        },
        children:[
            {
                path:'',
                name:'home',
                component:Home,
                meta: { title: '首页', icon: 'index', noCache: true }
            },
            {
                path:'/productList',
                name:'productList',
                component:ProductList
            },
            {
                path:'/productDetail',
                name:'productDetail',
                component:ProductDetail
            },
            {
                path:'/crm',
                name:'crm',                
                component:()=>crm,                
                children:[
                    {
                        path:'/me',
                        name:'me',
                        component:Me, 
                        meta:{
                            title:'我的主页'
                        }                                                             
                    },
                    {
                        path:'/cart',
                        name:'cart',
                        component:Cart,
                        meta:{
                            title:'我的购物车'
                        }
                    },
                    {
                        path:'/order',
                        name:'order',
                        component:Order,
                        meta:{
                            title:'我的订单'
                        }
                    },
                    {
                        path:'/users',
                        name:'consumer',
                        component:Consumer,
                        meta:{
                            title:'用户管理'
                        }
                    },
                    {
                        path:'/menus',
                        name:'menu',
                        component:Menu,
                        meta:{
                            title:'菜单管理'
                        }
                    },
                    {
                        path:'/permissions',
                        name:'access',
                        component:Access,
                        meta:{
                            title:'权限管理'
                        }
                    },
                    {
                        path:'/roles',
                        name:'role',
                        component:Role,
                        meta:{
                            title:'角色管理'
                        }
                    },
                    {
                        path:'/organizations',
                        name:'organize',
                        component:Organize,
                        meta:{
                            title:'组织架构'
                        }
                    },
                    // 新增入库单 2021/5/18
                    {
                        path:'/personal',
                        name:'personal',
                        component:personal,
                        meta:{
                            title:'入库单'
                        }
                    },
                    {
                        path:'/publish',
                        name:'publish',
                        component:publish,
                        children:[
                            {
                                path:'/',        //如果只写 / 则说明默认打开一个页面
                                redirect:'categories'//默认指向页面
                            },
                            {
                                path:'/categories',
                                name:'categories',
                                component:categories,
                                meta:{
                                    title:'选择分类'
                                } 
                            },
                            {
                                path:'/infortion',
                                name:'infortion',
                                component:infortion,
                                meta:{
                                    title:'基础信息'
                                } 
                            },
                            {
                                path:'/release',
                                name:'release',
                                component:release,
                                meta:{
                                    title:'发布商品'
                                } 
                            },
                            
                        ]
                    },
                    {
                        path:'/approving',
                        name:'approving',
                        component:approving,
                        meta:{
                            title:'待我审批'
                        },
                    },
                    {
                        path:'/approved',
                        name:'approved',
                        component:approved,
                        meta:{
                            title:'已审批'
                        },
                    },
                    
                    
                ]
            }
            
            
        ]
    }
]

// const asyncRoute=[
//     {
//         path:'/crm',
//         name:'layout',
//         component:Layout,
//         meta:{
//             requiresAuth:true
//         },
//         children:[
//             {
//                 path:'',
//                 name:'crm',                
//                 component:crm,                
//                 children:[
//                     {
//                         path:'/me',
//                         name:'me',
//                         component:Me, 
//                         meta:{
//                             title:'我的主页'
//                         }                                                             
//                     },
//                     {
//                         path:'/cart',
//                         name:'cart',
//                         component:Cart,
//                         meta:{
//                             title:'我的购物车'
//                         }
//                     },
//                     {
//                         path:'/order',
//                         name:'order',
//                         component:Order,
//                         meta:{
//                             title:'我的订单'
//                         }
//                     },
//                     {
//                         path:'/users',
//                         name:'consumer',
//                         component:Consumer,
//                         meta:{
//                             title:'用户管理'
//                         }
//                     },
//                     {
//                         path:'/menus',
//                         name:'menu',
//                         component:Menu,
//                         meta:{
//                             title:'菜单管理'
//                         }
//                     },
//                     {
//                         path:'/permissions',
//                         name:'access',
//                         component:Access,
//                         meta:{
//                             title:'权限管理'
//                         }
//                     },
//                     {
//                         path:'/roles',
//                         name:'role',
//                         component:Role,
//                         meta:{
//                             title:'角色管理'
//                         }
//                     },
//                     {
//                         path:'/organizations',
//                         name:'organize',
//                         component:Organize,
//                         meta:{
//                             title:'组织架构'
//                         }
//                     }
                    
                    
//                 ]
//             }
//         ]
//     }
// ]
const router= createRouter({
    history:createWebHashHistory(),
    routes
    
})

router.beforeEach((to,from,next)=>{
    console.log(to.matched);
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.state.user.token) {         
          next({
            name: 'login',
            query: { 
              redirect: to.fullPath 
            }
          })
        } else {
          next() 
        }
    }else {
        next() 
    }
})
 


export default router



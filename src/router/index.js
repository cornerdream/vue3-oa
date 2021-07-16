import { createRouter, createWebHashHistory } from 'vue-router'
import { shallowRef } from '@vue/reactivity'
import store from '@/store'

/*
 *商城、后台样式
 */
// import Layout from '@/layout/index.vue'
import homeLayout from '@/layout/home-layout/index.vue'
import detailLayout from '@/layout/detail-layout/index.vue'
import crmLayout from '@/layout/crm/index.vue'
// import crm from '@/views/crm/index.vue'

const Login = () =>
    import( /*webpackChunkName:'login'*/ '@/components/login/index.vue')
const Page404 = () =>
    import( /*webpackChunkName:'login'*/ '@/components/404/index.vue')
/*
 *商城
 */
const Home = () =>
    import( /*webpackChunkName:'shop'*/ '@/views/shop/home/index.vue')
const ProductClassify = () =>
    import( /*webpackChunkName:'shop'*/ '@/views/shop/productClassify/index.vue')
const Search = () =>
    import( /*webpackChunkName:'shop'*/ '@/views/shop/search/index.vue')
const ProductDetail = () =>
    import( /*webpackChunkName:'shop'*/ '@/views/shop/productDetail/index.vue')
const Cart = () =>
    import( /*webpackChunkName:'shop'*/ '@/views/shop/cart/index.vue')
/*
 *后台我的
 */
const Orders = () =>
    import( /*webpackChunkName:'crm'*/ '@/views/crm/home/order/index.vue') // 订单
const orderdetail = () =>
    import( /*webpackChunkName:'crm'*/ '@/views/crm/home/order/components/orderDetail.vue') // 订单
const approving = () =>
    import( /*webpackChunkName:'workflows'*/ '@/views/crm/workflows/approving/index.vue');
const approved = () =>
    import( /*webpackChunkName:'workflows'*/ '@/views/crm/workflows/approved/index.vue');

/*
 *系统设置
 */

//帮助
const help = () =>
    import( /*webpackChunkName:'workflows'*/ '@/views/helptype/index.vue');

const routes = [{
    path: '/login',
    name: 'login',
    component: Login
},
{
    path: '/',
    name: 'homeLayout',
    component: homeLayout,
    meta: {
        requiresAuth: true
    },
    children: [{
        path: '',
        name: 'home',
        component: Home
    },]
},
{
    path: '/detail',
    name: 'detailLayout',
    redirect: {
        name: 'page404',
        params: { pathMatch: 'page404' }
    },
    component: detailLayout,
    meta: {
        requiresAuth: true
    },
    children: [{
        path: '/404',
        name: 'page404',
        component: Page404
    },
    {
        path: '/productClassify',
        name: 'productClassify',
        component: ProductClassify
    },
    {
        path: '/search',
        name: 'search',
        component: Search
    },
    {
        path: '/productDetail',
        name: 'productDetail',
        component: ProductDetail
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart
    }
    ]
},
{
    path: '/crm',
    name: 'crm',
    redirect: {
        name: 'page404',
        params: { pathMatch: 'page404' }
    },
    component: crmLayout,
    meta: {
        requiresAuth: true
    },
    children: [
        {
            path: '/orders',
            name: 'orders',
            component: Orders
        },
        {
            path: '/approving',
            name: 'approving',
            component: approving
        },
        {
            path: '/approved',
            name: 'approved',
            component: approved
        },
        {
            path: '/orderdetail',
            name: 'orderdetail',
            component: orderdetail
        },
    ]
},
{ path: '/:pathMatch(.*)', name: 'page404', component: Page404 },
{
    path: '/help',
    name: 'help',
    component: help
}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!store.state.user) {
            next({
                name: 'login',
                query: {
                    redirect: to.fullPath
                }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
import { createRouter, createWebHashHistory} from 'vue-router'

import store from '@/store'

/*
 *商城、后台样式
 */
import blank from '@/components/blank/index.vue'
// import Layout from '@/layout/index.vue'
import homeLayout from '@/layout/home-layout/index.vue'
import detailLayout from '@/layout/detail-layout/index.vue'
import crmLayout from '@/layout/crm/index.vue'
// import crm from '@/views/crm/index.vue'

const Login = () => import(/*webpackChunkName:'login'*/ '@/components/login/index.vue')
const Page404 = () => import(/*webpackChunkName:'login'*/ '@/components/404/index.vue')
/*
 *商城
 */
const Home = () => import(/*webpackChunkName:'shop'*/ '@/views/shop/home/index.vue')
const ProductClassify = () => import(/*webpackChunkName:'shop'*/ '@/views/shop/productClassify/index.vue')
const Search = () => import(/*webpackChunkName:'shop'*/ '@/views/shop/search/index.vue')
const ProductDetail = () =>
  import(/*webpackChunkName:'shop'*/ '@/views/shop/productDetail/index.vue')
const Cart = () => import(/*webpackChunkName:'shop'*/ '@/views/shop/cart/index.vue')
/*
 *后台我的
 */
const Me = () => import(/*webpackChunkName:'home'*/ '@/views/crm/home/me/index.vue')
const Orders = () =>
  import(/*webpackChunkName:'home'*/ '@/views/crm/home/order/index.vue')
// //入库单
// const personal = () => import(/*webpackChunkName:'warehouse'*/'@/views/crm/warehouse/index.vue');
// const publish = () => import(/*webpackChunkName:'list'*/'@/views/crm/list/selectlist/index.vue');
// const detail = () => import(/*webpackChunkName:'warehouse'*/'@/views/crm/warehouse/components/detail.vue');
// const categories = () => import(/*webpackChunkName:'list'*/'@/views/crm/list/selectlist/components/categories/categories.vue');
// const infortion = () => import(/*webpackChunkName:'list'*/'@/views/crm/list/selectlist/components/infortion/infortion.vue');
// const release = () => import(/*webpackChunkName:'list'*/'@/views/crm/list/selectlist/components/release/release.vue');
// // 审批管理

// const approving = () => import(/*webpackChunkName:'approving'*/'@/views/crm/approving/index.vue');
// const approved = () => import(/*webpackChunkName:'approved'*/'@/views/crm/approved/index.vue');
// const picking = () => import(/*webpackChunkName:'picking'*/'@/views/crm/picking/index.vue');
// const picklist = () => import(/*webpackChunkName:'picking'*/'@/views/crm/picking/components/picklist.vue');
// const pickdetail = () => import(/*webpackChunkName:'picking'*/'@/views/crm/picking/components/pickdetail.vue');
//采购订单
const personal = () => import(/*webpackChunkName:'home'*/'@/views/crm/order/index.vue');
const unhandle = () => import(/*webpackChunkName:'home'*/'@/views/crm/order/unhandle.vue');
const handled = () => import(/*webpackChunkName:'home'*/'@/views/crm/order/handled.vue');
const order = () => import(/*webpackChunkName:'home'*/'@/views/crm/order/order.vue');
const detail = () => import(/*webpackChunkName:'home'*/'@/views/crm/order/components/detail.vue');
const publish = () => import(/*webpackChunkName:'home'*/'@/views/crm/order/publish/index.vue');
const categories = () => import(/*webpackChunkName:'home'*/'@/views/crm/order/publish/components/categories/categories.vue');
const infortion = () => import(/*webpackChunkName:'home'*/'@/views/crm/order/publish/components/infortion/infortion.vue');
const release = () => import(/*webpackChunkName:'home'*/'@/views/crm/order/publish/components/release/release.vue');
// 审批管理
const approving = () => import(/*webpackChunkName:'workflows'*/'@/views/crm/workflows/approving/index.vue');
const approved = () => import(/*webpackChunkName:'workflows'*/'@/views/crm/workflows/approved/index.vue');
//仓库管理
const picking = () => import(/*webpackChunkName:'warehouse'*/'@/views/crm/warehouse/index.vue');
const picklist = () => import(/*webpackChunkName:'warehouse'*/'@/views/crm/warehouse/components/picklist.vue');
const pickdetail = () => import(/*webpackChunkName:'warehouse'*/'@/views/crm/warehouse/components/pickdetail.vue');

/*
 *系统设置
 */
const Consumer = () =>
  import(/*webpackChunkName:'system'*/ '@/views/crm/system/consumer/index.vue')
const Menu = () =>
  import(/*webpackChunkName:'system'*/ '@/views/crm/system/menu/index.vue')
const Access = () =>
  import(/*webpackChunkName:'system'*/ '@/views/crm/system/access/index.vue')
const Role = () =>
  import(/*webpackChunkName:'system'*/ '@/views/crm/system/role/index.vue')
const Organize = () =>
  import(/*webpackChunkName:'system'*/ '@/views/crm/system/organize/index.vue')





const routes= [
  {
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
    children:[
      {
        path:'',
        name:'home',
        component:Home
      }
    ]
  },
  {
    path:'/detail',
    name:'detailLayout',
    redirect:{
      name:'page404',
      params: { pathMatch: 'page404' }
    },
    component:detailLayout,
    meta: {
      requiresAuth: true
    },
    children:[
      {
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
      },
    ]
  },
  {
    path:'/crm',
    name:'crm',
    redirect:{
      name:'page404',
      params: { pathMatch: 'page404' }
    },
    component:crmLayout,
    meta: {
      requiresAuth: true
    },
    children:[
      {
        path: '/me',
        name: 'me',
        component: Me
      },
      {
        path: '/orders',
        name: 'orders',
        component: Orders
      },
      {
        path: '/users',
        name: 'consumer',
        component: Consumer
      },
      {
        path: '/menus',
        name: 'menu',
        component: Menu
      },
      {
        path: '/permissions',
        name: 'access',
        component: Access
      },
      {
        path: '/roles',
        name: 'role',
        component: Role
      },
      {
        path: '/organizations',
        name: 'organize',
        component: Organize
      },
      // 新增入库单 2021/5/18
      {
        path: '/personal',
        name: 'personal',
        component: personal
      },
      {
        path: '/detail',
        name: 'detail',
        component: detail
      },
      {
        path: '/unhandle',
        name: 'unhandle',
        component: unhandle,
        meta: {
          title: '待采购'
        }
      },
      {
        path: '/handled',
        name: 'handled',
        component: handled,
        meta: {
          title: '已完成'
        }
      },
      {
        path: '/order',
        name: 'order',
        component: order,
        meta: {
          title: '到货单'
        }
      },
      {
        path: '/publish',
        name: 'publish',
        component: publish,
        children: [
          {
            path: '',        //如果只写 / 则说明默认打开一个页面
            redirect: 'categories'//默认指向页面
          },
          {
            path: '/categories',
            name: 'categories',
            component: categories
          },
          {
            path: '/infortion',
            name: 'infortion',
            component: infortion
          },
          {
            path: '/release',
            name: 'release',
            component: release
          }

        ]
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
        path: '/picking',
        name: 'picking',
        component: picking
      },
      {
        path: '/picklist',
        name: 'picklist',
        component: picklist
      },
      {
        path: '/pickdetail',
        name: 'pickdetail',
        component: pickdetail
      },
    ]
  },
  { path: '/:pathMatch(.*)', name: 'page404', component: Page404 },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to.matched)
  if (to.matched.some((record) => record.meta.requiresAuth)) {
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
  } else {
    next()
  }
})

export default router

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import store from '../store'

/*
 *商城、后台样式
 */
import Layout from '../layout/index.vue'
import crm from '../views/crm/index.vue'

const Login = () => import(/*webpackChunkName:'login'*/ '../components/login/index.vue')
/*
 *商城
 */
const Home = () => import(/*webpackChunkName:'shop'*/ '../views/shop/home/index.vue')
const ProductClassify = () => import(/*webpackChunkName:'shop'*/ '../views/shop/productClassify/index.vue')
const ProductDetail = () =>
import(/*webpackChunkName:'shop'*/ '../views/shop/productDetail/index.vue')
const Cart = () => import(/*webpackChunkName:'shop'*/ '../views/shop/cart/index.vue')
/*
 *后台我的
 */
const Me = () => import(/*webpackChunkName:'home'*/ '../views/crm/components/home/me/index.vue')
const Order = () =>
  import(/*webpackChunkName:'home'*/ '../views/crm/components/home/order/index.vue')
/*
 *系统设置
 */
const Consumer = () =>
  import(/*webpackChunkName:'system'*/ '../views/crm/components/system/consumer/index.vue')
const Menu = () =>
  import(/*webpackChunkName:'system'*/ '../views/crm/components/system/menu/index.vue')
const Access = () =>
  import(/*webpackChunkName:'system'*/ '../views/crm/components/system/access/index.vue')
const Role = () =>
  import(/*webpackChunkName:'system'*/ '../views/crm/components/system/role/index.vue')
const Organize = () =>
  import(/*webpackChunkName:'system'*/ '../views/crm/components/system/organize/index.vue')


const routes:Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'layout',
    component: () => Layout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
        meta: { title: '首页', icon: 'index', noCache: true }
      },
      {
        path: '/productClassify',
        name: 'productClassify',
        component: ProductClassify
      },
      
      {
        path: '/productDetail',
        name: 'productDetail',
        component: ProductDetail
      },
      {
        path: '/cart',
        name: 'cart',
        component: Cart,
        meta: {
          title: '我的购物车'
        }
      },
      {
        path: '/crm',
        name: 'crm',
        component: () => crm,
        children: [
          {
            path: '/me',
            name: 'me',
            component: Me,
            meta: {
              title: '我的主页'
            }
          },         
          {
            path: '/order',
            name: 'order',
            component: Order,
            meta: {
              title: '我的订单'
            }
          },
          {
            path: '/users',
            name: 'consumer',
            component: Consumer,
            meta: {
              title: '用户管理'
            }
          },
          {
            path: '/menus',
            name: 'menu',
            component: Menu,
            meta: {
              title: '菜单管理'
            }
          },
          {
            path: '/permissions',
            name: 'access',
            component: Access,
            meta: {
              title: '权限管理'
            }
          },
          {
            path: '/roles',
            name: 'role',
            component: Role,
            meta: {
              title: '角色管理'
            }
          },
          {
            path: '/organizations',
            name: 'organize',
            component: Organize,
            meta: {
              title: '组织架构'
            }
          }
        ]
      }
    ]
  }
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

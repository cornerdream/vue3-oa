import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import store from '../store'

/*
 *商城、后台样式
 */
import Layout from '../layout/index.vue'
import crm from '../views/crm/index.vue'

const Login = () => import(/*webpackChunkName:'login'*/ '../components/login/index.vue')
const Page404 = () => import(/*webpackChunkName:'login'*/ '../components/404/index.vue')
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
const Orders = () =>
  import(/*webpackChunkName:'home'*/ '../views/crm/components/home/order/index.vue')
//采购订单
const personal = () => import(/*webpackChunkName:'home'*/'../views/crm/components/order/index.vue');
const unhandle = () => import(/*webpackChunkName:'home'*/'../views/crm/components/order/unhandle.vue');
const handled = () => import(/*webpackChunkName:'home'*/'../views/crm/components/order/handled.vue');
const order = () => import(/*webpackChunkName:'home'*/'../views/crm/components/order/order.vue');
const detail = () => import(/*webpackChunkName:'home'*/'../views/crm/components/order/components/detail.vue');
const publish = () => import(/*webpackChunkName:'home'*/'../views/crm/components/order/publish/index.vue');
const categories = () => import(/*webpackChunkName:'home'*/'../views/crm/components/order/publish/components/categories/categories.vue');
const infortion = () => import(/*webpackChunkName:'home'*/'../views/crm/components/order/publish/components/infortion/infortion.vue');
const release = () => import(/*webpackChunkName:'home'*/'../views/crm/components/order/publish/components/release/release.vue');
// 审批管理
const approving = () => import(/*webpackChunkName:'home'*/'../views/crm/components/workflows/approving/index.vue');
const approved = () => import(/*webpackChunkName:'home'*/'../views/crm/components/workflows/approved/index.vue');
//仓库管理
const picking = () => import(/*webpackChunkName:'home'*/'../views/crm/components/warehouse/index.vue');
const picklist = () => import(/*webpackChunkName:'home'*/'../views/crm/components/warehouse/components/picklist.vue');
const pickdetail = () => import(/*webpackChunkName:'home'*/'../views/crm/components/warehouse/components/pickdetail.vue');

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


const routes: Array<RouteRecordRaw> = [
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
        path: '/404',
        name: 'page404',
        component: Page404,      
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
            path: '/orders',
            name: 'orders',
            component: Orders,
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
          },
          // 新增入库单 2021/5/18
          {
            path: '/personal',
            name: 'personal',
            component: personal,
            meta: {
              title: '采购订单',
            },
          },
          {
            path: '/detail',
            name: 'detail',
            component: detail,
            meta: {
              title: '采购订单详情'
            }
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
                path: '/',        //如果只写 / 则说明默认打开一个页面
                redirect: 'categories'//默认指向页面
              },
              {
                path: '/categories',
                name: 'categories',
                component: categories,
                meta: {
                  title: '选择分类'
                }
              },
              {
                path: '/infortion',
                name: 'infortion',
                component: infortion,
                meta: {
                  title: '基础信息'
                }
              },
              {
                path: '/release',
                name: 'release',
                component: release,
                meta: {
                  title: '发布商品'
                }
              },

            ]
          },
          {
            path: '/approving',
            name: 'approving',
            component: approving,
            meta: {
              title: '待我审批'
            },
          },
          {
            path: '/approved',
            name: 'approved',
            component: approved,
            meta: {
              title: '已审批'
            },
          },
          {
            path: '/picking',
            name: 'picking',
            component: picking,
            meta: {
              title: '库存概览'
            },
          },
          {
            path: '/picklist',
            name: 'picklist',
            component: picklist,
            meta: {
              title: '出库单列表'
            },
          },
          {
            path: '/pickdetail',
            name: 'pickdetail',
            component: pickdetail,
            meta: {
              title: '出库单详情'
            },
          },
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

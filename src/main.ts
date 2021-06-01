import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index'
import store from './store/index'

import elementplus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import './styles/index.scss'
import './icons/iconfont.css'
// import './permission'




createApp(App).use(router).use(store).use(elementplus).mount('#app')

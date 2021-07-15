import { createApp } from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router/index'
import store from './store/index'
import elementplus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import './styles/index.scss'
import './styles/web.assets_common.css'
import './icons/iconfont.css'
// import './permission'
import locale from 'element-plus/lib/locale/lang/zh-cn' //DatePicker显示中文
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.withCredentials = true // 允许携带cookie
Vue.prototype.$axios = axios

const app = createApp(App);
app.use(router).use(store).use(elementplus, { locale }).use(Vuex).use(VueAxios, axios).mount('#app')
    // app.provide('$url', 'http://192.168.1.212:8000');
app.provide('$url', 'http://192.168.1.218:8000');
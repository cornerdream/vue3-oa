import {createStore} from 'vuex'

import user from './modules/login'
import sliderMenus from './modules/sliderMenus'
// import permission from './modules/permission'
import getters from './getters'


// import router from '../router'
// import {routes} from '../router'
import Layout from '../layout/index.vue'
// import { getCurrentInstance } from "vue";
// import { useRouter } from "vue-router";

// const router = useRouter();
// console.log(router);
// const initRoutes = router.options.routes;

export default createStore({
    modules: {      
        user, 
        sliderMenus
        // permission
    },
    getters,
    
})


  

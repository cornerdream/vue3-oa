import {createStore} from 'vuex'

const defaultState ={

}

export default createStore({
    state(){
        return defaultState
    },
    mutations:{
        increment(state:typeof defaultState){

        }
    },
    actions:{
        increment(context){
            context.commit('increment')
        }
    },
    getters:{
        double(state:typeof defaultState){
            return 
        }
    }
})
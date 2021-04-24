import {createStore} from 'vuex'

const defaultState ={
    user:JSON.parse(window.localStorage.getItem('user') || 'null')
}

export default createStore({
    state(){
        return defaultState
    },
    mutations:{
        setUser(state:typeof defaultState,payload){
            state.user = JSON.parse(payload);
            window.localStorage.setItem('user',payload)
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
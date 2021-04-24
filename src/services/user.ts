import $axios from '@/utils/axios'
import qs from 'qs'

interface User {
    phone:string
    password:string
}

export const login = (data:User) =>{
    return $axios({
        method:'POST',
        url:'',
        data:qs.stringify(data)
    })
}

export const getUserInfo = () => {
    return $axios({
        method:'GET',
        url:''
    })
}
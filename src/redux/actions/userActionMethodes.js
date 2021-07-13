
import Types from './types'
export const LogOut=()=>{
    return { type: Types.logOut, payload: null }    
}

export const SaveFcm=(payload)=>{
    return {type:Types.saveToken,payload:payload}
}
export const Login=(payload)=>{
    return {type:Types.signIn,payload:payload}
}
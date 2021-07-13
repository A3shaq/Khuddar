import React from 'react';
import AuthNav from './authstackNavigation';
import LoginUserStack from './drawernavigation';
import {useSelector} from 'react-redux';
import { headers } from '../utiles/reduxConfig/persistConfig';
export default ()=>{
    const user = useSelector(e => e.userReducer)
    if(user==null)
    {
        return <AuthNav/>
    }
    else{
        return <LoginUserStack/>
    }
}
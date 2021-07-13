import {combineReducers} from 'redux';
import {userReducer,userLanguage,userLocation,systemLanguages,userAddresses,fcmToken} from './user';

export default combineReducers({
    userReducer,
    userLanguage,
    systemLanguages,
    userLocation,
    userAddresses,
    fcmToken,
  });
  


import React from 'react';
import {Dimensions} from 'react-native'
import { Avatar } from 'react-native-paper';
import {styles} from '../../../styles/authStyles';
import {RFPercentage,RFValue} from 'react-native-responsive-fontsize'
import { headers, store } from '../../../utiles/reduxConfig/persistConfig';
const dimension=Dimensions.get('window');
const MyComponent = () => {
  console.log(headers.image)
  return(
    store.getState().userReducer.image == null ?
  <Avatar.Image size={dimension.width/5}  source={{uri:'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg'}} />:
  <Avatar.Image size={dimension.width/5}  source={{uri:store.getState().userReducer.image}} />
  )};
export default MyComponent

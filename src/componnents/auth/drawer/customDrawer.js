import React from 'react';
import { DrawerContentScrollView} from '@react-navigation/drawer';
import {View,Text,ScrollView} from 'react-native'
import ProfileImage from './profileImage';
import { Avatar } from 'react-native-paper';
import DrawerItem from './drawerItem'
import {styles} from '../../../styles/authStyles';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import { RFPercentage,RFValue } from 'react-native-responsive-fontsize';
import {useDispatch} from 'react-redux'
import {LogOut} from '../../../redux/actions/userActionMethodes'
import { Nav } from '../../../navigation/navigationType';
import { headers, store } from '../../../utiles/reduxConfig/persistConfig';
import { StackActions } from '@react-navigation/native';

export default (props)=>{
  const navigation = props.navigation;
  const dispatch=useDispatch();
  const handleLogOut=()=>{
      dispatch(LogOut())
  }
console.log(headers)
     return (
        <View style={{flex: 1,backgroundColor:'white'}}>
            <ScrollView {...props}>
         <View style={[styles.ctr,styles.felxRow,styles.mt10,{borderBottomWidth:1,borderBottomColor: "#b0b0b08c",paddingBottom:RFValue(25)}]}>
         <ProfileImage/>
         <View style={[styles.mt5,styles.ctr]}>
             <Text style={[styles.mainTitleHead1]}>{store.getState().userReducer.name}</Text>
             <Text style={[styles.mainpara,styles.mntp10]}>{store.getState().userReducer.email}</Text>
         </View>
         </View>
          <DrawerItem icon="home" title="Home" callBack={()=>{navigation.dispatch(StackActions.replace(Nav.HomeStack)); navigation.dispatch(DrawerActions.closeDrawer())}} />
          <DrawerItem icon="shopping" title="Mart Cart" callBack={()=>{navigation.navigate(Nav.Mart)}} />
          <DrawerItem icon="cart" title="E-Commerce Cart" callBack={()=>{navigation.navigate(Nav.ECommerce)}} />
          <DrawerItem icon="account" title="Setting" callBack={()=>{navigation.navigate(Nav.Profile)}} />
          <DrawerItem icon="timeline-help" title="Help" callBack={()=>navigation.navigate(Nav.Help)} />
          <DrawerItem icon="information" title="About" callBack={()=>navigation.navigate(Nav.About)}/>
          <DrawerItem icon="logout-variant" title="Log out" callBack={handleLogOut} />

         

        </ScrollView>
        {/* <View style={{position:'absolute',bottom:RFValue(10),borderTopWidth:1,borderTopColor: "#b0b0b08c",width:'100%'}}>

        </View> */}
        </View>
      );
}
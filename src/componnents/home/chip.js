import * as React from 'react';
import { Chip } from 'react-native-paper';
import {Image,Text,TouchableOpacity,View} from 'react-native';
import { styles } from '../../styles/authStyles';
import Entypo from 'react-native-vector-icons/Entypo';
const MyComponent = ({label,img,active,handlePress,handlePressRight}) => (
 active? <View style={[styles.themeBackColor,{paddingTop:5,paddingBottom:5,paddingLeft:10,paddingRight:10,borderRadius:20}]} ><TouchableOpacity onPress={() => handlePress?handlePress():null} style={{flexDirection:'row'}} ><Entypo name="plus" size={18} color="white" /><Text style={{color:'white'}}>{label}</Text></TouchableOpacity></View>
 : <View style={[styles.themeBackColor,{paddingTop:5,paddingBottom:5,paddingLeft:10,paddingRight:10,borderRadius:20,flexDirection:'row'}]} ><TouchableOpacity onPress={() => handlePress?handlePress():null}  ><Entypo name="plus" size={18} color="white" /></TouchableOpacity ><Text style={{color:'white'}}>{label}</Text><TouchableOpacity onPress={() => handlePressRight?handlePressRight():null}><Entypo name="minus" size={18} color="white" /></TouchableOpacity></View>
);

export default MyComponent;
import React from 'react';
import { View, Text, Dimensions,Image } from 'react-native';
import LottieView from 'lottie-react-native';
import {RFValue,RFPercentage} from 'react-native-responsive-fontsize'
const width = Dimensions.get('window').width;
import { Avatar } from 'react-native-paper';
import {styles} from '../../styles/authStyles'

export default function () {

return <View style={[{ justifyContent:'center',alignItems:'center', width: width / 1.1,height:width*2,marginTop:RFValue(10), borderRadius: 30, maxHeight: 230,  alignSelf: 'center' },styles.themeBackColor]}>
       <Text style={[{color:'white',fontSize:17},styles.PoppinsMedium]}>Quiz Results</Text>
        <View style={{flexDirection:'row',justifyContent:'center'}}> 
        <View style={{position:'relative',zIndex:-1,left:RFValue(25),top:RFValue(20)}}>
                            <Image style={{width:30,height:30,position:"relative",top:20,zIndex:1}} resizeMode="stretch" source={require('../../images/quiz/second.png')}/>
                    <Avatar.Image size={80} source={{uri:'https://phowdimages.azureedge.net/cloud/pics/8137/p/c7bfc992b6614bf9a36057506e1bfc4c/1.jpg?preset=details'}} />
    </View>
    <View style={{position:'relative',zIndex:-1}}>
                            <Image style={{width:30,height:30,position:"relative",top:4,left:RFValue(30),zIndex:1}} resizeMode="stretch" source={require('../../images/quiz/crown.png')}/>
                    <Avatar.Image size={80} source={{uri:'https://previews.123rf.com/images/golubovy/golubovy1806/golubovy180600547/103613892-passport-document-id-photo-concept-business-man-portrait-young-handsome-stylish-guy-in-formal-wear-w.jpg'}} />
    </View>
    <View style={{position:'relative',zIndex:-2,right:RFValue(25),top:RFValue(20)}}>
                            <Image style={{width:30,height:30,position:"relative",top:20,left:RFValue(50),zIndex:1}} resizeMode="stretch" source={require('../../images/quiz/third.png')}/>
                    <Avatar.Image size={80} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7kSxRPkMCRNFA_90eJNEC-UKSouCd4Reog&usqp=CAU'}} />
    </View>
{/* 
            <Avatar.Image source={{uri:''}} />
            <Avatar.Image source={{uri:''}} /> */}
        </View>

    </View>
}
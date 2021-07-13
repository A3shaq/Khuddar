import React, { useState } from 'react';
import { View, Image, Text, ScrollView, SafeAreaView,TouchableOpacity, Alert } from 'react-native';
import { styles } from '../../styles/authStyles';
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import { Nav } from '../../navigation/navigationType'
import * as Animatable from 'react-native-animatable';
import {RFValue} from 'react-native-responsive-fontsize';
import RNFetchBlob from 'rn-fetch-blob';
import LottieView from 'lottie-react-native';
import { useDispatch } from 'react-redux';
import {Login} from '../../redux/actions/userActionMethodes'
import AwesomeAlert from 'react-native-awesome-alerts';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export default ({route}) => {
    const navigation=useNavigation();
    console.log(route.params.code)
    const dispatch=useDispatch();
    const [familyCode] = useState(route.params.code);
    const [otp, setOtp] = useState('');
    const [Message, setMessage] = useState(''); 
    const [loading ,setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState('');

    const handleLogin= async()=>{
        const response = await RNFetchBlob.fetch(
            'POST',
            `https://khuddar.org/application/api/member/login2`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            [
               {name: 'family_code', data: familyCode + ''},
               {name: 'otp', data: otp + ''},
           ],
          )
            .then((response) => response.json())
            .then((response) => {
            //   console.log(response.response.user.token);
           //    setMessage(response.message);
              setLoading(false);
              if(response.success==true){
   
                dispatch(Login({
                    _token:response.response.user.token.token,
                    id:response.response.user.token.user_id
                }))
              }
              else
              {
              
           setAlert(response.message);
           setShowAlert(true);
            }
            })
            .catch((error) => {
              console.log(error);
            });
        
    }
    return <View style={{flex:1,backgroundColor:'white',justifyContent:'center'}}>
    <Animatable.View animation="fadeInLeft">
     <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'white'}}>
        <View style={styles.containerLeft}>
            <Image style={[styles.logo,{alignSelf:'center',marginBottom:RFValue(30)},styles.mt5,styles]} source={require('../../images/kdm.png')} />
            <Text style={[styles.mainTitleHead, styles.mt3]}><Text style={styles.themeColor}>F</Text><Text>orget</Text><Text style={styles.themeColor}> P</Text>assword</Text>
            <Text style={[styles.mainpara, styles.mnt1]}>Enter verification code</Text>
            
            <TextInput
                label="Security code"
                mode='outlined'
                onChangeText={(otp)=>{setOtp(otp); setMessage('')}}
                style={[styles.textInput,styles.mt5]}
                left={
                    <TextInput.Icon
                    name={()=><MaterialCommunityIcons name="account-key" size={16}  style={[styles.themeColor,{paddingTop:'30%'}]} />}
                   
                  />
                  }            />
        
        {Message != '' ? 
            <Text style={{fontSize:12, color:'red'}}>
                {Message}
            </Text> : null}
            {loading == false ?
            <Button mode="contained" style={[styles.buttonMain, styles.mt5, styles.border1]} 
            onPress={() => 
            {
                if(otp == ''){
                    setMessage('Required')
                }
                else{
                    handleLogin()
                    setLoading(true)
                }            }}>
                <Text style={styles.textTr,styles.themeColorwhite}> Verify</Text>
            </Button>
            :
            <View  style={[ styles.mt5,{backgroundColor:'#21c5df',height:47, width: '100%',
             borderRadius: 6,}]}>
            <LottieView
                source={require('../../animations/loading.json')}
                autoPlay={true}
                loop={true}
                resizeMode="contain"
                progress={0}
            />
            </View>
            }
            <View style={{alignSelf:'center'}}>
            <TouchableOpacity onPress={() => console.log()}>
            <Text style={[styles.mainpara, styles.mt10]}>Resend <Text style={styles.themeColor}>Code</Text></Text>
           
                </TouchableOpacity>
            </View>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title=""
          message={alert}
          contentContainerStyle={{width:widthPercentageToDP('95')}}
          confirmButtonStyle={{width:widthPercentageToDP('20'),alignItems:'center'}}
          messageStyle={{fontFamily:'PoppinsRegular'}}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Ok"
          confirmButtonColor="#21c5df"
          onConfirmPressed={() => {
            setShowAlert(false);
          }}
        />
        </View>
    </ScrollView></Animatable.View>
    </View>
}
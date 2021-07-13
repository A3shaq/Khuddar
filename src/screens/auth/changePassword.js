import React, { useState } from 'react';
import { View, Image, Text, ScrollView, SafeAreaView,TouchableOpacity } from 'react-native';
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
import AwesomeAlert from 'react-native-awesome-alerts';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { localNotification } from '../../componnents/Notifications';

export default () => {
    const navigation=useNavigation();
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState('');
    const [otp, setotp] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [otpMessage, setOtpMessage] = useState(''); 
    const [passwordMessage, setPasswordMessage] = useState(''); 
    const handleLogin= async()=>{
        const response = await RNFetchBlob.fetch(
            'POST',
            `https://khuddar.org/application/api/reset_password`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            [
               {name: 'pin', data: otp + ''},
               {name: 'password', data: password + ''},
           ],
          )
            .then((response) => response.json())
            .then((response) => {
              console.log(response.response.user);
           //    setMessage(response.message);
              setLoading(false);
              
           setAlert(response.message);
           setShowAlert(true);

            })
            .catch((error) => {
              console.log(error);
            });
        
    }
    return   <View style={{flex:1,backgroundColor:'white',justifyContent:'center'}}>
    <Animatable.View animation="fadeInLeft">
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'white'}}>
        <View style={styles.containerLeft}>
            <Image style={[styles.logo,{alignSelf:'center',marginBottom:RFValue(30)},styles.mt5,styles]} source={require('../../images/kdm.png')} />
            <Text style={[styles.mainTitleHead, styles.mt3]}><Text style={styles.themeColor}>C</Text><Text>hange</Text><Text style={styles.themeColor}> P</Text>assword</Text>
            <Text style={[styles.mainpara, styles.mnt1]}>Enter new password</Text>
            
            <TextInput
                label="Pin"
                mode='outlined'
                value={otp}
                onChangeText={(otp)=>{setOtp(otp); setOtpMessage('')}}
                style={[styles.textInput,styles.mt5]}
                left={
                    <TextInput.Icon
                    name={()=><MaterialCommunityIcons name="lock" size={16}  style={[styles.themeColor,{paddingTop:'30%'}]} />}
                   
                  />
                  }            />
                    {otpMessage != '' ? 
            <Text style={{fontSize:12, color:'red'}}>
                {otpMessage}
            </Text> : null}

<TextInput
                label="Password"
                mode='outlined'
                value={password}
                onChangeText={(password)=>{setPassword(password); setPasswordMessage('')}}
                style={[styles.textInput,styles.mt5]}
                left={
                    <TextInput.Icon
                    name={()=><AntDesign name="lock1" size={16}  style={[styles.themeColor,{paddingTop:'30%'}]} />}
                   
                  />
                  }            />
            {passwordMessage != '' ? 
            <Text style={{fontSize:12, color:'red'}}>
                {passwordMessage}
            </Text> : null}
            
            {loading == false ?
            <Button mode="contained" style={[styles.buttonMain, styles.mt5, styles.border1]} onPress={() => {
                if(otp == '' && password == ''){
                    setOtpMessage('Required')
                    setPasswordMessage('Required')
                }
                else if(password == ''){
                    setPasswordMessage('Required')
                }
                else if(otp == ''){
                    setOtpMessage('Required')
                }
                else{
                    // Login()
                    setLoading(true)
                    handleLogin()
                }
            }}>
                <Text style={styles.textTr,styles.themeColorwhite}>Reset</Text>
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
            <TouchableOpacity onPress={() => navigation.push(Nav.Login)}>
            <Text style={[styles.mainpara, styles.mt10]}>Have an account? <Text style={styles.themeColor}>Login</Text></Text>
            
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
    </ScrollView>
    </Animatable.View>
  
  </View>
}
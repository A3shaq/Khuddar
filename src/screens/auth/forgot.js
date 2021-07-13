import React, { useState } from 'react';
import { View, Image, Text, ScrollView, SafeAreaView,TouchableOpacity, Alert} from 'react-native';
import { styles } from '../../styles/authStyles';
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Nav } from '../../navigation/navigationType'
import * as Animatable from 'react-native-animatable';
import {RFValue} from 'react-native-responsive-fontsize';
import LottieView from 'lottie-react-native';
import RNFetchBlob from 'rn-fetch-blob';
import AwesomeAlert from 'react-native-awesome-alerts';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export default () => {
    const navigation = useNavigation();

    const [username, setUsername] = useState('92');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState('');

    const handleLogin= async()=>{
        const response = await RNFetchBlob.fetch(
            'POST',
            `https://khuddar.org/application/api/forgot_password`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            [
               {name: 'username', data: username + ''},
           ],
          )
            .then((response) => response.json())
            .then((response) => {
              console.log(response.response.user);
           //    setMessage(response.message);
              setLoading(false);
              if(response.success==true){
   navigation.navigate(Nav.Changepassword)
                
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
    return  <View style={{flex:1,backgroundColor:'white',justifyContent:'center'}}>
    <Animatable.View animation="fadeInLeft">
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white' }}>
        <View style={[styles.containerLeft, { backgroundColor: 'white' }]}>
            <Image style={[styles.logo,{alignSelf:'center',marginBottom:RFValue(30)},styles.mt5,styles]} source={require('../../images/kdm.png')} />
            <Text style={[styles.mainTitleHead, styles.mt3]}><Text style={styles.themeColor}>F</Text><Text>orget</Text><Text style={styles.themeColor}> P</Text>assword</Text>
            <Text style={[styles.mainpara, styles.mnt1]}>Enter your mobile number</Text>
            <TextInput
                label="Phone Number"
                mode='outlined'
                maxLength={12}
                value={username}
                onChangeText={(username)=>{setUsername(username); setUserMessage('')}}
                style={[styles.textInput,styles.mt5]}
                left={
                    <TextInput.Icon
                    name={()=><MaterialCommunityIcons name="phone" size={16}  style={[styles.themeColor,{paddingTop:'30%'}]} />}
                   
                  />
                  }            />
            {userMessage != '' ? 
            <Text style={{fontSize:12, color:'red'}}>
                {userMessage}
            </Text> : null}
            
            {loading == false ?
            <Button mode="contained" style={[styles.buttonMain, styles.mt5, styles.border1]} onPress={() => {
                 if(username == ''){
                    setUserMessage('Required')
                }
                else{
                    // Login()
                    setLoading(true)
                    // navigation.navigate(Nav.Changepassword)

                    handleLogin()
                }
            }}>
                <Text style={styles.textTr,styles.themeColorwhite}> Send Verification Code</Text>
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
            <View style={{ alignSelf: 'center' }}>
                <TouchableOpacity onPress={() => navigation.push(Nav.Login)}>
                    <Text style={[styles.mainpara, styles.mt5]}>Have an account? <Text style={styles.themeColor}>Login</Text></Text>

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
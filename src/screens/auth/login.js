import React, { useState } from 'react';
import { View, Image, Text, ScrollView, SafeAreaView,TouchableOpacity,Alert } from 'react-native';
import { styles } from '../../styles/authStyles';
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {Nav} from '../../navigation/navigationType'
import {Login} from '../../redux/actions/userActionMethodes';
import {useDispatch} from 'react-redux';
import {RFValue} from 'react-native-responsive-fontsize';
import * as Animatable from 'react-native-animatable';
import RNFetchBlob from 'rn-fetch-blob';
import LottieView from 'lottie-react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { headers, namee, setConfig, store } from '../../utiles/reduxConfig/persistConfig';
import { userReducer } from '../../redux/reducers/user';

export default () => {
    const navigation=useNavigation();
    const [username, setUsername] = useState('92');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [userMessage, setUserMessage] = useState(''); 
    const [passwordMessage, setPasswordMessage] = useState(''); 
    const [token, setToken] = useState('');
    const [id, setId] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState('');
    // const Login = async () => {
    //     console.log('reached')
        
    
    const dispatch=useDispatch();
    const handleLogin= async()=>{
        const response = await RNFetchBlob.fetch(
            'POST',
            `https://khuddar.org/application/api/login`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            [
               {name: 'username', data: username + ''},
               {name: 'password', data: password + ''},
           ],
          )
            .then((response) => response.json())
            .then((response) => {
              // console.log(response.response.user);
           //    setMessage(response.message);
              setLoading(false);
              if(response.success==true){
   
                dispatch(Login
                  ({
                    _token:response.response.user.token.token,
                    id:response.response.user.token.user_id,
                    name:response.response.user.name,
                    image:response.response.user.image,
                    email:response.response.user.email,
                    cnic:response.response.user.cnic
                })
                )
                console.log(store.getState())
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
  
    return   <View style={{flex:1,backgroundColor:'white'}}>
         <Animatable.View animation="fadeInLeft">
         <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'white'}}>
       <View style={styles.containerLeft}>

       </View>
       <View style={styles.containerLeft}>
       <Image style={[styles.logo,{alignSelf:'center',marginBottom:RFValue(30)},styles.mt5,styles]} source={require('../../images/kdm.png')} />

            <Text style={[styles.mainTitleHead, styles.mt3]}><Text style={styles.themeColor}>W</Text><Text>elcome</Text><Text style={styles.themeColor}> B</Text>ack</Text>
            <Text style={[styles.mainpara, styles.mnt1]}>Sign in to continue</Text>
            
            <TextInput
                label="Phone Number"
                mode='outlined'
                maxLength={12}
                keyboardType='phone-pad'
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
            
            <TextInput
                label="Password"
                mode='outlined'
                value={password}
                onChangeText={(password)=>{setPassword(password); setPasswordMessage('')}}
                secureTextEntry={true}
                style={[styles.textInput,styles.mt5]}
                left={
                    <TextInput.Icon
                    name={()=><AntDesign name="lock1" size={16}  style={[styles.themeColor,{paddingTop:'30%'}]} />}
                   
                  />
                  }
            />
            {passwordMessage != '' ? 
            <Text style={{fontSize:12, color:'red'}}>
                {passwordMessage}
            </Text> : null}
            {loading == false ?
            <Button mode="contained" style={[styles.buttonMain, styles.mt5, styles.border1]} onPress={() => {
                if(username == '92' && password == ''){
                    setUserMessage('Required')
                    setPasswordMessage('Required')
                }
                else if(password == ''){
                    setPasswordMessage('Required')
                }
                else if(username == '92'){
                    setUserMessage('Required')
                }
                else{
                    // Login()
                    setLoading(true)
                    handleLogin()
                }
            }}>
                <Text style={styles.textTr,styles.themeColorwhite}> Login</Text>
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
                  {/* <TouchableOpacity onPress={()=> navigation.push(Nav.Signup)}>
                  <Text style={[styles.mainpara, styles.mt10]}>Don't have an account? <Text style={styles.themeColor}>Signup</Text></Text>

                  </TouchableOpacity> */}
                  <TouchableOpacity onPress={()=> navigation.push(Nav.Forgot)}>
                  <Text style={[styles.mainpara,{textAlign:'center'},styles.mt5]}>Forgot <Text style={styles.themeColor}>Password</Text></Text>

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
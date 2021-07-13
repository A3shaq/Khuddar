import React, { useState } from 'react';
import { View, Image, Text, ScrollView, SafeAreaView,TouchableOpacity } from 'react-native';
import { styles } from '../../styles/authStyles';
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {Nav} from '../../navigation/navigationType'
import {Login} from '../../redux/actions/userActionMethodes'
import {useDispatch} from 'react-redux';
import {RFValue} from 'react-native-responsive-fontsize';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import RNFetchBlob from 'rn-fetch-blob';
import AwesomeAlert from 'react-native-awesome-alerts';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export default () => {
    const navigation=useNavigation();
    const [familyCode ,setFamilyCode] = useState('2aba7a18fad457e917a59e34d00abc8d70a4727c');
    const [Message, setMessage] = useState(''); 
    const [loading ,setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState('');

    const dispatch=useDispatch();
    const Login= async()=>{
        const response = await RNFetchBlob.fetch(
            'POST',
            `https://khuddar.org/application/api/member/login`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            [
               {name: 'family_code', data: familyCode + ''},
           ],
          )
            .then((response) => response.json())
            .then((response) => {
              console.log(response);
           //    setMessage(response.message);
              setLoading(false);
              if(response.success==true)
              {
                navigation.navigate('Verify',{code:familyCode})
                // dispatch(Login({
                //     _token:response.response.user.token.token,
                //     id:response.response.user.token.user_id
                // }))
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
                label="Family Code"
                mode='outlined'
                onChangeText={(familyCode)=>{setFamilyCode(familyCode); setMessage('')}}
                style={[styles.textInput,styles.mt5]}
                left={
                    <TextInput.Icon
                    name={()=><MaterialIcons name="person" size={16}  style={[styles.themeColor,{paddingTop:'30%'}]} />}
                   
                  />
                  }/>
            
            {Message != '' ? 
            <Text style={{fontSize:12, color:'red'}}>
                {Message}
            </Text> : null}
            {loading == false ?
            <Button mode="contained" style={[styles.buttonMain, styles.mt5, styles.border1]} 
            onPress={() => {
                if(familyCode == ''){
                    setMessage('Required')
                }
                else{
                    Login()
                    setLoading(true)
                }}}>
                <Text style={styles.textTr,styles.themeColorwhite}>Send code</Text>
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
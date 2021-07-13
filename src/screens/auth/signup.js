import React,{useState} from 'react';
import { View, Image, Text, ScrollView, SafeAreaView,TouchableOpacity, Alert} from 'react-native';
import { styles } from '../../styles/authStyles';
import { Button,TextInput  } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Nav } from '../../navigation/navigationType'
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {RFValue} from 'react-native-responsive-fontsize';
import RNFetchBlob from 'rn-fetch-blob';
import LottieView from 'lottie-react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const Register = () => {
    
    const [userNum, setUser] = useState('92');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [phoneMessage, setPhoneMessage] = useState(''); 
    const [nameMessage, setNameMessage] = useState(''); 
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState('');
    const [showPinAlert, setShowPinAlert] = useState(false);
    const Register = async () => {
        console.log('reached')
        const response = await RNFetchBlob.fetch(
         'POST',
         `https://khuddar.org/application/api/register`,
         {
           Accept: 'application/json',
           'Content-Type': 'multipart/form-data',
         },
         [
            {name: 'username', data: userNum+''},
            {name: 'name', data: name + ''},
            {name: 'role', data: 2 + ''},
        ],
       )
         .then((response) => response.json())
         .then((response) => {
           console.log(response.message);
           console.log(response);
        //    setMessage(response.message);
           setLoading(false);
           setAlert(response.message);
           setShowAlert(true);
           
         })
         .catch((error) => {
           console.log(error);
         });
     };
    const navigation=useNavigation();

    return <View style={{flex:1,backgroundColor:'white',justifyContent:'center'}}>
    <Animatable.View animation="fadeInLeft">
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerLeft}>
            <Image style={[styles.logo,{alignSelf:'center',marginBottom:RFValue(30)},styles.mt5,styles]} source={require('../../images/kdm.png')} />
            <Text style={[styles.mainTitleHead]}><Text style={styles.themeColor}>S</Text><Text>ign</Text><Text style={styles.themeColor}>U</Text>p</Text>
            <Text style={[styles.mainpara]}>Please enter your credentials</Text>
            <TextInput
                label="Phone"
                mode='outlined'
                maxLength={12}
                keyboardType='phone-pad'
                onChangeText={(userNum)=>{setUser (userNum); setPhoneMessage('')}}
                style={[styles.textInput,styles.mt5]}
                value={userNum}
                left={
                    <TextInput.Icon
                    name={()=><MaterialCommunityIcons name="phone" size={16}  style={[styles.themeColor,{paddingTop:'30%'}]} />}
                   
                  />
                  }
            />
            {phoneMessage != '' ? 
            <Text style={{fontSize:12, color:'red'}}>
                {phoneMessage}
            </Text> : null}
            <TextInput
                label="Name"
                mode='outlined'
                onChangeText={(name)=>{setName(name); setNameMessage('')}}
                style={[styles.textInput,styles.mt5]}
                value={name}
                left={
                    <TextInput.Icon
                    name={()=><MaterialIcons name="person" size={16}  style={[styles.themeColor,{paddingTop:'30%'}]} />}
                   
                  />
                  }            />
                  {nameMessage != '' ? 
                  <Text style={{fontSize:12, color:'red'}}>
                      {nameMessage}
                  </Text> : null}
            {loading == false ?
            <Button mode="contained" style={[styles.buttonMain, styles.mt5, styles.border1]} 
            onPress={() => {
                if(name == '' && userNum == ''){
                    setNameMessage('Required')
                    setPhoneMessage('Required')
                }
                else if(userNum == ''){
                    setPhoneMessage('Required')
                }
                else if(name == ''){
                    setNameMessage('Required')
                }
                else{
                    Register()
                    setLoading(true)
                }}}>
                <Text style={styles.textTr,styles.themeColorwhite}>Register</Text>
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
            // setTimeout(() => {
            //     setShowPinAlert(true);
            //   }, 2000);
          }}
        />
        <AwesomeAlert
          show={showPinAlert}
          showProgress={false}
          title="Pasword"
          message="Your password is: 1234"
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
            setShowPinAlert(false);
          }}
        />
    </ScrollView></Animatable.View>
    </View>
}
export default Register;
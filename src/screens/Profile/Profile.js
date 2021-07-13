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
import { headers, store } from '../../utiles/reduxConfig/persistConfig';
import DropDownPicker from 'react-native-dropdown-picker';
import ProfileImage from '../../componnents/auth/drawer/profileImage';
import Heading from '../../componnents/home/headingComp';
import AwesomeAlert from 'react-native-awesome-alerts';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import TopDrawer from '../../componnents/auth/drawer/topDrawer';
import { launchImageLibrary } from 'react-native-image-picker';
import {localNotification} from '../../componnents/Notifications';
const Profile =  () => {
    const navigation=useNavigation();
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');
    const [address, setAddress] = useState(store.getState().userReducer.address);
    // const Login = async () => {
    //     console.log('reached')
    const [cnic, setCnic ] = React.useState(store.getState().userReducer.cnic)
    const [name, setName ] = React.useState(store.getState().userReducer.name)
    const [phone, setPhone] = React.useState('')
    const [email, setEmail] = React.useState(store.getState().userReducer.email)
    const [image, setImage] = React.useState('')
    const [religion, setReligion] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [newPassword, setNewPassword] = React.useState('')
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState('');

const options = {
    title: 'Select',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
    const [imagePath, setImagePath] = useState(null);
    const [isImageSelected, setIsImageSelected] = useState(false);
    const [imageTypes, setImageTypes] = useState('');
    const [imageName, setImageName] = useState('');
    
    
    const uploadImage = (imagePath) => {
      const options = { quality: 1.0, maxWidth: 500, maxHeight: 500, storageOptions: { skipBackup: true } };
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          // setAttachmentIcon('checkmark-outline');
          if (Platform.OS === 'ios') {
            setImagePath(response.uri.replace('file://', ''));
          } else {
            console.log(response);
            setImagePath(response.uri);
          }
          setImageTypes(response.type);
          setImageName(response.fileName);
          // console.log(response.type);
          // console.log(response.fileName);
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.uri };
          // console.log(source)
        }
      });
    
    };
    
    const dispatch=useDispatch();
    const handleLoginWithImage= async()=>{
        const response = await RNFetchBlob.fetch(
            'POST',
            `https://khuddar.org/application/api/edit_profile`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              'secret':store.getState().userReducer._token,
              'user-id':store.getState().userReducer.id
            },
            [
                {name: 'name', data:  name + ''},
                {name: 'email', data: email + ''},
                {name: 'cnic', data: cnic + ''},
                {name: 'password', data: newPassword + ''},
                {name: 'old_pass', data: password + ''},
                {name: 'religion', data: religion + ''},
                {name: 'address', data: address + ''},
                {
                  name: 'image',
                  filename: imageName +'image',
                  type: imageTypes,
                  data: RNFetchBlob.wrap(imagePath),
                },
           ],
          )
            .then((response) => response.json())
            .then((response) => {
              console.log(response);
              // setMessage(response.message);
              setLoading(false);
              localNotification({title:'hellooo',msg:response.message});

              if(response.success==true){
                setShowAlert(true)
                setAlert("Account edited successfully.");

                dispatch(Login({
                    _token:response.response.user.token.token,
                    id:response.response.user.token.user_id,
                    name:response.response.user.name,
                    image:response.response.user.image,
                    email:response.response.user.email,
                    cnic:response.response.user.cnic,
                    address:response.response.user.address,
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
  
    const handleLogin= async()=>{
        const response = await RNFetchBlob.fetch(
            'POST',
            `https://khuddar.org/application/api/edit_profile`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              'secret':store.getState().userReducer._token,
              'user-id':store.getState().userReducer.id
            },
            [
                {name: 'name', data:  name + ''},
                {name: 'email', data: email + ''},
                {name: 'cnic', data: cnic + ''},
                {name: 'password', data: newPassword + ''},
                {name: 'old_pass', data: password + ''},
                {name: 'religion', data: religion + ''},
                {name: 'address', data: address + ''},
                
           ],
          )
            .then((response) => response.json())
            .then((response) => {
              console.log(response.message);
           //    setMessage(response.message);
              setLoading(false);
              localNotification({title:'hellooo',msg:response.message})

              if(response.success==true){
                setShowAlert(true)
                setAlert("Account edited successfully.");

                dispatch(Login({
                    _token:response.response.user.token.token,
                    id:response.response.user.token.user_id,
                    name:response.response.user.name,
                    image:response.response.user.image,
                    email:response.response.user.email,
                    cnic:response.response.user.cnic,
                    address:response.response.user.address
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
  
    return   <View style={{flex:1,backgroundColor:'white'}}>

         <Animatable.View animation="fadeInLeft">
         <TopDrawer/>

         <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'white',marginBottom:heightPercentageToDP('10')}}>

       <View style={styles.containerLeft}>
       {/* <Image style={[styles.logo,{alignSelf:'center',marginBottom:RFValue(30)},styles.mt5,styles]} source={require('../../images/kdm.png')} /> */}

            <Text style={[styles.mainTitleHead, styles.mt3]}><Text style={styles.themeColor}>U</Text><Text>pdate</Text><Text style={styles.themeColor}> P</Text>rofile</Text>
            <Text style={[styles.mainpara, styles.mnt1]}>Please update your profile</Text>
            
            <TextInput
                label="Name"
                mode='outlined'
                value={name}
                onChangeText={(name)=>{setName(name)}}
                style={[styles.textInput,styles.mt5]}
                left={
                    <TextInput.Icon
                    name={()=><AntDesign name="user" size={16}  style={[styles.themeColor,{paddingTop:'30%'}]} />}
                   
                  />
                  }            />
            
            
            <TextInput
                label="CNIC"
                mode='outlined'
                maxLength={13}
                keyboardType='number-pad'
                value={cnic}
                onChangeText={(cnic)=>{setCnic(cnic)}}
                style={[styles.textInput,styles.mt5]}
                left={
                    <TextInput.Icon
                    name={()=><AntDesign name="user" size={16}  style={[styles.themeColor,{paddingTop:'30%'}]} />}
                   
                  />
                  }            />
            
            
            <TextInput
                label="Email"
                mode='outlined'
                value={email}
                onChangeText={(email)=>{setEmail(email)}}
                style={[styles.textInput,styles.mt5]}
                left={
                    <TextInput.Icon
                    name={()=><AntDesign name="mail" size={16}  style={[styles.themeColor,{paddingTop:'30%'}]} />}
                   
                  />
                  }            />
            
            
            <TextInput
                label="Address"
                mode='outlined'
                value={address}
                onChangeText={(address)=>{setAddress(address)}}
                style={[styles.textInput,styles.mt5]}
                left={
                    <TextInput.Icon
                    name={()=><AntDesign name="home" size={16}  style={[styles.themeColor,{paddingTop:'30%'}]} />}
                   
                  />
                  }            />
            
            
            
            <TextInput
                label="Old Password"
                mode='outlined'
                value={password}
                onChangeText={(password)=>{setPassword(password)}}
                secureTextEntry={true}
                style={[styles.textInput,styles.mt5]}
                left={
                    <TextInput.Icon
                    name={()=><AntDesign name="lock1" size={16}  style={[styles.themeColor,{paddingTop:'30%'}]} />}
                   
                  />
                  }
            />
            
            <TextInput
                label="New Password"
                mode='outlined'
                value={newPassword}
                onChangeText={(newPassword)=>{setNewPassword(newPassword)}}
                secureTextEntry={true}
                style={[styles.textInput,styles.mt5]}
                left={
                    <TextInput.Icon
                    name={()=><AntDesign name="lock1" size={16}  style={[styles.themeColor,{paddingTop:'30%'}]} />}
                   
                  />
                  }
            />
             <DropDownPicker
            placeholder="Select your religion"
            placeholderStyle={{color:'grey'}}
                items={[
                    {label: "Islam", value: "Islam", },
                    {label: "Hindu", value: "Hindu", },
                    {label: "Christen", value: "Christen", },
                    {label: "Atheist", value: "Atheist", }
                ]}
                // defaultValue={this.state.country}
                containerStyle={[{height: 47,width:'100%',},styles.mt5]}
                style={{backgroundColor: 'white', }}
                itemStyle={{
                    justifyContent: 'flex-start',
                    
                }}
                dropDownStyle={{backgroundColor: 'white'}}
                onChangeItem={(value)=>{setReligion(value.value) ;console.log(value.value)}}
            />
             <Heading head="Profile" label="User Profile" type={true}  />
             <TouchableOpacity onPress={()=>{uploadImage()}} style={{position:'relative',left:60,top:10}}>
             <MaterialCommunityIcons  name="circle-edit-outline" size={20} color="black"  />
             </TouchableOpacity>
             {imagePath == null ? 
             <ProfileImage/> : 
             <Image source={{uri:imagePath}} style={{height:70,width:70,borderRadius:70}} /> }
   
            {loading == false ?
            
            <TouchableOpacity style={[styles.buttonMain, styles.mt5, styles.border1,{marginBottom:10,backgroundColor:'#21c5df',height:47,justifyContent:'center',alignItems:'center'}]} 
            onPress={() => {
                setLoading(true)
                console.log(imagePath+'////');
                if(imagePath == null){
              handleLogin()}
              else{
                  handleLoginWithImage()
              }

                }}>
                <Text style={[styles.textTr,styles.themeColorwhite,{fontSize:18,fontFamily:"PoppinsMedium",alignSelf:'center'}]}>Update Profile</Text>
            </TouchableOpacity>
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

 export default Profile;
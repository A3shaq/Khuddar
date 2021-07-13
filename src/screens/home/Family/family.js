import React,{useState} from 'react';
import { ScrollView, View, TouchableOpacity,Text, Image, Alert } from 'react-native'
import { styles } from '../../../styles/authStyles';
import Header from '../../../componnents/auth/header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Heading from '../../../componnents/home/headingComp';
import { useNavigation } from '@react-navigation/native';
import { Button, TextInput } from 'react-native-paper';
import { Chip } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize'
import TopDrawer from '../../../componnents/auth/drawer/topDrawer';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as RNLocalize from "react-native-localize";
import moment from 'moment-timezone';
import LottieView from 'lottie-react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { headers, store } from '../../../utiles/reduxConfig/persistConfig';
import RNFetchBlob from 'rn-fetch-blob';
import AwesomeAlert from 'react-native-awesome-alerts';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { localNotification } from '../../../componnents/Notifications';
import { LogOut } from '../../../redux/actions/userActionMethodes';
import { useDispatch } from 'react-redux';


const MyComponent = () => {
    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const handleChange = (id) => {
    }
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState('');

    const [fatherchip, setFatherChip]= React.useState(false);
    const [motherchip, setMotherChip]= React.useState(false);
    const [sonchip, setSonChip]= React.useState(false);
    const [daughterchip, setDaughterChip]= React.useState(false);
    const [wifechip, setWifeChip]= React.useState(false);
    const [husbandchip, setHusbandChip]= React.useState(false);
    const [brotherchip, setBrotherChip]= React.useState(false);
    const [sisterchip, setSisterChip]= React.useState(false);
    const [BILchip, setBILChip]= React.useState(false);
    const [SILchip, setSILChip]= React.useState(false);
    const d = date;
    const [date_of_birth, setDateOfBirth] = React.useState('')
    const [cnic, setCnic ] = React.useState('')
    const [name, setName ] = React.useState('')
    const [phone, setPhone] = React.useState('92')
    const [gender, setGender] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [type, setType] = React.useState('')
    const [loading, setLoading] = React.useState(false);
    const [date, setDate] = useState(new Date());
    const [cnicPath, setCnicPath] = useState(null);
const [isCnicSelected, setIsCnicSelected] = useState(false);
const [cnicTypes, setCnicTypes] = useState('');
const [cnicName, setCnicName] = useState('');
const [dateMessage, setDateMessage] = React.useState('');
const [nameMessage, setNameMessage] = React.useState('');
const [phoneMessage, setPhoneMessage] = React.useState('');
const [genderMessage, setGenderMessage] = React.useState('');
const [addressMessage, setAddressMessage] = React.useState('');
const [cnicMessage, setCnicMessage] = React.useState('');
const [show, setShow] = useState(false);

const dispatch=useDispatch();
const [showSuspendAlert, setShowSuspendAlert] = useState(false);
const onChange = (event, selectedDate) => {
  setDateMessage('')
  const currentDate = selectedDate || date;
  setShow(Platform.OS === 'ios');
  setDateOfBirth(moment(currentDate).format("DD-MM-YYYY"));
  // console.log()
};

const options = {
  title: 'Select',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const uploadCnic = (imagePath) => {
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
        setCnicPath(response.uri.replace('file://', ''));
      } else {
        setCnicPath(response.uri);
        setCnicMessage('');
      }
      setCnicTypes(response.type);
      setCnicName(response.fileName);
      console.log(response.type);
      console.log(response.fileName);
      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    }
  });

};
    const [imagePath, setImagePath] = useState(null);
const [isImageSelected, setIsImageSelected] = useState(false);
const [imageTypes, setImageTypes] = useState('');
const [imageName, setImageName] = useState('');


const uploadImage = (imagePath) => {
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
        setImagePath(response.uri);
      }
      setImageTypes(response.type);
      setImageName(response.fileName);
      console.log(response.type);
      console.log(response.fileName);
      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    }
  });

};

    const CreateMemberWithCnicAndImage= async()=>{
      console.log(headers)
        const response = await RNFetchBlob.fetch(
            'POST',
            `https://khuddar.org/application/api/member/create`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              'secret':store.getState().userReducer._token,
              'user-id':store.getState().userReducer.id
            },
            [
                // {name: 'cnic', data: cnic + ''},
                {name: 'date_of_birth', data: date_of_birth + ''},
                {name: 'name', data:  name + ''},
                {name: 'phone', data:  phone + ''},
                {name: 'type', data: gender + ''},
                {name: 'address', data: address + ''},
                {
                  name: 'cnic',
                  filename: cnicName +'cnic',
                  type: cnicTypes,
                  data: RNFetchBlob.wrap(cnicPath),
                },
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
            //   setList(response);
              setLoading(false);
              if(response.message=='Unauthorized User')
              {
                setShowSuspendAlert(true);
              }
              else
              {
              setAlert(response.message);
              setShowAlert(true);
              }
              localNotification({title:'hellooo',msg:response.message})

            })
            .catch((error) => {
              console.log(error);
            });
        
    }

    const CreateMemberWithCnic= async()=>{
      console.log(headers)
        const response = await RNFetchBlob.fetch(
            'POST',
            `https://khuddar.org/application/api/member/create`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              'secret':store.getState().userReducer._token,
              'user-id':store.getState().userReducer.id
            },
            [
                // {name: 'cnic', data: cnic + ''},
                {name: 'date_of_birth', data: date_of_birth + ''},
                {name: 'name', data:  name + ''},
                {name: 'phone', data:  phone + ''},
                {name: 'type', data: gender + ''},
                {name: 'address', data: address + ''},
                {
                  name: 'cnic',
                  filename: cnicName +'cnic',
                  type: cnicTypes,
                  data: RNFetchBlob.wrap(cnicPath),
                },
            ],
          )
            .then((response) => response.json())
            .then((response) => {
              console.log(response);
            //   setList(response);
              setLoading(false);
              if(response.message=='Unauthorized User')
              {
                setShowSuspendAlert(true);
              }
              else
              {
              setAlert(response.message);
              setShowAlert(true);
              }
              localNotification({title:'hellooo',msg:response.message})

            })
            .catch((error) => {
              console.log(error);
            });
        
    }
    return ( <View style={[{backgroundColor:'white',flex:1}]}>
    <TopDrawer/>
        <ScrollView>
            <View style={styles.ctr}>
            </View>
        
            <View style={[styles.ctr, styles.mt5]}>
                <Heading head="Family Details" label="Upload Details about your family" />

                <TextInput
                label="Enter Family Member Name"
                mode='outlined'
                value={name}
                onChangeText={(name)=>{setName(name);setNameMessage('')}}
                style={[styles.textInput,styles.mt5]}
                left={
                    <TextInput.Icon
                    name={()=><AntDesign name="user" size={16}  style={[styles.themeColor,{paddingTop:'30%'}]} />}
                   
                  />
                  }            />
                  
                {nameMessage != '' ? 
            <Text style={{fontSize:12, color:'red'}}>
                {nameMessage}
            </Text> : null}

                <TextInput
                label="Phone"
                mode='outlined'
                value={phone}
                maxLength={12}
                keyboardType='phone-pad'
                onChangeText={(phone)=>{setPhone(phone);setPhoneMessage('')}}
                style={[styles.textInput,styles.mt5]}
                left={
                    <TextInput.Icon
                    name={()=><AntDesign name="user" size={16}  style={[styles.themeColor,{paddingTop:'30%'}]} />}
                   
                  />
                  }            />
                  
                {phoneMessage != '' ? 
            <Text style={{fontSize:12, color:'red'}}>
                {phoneMessage}
            </Text> : null}
                <TextInput
                label="Address"
                mode='outlined'
                value={address}
                onChangeText={(address)=>{setAddress(address);setAddressMessage('')}}
                style={[styles.textInput,styles.mt5]}
                left={
                    <TextInput.Icon
                    name={()=><AntDesign name="home" size={16}  style={[styles.themeColor,{paddingTop:'30%'}]} />}
                   
                  />
                  }            />
                  
                {addressMessage != '' ? 
            <Text style={{fontSize:12, color:'red'}}>
                {addressMessage}
            </Text> : null}
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <TextInput
                label="Date of Birth"
                placeholder="Date of Birth"
                mode='outlined'
                value={date_of_birth}
                disabled={true}
                onChangeText= {(date)=>{setDateOfBirth(date);setDateMessage('')}}
                style={[styles.mt5,{
                    width: '60%',
                    marginRight:'5%',
                    // flex:2,
                    height: 40,
                    fontSize: 14,
                    fontFamily: 'PoppinsRegular',
                    backgroundColor: 'white',
                    borderColor: 'white',}]}
                left={
                    <TextInput.Icon
                    name={()=><AntDesign name="user" size={16}  style={[styles.themeColor,{paddingTop:'30%'}]} />}
                   
                  />
                  }/>
                  
                                     
     {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
                <Button style={[ styles.mt5,{backgroundColor:'#21c5df',height:42, width: '35%',elevation:4,
                  }]}
                  onPress={()=>{setShow(true)}}
                  >
                  <Text style={styles.textTr,styles.themeColorwhite}> Select</Text>

             </Button>
                </View>

                {dateMessage != '' ? 
            <Text style={{fontSize:12, color:'red'}}>
                {dateMessage}
            </Text> : null}
<Heading head="" label="Family Type" />

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginTop:10}}>
                <Chip selected={fatherchip} style={{marginRight:4}} icon="information" mode="flat" 
                onPress={() => {
                  setGender('Father');
                  setFatherChip(true);
                  setMotherChip(false);
                  setBrotherChip(false);
                  setSisterChip(false);
                  setSonChip(false);
                  setDaughterChip(false);
                  setHusbandChip(false);
                  setWifeChip(false)
                  }}>Father </Chip>
                <Chip selected={motherchip} style={{marginRight:4}} icon="information" mode="flat" 
                onPress={() => {
                  setGender('Mother');
                  setFatherChip(false);
                  setMotherChip(true);
                  setBrotherChip(false);
                  setSisterChip(false);
                  setSonChip(false);
                  setDaughterChip(false);
                  setHusbandChip(false);
                  setWifeChip(false)
                  }}>Mother </Chip>
                <Chip selected={brotherchip} style={{marginRight:4}} icon="information" mode="flat" 
                onPress={() => {
                  setGender('Brother');
                  setFatherChip(false);
                  setMotherChip(false);
                  setBrotherChip(true);
                  setSisterChip(false);
                  setSonChip(false);
                  setDaughterChip(false);
                  setHusbandChip(false);
                  setWifeChip(false)
                  }}>Brother </Chip>
                <Chip selected={sisterchip} style={{marginRight:4}} icon="information" mode="flat" 
                onPress={() => {
                  setGender('Sister');
                  setFatherChip(false);
                  setMotherChip(false);
                  setBrotherChip(false);
                  setSisterChip(true);
                  setSonChip(false);
                  setDaughterChip(false);
                  setHusbandChip(false);
                  setWifeChip(false)
                  }}>Sister </Chip>
                <Chip selected={husbandchip} style={{marginRight:4}} icon="information" mode="flat" 
                onPress={() => {
                  setGender('Husband');
                  setFatherChip(false);
                  setMotherChip(false);
                  setBrotherChip(false);
                  setSisterChip(false);
                  setSonChip(false);
                  setDaughterChip(false);
                  setHusbandChip(true);
                  setWifeChip(false);
                  setHusbandChip(true);
                  setWifeChip(false)
                  }}>Husband </Chip>
                <Chip selected={wifechip} style={{marginRight:4}} icon="information" mode="flat" 
                onPress={() => {
                  setGender('Wife');
                  setFatherChip(false);
                  setMotherChip(false);
                  setBrotherChip(false);
                  setSisterChip(false);
                  setSonChip(false);
                  setDaughterChip(false);
                  setHusbandChip(false);
                  setWifeChip(true)}}>Wife </Chip>
                <Chip selected={sonchip} style={{marginRight:4}} icon="information" mode="flat" 
                onPress={() => {
                  setGender('Son');
                  setFatherChip(false);
                  setMotherChip(false);
                  setBrotherChip(false);
                  setSisterChip(false);
                  setSonChip(true);
                  setDaughterChip(false);
                  setHusbandChip(false);
                  setWifeChip(false)
                  }}>Son </Chip>
                <Chip selected={daughterchip} style={{marginRight:4}} icon="information" mode="flat" 
                onPress={() => {
                  setGender('Daughter');
                  setFatherChip(false);
                  setMotherChip(false);
                  setBrotherChip(false);
                  setSisterChip(false);
                  setSonChip(false);
                  setDaughterChip(true);
                  setHusbandChip(false);
                  setWifeChip(false)
                  }}>Daughter </Chip>
            </ScrollView>
            
<Heading head="" label="Upload Image / CNIC" />

    <FAB
    style={styles.fabupd}
    small
    icon="plus"
    label="Upload Image"
    onPress={() => {uploadImage()}}
  />
  
{imagePath == null ? null : <Image source={{uri:imagePath}} style={{height:70,width:70,borderRadius:70,alignSelf:'center'}} /> }
    <FAB
    style={styles.fabupd}
    small
    icon="plus"
    label="Upload CNIC"
    onPress={() => {uploadCnic()}}
  />
  {cnicPath == null ? null : <Image source={{uri:cnicPath}} style={{height:70,width:70,borderRadius:70,alignSelf:'center'}} /> }

  {cnicMessage != '' ? 
            <Text style={{fontSize:12, color:'red'}}>
                {cnicMessage}
            </Text> : null}
  {loading == false ?
    <TouchableOpacity style={[styles.buttonMain, styles.mt5, styles.border1,{marginBottom:10,backgroundColor:'#21c5df',height:47,justifyContent:'center',alignItems:'center'}]} 
    onPress={() => {
      if(name == '' && phone == '' &&  date_of_birth =='' && cnicPath == null && gender == '' && address==''){
        setDateMessage('Required')
        setNameMessage('Required')
        setCnicMessage('Required')
        setGenderMessage('Required')
        setAddressMessage('Required')
      }
      else if(name == ''){
        setNameMessage('Required')
      }
      else if(date_of_birth == ''){
        setDateMessage('Required')
      }
      else if(gender == ''){
        setGenderMessage('Required')
      }
      else if(address == ''){
        setAddressMessage('Required')
      }
      else if(cnicPath == null){
        setCnicMessage('Required')
      }
      else if(imagePath == null){
        CreateMemberWithCnic()
        setLoading(true)
      }
      else{
          setLoading(true)
          CreateMemberWithCnicAndImage()
      }
        }}>
        <Text style={[styles.textTr,styles.themeColorwhite,{fontSize:18,fontFamily:"PoppinsMedium",alignSelf:'center'}]}>Register</Text>
    </TouchableOpacity>
    :
    <View  style={[ styles.mt5,{backgroundColor:'#21c5df',height:47, width: '100%',
    marginBottom:10,
     borderRadius: 6,}]}>
    <LottieView
        source={require('../../../animations/loading.json')}
        autoPlay={true}
        loop={true}
        resizeMode="contain"
        progress={0}
    />
    </View>
    } 
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
        
 <AwesomeAlert
          show={showSuspendAlert}
          showProgress={false}
          title="Alert"
          message="Your account has been suspened by the admin. Please contact support for futher information."
          contentContainerStyle={{width:widthPercentageToDP('95')}}
          confirmButtonStyle={{width:widthPercentageToDP('20'),alignItems:'center'}}
          messageStyle={{fontFamily:'PoppinsRegular'}}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Ok"
          confirmButtonColor="#21c5df"
          onConfirmPressed={() => {
            setShowSuspendAlert(false);
            dispatch(LogOut())

          }}
        />
    </View>);
};

export default MyComponent;
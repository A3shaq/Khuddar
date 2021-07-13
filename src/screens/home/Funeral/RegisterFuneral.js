import React,{useState} from 'react';
import { ScrollView, View, TouchableOpacity,Text, Linking, Platform, Alert,Image } from 'react-native';
import { Button,TextInput  } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import TopDrawer from '../../../componnents/auth/drawer/topDrawer';
import Heading from '../../../componnents/home/headingComp';
import {styles} from '../../../styles/authStyles'
import RNFetchBlob from 'rn-fetch-blob';
import LottieView from 'lottie-react-native';
import { headers, store } from '../../../utiles/reduxConfig/persistConfig';
import { FlatList } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import DropDownPicker from 'react-native-dropdown-picker';
import AwesomeAlert from 'react-native-awesome-alerts';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import { localNotification } from '../../../componnents/Notifications';
import { useDispatch } from 'react-redux';
import { LogOut } from '../../../redux/actions/userActionMethodes';



const RegisterFuneral = () => {
    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const handleChange = (id) => {
    }
    const [blogs, setBlogs] = useState([]);
    const [family_code, setFamilyCode] = useState('');
    const [number, setNumber] = useState('');
    const [loading, setLoading] = useState(true);
    const [members, setMembers] = useState([]);
    const [member_id, setMemberId] = useState('');
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState('');

    const dispatch=useDispatch();
    const [showSuspendAlert, setShowSuspendAlert] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
  
    const Members= async()=>{
      console.log(headers)
        const response = await RNFetchBlob.fetch(
            'GET',
            `https://khuddar.org/application/api/member/list`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              'secret':store.getState().userReducer._token,
              'user-id':store.getState().userReducer.id
            },
          )
            .then((response) => response.json())
            .then((response) => {
              console.log(response.response);
              if(response.message=='Unauthorized User')
                {
                  setShowSuspendAlert(true);
                }
                else
                {
              setFamilyCode(response.response.user.family_code);
              setMembers(response.response.user.members);
                }
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
            });
    }

    const TollFree= async()=>{
      console.log(headers)
        const response = await RNFetchBlob.fetch(
            'GET',
            `https://khuddar.org/application/api/toll_free_number`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              'secret':store.getState().userReducer._token,
              'user-id':store.getState().userReducer.id
            },
          )
            .then((response) => response.json())
            .then((response) => {
              console.log(response.response);
              setNumber(response.response.number);
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
            });
    }

    const callNumber = (number) => {
        console.log('callNumber ----> ', number);
        let phoneNumber = number;
        if (Platform.OS !== 'android') {
          phoneNumber = `telprompt:${number}`;
        }
        else  {
          phoneNumber = `tel:${number}`;
        }
        Linking.canOpenURL(phoneNumber)
        .then(supported => {
          if (!supported) {
            Alert.alert('Phone number is not available');
          } else {
            return Linking.openURL(phoneNumber);
          }
        })
        .catch(err => console.log(err));
      };

      const Register= async()=>{
        
          const response = await RNFetchBlob.fetch(
              'POST',
              `https://khuddar.org/application/api/funeral/add`,
              {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'secret':store.getState().userReducer._token,
                'user-id':store.getState().userReducer.id
              },
              [
                  {name: 'member_id', data: member_id + ''},
              ],
            )
              .then((response) => response.json())
              .then((response) => {
                console.log(response.response);
                setLoading(false);
                
               setAlert(response.message);
               setShowAlert(true);
               localNotification({title:'hellooo',msg:response.message})

              })           
              .catch((error) => {
                console.log(error);
              });
      }
  

  React.useEffect(() => {
    Members();
    TollFree();
    setLoading(true);
  }, []);
    return (<View style={[{backgroundColor:'white',flex:1},styles.ctr]}>
 <TopDrawer/>
 
 <ScrollView style={{backgroundColor:'white'}} showsVerticalScrollIndicator={false}>
 <Heading head="Funeral Registration Details" label="Khuddar provides funeral service to its subscribers without any discrimination." type={true}  />
 <View style={{padding:10}}>

 </View>
 {members.length==0?
 <DropDownPicker
 placeholder="Select Family Member"
 placeholderStyle={{color:'grey'}}
    items={[
    ]}
    // defaultValue={this.state.country}
    containerStyle={{height: 47}}
    style={{backgroundColor: 'white', }}
    itemStyle={{
        justifyContent: 'flex-start',
        
    }}
    dropDownStyle={{backgroundColor: 'white'}}
    // onChangeItem={item => this.setState({
    //     country: item.value
    // })}
 />:
 <DropDownPicker
 placeholder="Select Family Member"
 placeholderStyle={{color:'grey'}}
    items={
        members.map((item, index) => {
          console.log(item,index)
            return ({label: item.name, value: item.id, }) 
        })
    }
    // defaultValue={this.state.country}
    containerStyle={{height: 47}}
    style={{backgroundColor: 'white', }}
    itemStyle={{
        justifyContent: 'flex-start',
        
    }}
    dropDownStyle={{backgroundColor: 'white'}}
    
    onChangeItem={(value)=>{setMemberId(value.value) ;console.log(value.value); setMessage('')}}
 />}
 {message != '' ? 
            <Text style={{fontSize:12, color:'red'}}>
                {message}
            </Text> : null}
    {loading == false ?
            <TouchableOpacity style={[styles.buttonMain, styles.mt5, styles.border1,{marginBottom:10,backgroundColor:'#21c5df',height:47,justifyContent:'center',alignItems:'center'}]} 
            onPress={() => {
              if(member_id == '' ){
                setMessage('Required')
              }
              else{
                  setLoading(true)
                  Register()
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
    <Text style={{fontFamily:"PoppinsMedium", fontSize:15}}>
        Family Code: {family_code}
    </Text>
    <TouchableOpacity style={{alignItems:'center',justifyContent:'center',padding:20}} onPress={()=>{callNumber(number)}} >
        <View style={{backgroundColor:'#4267B2', height:50, width:50,borderRadius:50,alignItems:'center',justifyContent:'center'}}>
            <FontAwesome name="phone" color="white" size={35} />
            
        </View>
        <Text style={{fontFamily:"PoppinsMedium", fontSize:15,marginTop:5}}>
                Toll Free: {number}
        </Text>
    </TouchableOpacity>
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
            toggleModal();
          }}
        />
      <Modal 
      hasBackdrop={true}
      backdropColor='white'
      onBackButtonPress={()=>{toggleModal()}}
      onBackdropPress={()=>{toggleModal()}}
      isVisible={isModalVisible}>
        <View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
        <TouchableOpacity onPress={()=>{toggleModal()}} style={{alignSelf:'flex-end'}}>
             <Entypo  name="circle-with-cross" size={30} color="black"  />
             </TouchableOpacity>
          <Image resizeMode='contain' source={require('../../../images/aRABIC.png')} style={{width:'100%'}} />
        </View>
      </Modal>
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

export default RegisterFuneral;
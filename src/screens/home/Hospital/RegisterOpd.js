import React,{useState} from 'react';
import { ScrollView, View, TouchableOpacity,Text, Linking, Platform, Alert } from 'react-native';
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
import DropDownPicker from 'react-native-dropdown-picker';
import AwesomeAlert from 'react-native-awesome-alerts';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { localNotification } from '../../../componnents/Notifications';
import { useDispatch } from 'react-redux';
import { LogOut } from '../../../redux/actions/userActionMethodes';



const RegisterOpd = ({route}) => {
  console.log(route.params.item.id)
    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [members, setMembers] = useState([]);
    const [member_id, setMemberId] = useState('');
    const [category_id, setCategoryId] = useState(route.params.item.id);
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState('');

    const dispatch=useDispatch();
    const [showSuspendAlert, setShowSuspendAlert] = useState(false);

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
              console.log(response.response.user.members);

              if(response.message=='Unauthorized User')
                {
                  setShowSuspendAlert(true);
                }
                else
                {
              setMembers(response.response.user.members);
                }
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
            });
    }
    const RegisterOpd= async()=>{
      console.log(category_id)
      
        const response = await RNFetchBlob.fetch(
            'POST',
            `https://khuddar.org/application/api/opd/add`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              'secret':store.getState().userReducer._token,
              'user-id':store.getState().userReducer.id
            },
            [
                {name: 'member_id', data: member_id + ''},
                {name: 'category_id', data: category_id + ''},
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
  }, []);
    return (<View style={[{backgroundColor:'white',flex:1},styles.ctr]}>
 <TopDrawer/>
 
 <ScrollView style={{backgroundColor:'white'}} showsVerticalScrollIndicator={false}>
 <Heading head="OPD" label="Select member to register opd service" type={true} />
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
          console.log(item.id,index)
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
    onChangeItem={(value)=>{setMemberId(value.value) ;console.log(value.value);setMessage('')}}
 />}
             {message != '' ? 
            <Text style={{fontSize:12, color:'red'}}>
                {message}
            </Text> : null}
    {loading == false ?
            <TouchableOpacity style={[styles.buttonMain, styles.mt5, styles.border1,{marginBottom:heightPercentageToDP('60'),backgroundColor:'#21c5df',height:47,justifyContent:'center',alignItems:'center'}]} 
            onPress={() => {
              if(member_id == '' ){
                setMessage('Required')
              }
              else{
                  setLoading(true)
                  RegisterOpd()
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
 </ScrollView>
    </View>);
};

export default RegisterOpd;
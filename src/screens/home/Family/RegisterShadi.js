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
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as RNLocalize from "react-native-localize";
import moment from 'moment-timezone';
import AwesomeAlert from 'react-native-awesome-alerts';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { localNotification } from '../../../componnents/Notifications';
import { LogOut } from '../../../redux/actions/userActionMethodes';
import { useDispatch } from 'react-redux';


const RegisterShadi = () => {
    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const handleChange = (id) => {
    }
    const [blogs, setBlogs] = useState([]);
    const [family_code, setFamilyCode] = useState('');
    const [number, setNumber] = useState('');
    const [loading, setLoading] = useState(true);
    const [members, setMembers] = useState([]);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [date, setDate] = useState(new Date());
    const [member_id, setMemberId] = useState('');
    const [dateMessage, setDateMessage] = React.useState('');
    const [memberMessage, setMemberMessage] = React.useState('');
  // const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState('');
const [wed, setWed] = useState('');
const day = moment(new Date()).format("DD");
console.log(day)
const month = moment(new Date()).format("MM");
console.log(month)
const m = Number(month)+2
console.log(m)
const year = moment(new Date()).format("YYYY");
console.log(year)

const dispatch=useDispatch();
const [showSuspendAlert, setShowSuspendAlert] = useState(false);
  const onChange = (event, selectedDate) => {
    setDateMessage('')
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setWed(moment(currentDate).format("DD-MM-YYYY"));
    setDate(currentDate)

    // console.log()
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
              
            })
            .catch((error) => {
              console.log(error);
            });
    }

      const Register= async()=>{
        console.log(headers)
          const response = await RNFetchBlob.fetch(
              'POST',
              `https://khuddar.org/application/api/nikkah/add`,
              {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'secret':store.getState().userReducer._token,
                'user-id':store.getState().userReducer.id
              },
              [
                {name: 'member_id', data: member_id + ''},
                {name: 'date', data: wed + ''},
              ],
            )
              .then((response) => response.json())
              .then((response) => {
                console.log(response);
              //   setList(response);
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
 <Heading head="Shadi Registration Details" label="Upload details about your shadi" type={true} />
 <View style={{flexDirection:'row',alignItems:'center',marginBottom:20}}>
                <TextInput
                disabled={true}
                label="Date "
                placeholder="Date "
                value={wed}
                onChangeText= {(wed)=>{setWed(wed)}}
                mode='outlined'
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
          minimumDate={new Date(year, m, day)}
        />
      )}
                <Button style={[ styles.mt5,{backgroundColor:'#21c5df',height:42, width: '35%',elevation:4,
                  }]}
                  onPress={()=>{setShow(true); console.log('reached')}}
                  >
                  <Text style={styles.textTr,styles.themeColorwhite}> Select</Text>

             </Button>
                </View>
                {dateMessage != '' ? 
            <Text style={{fontSize:12, color:'red'}}>
                {dateMessage}
            </Text> : null}

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
    onChangeItem={(value)=>{setMemberId(value.value) ;console.log(value.value);setMemberMessage('')}}
 />}
             {memberMessage != '' ? 
            <Text style={{fontSize:12, color:'red'}}>
                {memberMessage}
            </Text> : null}
    {loading == false ?
            <TouchableOpacity style={[styles.buttonMain, styles.mt5, styles.border1,{marginBottom:heightPercentageToDP('50'),backgroundColor:'#21c5df',height:47,justifyContent:'center',alignItems:'center'}]} 
            onPress={() => {
              if(wed=='' && member_id == '' ){
                setDateMessage('Required')
                setMemberMessage('Required')
              }
              else if(member_id == ''){
                setMemberMessage('Required')
              }
              else if(wed==''){
                setDateMessage('Required')
              }
              else{
                  setLoading(true)
                  Register()
                  console.log(date)
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

export default RegisterShadi;
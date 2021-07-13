import React,{useState} from 'react';
import { ScrollView, View, TouchableOpacity,Text, Alert } from 'react-native'
import { styles } from '../../../../styles/authStyles';
import Header from '../../../../componnents/auth/header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Heading from '../../../../componnents/home/headingComp';
import { useNavigation } from '@react-navigation/native';
import { Button, TextInput } from 'react-native-paper';
import { Chip } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize'
import TopDrawer from '../../../../componnents/auth/drawer/topDrawer';
import DateTimePicker from '@react-native-community/datetimepicker';
import LottieView from 'lottie-react-native';
import { headers, store } from '../../../../utiles/reduxConfig/persistConfig';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';
import AwesomeAlert from 'react-native-awesome-alerts';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import {localNotification} from '../../../../componnents/Notifications';

const WeedingDress = () => {
    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const handleChange = (id) => {
    }
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [groom, setGroom] = useState('');
    const [saloon, setSaloon] = useState('');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = React.useState(false);
    const [dateMessage, setDateMessage] = React.useState('');
    const [groomMessage, setGroomMessage] = React.useState('');
    const [saloonMessage, setSaloonMessage] = React.useState('');
    const [timeMessage, setTimeMessage] = React.useState('');
    const [locMessage, setLocMessage] = React.useState('');
    const [show, setShow] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState('');

    const [confirmation_date, setConfirmationDate] = useState('');
    const [confirmation_time, setConfirmationTime] = useState('');

    const day = moment(new Date()).format("DD");
    console.log(day)
    const month = moment(new Date()).format("MM");
    console.log(month)
    const m = Number(month)+2
    console.log(m)
    const year = moment(new Date()).format("YYYY");
    console.log(year)
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setConfirmationDate(moment(currentDate).format("DD-MM-YYYY"));
      setDate(currentDate)

      // console.log()
    };
    
    const onChangeTime = (event, selectedTime) => {
      const currentTime = selectedTime || time;
      setShowTime(Platform.OS === 'ios');
      setConfirmationTime(moment(currentTime).format("hh:mm a"))
    };
    
    const Register= async()=>{
      console.log(headers)
        const response = await RNFetchBlob.fetch(
            'POST',
            `https://khuddar.org/application/api/wedding_location/add`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              'secret':store.getState().userReducer._token,
              'user-id':store.getState().userReducer.id
            },
            [
                // {name: 'cnic', data: cnic + ''},
                {name: 'banquet_name', data: saloon + ''},
                {name: 'groom_name', data:  groom + ''},
                {name: 'confirmation_date', data:  confirmation_date + ''},
                {name: 'banquet_location', data:  location + ''},
                {name: 'confirmation_time', data:  confirmation_time + ''},
                
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

    return ( <View style={[{backgroundColor:'white',flex:1}]}>
    <TopDrawer/>
        <ScrollView>
            <View style={styles.ctr}>
            </View>
        
            <View style={[styles.ctr, styles.mt5]}>
                <Heading head="Wedding Details" label="Upload Details about Wedding" />

                <TextInput
                label="Groom Name"
                mode='outlined'
                value={groom}
                onChangeText= {(groom)=>{setGroom(groom); setGroomMessage('')}}
                style={[styles.textInput,styles.mt5]}
                left={
                    <TextInput.Icon
                    name={()=><AntDesign name="user" size={16}  style={[styles.themeColor,{paddingTop:'30%'}]} />}
                   
                  />
                  }            />
                  {groomMessage != '' ? 
            <Text style={{fontSize:12, color:'red'}}>
                {groomMessage}
            </Text> : null}
                <TextInput
                label="Banquet Name"
                mode='outlined'
                value={saloon}
                onChangeText= {(saloon)=>{setSaloon(saloon); setSaloonMessage('')}}
                style={[styles.textInput,styles.mt5]}
                left={
                    <TextInput.Icon
                    name={()=><AntDesign name="user" size={16}  style={[styles.themeColor,{paddingTop:'30%'}]} />}
                   
                  />
                  }            />
{saloonMessage != '' ? 
            <Text style={{fontSize:12, color:'red'}}>
                {saloonMessage}
            </Text> : null}

                <TextInput
                label="Banquet Location"
                mode='outlined'
                value={location}
                onChangeText= {(location)=>{setLocation(location); setLocMessage('')}}
                style={[styles.textInput,styles.mt5]}
                left={
                    <TextInput.Icon
                    name={()=><AntDesign name="user" size={16}  style={[styles.themeColor,{paddingTop:'30%'}]} />}
                   
                  />
                  }            />
{locMessage != '' ? 
            <Text style={{fontSize:12, color:'red'}}>
                {locMessage}
            </Text> : null}
                 <View style={{flexDirection:'row',alignItems:'center'}}>
                <TextInput
                label="Confirmation Date"
                placeholder="Confirmation Date"
                mode='outlined'
                value={confirmation_date}
                disabled={true}
                onChangeText= {(date)=>{setConfirmationDate(date)}}
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
                  onPress={()=>{setShow(true)}}
                  >
                  <Text style={styles.textTr,styles.themeColorwhite}> Select</Text>

             </Button>
                </View>
                
                {dateMessage != '' ? 
            <Text style={{fontSize:12, color:'red'}}>
                {dateMessage}
            </Text> : null}
                 <View style={{flexDirection:'row',alignItems:'center'}}>
                <TextInput
                label="Confirmation Time"
                placeholder="Confirmation Time"
                mode='outlined'
                value={confirmation_time}
                disabled={true}
                onChangeText= {(time)=>{setConfirmationTime(time)}}
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
                  
                                     
     {showTime && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={onChangeTime}
        />
      )}
                <Button style={[ styles.mt5,{backgroundColor:'#21c5df',height:42, width: '35%',elevation:4,
                  }]}
                  onPress={()=>{setShowTime(true)}}
                  >
                  <Text style={styles.textTr,styles.themeColorwhite}> Select</Text>

             </Button>
                </View>
                
                {timeMessage != '' ? 
            <Text style={{fontSize:12, color:'red'}}>
                {timeMessage}
            </Text> : null}
                {loading == false ?
    <TouchableOpacity style={[styles.buttonMain, styles.mt5, styles.border1,{marginBottom:10,backgroundColor:'#21c5df',height:47,justifyContent:'center',alignItems:'center'}]} 
    onPress={() => {
      if(groom == '' && confirmation_date == '' && confirmation_time == '' && location == '' && saloon=='' ){
        setDateMessage('Required')
        setGroomMessage('Required')
        setLocMessage('Required')
        setTimeMessage('Required')
        setSaloonMessage('Required')
      }
      else if(groom == ''){
        setGroomMessage('Required')
      }
      else if(confirmation_date == ""){
        setDateMessage('Required')
      }
      else if(location == ''){
        setLocMessage('Required')
      }
      else if(confirmation_time == ''){
        setTimeMessage('Required')
      }
      else{
          setLoading(true);
          Register();
      }
        }}>
        <Text style={[styles.textTr,styles.themeColorwhite,{fontSize:18,fontFamily:"PoppinsMedium",alignSelf:'center'}]}>Register</Text>
    </TouchableOpacity>
    :
    <View  style={[ styles.mt5,{backgroundColor:'#21c5df',height:47, width: '100%',
    marginBottom:10,
     borderRadius: 6,}]}>
    <LottieView
        source={require('../../../../animations/loading.json')}
        autoPlay={true}
        loop={true}
        resizeMode="contain"
        progress={0}
    />
    </View>
    } 
  
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
        </ScrollView>

    </View>);
};

export default WeedingDress;
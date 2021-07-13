import React,{useState} from 'react';
import { ScrollView, View, TouchableOpacity,Text,Image, Alert } from 'react-native';
import {Button, Paragraph, TextInput} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import TopDrawer from '../../../componnents/auth/drawer/topDrawer';
import Heading from '../../../componnents/home/headingComp';
import {styles} from '../../../styles/authStyles'
import RNFetchBlob from 'rn-fetch-blob';
import LottieView from 'lottie-react-native';
import { headers, store } from '../../../utiles/reduxConfig/persistConfig';
import { FlatList } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AwesomeAlert from 'react-native-awesome-alerts';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { localNotification } from '../../../componnents/Notifications';
import { LogOut } from '../../../redux/actions/userActionMethodes';
import { useDispatch } from 'react-redux';


const JobDetails = ({route}) => {
    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState('');
    const [descriptionMessage, setDescriptionMessage] = React.useState('');
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState('');

    const dispatch=useDispatch();
    const [showSuspendAlert, setShowSuspendAlert] = useState(false);
console.log(route.params.item)
const item = route.params.item;
const Apply = async()=>{
    console.log(headers)
      const response = await RNFetchBlob.fetch(
          'POST',
          `https://khuddar.org/application/api/jobs/apply`,
          {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            'secret':store.getState().userReducer._token,
            'user-id':store.getState().userReducer.id
          },
          [
            {name: 'job_id', data: item.id + ''},
            {name: 'description', data: description + ''},
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
return (<View style={[{backgroundColor:'white',flex:1},styles.ctr]}>
 <TopDrawer/>
 
 <ScrollView style={{backgroundColor:'white'}} showsVerticalScrollIndicator={false}>
 <Heading head={item.title} label="Apply now" type={true} />
<Image style={{height:250,width:'100%'}} resizeMode='contain' source={{uri:item.image}}/>

<Paragraph style={[styles.PoppinsMedium,{marginTop:RFValue(10),fontSize:12,lineHeight:15}]} numberOfLines={1}>Description</Paragraph>
<Paragraph style={[styles.PoppinsMedium,{marginTop:RFValue(5),fontSize:12,lineHeight:15}]} numberOfLines={1}>{item.desciption}</Paragraph>

<TextInput
                label="Enter description"
                mode='outlined'
                onChangeText={(description)=>{setDescription(description);setDescriptionMessage('')}}
                style={[styles.textInput,styles.mt5]}
                left={
                    <TextInput.Icon
                    name={()=><AntDesign name="filetext1" size={16}  style={[styles.themeColor,{paddingTop:'30%'}]} />}
                   
                  />
                  }/>
            {descriptionMessage != '' ? 
            <Text style={{fontSize:12, color:'red'}}>
                {descriptionMessage}
            </Text> : null}
            {loading == false ?
                <Button mode="contained" style={[styles.buttonMain, styles.mt5, styles.border1,{marginBottom:RFValue(60)}]} 
                onPress={() => {
                    if(description == '' ){
                        setDescriptionMessage('Required')
                    }
                    else{
                        setLoading(true)
                        Apply()
                    }
                }}>
                    <Text style={[styles.textTr, styles.themeColorwhite]}> Apply now</Text>
                </Button>     
                :
                <View  style={[ styles.mt5,{backgroundColor:'#21c5df',height:47, width: '100%',
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

export default JobDetails;
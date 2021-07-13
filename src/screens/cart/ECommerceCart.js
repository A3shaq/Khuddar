import React,{useState} from 'react';
import { ScrollView, View, TouchableOpacity,StyleSheet,Text,Image, Alert } from 'react-native'

import { styles } from '../../styles/authStyles';
import {useNavigation} from '@react-navigation/native';
import TopDrawer from '../../componnents/auth/drawer/topDrawer';
import Heading from '../../componnents/home/headingComp'
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import ServiceCard from '../../componnents/home/serviceCard';
import {Nav} from '../../navigation/navigationType'
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { headers, store } from '../../utiles/reduxConfig/persistConfig';
import AwesomeAlert from 'react-native-awesome-alerts';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { localNotification } from '../../componnents/Notifications';

const ECommerceCart = ({route}) => {
 console.log(route.params.quantity)
 const [showAlert, setShowAlert] = useState(false);
 const [showCartAlert, setShowCartAlert] = useState(false);
 const [showProfileAlert, setProfileAlert] = useState(false);
 const [alert, setAlert] = useState('');
    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const handleChange = (id) => {      
    }
    const [quantity, setQuantity] = React.useState(route.params.quantity);
    const [title, setTitle] = React.useState(route.params.title);
    const [id, setId] = React.useState(route.params.id);
    const [price, setPrice] = React.useState(route.params.price );
    const [at_price, setAtPrice] = React.useState(route.params.at_price );
    const total = Number(price) * Number(quantity);
    const [loading,setLoading] = React.useState(false);
    const [address, setAddress ] = useState(store.getState().userReducer.address);
    
    const Order= async()=>{
        const response = await fetch('https://khuddar.org/application/api/ecommerce/order' ,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'secret':store.getState().userReducer._token,
          'user-id':store.getState().userReducer.id
        },
        body:JSON.stringify({"amount":total,
        "address":address,
        "products":[
        {
        "product_id":id,
        "at_price":at_price,
        "at_discounted_price":price,
        "quantity":quantity
        },
        ]
      })       
        // body:JSON.stringify({bodyFormData}) 
         
        })
        .then((response) => response.json())
        .then((response) => {
          console.log(response.message);
          setAlert(response.message);
          setShowAlert(true);
          localNotification({title:'hellooo',msg:response.message})

        })
        .catch((error) => {
          console.log(error);
          Alert.alert(
            'Oopss!',
            '',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Ok',
                onPress: () => {
                  console.log('Ok Pressed');
                },
              },
            ],
            {cancelable: false},
          );
       
          })  
      }
  
    return ( <View style={[{backgroundColor:'white',flex:1}]}>
    <TopDrawer/>
    
    <ScrollView style={[{backgroundColor:'white',flex:1},styles.ctr]} showsVerticalScrollIndicator={false}>
    <Heading head="Cart" label="Your cart" type={true} />
    {quantity == 0 ? null :
    <View style={{paddingVertical:15,flexDirection:'row',flex:1,borderBottomColor:'grey',borderBottomWidth:0.5}}>
    <Image style={{height:60,width:60,borderRadius:60}} source={{uri:route.params.image}}/>
    <View style={{paddingHorizontal:15}}>
        <View style={{flexDirection:'row',flex:1}}>
    <Text style={{fontSize:20,fontFamily:styles.PoppinsMedium.fontFamily,width:'85%'}}>{title}</Text> 
    {/* <MaterialIcons name="cancel" color="#21c5df" size={20} /> */}
    </View>

    <View style={{flexDirection:'row',alignItems:'center'}}>
  
        <Text style={{fontSize:18,fontFamily:styles.PoppinsMedium.fontFamily,width:'55%'}}>Rs {total} </Text> 
        
<TouchableOpacity mode="contained" style={[{
    width: 25,
    backgroundColor:'#21c5df',
    height:25,
    borderRadius: 6,
    alignItems:'center',
    justifyContent:'center'},  styles.border1]} 
    onPress={() => 
            {setQuantity(quantity-1);}}>
    <Entypo name="minus" color="white" size={18} />
</TouchableOpacity>
<Text>
    {'   '}{quantity}{'   '}
</Text>
<TouchableOpacity mode="contained" style={[{
    width: 25,
    backgroundColor:'#21c5df',
    height:25,
    borderRadius: 6,
    alignItems:'center',
    justifyContent:'center'},  styles.border1]} 
    onPress={() => 
            { setQuantity(quantity+1) }}>
    <Entypo name="plus" color="white" size={18} />
</TouchableOpacity>   
    </View>
    </View>
    </View>}
    </ScrollView>
    <View style={{flexDirection:'row',backgroundColor:'#21c5df',paddingVertical:15,paddingHorizontal:15}}>
    {quantity == 0 ? 
    <Text style={{fontSize:15,fontFamily:styles.PoppinsMedium.fontFamily,width:'73%',color:'white'}}>No Items </Text> :
    <Text style={{fontSize:15,fontFamily:styles.PoppinsMedium.fontFamily,width:'73%',color:'white'}}>{quantity} Total Items: Rs {total} </Text> 
    }
    {loading== false ?
    <TouchableOpacity style={{flexDirection:'row'}} 
    onPress={()=>{
        if(quantity==0){
               setShowCartAlert(true)
        }
        else if(address =='' || address =='null' || address == null){
          setProfileAlert(true)
        }
        else{
        setLoading(true)
        Order()}}} >
    <Text style={{fontSize:15,fontFamily:styles.PoppinsMedium.fontFamily,color:'white'}}>Continue </Text> 
    <MaterialIcons name="navigate-next" color="white" size={18} />
    {/* </View> */}
    </TouchableOpacity>
    :
    <View style={{height:35,backgroundColor:'#21c5df', width:'40%'}}>
    <LottieView
                source={require('../../animations/loading.json')}
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
            navigation.navigate(Nav.Home)
          }}
        />
  <AwesomeAlert
    show={showCartAlert}
    showProgress={false}
    title="Alert"
    message="Cart is empty"
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
      setShowCartAlert(false);
    }}
  />
  <AwesomeAlert
    show={showProfileAlert}
    showProgress={false}
    title="Alert"
    message="Complete your profile first"
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
      setProfileAlert(false);
    }}
  />
    </View>);
};


export default ECommerceCart;
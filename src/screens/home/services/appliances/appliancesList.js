import React,{useState} from 'react';
import { ScrollView, View, TouchableOpacity,Text, Alert } from 'react-native'
import { styles } from '../../../../styles/authStyles';
import Header from '../../../../componnents/auth/header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Heading from '../../../../componnents/home/headingComp';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, Paragraph, TextInput, Title } from 'react-native-paper';
import { Chip } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize'
import TopDrawer from '../../../../componnents/auth/drawer/topDrawer';
import DateTimePicker from '@react-native-community/datetimepicker';
import LottieView from 'lottie-react-native';
import { headers, store } from '../../../../utiles/reduxConfig/persistConfig';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';
import { FlatList } from 'react-native-gesture-handler';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useDispatch } from 'react-redux';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { LogOut } from '../../../../redux/actions/userActionMethodes';

const AppliancesList = () => {
    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const handleChange = (id) => {
    }
    const [loading, setLoading] = React.useState(false);
    const [list, setList] = useState([]);

    const dispatch=useDispatch();
    const [showSuspendAlert, setShowSuspendAlert] = useState(false);
    const Food= async()=>{
      console.log(headers)
        const response = await RNFetchBlob.fetch(
            'GET',
            `https://khuddar.org/application/api/services/furniture`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              'secret':store.getState().userReducer._token,
              'user-id':store.getState().userReducer.id
            },
            // [
            //     {name: 'category', data: 'food'  + ''},
            //     {name: 'listing_id', data:  id + ''},
                
            // ],
          )
            .then((response) => response.json())
            .then((response) => {
              console.log(response);
              setList(response.response.listings);
              setLoading(false);
              
            })
            .catch((error) => {
              console.log(error);
            });
        
    }
    
    const AddFood= async(id)=>{
      console.log(headers)
        const response = await RNFetchBlob.fetch(
            'POST',
            `https://khuddar.org/application/api/service/select`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              'secret':store.getState().userReducer._token,
              'user-id':store.getState().userReducer.id
            },
            [
                {name: 'category', data: 'food'  + ''},
                {name: 'listing_id', data:  id + ''},
                
            ],
          )
            .then((response) => response.json())
            .then((response) => {
              console.log(response);
               
            if(response.message=='Unauthorized User')
            {
              setShowSuspendAlert(true);
            }
            else
            {
              Alert.alert(
                   "",
                   (response.message),
                   [
                     { text: "OK", onPress: () => console.log("OK Pressed") }
                   ]
                  )
            }
              
            })
            .catch((error) => {
              console.log(error);
            });
        
    }
    
  React.useEffect(() => {
    // Food();
    // setLoading(true);
  }, []);

    return ( <View style={[{backgroundColor:'white',flex:1}]}>
    <TopDrawer/>
        <ScrollView>
            <View style={styles.ctr}>
            </View>
        
            <View style={[styles.ctr, styles.mt5]}>
                <Heading head="Available Appliances" label="Select appliances" />

                {loading==true ? (
        <View style={{height:300,}}>
          <LottieView
            source={require('../../../../animations/loading3.json')}
            autoPlay={true}
            loop={true}
            resizeMode="contain"
            progress={0}
          />
        </View>
      ) :  
          <FlatList
            data={list}
            renderItem={({item}) => {
              return(
                <Card style={{marginBottom:RFValue(20)}}onPress={()=>{
                    // navigation.navigate(Nav.NewsDetails,{
                    //   item:item
                    // })
                  }}>
                    <Card.Cover source={{ uri: item.image }} />
                    <Card.Content>
                      <Title style={[styles.PoppinsMedium,{fontSize:16}]}>{item.title}</Title>
                      <Paragraph style={[styles.PoppinsThin,{marginTop:-RFValue(5),fontSize:12,lineHeight:15}]} numberOfLines={3}>{item.description}</Paragraph>
                    
                    </Card.Content>
                   <Card.Actions>
                      <Button onPress={()=>{
                          AddFood(item.id);
                      }}>Select</Button>
                      <Button></Button>
                    </Card.Actions>
                    </Card>  
                )
            }}
            />
            }
 
  
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

export default AppliancesList;
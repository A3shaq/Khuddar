import * as React from 'react';
import { ScrollView, View, TouchableOpacity,StyleSheet,Text } from 'react-native'

import { styles } from '../../../styles/authStyles';
import { useNavigation } from '@react-navigation/native';
import TopDrawer from '../../../componnents/auth/drawer/topDrawer';
import Heading from '../../../componnents/home/headingComp';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import ServiceCard from '../../../componnents/home/serviceCard';
import {Nav} from '../../../navigation/navigationType';
import { Searchbar } from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob';
import LottieView from 'lottie-react-native';
import { FlatList } from 'react-native-gesture-handler';
import { headers, store } from '../../../utiles/reduxConfig/persistConfig';
import AwesomeAlert from 'react-native-awesome-alerts';
import { LogOut } from '../../../redux/actions/userActionMethodes';
import { useDispatch } from 'react-redux';

const OPD = () => {

    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const [loading, setLoading] = React.useState(false);
    const [opd, setOpd] = React.useState([]);
    
    const dispatch=useDispatch();
    const [showSuspendAlert, setShowSuspendAlert] = useState(false);
    const Opd= async(text)=>{
        console.log(headers)
          const response = await RNFetchBlob.fetch(
              'GET',
              `https://khuddar.org/application/api/opd/categories`,
              {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'secret':store.getState().userReducer._token,
                'user-id':store.getState().userReducer.id
              },
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
                setOpd(response.response.opd_categories.filter(item => {      
                  const itemData = `${item.name.toUpperCase()}`  
                  
                   const textData = text.toUpperCase() || text.toLowerCase();
                   console.log(itemData);
                   return itemData.indexOf(textData) > -1;    
                }));
              }
                setLoading(false);
              })
              .catch((error) => {
                console.log(error);
              });
      }
      const [query, setQuery] = React.useState('');

      const searchFilterFunction = (text) => {    
         const newData = opd.filter(item => {      
           const itemData = `${item.name.toUpperCase()}`  
           
            const textData = text.toUpperCase();
             
            return itemData.indexOf(textData) > -1;    
         });
         if(text ==''){
           Opd()
         }
         setOpd(newData)
       };
  React.useEffect(() => {
    Opd('');
    setLoading(true);
  }, []);
    return ( <View style={[{backgroundColor:'white',flex:1}]}>
        <TopDrawer/>
<View style={styles.ctr}>
<ScrollView alwaysBounceVertical showsVerticalScrollIndicator={false} style={{marginBottom:RFValue(138)}}>
    <View style={{marginTop:RFValue(20)}}>
    <Heading head="OPD Specialist" label="The correct cure of your disease can only be done by a specialist Dr, so Khuddar is giving you free treatment from the specialist Dr." type={true}  />
    
    <View style={[styles.mt5,{paddingVertical:10,paddingHorizontal:2}]}>
        <Searchbar hasRight={false} placeholder="Search specialist" inputStyle={{fontSize:12}}
        onChangeText={query => {Opd(query); setQuery(query)}}
        value={query} />
        {loading==true ? (
        <View style={{height:300,}}>
          <LottieView
            source={require('../../../animations/loading3.json')}
            autoPlay={true}
            loop={true}
            resizeMode="contain"
            progress={0}
          />
        </View>
      ) :  
          <FlatList
          style={{padding:2}}
            data={opd}
            renderItem={({item}) => {
              return  (
                //   <ProductCard item={item}/>
                <TouchableOpacity 
                onPress={()=>{
                    navigation.navigate(Nav.RegisterOpd,{
                        item:item
                    })
                }}
                style={{paddingVertical:20,borderBottomColor:'grey',borderBottomWidth:0.4,paddingHorizontal:10}}>
                <Text style={{fontSize:15}}>
                    {item.name}
                </Text>
                </TouchableOpacity>
              )
            }}
            />
            }
 
    </View>
    </View>
    </ScrollView>
  
</View>
    
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


export default OPD;
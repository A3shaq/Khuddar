import * as React from 'react';
import { ScrollView, View, TouchableOpacity,StyleSheet,Text } from 'react-native'

import { styles } from '../../../styles/authStyles';
import { useNavigation } from '@react-navigation/native';
import TopDrawer from '../../../componnents/auth/drawer/topDrawer';
import Heading from '../../../componnents/home/headingComp';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import ServiceCard from '../../../componnents/home/serviceCard';
import {Nav} from '../../../navigation/navigationType';
import RNFetchBlob from 'rn-fetch-blob';
import LottieView from 'lottie-react-native';
import { FlatList } from 'react-native-gesture-handler';
import { headers, store } from '../../../utiles/reduxConfig/persistConfig';
import { LogOut } from '../../../redux/actions/userActionMethodes';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useDispatch } from 'react-redux';
import { widthPercentageToDP } from 'react-native-responsive-screen';
const Lab = () => {

    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const [loading, setLoading] = React.useState(false);
    const [tests, setTests] = React.useState([]);
    
    const dispatch=useDispatch();
    const [showSuspendAlert, setShowSuspendAlert] = useState(false);

    const Tests= async()=>{
        console.log(headers)
          const response = await RNFetchBlob.fetch(
              'GET',
              `https://khuddar.org/application/api/my_tests`,
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
                setTests(response.response.my_tests);
                }
                setLoading(false);
              })
              .catch((error) => {
                console.log(error);
              });
      }
      
  React.useEffect(() => {
    Tests();
    setLoading(true);
  }, []);
    return ( <View style={[{backgroundColor:'white',flex:1}]}>
        <TopDrawer/>
<View style={styles.ctr}>
<ScrollView alwaysBounceVertical showsVerticalScrollIndicator={false} style={{marginBottom:RFValue(13)}}>
    <View style={{marginTop:RFValue(20)}}>
    <Heading head="Khuddar Lab tests" label="Treatment without the right diagnosis can get you to the worst condition, therefore Khuddar is giving you free lab tests facilities." type={true}  />
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
        //   numColumns={2}
        //   style={{padding:2}}
            data={tests}
            renderItem={({item}) => {
              return  
            }}
            />
            }
 
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


export default Lab;
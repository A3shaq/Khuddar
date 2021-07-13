import * as React from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';

import {styles} from '../../styles/authStyles';
import {useNavigation} from '@react-navigation/native';
import TopDrawer from '../../componnents/auth/drawer/topDrawer';
import Heading from '../../componnents/home/headingComp';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import ServiceCard from '../../componnents/home/serviceCard';
import {Nav} from '../../navigation/navigationType';
import AwesomeAlert from 'react-native-awesome-alerts';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import messaging from '@react-native-firebase/messaging';
import {headers, store} from '../../utiles/reduxConfig/persistConfig';
import RNFetchBlob from 'rn-fetch-blob';
import { fcmToken, userReducer} from '../../redux/reducers/user';
import {useDispatch} from 'react-redux';
import { SaveFcm } from '../../redux/actions/userActionMethodes';

const MyComponent = () => {
  const dispatch = useDispatch();

  let [page, setPage] = React.useState({});
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = React.useState(false);
  const [alert, setAlert] = React.useState('');
  const fcmTokenUpdate = async (fcm) => {
    // console.log(`TOKEN : ${fcm}`);
    const response = await RNFetchBlob.fetch(
      'POST',
      `https://khuddar.org/application/api/save_firebase_token`,
      {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        secret: store.getState().userReducer._token,
        'user-id': store.getState().userReducer.id,
      },
      [{name: 'token', data: fcm + ''}],
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);
        messaging().onMessage(async remoteMessage => {
          Alert.alert(
            'A new FCM message arrived!',
            JSON.stringify(remoteMessage),
          );
        });
        messaging().setBackgroundMessageHandler(async remoteMessage => {
          console.log(remoteMessage);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // getting firebase token
  const _checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      const devicee = await messaging().getToken();
      // console.log(devicee);
      fcmTokenUpdate(devicee);
      dispatch(SaveFcm({fcmToken:devicee}));
    } else this._getPermission();
  };

  const _getPermission = async () => {
    messaging()
      .requestPermission()
      .then(() => {
        _checkPermission();
      })
      .catch(error => {
        // User has rejected permissions
      });
  };

  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    _getPermission();
    setTimeout(() => {
      setShow(true);
    }, 9000);
    console.log(store.getState());
  }, []);
  const handleChange = id => {};
  const wel = `Welcome ${store.getState().userReducer.name}`;
  return (
    <View style={[{backgroundColor: 'white', flex: 1}]}>
      <TopDrawer />

      <View style={styles.ctr}>
        <ScrollView
          alwaysBounceVertical
          showsVerticalScrollIndicator={false}
          style={{marginBottom: RFValue(138)}}>
          <View style={{marginTop: RFValue(20)}}>
            <Heading
              head={wel}
              label="Please choose your service"
              type={true}
            />
            <Heading head="Zaruriyat" type={true} />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginTop: RFValue(15),
              }}>
              <ServiceCard
                src={require('../../images/home/f6.png')}
                title="Funeral"
                onPress={() => navigation.navigate(Nav.RegisterFuneral)}
              />
              {/* <ServiceCard src={require('../../images/home/f1.png')} onPress={()=>{navigation.navigate(Nav.FamilyHome)}} title="Family" /> */}
              <ServiceCard
                src={require('../../images/home/f2.png')}
                title="Shadi"
                onPress={() => navigation.navigate(Nav.ServicesHome)}
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginTop: RFValue(15),
              }}>
              <ServiceCard
                src={require('../../images/home/f3.png')}
                title="Mart"
                onPress={() => {
                  navigation.navigate(Nav.Mart);
                }}
              />
              <ServiceCard
                src={require('../../images/17.png')}
                title="Hospital"
                onPress={() => {
                  navigation.navigate(Nav.Hospital);
                }}
              />
            </View>
            <Heading head="Rozgar" type={true} />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginTop: RFValue(15),
              }}>
              <ServiceCard
                src={require('../../images/home/f7.png')}
                title="Business"
                onPress={() => {
                  navigation.navigate(Nav.Business);
                }}
              />
              <ServiceCard
                src={require('../../images/home/f5.png')}
                title="Jobs"
                onPress={() => {
                  navigation.navigate(Nav.Jobs);
                }}
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginTop: RFValue(15),
              }}>
              <ServiceCard
                src={require('../../images/home/f8.png')}
                title="Blogs"
                onPress={() => {
                  navigation.navigate(Nav.AffiliationHome);
                }}
              />
              <ServiceCard
                src={require('../../images/ecomm.png')}
                title="E-commerce"
                onPress={() => {
                  navigation.navigate(Nav.ECommerce);
                }}
              />
            </View>
            <Heading head="Pese Kamao" type={true} />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginTop: RFValue(15),
              }}>
              <ServiceCard
                src={require('../../images/home/f9.png')}
                title="Games"
                onPress={() => {
                  setShowAlert(true);
                }}
              />
              <ServiceCard
                src={require('../../images/home/f10.png')}
                title="videos"
                onPress={() => {
                  navigation.navigate(Nav.VideosList);
                }}
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginTop: RFValue(15),
              }}>
              <ServiceCard
                src={require('../../images/home/f4.png')}
                title="Quiz"
                onPress={() => {
                  navigation.navigate(Nav.QuizHome);
                }}
              />
            </View>
            <Heading head="Tafreeh" type={true} />
            <View
              style={{
                display: 'flex',
                marginTop: RFValue(15),
                marginBottom: RFValue(100),
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <ServiceCard
                src={require('../../images/home/f9.png')}
                title="News"
                onPress={() => navigation.navigate(Nav.News)}
              />
            </View>
          </View>
          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title="Dues Alert"
            message="Dues are pending please complete your dues to unlock it."
            contentContainerStyle={{width: widthPercentageToDP('95')}}
            confirmButtonStyle={{
              width: widthPercentageToDP('20'),
              alignItems: 'center',
            }}
            messageStyle={{fontFamily: 'PoppinsRegular'}}
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
      </View>
    </View>
  );
};

export default MyComponent;

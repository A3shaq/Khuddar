import React, {useState} from 'react';
import {ScrollView, View, TouchableOpacity, Text, Alert} from 'react-native';
import {styles} from '../../../styles/authStyles';
import Header from '../../../componnents/auth/header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Heading from '../../../componnents/home/headingComp';
import {useNavigation} from '@react-navigation/native';
import {Button, TextInput} from 'react-native-paper';
import {Chip} from 'react-native-paper';
import {FAB} from 'react-native-paper';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import TopDrawer from '../../../componnents/auth/drawer/topDrawer';
import LottieView from 'lottie-react-native';
import {headers, store} from '../../../utiles/reduxConfig/persistConfig';
import RNFetchBlob from 'rn-fetch-blob';
import AwesomeAlert from 'react-native-awesome-alerts';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {localNotification} from '../../../componnents/Notifications';
import {useDispatch} from 'react-redux';
import {LogOut} from '../../../redux/actions/userActionMethodes';

const Business = () => {
  let [page, setPage] = React.useState({});
  const navigation = useNavigation();
  const handleChange = id => {};
  const [description, setDescription] = React.useState('');
  const [capital, setCapital] = React.useState('');
  const [descriptionMessage, setDescriptionMessage] = React.useState('');
  const [capitalMessage, setCapitalMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState('');

  const dispatch = useDispatch();
  const [showSuspendAlert, setShowSuspendAlert] = useState(false);

  const Register = async () => {
    const response = await RNFetchBlob.fetch(
      'POST',
      `https://khuddar.org/application/api/business/add`,
      {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        secret: store.getState().userReducer._token,
        'user-id': store.getState().userReducer.id,
      },
      [
        {name: 'description', data: description + ''},
        {name: 'capital', data: capital + ''},
      ],
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);
        //   setList(response);
        setLoading(false);
        if (response.message == 'Unauthorized User') {
          setShowSuspendAlert(true);
        } else {
          setAlert(response.message);
          setShowAlert(true);
        }
        setAlert(response.message);
        setShowAlert(true);
        localNotification({title: 'hellooo', msg: response.message});
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={[{backgroundColor: 'white', flex: 1}]}>
      <TopDrawer />
      <ScrollView>
        <View style={styles.ctr}></View>

        <View style={[styles.ctr, styles.mt5]}>
          <Heading
            head="Business Registration Details"
            label="Khuddar is providing different business opportunities on the capital system."
          />

          <TextInput
            label="Enter description"
            mode="outlined"
            onChangeText={description => {
              setDescription(description);
              setDescriptionMessage('');
            }}
            style={[styles.textInput, styles.mt5]}
            left={
              <TextInput.Icon
                name={() => (
                  <AntDesign
                    name="filetext1"
                    size={16}
                    style={[styles.themeColor, {paddingTop: '30%'}]}
                  />
                )}
              />
            }
          />
          {descriptionMessage != '' ? (
            <Text style={{fontSize: 12, color: 'red'}}>
              {descriptionMessage}
            </Text>
          ) : null}

          <TextInput
            label="Enter capital"
            keyboardType="numeric"
            onChangeText={capital => {
              setCapital(capital);
              setCapitalMessage('');
            }}
            mode="outlined"
            style={[styles.textInput, styles.mt5]}
            left={
              <TextInput.Icon
                name={() => (
                  <AntDesign
                    name="filetext1"
                    size={16}
                    style={[styles.themeColor, {paddingTop: '30%'}]}
                  />
                )}
              />
            }
          />
          {capitalMessage != '' ? (
            <Text style={{fontSize: 12, color: 'red'}}>{capitalMessage}</Text>
          ) : null}
          {loading == false ? (
            <Button
              mode="contained"
              style={[
                styles.buttonMain,
                styles.mt5,
                styles.border1,
                {marginBottom: RFValue(60)},
              ]}
              onPress={() => {
                if (description == '' && capital == '') {
                  setDescriptionMessage('Required');
                  setCapitalMessage('Required');
                } else if (description == '') {
                  setDescriptionMessage('Required');
                } else if (capital == '') {
                  setCapitalMessage('Required');
                } else {
                  setLoading(true);
                  Register();
                }
              }}>
              <Text style={[styles.textTr, styles.themeColorwhite]}>
                {' '}
                Register
              </Text>
            </Button>
          ) : (
            <View
              style={[
                styles.mt5,
                {
                  backgroundColor: '#21c5df',
                  height: 47,
                  width: '100%',
                  borderRadius: 6,
                },
              ]}>
              <LottieView
                source={require('../../../animations/loading.json')}
                autoPlay={true}
                loop={true}
                resizeMode="contain"
                progress={0}
              />
            </View>
          )}
        </View>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title=""
          message={alert}
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

        <AwesomeAlert
          show={showSuspendAlert}
          showProgress={false}
          title="Alert"
          message="Your account has been suspened by the admin. Please contact support for futher information."
          contentContainerStyle={{width: widthPercentageToDP('95')}}
          confirmButtonStyle={{
            width: widthPercentageToDP('20'),
            alignItems: 'center',
          }}
          messageStyle={{fontFamily: 'PoppinsRegular'}}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Ok"
          confirmButtonColor="#21c5df"
          onConfirmPressed={() => {
            setShowSuspendAlert(false);
            dispatch(LogOut());
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Business;

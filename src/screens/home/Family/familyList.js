import React,{useState} from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet, Text, FlatList, Keyboard } from 'react-native'
import { StatusBar } from 'expo-status-bar';

import { styles } from '../../../styles/authStyles';
import { useNavigation } from '@react-navigation/native';
import TopDrawer from '../../../componnents/auth/drawer/topDrawer';
import Heading from '../../../componnents/home/headingComp'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import ServiceCard from '../../../componnents/home/serviceCard';
import { Nav } from '../../../navigation/navigationType'
import {Avatar,Searchbar} from 'react-native-paper'
import RNFetchBlob from 'rn-fetch-blob';
import { headers, store } from '../../../utiles/reduxConfig/persistConfig';
import LottieView from 'lottie-react-native';
import { useDispatch } from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import { LogOut } from '../../../redux/actions/userActionMethodes';
import { widthPercentageToDP } from 'react-native-responsive-screen';


const MyComponent = () => {

    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const handleChange = (id) => {
    }
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtered, setFiltered] = useState([]);

    const dispatch=useDispatch();
    const [showSuspendAlert, setShowSuspendAlert] = useState(false);

    const List= async(text)=>{
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
              // console.log(response);
              if(response.message=='Unauthorized User')
              {
                setShowSuspendAlert(true);
              }
              else
              {
              setList(response.response.user.members.filter(item => {      
                const itemData = `${item.name.toUpperCase()}`  
                
                 const textData = text.toUpperCase() || text.toLowerCase();
                 console.log(itemData);
                 return itemData.indexOf(textData) > -1;    
              }));
            }
              console.log(list);
              setLoading(false);
        
            })
            .catch((error) => {
              console.log(error);
            });
        
    }
    const [query, setQuery] = useState('');
     
   const searchFilterFunction = (text) => {    
     
     console.log(text);
      const newData = list.filter(item => {      
        const itemData = `${item.name.toUpperCase()}`  
        
         const textData = text.toUpperCase() || text.toLowerCase();
         console.log(itemData);
         return itemData.indexOf(textData) > -1;    
      });
      if(text ==''){
        List()
      }
      setList(newData)
      console.log(newData)
    };
  React.useEffect(() => {
    List('');
    console.log(query)
    setLoading(true);
  }, []);
  
    const ResultView = ({name,image,type}) => {
        return <View style={[styles.felxRow, { justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#ededed', padding: 10 }]}>
            
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {image == null ?
                <Avatar.Image source={{ uri: 'https://phowdimages.azureedge.net/cloud/pics/8137/p/c7bfc992b6614bf9a36057506e1bfc4c/1.jpg?preset=details' }} />
                :
                <Avatar.Image source={{ uri: image }} />
              }
                <Heading head={name} style={{ color: '#717171', fontSize: 14,marginLeft:12 }} />

            </View>
            <View>
            <Heading head="Member Type" style={{ color: '#717171', fontSize: 14 }} type={true} />
            <Heading head={type} style={{ color: '#717171', fontSize: 14,marginTop:RFValue(-20) }} />

            </View>
        </View>
    }
    return (<View style={[{ backgroundColor: 'white', flex: 1 }]}>
        <TopDrawer />

        <View style={[styles.ctr,styles.mt5]}>
            <View alwaysBounceVertical showsVerticalScrollIndicator={false} style={{ marginBottom: RFValue(138) }}>
            <Heading head="Family Details" label="Upload Details about your family" />

            <View style={[styles.mt5,{padding:10}]}>
            <Searchbar hasRight={false} placeholder="Search Member" inputStyle={{fontSize:12}} 
            onChangeText={query => {  setQuery(query); List(query); console.log(query)}}
            value={query}/>

            </View>
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
            data={list}
            renderItem={({item}) => {
              return <ResultView name={item.name} image={item.image} type={item.type}/>
            }}
            />
            }
      
            </View>

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


export default MyComponent;
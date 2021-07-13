import React,{useState} from 'react';
import { ScrollView, View, TouchableOpacity,Text, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import NewsCard from '../../../componnents/home/News/newsCards';
import TopDrawer from '../../../componnents/auth/drawer/topDrawer';
import Heading from '../../../componnents/home/headingComp';
import {styles} from '../../../styles/authStyles'
import RNFetchBlob from 'rn-fetch-blob';
import LottieView from 'lottie-react-native';
import { headers, store } from '../../../utiles/reduxConfig/persistConfig';
import { FlatList } from 'react-native-gesture-handler';
import { Card, Paragraph, Searchbar, Title } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import ProductCard from '../../../componnents/products/productCard';
import { Nav } from '../../../navigation/navigationType';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import YouTube from 'react-native-youtube';
import { heightPercentageToDP } from 'react-native-responsive-screen';


const CalculateResults = ({route}) => {
    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const handleChange = (id) => {
    }
    const message = route.params.message;
    const Quiz= async()=>{
        const response = await RNFetchBlob.fetch(
            'GET',
            `https://khuddar.org/application/api/quiz/announceResult`,
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
            })
            .catch((error) => {
              console.log(error);
            });
        
    }
  React.useEffect(() => {
    Quiz();
  }, []);
    
    return (<View style={[{backgroundColor:'#8c92ac',flex:1,justifyContent:'center'}]}>
        <View style={{height:heightPercentageToDP('60')}}>
        <LottieView source={require('../../../animations/tr1.json')} 
        autoPlay={true} 
        loop={true}
        resizeMode="contain"
        progress={0}
         />
              </View>          
    <Text style={{
        textAlign:'center',
        alignSelf:'center',
        // position:'absolute',
        // bottom:heightPercentageToDP('15'),
        color: 'white',
        fontSize:15,
        fontFamily:'PoppinsRegular'}}>
        {message}
    </Text> 
    
    <TouchableOpacity style={{marginBottom:10,backgroundColor:'green',height:47,justifyContent:'center',alignItems:'center',margin:50}} 
            onPress={() => {
              navigation.replace(Nav.QuizHome)
                }}>
             
                <Text style={[styles.textTr,styles.themeColorwhite,{fontSize:18,fontFamily:"PoppinsMedium",alignSelf:'center'}]}>Continue</Text>
            </TouchableOpacity>

    </View>);
};

export default CalculateResults;
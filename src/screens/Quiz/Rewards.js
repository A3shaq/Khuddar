import React, { useState } from 'react';
import { View, Text,ScrollView,Dimensions } from 'react-native';
import CardCenterComp from '../../componnents/Quiz/cardCenterComp';
import CategoryCard from '../../componnents/Quiz/categoryCard';
import TopDrawer from '../../componnents/auth/drawer/topDrawer';
import Heading from '../../componnents/home/headingComp'
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {styles} from '../../styles/authStyles';
const width = Dimensions.get('window').width;
import { Avatar } from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob';
import { setConfig } from '../../utiles/reduxConfig/persistConfig';

const ResultView=()=>{
    
    return  <View style={[styles.felxRow,{justifyContent:'space-between',borderBottomWidth:1,borderColor:'#ededed',padding:10}]}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Avatar.Image  source={{uri:'https://phowdimages.azureedge.net/cloud/pics/8137/p/c7bfc992b6614bf9a36057506e1bfc4c/1.jpg?preset=details'}} />
            <Heading head="Player"  style={{ color: '#717171',fontSize:14,}}  />

                </View>
    <Heading head="1st"   style={{ color: '#717171',fontSize:14}} />

    </View>
}
export default function () {
    const [todayScore ,setTodayScore] = useState('');
    const [todayRank ,setTodayRank] = useState('');
    const [todayEarned ,setTodayEarned] = useState('');
    const Results= async()=>{
        const response = await RNFetchBlob.fetch(
            'GET',
            `https://khuddar.org/application/api/quiz/result`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            setConfig()
          )
            .then((response) => response.json())
            .then((response) => {
              console.log(response);
              if(response.success== true){
                  setTodayEarned(response.response.earning)
                  setTodayRank(response.response.rank)
                  setTodayScore(response.response.correct)
              }
           //    setMessage(response.message);
            //   setLoading(false);
            //   if(response.success==true){
   
            //     // dispatch(Login({
            //     //     _token:response.response.user.token.token,
            //     //     id:response.response.user.token.user_id
            //     // }))
            //   }
            //   else
            //   {
            //   Alert.alert(
            //    "",
            //    (response.message),
            //    [
            //      { text: "OK", onPress: () => console.log("OK Pressed") }
            //    ]
            //   )
            // }
            })
            .catch((error) => {
              console.log(error);
            });
        
    }
  React.useEffect(() => {
    Results();
  }, []);
    return <>
     <View style={[{backgroundColor:'white',flex:1}]}>
        <TopDrawer/>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.ctr}>
        <View >
        <Heading head="Daily Quiz Results" label="Please choose your service" type={true}  />

        </View>
        <CardCenterComp />
        <View style={[styles.mt5,styles.felxRow,{justifyContent:'space-between',borderBottomWidth:1,borderColor:'#ededed'}]}>
        <Heading head="Your Total Score"  style={{ color: '#717171',fontSize:14}}  />
        <Heading head={todayScore}   style={{ color: '#717171',fontSize:14}} />

        </View>
        <View style={[styles.mt5,styles.felxRow,{justifyContent:'space-between',borderBottomWidth:1,borderColor:'#ededed'}]}>
        <Heading head="Your Today Rank"  style={{ color: '#717171',fontSize:14}}  />
        <Heading head={todayRank}   style={{ color: '#717171',fontSize:14}} />

        </View>
        <View style={[styles.mt5,styles.felxRow,{justifyContent:'space-between',borderBottomWidth:1,borderColor:'#ededed'}]}>
        <Heading head="Total Earned Today"  style={{ color: '#717171',fontSize:14}}  />
        <Heading head={todayEarned}   style={{ color: '#717171',fontSize:14}} />

        </View>
        <Heading head="Today Results" style={styles.mt10} type={true} />
            <ResultView/>
            <ResultView/>
            <ResultView/>
            
        </View>
      </ScrollView>
    </View>
     
    
    </>
}
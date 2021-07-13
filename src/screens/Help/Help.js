import React,{useState} from 'react';
import { ScrollView, View, TouchableOpacity,StyleSheet,Text,Image } from 'react-native'

import { styles } from '../../styles/authStyles';
import {useNavigation} from '@react-navigation/native';
import TopDrawer from '../../componnents/auth/drawer/topDrawer';
import Heading from '../../componnents/home/headingComp'
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import ServiceCard from '../../componnents/home/serviceCard';
import {Nav} from '../../navigation/navigationType'
const Help = () => {

    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const handleChange = (id) => {      
    }
    return ( <View style={[{backgroundColor:'white',flex:1}]}>
        <TopDrawer/>
<View style={styles.ctr}>
<ScrollView alwaysBounceVertical showsVerticalScrollIndicator={false} style={{marginVertical:RFValue(100)}}>
    <View style={{marginTop:RFValue(20),alignItems:'center',justifyContent:'center',flex:1}}>
    <Image source={require('../../images/kdm.png')} style={{width:130,height:25}} resizeMode="stretch"  />
    <Text style={[styles.mainTitleHead]}><Text style={styles.themeColor}>K</Text><Text>huddar Help</Text><Text style={styles.themeColor}></Text></Text>
    <Text style={{fontFamily:'PoppinsRegular',marginTop:5}}>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </Text>
    </View>
    </ScrollView>
  
</View>
    
    </View>);
};


export default Help;
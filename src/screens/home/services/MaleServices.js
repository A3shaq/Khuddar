import * as React from 'react';
import { ScrollView, View, TouchableOpacity,StyleSheet,Text } from 'react-native'
import { StatusBar } from 'expo-status-bar';

import { styles } from '../../../styles/authStyles';
import { useNavigation } from '@react-navigation/native';
import TopDrawer from '../../../componnents/auth/drawer/topDrawer';
import Heading from '../../../componnents/home/headingComp'
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import ServiceCard from '../../../componnents/home/serviceCard';
import {Nav} from '../../../navigation/navigationType';

const MaleServices = () => {

    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const handleChange = (id) => {      
    }
    return ( <View style={[{backgroundColor:'white',flex:1}]}>
        <TopDrawer/>
<View style={styles.ctr}>
<ScrollView alwaysBounceVertical showsVerticalScrollIndicator={false} style={{marginBottom:RFValue(138)}}>
    <View style={{marginVertical:RFValue(20)}}>
    <Heading head="Khuddar Valima" label="Please choose your service" type={true}  />
    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',marginTop:RFValue(15)}}>
    <ServiceCard src={require('../../../images/services/f16.png')} onPress={()=>{navigation.navigate(Nav.AddFood)}} title="Food and Food" />
    <ServiceCard src={require('../../../images/services/f17.png')} onPress={()=>{navigation.navigate(Nav.AddDress)}} title="Wedding Dress" />
    </View>
    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',marginTop:RFValue(15)}}>
    <ServiceCard src={require('../../../images/services/f19.png')} onPress={()=>{navigation.navigate(Nav.AddSaloon)}} title="Salon / Parlour" />
    <ServiceCard src={require('../../../images/services/f18.png')} onPress={()=>{navigation.navigate(Nav.AddValima)}} title="Valima" />
    </View>
    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',marginTop:RFValue(15)}}>
    <ServiceCard src={require('../../../images/services/f20.png')} onPress={()=>{navigation.navigate(Nav.AddCar)}} title="Rent A Car" />
    {/* <ServiceCard src={require('../../../images/13F.png')} onPress={()=>{navigation.navigate(Nav.Barat)}} title="Female" /> */}
    </View>
    </View>
    </ScrollView>
  
</View>
    
    </View>);
};


export default MaleServices;
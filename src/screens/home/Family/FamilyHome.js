import * as React from 'react';
import { ScrollView, View, TouchableOpacity,StyleSheet,Text } from 'react-native'

import { styles } from '../../../styles/authStyles';
import { useNavigation } from '@react-navigation/native';
import TopDrawer from '../../../componnents/auth/drawer/topDrawer';
import Heading from '../../../componnents/home/headingComp'
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import ServiceCard from '../../../componnents/home/serviceCard';
import {Nav} from '../../../navigation/navigationType'
const MyComponent = () => {

    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const handleChange = (id) => {      
    }
    return ( <View style={[{backgroundColor:'white',flex:1}]}>
        <TopDrawer/>
<View style={styles.ctr}>
<ScrollView alwaysBounceVertical showsVerticalScrollIndicator={false}style={{marginBottom:RFValue(150)}} >
    <View style={{marginTop:RFValue(20)}}>
    <Heading head="Khuddar Family" label="Please choose your service" type={true}  />
    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',marginTop:RFValue(15),marginBottom:RFValue(15)}}>
    <ServiceCard src={require('../../../images/family/f11.png')} onPress={()=>{navigation.navigate(Nav.Family)}} title="Add Member" />
    <ServiceCard src={require('../../../images/family/f12.png')}  onPress={()=>{navigation.navigate(Nav.FamilyList)}} title="List Members" />
    </View>
    <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',marginTop:RFValue(15),marginBottom:RFValue(100)}}>
    <ServiceCard src={require('../../../images/family/f12.png')} onPress={()=>{navigation.navigate(Nav.RegisterShadi)}} title="Register Shadi" />
    </View>
    </View>
    </ScrollView>
  
</View>
    
    </View>);
};


export default MyComponent;
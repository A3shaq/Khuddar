import * as React from 'react';
import { ScrollView, View, TouchableOpacity,StyleSheet,Text } from 'react-native'

import { styles } from '../../../styles/authStyles';
import { useNavigation } from '@react-navigation/native';
import TopDrawer from '../../../componnents/auth/drawer/topDrawer';
import Heading from '../../../componnents/home/headingComp';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import ServiceCard from '../../../componnents/home/serviceCard';
import {Nav} from '../../../navigation/navigationType';

const Hospital = () => {

    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const handleChange = (id) => {      
    }
    return ( <View style={[{backgroundColor:'white',flex:1}]}>
        <TopDrawer/>
<View style={styles.ctr}>
<ScrollView alwaysBounceVertical showsVerticalScrollIndicator={false} style={{marginBottom:RFValue(138)}}>
    <View style={{marginVertical:RFValue(20)}}>
    <Heading head="Kuddar OPD" label="Khuddar OPD includes free checkups from specialist physicians and lab tests." type={true}  />
    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',marginTop:RFValue(15)}}>
    <ServiceCard src={require('../../../images/10.png')} title="OPD" onPress={()=>navigation.navigate(Nav.OPD)} />
    <ServiceCard src={require('../../../images/11.png')} title="Lab" onPress={()=>navigation.navigate(Nav.Lab)} />
    </View>
    </View>
    </ScrollView>
  
</View>
    
    </View>);
};


export default Hospital;
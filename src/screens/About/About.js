import * as React from 'react';
import { ScrollView, View, TouchableOpacity,StyleSheet,Text,Image } from 'react-native'

import { styles } from '../../styles/authStyles';
import {useNavigation} from '@react-navigation/native';
import TopDrawer from '../../componnents/auth/drawer/topDrawer';
import Heading from '../../componnents/home/headingComp'
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import ServiceCard from '../../componnents/home/serviceCard';
import {Nav} from '../../navigation/navigationType'
import { heightPercentageToDP } from 'react-native-responsive-screen';
const About = () => {

    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const handleChange = (id) => {      
    }
    return ( <View style={[{backgroundColor:'white',flex:1}]}>
        <TopDrawer/>
<View style={styles.ctr}>
<ScrollView alwaysBounceVertical showsVerticalScrollIndicator={false} style={{marginBottom:RFValue(100)}}>
    <View style={{marginVertical:RFValue(20),alignItems:'center',justifyContent:'center',flex:1}}>
    <Image source={require('../../images/kdm.png')} style={{width:130,height:25}} resizeMode="stretch"  />
    <Text style={[styles.mainTitleHead]}><Text style={styles.themeColor}>A</Text><Text>bout Us</Text><Text style={styles.themeColor}></Text></Text>
    <Text style={{fontFamily:'PoppinsRegular',marginTop:5, marginBottom:heightPercentageToDP('10')}}>
    Khuddar is providing many benefits like job opportunities, business opportunities, shadi service, hospital facilities, and funeral services. Only in 750 rupees monthly subscription.

Job opportunities: khuddar is providing hundreds of jobs in a safe and friendly environment to girls and boys both in its different departments according to their ability without any discrimination.

Business opportunities: khuddar is also providing business opportunities in their marts.

Shadi service: khuddar is also providing shadi services to their subscribers including dowry and other services but after at least 6 months of subscription and registration before 6 months of marriage on khuddar app.

Hospital service:khuddar is also providing basic hospital services to their subscribers like Opd (physician fee) including lab tests.

Funeral services: khaddar is also providing funeral services to their subscribers like caffan and other services without any religion or other discriminations.

Khuddar is mentioning that these services aren’t sadqa, zakat, or charity fund these are the benefits that our subscribers will get for monthly subscription of 750 rupees cause khuddar wants to make every Pakistani khuddar by respecting their khuddari.    </Text>
    </View>
    </ScrollView>
  
</View>
    
    </View>);
};


export default About;
import * as React from 'react';
import { ScrollView, View, TouchableOpacity,StyleSheet,Text } from 'react-native'
import { styles } from '../../../../styles/authStyles';
import { useNavigation } from '@react-navigation/native';
import TopDrawer from '../../../../componnents/auth/drawer/topDrawer';
import Heading from '../../../../componnents/home/headingComp'
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import ServiceCard from '../../../../componnents/home/serviceCard';
import {Nav} from '../../../../navigation/navigationType';

const AddFood = () => {

    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const handleChange = (id) => {      
    }
    return ( <View style={[{backgroundColor:'white',flex:1}]}>
        <TopDrawer/>
<View style={styles.ctr}>
<ScrollView alwaysBounceVertical showsVerticalScrollIndicator={false} style={{marginBottom:RFValue(138)}}>
    <View style={{marginVertical:RFValue(20)}}>
    <Heading head="Khuddar Food" label="Please choose your services" type={true}  />
    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',marginTop:RFValue(15)}}>
    <ServiceCard src={require('../../../../images/services/f16.png')} onPress={()=>{navigation.navigate(Nav.SelectedFood)}} title="Selected Food" />
    <ServiceCard src={require('../../../../images/services/f16.png')} onPress={()=>{navigation.navigate(Nav.ListFood)}} title="List Food" />
    </View>
    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',marginTop:RFValue(15)}}>
    <ServiceCard src={require('../../../../images/services/f16.png')} onPress={()=>{navigation.navigate(Nav.FoodAndFood)}} title="Food Details" />
    </View>
    </View>
    </ScrollView>
  
</View>
    
    </View>);
};


export default AddFood;
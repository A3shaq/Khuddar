import * as React from 'react';
import { View, Image, Text,TouchableOpacity } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph ,FAB,Chip} from 'react-native-paper';
import { styles } from '../../styles/authStyles';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Entypo from 'react-native-vector-icons/Entypo';
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
import { useNavigation } from '@react-navigation/native';

const MyComponent = ({ img, title, items,price, type,handlePress }) =>
{
  const navigation = useNavigation();
return (
  
 <TouchableOpacity onPress={()=>handlePress?handlePress():console.log()}>
      <View style={{ marginBottom: 10, marginTop: 10, flex: 1, flexDirection: 'row', justifyContent: 'flex-start', borderBottomWidth: 1, paddingBottom: 10, borderBottomColor: '#d9d9d9' }}>
    
    <View>
    <Avatar.Image size={60} style={{marginRight:10}} source={{ uri: img }} />

    </View>
    <View>
      <Text style={[styles.mainTitleHead1]}>{title}</Text>
      <Text style={[styles.mainpara, { marginTop: RFValue(-8) }]}>Items: {items}</Text>
      
      <View style={styles.productbtn}>
        <Text style={[styles.mainpara, { fontFamily: 'PoppinsMedium', fontSize: 14 }]}>${price}</Text>
        <View style={{}}>
        <Chip style={{marginRight:4}} icon="cart-arrow-right" mode="flat" onPress={() => console.log('Pressed')}>Pending</Chip>
        </View>
      </View>
    </View>
  </View>
 </TouchableOpacity>
);

}

export default MyComponent;
import * as React from 'react';
import { View, Image, Text,TouchableOpacity } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { styles } from '../../styles/authStyles';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Chip from '../home/chip'
import Entypo from 'react-native-vector-icons/Entypo';
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
import { useNavigation } from '@react-navigation/native';
import { Nav } from '../../navigation/navigationType';

const ProductCard = ({ img, title, desc, unit, price, quanity ,item}) =>
{
  const navigation = useNavigation();
return (
  
  
  <Card style={{marginBottom:RFValue(20),width:"47%",marginHorizontal:4}}onPress={()=>{
    navigation.navigate(Nav.ECommDetails,{
      item:item
    })
  }}>
    <Card.Cover style={{height:140}} source={{ uri: item.images[0].image }} />
    <Card.Content>
      <Title numberOfLines={1} style={[styles.PoppinsMedium,{fontSize:16}]}>{item.title}</Title>
      <Paragraph style={[styles.PoppinsThin,{marginTop:-RFValue(5),fontSize:12,lineHeight:15}]} numberOfLines={1}>Price Rs-<Text style={{textDecorationLine:'line-through'}}>{item.price}</Text></Paragraph>
      <Paragraph style={[styles.PoppinsThin,{marginTop:-RFValue(5),fontSize:12,lineHeight:15}]} numberOfLines={1}>Rs-{item.discounted_price}</Paragraph>
    
    </Card.Content>
   
</Card>
);

}

export default ProductCard;
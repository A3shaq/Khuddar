import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { Nav } from '../../../navigation/navigationType';
import {styles} from '../../../styles/authStyles'
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const WalimaCard = ({src,hasButton,item,}) => {
  const navigation = useNavigation();

  return(
  <Card style={{marginBottom:RFValue(20)}}onPress={()=>{
    // navigation.navigate(Nav.NewsDetails,{
    //   item:item
    // })
  }}>
    <Card.Cover source={{ uri: item.image }} />
    <Card.Content>
      <Title style={[styles.PoppinsMedium,{fontSize:16}]}>{item.title}</Title>
      <Paragraph style={[styles.PoppinsThin,{marginTop:-RFValue(5),fontSize:12,lineHeight:15}]} numberOfLines={3}>{item.short_content}</Paragraph>
    
    </Card.Content>
   {hasButton?  <Card.Actions>
      <Button>Select</Button>
      <Button></Button>
    </Card.Actions>:<></>}
    </Card>
)}
export default WalimaCard;
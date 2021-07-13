import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize'
const LeftContent = props => <Avatar.Icon {...props} style={{marginTop:RFValue(30)}} color="white" icon="bank" />

const MyComponent = ({title,amount}) => (
  <Card>
    <Card.Title titleStyle={{color:'#565656'}} title={title} subtitle={"RS- "+amount} left={LeftContent} />
    <Paragraph style={{marginLeft:RFPercentage(12),color:'#a5a5a5',marginTop:RFValue(-12)}}>Date:2/12/2020</Paragraph>

  </Card>
);

export default MyComponent;
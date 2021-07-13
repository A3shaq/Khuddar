import * as React from 'react';
import {View,Text, Dimensions} from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { styles } from '../../styles/authStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const MyComponent = ({rating,title,desc,distance,image,unit,price}) =>{

    const width= Dimensions.get('screen').width;
  
    return (
        <Card style={{borderTopLeftRadius:10,borderTopRightRadius:10,borderBottomLeftRadius:10,borderBottomRightRadius:10,marginBottom:15}} >
            
         <Card.Cover style={{borderTopLeftRadius:10,borderTopRightRadius:10}} source={{ uri: image }} />
        <View style={[styles.themeBackColor,{width:width/2.7,height:10,position:'absolute',right:0,top:'10%',height:33}]}>
        <Title style={{fontSize:18,fontFamily:'PoppinsMedium',textAlign:'center',color:'white'}}>30% Off</Title>
        </View>
        <View style={{marginLeft:'5%',marginTop:10}}>
        <Title style={{fontSize:18,fontFamily:'PoppinsMedium'}}>{title}</Title>
           <Paragraph style={[styles.mainpara,{textAlign:'left',marginTop:'-3%'}]}>{desc}</Paragraph>
           <Text style={[{
                                     
                                     letterSpacing: 1,
                                     fontSize: 11,
                                     fontFamily: "PoppinsRegular",
                                     textAlign: 'left',
                                     marginLeft:-4,
                                     marginBottom:5,
                                 },styles.themeColor1]}> <Text style={{fontFamily:'PoppinsBold'}}>Unit:</Text> {unit}  | <Text style={{fontFamily:'PoppinsBold'}}>Price:</Text> {price} 
     </Text>
        </View>
       </Card>
     );
     
} 
export default MyComponent;
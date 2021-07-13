import * as React from 'react';
import { TouchableOpacity,Text,Image,Dimensions } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
const width=Dimensions.get('screen').width;
const MyComponent = ({title,src,onPress}) => (
  
    <TouchableOpacity onPress={onPress}>
        <Card style={{paddingRight:15,paddingLeft:17,paddingVertical:10,borderRadius:10,height:heightPercentageToDP('32'),alignItems:'center',justifyContent:'center',width:widthPercentageToDP('42')}}>
            <Image resizeMode="contain" style={{width:heightPercentageToDP('20'),height:heightPercentageToDP('20')}} source={src}/>
<Text  style={{fontFamily:'PoppinsBold',fontSize:RFValue(18),color:'#6e6e6e',textAlign:'center',width:120,alignSelf:'center'}}>{title}</Text>
    
    </Card>
  
    </TouchableOpacity>
    );

export default MyComponent;
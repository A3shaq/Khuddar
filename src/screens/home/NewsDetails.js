import React,{useState} from 'react';
import { ScrollView, View, TouchableOpacity,Text,Image } from 'react-native';
import {Paragraph} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import NewsCard from '../../componnents/home/News/newsCards';
import TopDrawer from '../../componnents/auth/drawer/topDrawer';
import Heading from '../../componnents/home/headingComp';
import {styles} from '../../styles/authStyles'
import RNFetchBlob from 'rn-fetch-blob';
import LottieView from 'lottie-react-native';
import { headers } from '../../utiles/reduxConfig/persistConfig';
import { FlatList } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';



const MyComponent = ({route}) => {
    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
console.log(route.params.item)
const item = route.params.item;
return (<View style={[{backgroundColor:'white',flex:1},styles.ctr]}>
 <TopDrawer/>
 
 <ScrollView style={{backgroundColor:'white'}} showsVerticalScrollIndicator={false}>
 <Heading head={item.title} label={item.short_content} type={true} />
<Image style={{height:250,width:'100%'}} resizeMode='contain' source={{uri:item.image}}/>
<Paragraph style={[styles.PoppinsThin,{marginTop:-RFValue(5),fontSize:12,lineHeight:15}]} numberOfLines={3}>{item.full_content}</Paragraph>

 </ScrollView>
    </View>);
};

export default MyComponent;
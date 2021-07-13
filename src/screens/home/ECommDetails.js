import React,{useState} from 'react';
import { ScrollView, View, TouchableOpacity,Text,Image } from 'react-native';
import {Button, Paragraph} from 'react-native-paper';
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
import Entypo from 'react-native-vector-icons/Entypo';
import { Nav } from '../../navigation/navigationType';


const ECommDetails = ({route}) => {
    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const [quantity, setQuantity] = useState(0);
console.log(route.params.item)
const item = route.params.item;
return (<View style={[{backgroundColor:'white',flex:1},styles.ctr]}>
 <TopDrawer/>
 
 <ScrollView style={{backgroundColor:'white'}} showsVerticalScrollIndicator={false}>
 <Heading head={item.title} label="Buy best products" type={true} />
<Image style={{height:250,width:'100%'}} resizeMode='contain' source={{uri:item.images[0].image}}/>
<Text style={[styles.PoppinsMedium,{marginTop:-RFValue(5),fontSize:12,lineHeight:15}]} numberOfLines={1}>Price Rs-<Text style={{textDecorationLine:'line-through'}}>{item.price}</Text></Text>
<Text style={[styles.PoppinsMedium,{marginTop:RFValue(2),fontSize:12,lineHeight:15}]} numberOfLines={1}>Rs-{item.discounted_price}</Text>
<View style={{paddingVertical:10}}>
{quantity == 0 ?
<Button mode="contained" style={[{
    // width: '22%',
    alignSelf:'flex-end',
    // paddingTop: 4,
    // paddingBottom: 4,
    borderRadius: 6,}, styles.mt5, styles.border1]} 
            onPress={() => 
            {setQuantity(1)}}>
                <Text style={styles.textTr,styles.themeColorwhite}> Add</Text>
</Button>
:
<View>
<View style={{flexDirection:'row',flex:1,alignItems:'center',justifyContent:'center',alignSelf:'flex-end'}}>
<TouchableOpacity mode="contained" style={[{
    width: 25,
    backgroundColor:'#21c5df',
    height:25,
    borderRadius: 6,
    alignItems:'center',
    justifyContent:'center'},  styles.border1]} 
    onPress={() => 
            {setQuantity(quantity-1)}}>
    <Entypo name="minus" color="white" size={18} />
</TouchableOpacity>
<Text>
    {'   '}{quantity}{'   '}
</Text>
<TouchableOpacity mode="contained" style={[{
    width: 25,
    backgroundColor:'#21c5df',
    height:25,
    borderRadius: 6,
    alignItems:'center',
    justifyContent:'center'},  styles.border1]} 
    onPress={() => 
            {setQuantity(quantity+1)}}>
    <Entypo name="plus" color="white" size={18} />
</TouchableOpacity>   

    </View>
<Button mode="contained" style={[{
    // width: '25%',
    alignSelf:'flex-end',
    // paddingTop: 4,
    // paddingBottom: 4,
    borderRadius: 6,}, styles.mt5, styles.border1]} 
            onPress={() => 
            {navigation.navigate(Nav.ECommerceCart,{
                quantity:quantity,
                title:item.title,
                price:item.discounted_price,
                image:item.images[0].image,
                id:item.id,
                at_price:item.price
            })}}>
                <Text style={styles.textTr,styles.themeColorwhite}> Check out</Text>
</Button>
</View>
}
</View>
<Paragraph style={[styles.PoppinsMedium,{marginTop:-RFValue(5),fontSize:12,lineHeight:15}]} numberOfLines={1}>Description</Paragraph>
<Paragraph style={[styles.PoppinsMedium,{marginTop:RFValue(2),fontSize:12,lineHeight:15}]} numberOfLines={1}>{item.description}</Paragraph>

 </ScrollView>
    </View>);
};

export default ECommDetails;
import React,{useState} from 'react';
import { ScrollView, View, TouchableOpacity,Text, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import NewsCard from '../../../componnents/home/News/newsCards';
import TopDrawer from '../../../componnents/auth/drawer/topDrawer';
import Heading from '../../../componnents/home/headingComp';
import {styles} from '../../../styles/authStyles'
import RNFetchBlob from 'rn-fetch-blob';
import LottieView from 'lottie-react-native';
import { headers } from '../../../utiles/reduxConfig/persistConfig';
import { FlatList } from 'react-native-gesture-handler';
import { Card, Paragraph, Searchbar, Title } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import ProductCard from '../../../componnents/products/productCard';
import { Nav } from '../../../navigation/navigationType';



const BlogsList = ({route}) => {
    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const handleChange = (id) => {
    }
    console.log(route.params.item.name)
    console.log(route.params.item.blogs)
    const name= route.params.item.name;
    const [blogs, setBlogs] = useState(route.params.item.blogs);
    const [loading, setLoading] = useState(true);
    
    return (<View style={[{backgroundColor:'white',flex:1},styles.ctr]}>
 <TopDrawer/>
 
 <ScrollView style={{backgroundColor:'white'}} showsVerticalScrollIndicator={false}>
 <Heading head={name} label="Buy best products" type={true} />
 <FlatList
          style={{padding:2}}
            data={blogs}
            renderItem={({item}) => {
                console.log(item)
              return  (

                <Card style={{marginVertical:RFValue(20),width:"100%",marginLeft:2}}onPress={()=>{
                    navigation.navigate(Nav.BlogDetails,{
                      item:item,
                      title: name
                    })
                  }}>
                    <Card.Cover style={{height:140}} source={{ uri: item.image }} />
                    <Card.Content>
                      <Title numberOfLines={1} style={[styles.PoppinsMedium,{fontSize:18}]}>{item.title}</Title>
                      <Paragraph style={[styles.PoppinsThin,{marginTop:-RFValue(5),fontSize:12,lineHeight:15}]} numberOfLines={1}>{item.short_content}</Paragraph>
                    
                    </Card.Content>
                   
                </Card>              )
            }}
            />
          
        
 </ScrollView>
    </View>);
};

export default BlogsList;
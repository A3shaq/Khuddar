import React,{useState} from 'react';
import { ScrollView, View, TouchableOpacity,Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import NewsCard from '../../componnents/home/News/newsCards';
import TopDrawer from '../../componnents/auth/drawer/topDrawer';
import Heading from '../../componnents/home/headingComp';
import {styles} from '../../styles/authStyles'
import RNFetchBlob from 'rn-fetch-blob';
import LottieView from 'lottie-react-native';
import { headers, store } from '../../utiles/reduxConfig/persistConfig';
import { FlatList } from 'react-native-gesture-handler';
import { Card, Paragraph, Searchbar, Title } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import ProductCard from '../../componnents/products/productCard';



const ECommerce = () => {
    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const handleChange = (id) => {
    }
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const Products= async(text)=>{
      console.log(headers)
        const response = await RNFetchBlob.fetch(
            'GET',
            `https://khuddar.org/application/api/ecommerce/products/list`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              'secret':store.getState().userReducer._token,
              'user-id':store.getState().userReducer.id
            },
          )
            .then((response) => response.json())
            .then((response) => {
              console.log(response.response);
              setProducts(response.response.products.filter(item => {      
                const itemData = `${item.title.toUpperCase()}`  
                
                 const textData = text.toUpperCase() || text.toLowerCase();
                 console.log(itemData);
                 return itemData.indexOf(textData) > -1;    
              }));
              setLoading(false);
            
            })
            .catch((error) => {
              console.log(error);
            });
        
    }
    const [query, setQuery] = useState('');

   const searchFilterFunction = (text) => {    
      const newData = products.filter(item => {      
        const itemData = `${item.name.toUpperCase()}`  
        
         const textData = text.toUpperCase();
          
         return itemData.indexOf(textData) > -1;    
      });
      if(text ==''){
        Products()
      }
      setProducts(newData)
    };
  React.useEffect(() => {
    Products('');
    setLoading(true);
  }, []);
    return (<View style={[{backgroundColor:'white',flex:1},styles.ctr]}>
 <TopDrawer/>
 
 <ScrollView style={{backgroundColor:'white'}} showsVerticalScrollIndicator={false}>
 <Heading head="E-Commerce" label="Khuddar E-commerce is offering 30% to 50% discount on every product available at Khudddar." type={true} />

 <View style={[styles.mt5,{paddingVertical:10,paddingHorizontal:2}]}>
            <Searchbar hasRight={false} placeholder="Search Products" inputStyle={{fontSize:12}} 
            onChangeText={query => {Products(query); setQuery(query)}}
            value={query}/>
</View>
 {loading==true ? (
        <View style={{height:300,}}>
          <LottieView
            source={require('../../animations/loading3.json')}
            autoPlay={true}
            loop={true}
            resizeMode="contain"
            progress={0}
          />
        </View>
      ) :  
          <FlatList
          numColumns={2}
        //   style={{padding:2}}
            data={products}
            renderItem={({item}) => {
              return  (
                  <ProductCard item={item}/>
              )
            }}
            />
            }
        
 </ScrollView>
    </View>);
};

export default ECommerce;
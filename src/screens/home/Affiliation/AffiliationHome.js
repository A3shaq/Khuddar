import React,{useState} from 'react';
import { ScrollView, View, TouchableOpacity,Text, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import NewsCard from '../../../componnents/home/News/newsCards';
import TopDrawer from '../../../componnents/auth/drawer/topDrawer';
import Heading from '../../../componnents/home/headingComp';
import {styles} from '../../../styles/authStyles'
import RNFetchBlob from 'rn-fetch-blob';
import LottieView from 'lottie-react-native';
import { headers, store } from '../../../utiles/reduxConfig/persistConfig';
import { FlatList } from 'react-native-gesture-handler';
import { Card, Paragraph, Searchbar, Title } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import ProductCard from '../../../componnents/products/productCard';
import { Nav } from '../../../navigation/navigationType';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useDispatch } from 'react-redux';
import { LogOut } from '../../../redux/actions/userActionMethodes';
import { widthPercentageToDP } from 'react-native-responsive-screen';



const AffiliationHome = () => {
    const navigation = useNavigation();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch=useDispatch();
    const [showAlert, setShowAlert]=useState(false);

    const Blogs= async()=>{
        const response = await RNFetchBlob.fetch(
            'GET',
            `https://khuddar.org/application/api/blogsWithCats`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              'secret':store.getState().userReducer._token,
              'user-id':store.getState().userReducer.id
            },
          )
            .then((response) => response.json())
            .then((response) => {
            //   setBlogs(response.response.products);
              setLoading(false);
              console.log(response);
              if(response.message=='Unauthorized User')
              {
                setShowAlert(true);
              }
              else
              {
              setBlogs(response.response.categories);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        
    }
  React.useEffect(() => {
    Blogs();
    setLoading(true);
  }, []);
    return (<View style={[{backgroundColor:'white',flex:1},styles.ctr]}>
 <TopDrawer/>
 
 <ScrollView style={{backgroundColor:'white'}} showsVerticalScrollIndicator={false}>
 <Heading head="Blogs" label="Buy best products" type={true} />

 {loading==true ? (
        <View style={{height:300,}}>
          <LottieView
            source={require('../../../animations/loading3.json')}
            autoPlay={true}
            loop={true}
            resizeMode="contain"
            progress={0}
          />
        </View>
      ) :  
          <FlatList
          numColumns={2}
          style={{padding:2}}
            data={blogs}
            renderItem={({item}) => {
              return  (
                  
  <Card style={{marginVertical:RFValue(20),width:"45%",marginHorizontal:RFValue(9),borderRadius:4,padding:5,elevation:2}}onPress={()=>{
    navigation.navigate(Nav.BlogsList,{
      item:item,
    })
  }}>
    <Image resizeMode='contain' style={{height:100,width:'100%'}} source={{ uri: item.image }} />
    <Card.Content>
      <Title  numberOfLines={1} style={[styles.PoppinsBold,{fontSize:16,alignSelf:'center'}]}>{item.name}</Title>
      
    </Card.Content>
   
</Card>
              )
            }}
            />
            }
        
 </ScrollView>
 
 <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Alert"
          message="Your account has been suspened by the admin. Please contact support for futher information."
          contentContainerStyle={{width:widthPercentageToDP('95')}}
          confirmButtonStyle={{width:widthPercentageToDP('20'),alignItems:'center'}}
          messageStyle={{fontFamily:'PoppinsRegular'}}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Ok"
          confirmButtonColor="#21c5df"
          onConfirmPressed={() => {
            setShowAlert(false);
            dispatch(LogOut())

          }}
        />
    </View>);
};

export default AffiliationHome;
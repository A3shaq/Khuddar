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


const MyComponent = () => {
    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const handleChange = (id) => {
    }
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const Notifications= async()=>{
      console.log(headers)
        const response = await RNFetchBlob.fetch(
            'GET',
            `https://khuddar.org/application/api/news/list`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              'secret':store.getState().userReducer._token,
              'user-id':store.getState().userReducer.id
            },
          )
            .then((response) => response.json())
            .then((response) => {
              console.log(response.response.news);
              setBlogs(response.response.news);
              setLoading(false);
            //   if(response.success==true){
   
            //     // dispatch(Login({
            //     //     _token:response.response.user.token.token,
            //     //     id:response.response.user.token.user_id
            //     // }))
            //   }
            //   else
            //   {
            //   Alert.alert(
            //    "",
            //    (response.message),
            //    [
            //      { text: "OK", onPress: () => console.log("OK Pressed") }
            //    ]
            //   )
            // }
            })
            .catch((error) => {
              console.log(error);
            });
        
    }
  React.useEffect(() => {
    Notifications();
    setLoading(true);
  }, []);
    return (<View style={[{backgroundColor:'white',flex:1},styles.ctr]}>
 <TopDrawer/>
 
 <ScrollView style={{backgroundColor:'white'}} showsVerticalScrollIndicator={false}>
 <Heading head="News" label="Lorem Ipsum is simply" type={true} />
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
            data={blogs}
            renderItem={({item}) => {
              return  <NewsCard item={item} hasButton={false} src="https://picsum.photos/700"/>
            }}
            />
            }
        
 </ScrollView>
    </View>);
};

export default MyComponent;
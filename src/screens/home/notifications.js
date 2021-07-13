import React,{useState} from 'react';
import { ScrollView, View, TouchableOpacity ,FlatList} from 'react-native'
import { styles } from '../../styles/authStyles';
import Header from '../../componnents/auth/header';
import Heading from '../../componnents/home/headingComp';
import NotificationCard from '../../componnents/home/notificationCard';
import TopDrawer from '../../componnents/auth/drawer/topDrawer';
import { fcmToken, userReducer } from '../../redux/reducers/user';
import { setConfig, url, headers, store } from '../../utiles/reduxConfig/persistConfig';
import reducers from '../../redux/reducers';
import { useDispatch } from 'react-redux';
import { Login } from '../../redux/actions/userActionMethodes';
import RNFetchBlob from 'rn-fetch-blob';
import LottieView from 'lottie-react-native';


const MyComponent = () => {
    let [page, setPage] = useState({});
    const [notifications, setNotificaions] = useState([]);
    const [loading, setLoading] = useState(true);
    const Notifications= async()=>{
      console.log(headers)
        const response = await RNFetchBlob.fetch(
            'GET',
            `https://khuddar.org/application/api/notifications/list`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              'secret':store.getState().userReducer._token,
              'user-id':store.getState().userReducer.id
            },
          )
            .then((response) => response.json())
            .then((response) => {
              console.log(response);
              setNotificaions(response.response.notifications);
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
    return (<View style={[{backgroundColor:'white',flex:1}]}>

    <TopDrawer/>
      <View style={[styles.ctr, styles.mt5]}>
                <Heading head="Notifications" label="Recent Notifications" type={true} />
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
            data={notifications}
            renderItem={({item}) => {
              return <NotificationCard userName="User" datetime={item.date_created.slice(12,16)}  notification={item.title} userImg="https://thumbs.dreamstime.com/b/portrait-young-man-beard-hair-style-male-avatar-vector-portrait-young-man-beard-hair-style-male-avatar-105082137.jpg" />
            }}
            />
            }
                {/* {Array.from(Array(10)).map((x,i)=><NotificationCard userName={"User"+i} datetime={i+":45 PM"}  notification="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s," userImg="https://thumbs.dreamstime.com/b/portrait-young-man-beard-hair-style-male-avatar-vector-portrait-young-man-beard-hair-style-male-avatar-105082137.jpg" key={i}/>)} */}
            </View>

        {/* </ScrollView> */}
       
    </View>);
};

export default MyComponent;
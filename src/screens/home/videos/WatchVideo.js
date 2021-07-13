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
import { RFValue } from 'react-native-responsive-fontsize';
import YouTube from 'react-native-youtube';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import Animated from 'react-native-reanimated';
import { Nav } from '../../../navigation/navigationType';
import AwesomeAlert from 'react-native-awesome-alerts';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import YoutubePlayer from "react-native-youtube-iframe";
import { localNotification } from '../../../componnents/Notifications';


const WatchVideo = ({route}) => {
    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const handleChange = (id) => {
    }
    const item = route.params.item; 
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState('');

    const Videos= async()=>{
        const response = await RNFetchBlob.fetch(
            'GET',
            `https://khuddar.org/application/api/videos`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              'secret':store.getState().userReducer._token,
              'user-id':store.getState().userReducer.id
            },
          )
            .then((response) => response.json())
            .then((response) => {
              setLoading(false);
              console.log(response.response.videos);
              setVideos(response.response.videos);
            })
            .catch((error) => {
              console.log(error);
            });
        
    }

    const Viewed= async()=>{
      console.log(headers)
        const response = await RNFetchBlob.fetch(
            'POST',
            `https://khuddar.org/application/api/videos/viewed`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              'secret':store.getState().userReducer._token,
              'user-id':store.getState().userReducer.id
            },
            [
                {name: 'video_id', data: item.id + ''},
                // {name: 'capital', data: capital + ''},
            ],
          )
            .then((response) => response.json())
            .then((response) => {
              console.log(response);
            //   setList(response);
              setLoading(false);
              
            setAlert(response.message);
            setShowAlert(true);
            localNotification({title:'hellooo',msg:response.message})

            })
            .catch((error) => {
              console.log(error);
            });
        
    }
  React.useEffect(() => {
      Videos();
    setLoading(true);
  }, []);
    
    return (<View style={[{backgroundColor:'white',flex:1}]}>
 <TopDrawer/>

 <ScrollView style={{backgroundColor:'white'}} showsVerticalScrollIndicator={false}>
 <View style={[{backgroundColor:'white',flex:1},styles.ctr]}>

 <Heading head="Watch and Earn" label="Earn money by watching videos" type={true} />
 </View>

 {/* <YouTube
  videoId={item.videoId} // The YouTube video ID
  apiKey="AIzaSyCjGBGgst1tZuAnhS1-86d1yHLXwpRhoTE"
  play={false} // control playback of video with true/false
  fullscreen={false} 

  style={{ alignSelf: 'stretch', height: heightPercentageToDP('30') }}
/> */}

<YoutubePlayer
  height={heightPercentageToDP('30') }
  play={false}
        videoId={item.videoId}
        onChangeState={() => setTimer(!timer)}
        />
        
<View style={{position:'absolute',top:heightPercentageToDP('29'),right:10}}>
<CountdownCircleTimer
    isPlaying={timer}
    strokeWidth={5}
    size={50}
    duration={item.duration}
    onComplete={()=>{Viewed()}}
    colors={[
      ['#004777', item.duration],
    ]}
  >
    {({ remainingTime, animatedColor }) => (
      <Animated.Text style={{ color: animatedColor }}>
        {remainingTime}
      </Animated.Text>
    )}
  </CountdownCircleTimer>
</View>
 <View style={[{backgroundColor:'white',flex:1,marginTop:10},styles.ctr]}>
 <Heading head="Latest Videos" label="Watch and earn" type={true} />
 <FlatList
          style={{padding:2}}
            data={videos.filter(videos => 
              videos.id != item.id)}
            renderItem={({item}) => {
                console.log(item)
              return  (

                <TouchableOpacity style={{marginVertical:RFValue(20),width:"100%",flexDirection:'row'}}onPress={()=>{
                    navigation.navigate(Nav.WatchVideo,{
                        item:item,
                      })
                  }}>
                    <Image style={{height:100,width:150}} source={{ uri: item.thumbnail }} />
                    <View style={{padding:10}}>
                      <Text style={[styles.PoppinsMedium,{fontSize:12,lineHeight:15}]} numberOfLines={1}>Title: {item.title}</Text>
                      <Text style={[styles.PoppinsMedium,{marginTop:RFValue(5),fontSize:12,lineHeight:15}]} numberOfLines={1}>Amount: {item.amount}/Rs</Text>
                    
                    </View>
                   
                </TouchableOpacity>              )
            }}
            />
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title=""
          message={alert}
          contentContainerStyle={{width:widthPercentageToDP('95')}}
          confirmButtonStyle={{width:widthPercentageToDP('20'),alignItems:'center'}}
          messageStyle={{fontFamily:'PoppinsRegular'}}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Ok"
          confirmButtonColor="#21c5df"
          onConfirmPressed={() => {
            setShowAlert(false);
          }}
        />

</View>
 </ScrollView>
    </View>);
};

export default WatchVideo;
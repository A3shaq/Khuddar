import React,{useCallback, useState} from 'react';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import YouTube from 'react-native-youtube';
import YoutubePlayer from "react-native-youtube-iframe";


const BlogDetails = ({route}) => {
    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const handleChange = (id) => {
    }
    console.log(route.params.title)
    const item =route.params.item;
    console.log(item);
    const title =route.params.title;
    const [blogs, setBlogs] = useState(route.params.item.blogs);
    const [loading, setLoading] = useState(true);
    const [playing, setPlaying] = useState(false);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
      }, []);
    
    return (<View style={[{backgroundColor:'white',flex:1}]}>
 <TopDrawer/>
 <Image style={{height:150,width:'100%'}} resizeMode='contain' source={{ uri: item.image }} />

 <ScrollView style={{backgroundColor:'white'}} showsVerticalScrollIndicator={false}>
 <View style={{padding:20, backgroundColor:'#f1f1f1',elevation:5,flex:1,marginBottom:10}}>
 <Title style={[styles.PoppinsMedium,{fontSize:18}]}>Sell your products on {title}</Title>
 <View style={{flexDirection:'row',alignItems:'center'}}>
     <MaterialCommunityIcons name="calendar" size={24} />
 <Paragraph style={[styles.PoppinsThin,{fontSize:12,lineHeight:15}]} numberOfLines={1}>{'    '}17/02/2021</Paragraph>
 </View>     
 </View>
 <View style={[{backgroundColor:'white',flex:1},styles.ctr]}>
 <Paragraph style={[styles.PoppinsThin,{fontSize:12,lineHeight:15}]} numberOfLines={1}>{item.meta_description}</Paragraph>
 <Title style={[styles.PoppinsMedium,{fontSize:18,marginVertical:20}]}>Video</Title>
 {/* <YouTube
  videoId={item.video_url} // The YouTube video ID
  apiKey="AIzaSyCjGBGgst1tZuAnhS1-86d1yHLXwpRhoTE"
  play={false}
//   fullscreen // control whether the video should play in fullscreen or inline
//   loop // control whether the video should loop when ended
//   onReady={e => this.setState({ isReady: true })}
//   onChangeState={e => this.setState({ status: e.state })}
//   onChangeQuality={e => this.setState({ quality: e.quality })}
//   onError={e => this.setState({ error: e.error })}
  style={{ alignSelf: 'stretch', height: 200 }}
/> */}

<YoutubePlayer
        height={200}
        play={playing}
        videoId={item.video_url}
        // onChangeState={onStateChange}
      />
            <TouchableOpacity style={[styles.buttonMain, styles.mt5, styles.border1,{marginBottom:10,backgroundColor:'#21c5df',height:47,justifyContent:'center',alignItems:'center',width:'100%'}]} 
            onPress={() => {
                togglePlaying()
                }}>
                <Text style={[styles.textTr,styles.themeColorwhite,{fontSize:18,fontFamily:"PoppinsMedium",alignSelf:'center'}]}>
                {playing ? "Pause video" : "Play video"}</Text>
            </TouchableOpacity>
        
            <TouchableOpacity style={[styles.buttonMain, styles.mt5, styles.border1,{marginBottom:10,backgroundColor:'#21c5df',height:47,justifyContent:'center',alignItems:'center',width:'100%'}]} 
            onPress={() => {

                }}>
                <Text style={[styles.textTr,styles.themeColorwhite,{fontSize:18,fontFamily:"PoppinsMedium",alignSelf:'center'}]}>Open URL</Text>
            </TouchableOpacity>
 </View>
 </ScrollView>
    </View>);
};

export default BlogDetails;
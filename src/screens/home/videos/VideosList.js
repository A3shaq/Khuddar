import React, {useState} from 'react';
import {ScrollView, View, TouchableOpacity, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import NewsCard from '../../../componnents/home/News/newsCards';
import TopDrawer from '../../../componnents/auth/drawer/topDrawer';
import Heading from '../../../componnents/home/headingComp';
import {styles} from '../../../styles/authStyles';
import RNFetchBlob from 'rn-fetch-blob';
import LottieView from 'lottie-react-native';
import {headers, store} from '../../../utiles/reduxConfig/persistConfig';
import {FlatList} from 'react-native-gesture-handler';
import {Card, Paragraph, Searchbar, Title} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import ProductCard from '../../../componnents/products/productCard';
import {Nav} from '../../../navigation/navigationType';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import YouTube from 'react-native-youtube';

const VideosList = ({route}) => {
  let [page, setPage] = React.useState({});
  const navigation = useNavigation();
  const handleChange = id => {};
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const Videos = async () => {
    const response = await RNFetchBlob.fetch(
      'GET',
      `https://khuddar.org/application/api/videos`,
      {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        secret: store.getState().userReducer._token,
        'user-id': store.getState().userReducer.id,
      },
    )
      .then(response => response.json())
      .then(response => {
        //   setBlogs(response.response.products);
        setLoading(false);
        console.log(response.response.videos);
        setVideos(response.response.videos);
      })
      .catch(error => {
        console.log(error);
      });
  };
  React.useEffect(() => {
    Videos();
    setLoading(true);
  }, []);

  return (
    <View style={[{backgroundColor: 'white', flex: 1}]}>
      <TopDrawer />

      <ScrollView
        style={{backgroundColor: 'white'}}
        showsVerticalScrollIndicator={false}>
        <View style={[{backgroundColor: 'white', flex: 1}, styles.ctr]}>
          <Heading
            head="Watch and Earn"
            label="Khuddar is giving you chance to earn money by watching your favorite videos on the Khuddar App."
            type={true}
          />
        </View>

        <Image
          style={{height: 220, width: '100%'}}
          resizeMode="contain"
          source={require('../../../images/youtube.png')}
        />
        <View style={[{backgroundColor: 'white', flex: 1}, styles.ctr]}>
          <Heading head="Latest Videos" label="Watch and earn" type={true} />
          <FlatList
            style={{padding: 2}}
            data={videos}
            renderItem={({item}) => {
              console.log(item);
              return (
                <TouchableOpacity
                  style={{
                    marginVertical: RFValue(20),
                    width: '100%',
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    navigation.navigate(Nav.WatchVideo, {
                      item: item,
                    });
                  }}>
                  <Image
                    style={{height: 100, width: 150}}
                    source={{uri: item.thumbnail}}
                  />
                  <View style={{padding: 10}}>
                    <Text
                      style={[
                        styles.PoppinsMedium,
                        {fontSize: 12, lineHeight: 15},
                      ]}
                      numberOfLines={1}>
                      Title: {item.title}
                    </Text>
                    <Text
                      style={[
                        styles.PoppinsMedium,
                        {marginTop: RFValue(5), fontSize: 12, lineHeight: 15},
                      ]}
                      numberOfLines={1}>
                      Amount: {item.amount}/Rs
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default VideosList;

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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import YouTube from 'react-native-youtube';
import { LogOut } from '../../../redux/actions/userActionMethodes';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';


const QuizHome = ({route}) => {
    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const handleChange = (id) => {
    }
    const [quiz, setQuiz] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const dispatch=useDispatch();
    const [showSuspendAlert, setShowSuspendAlert] = useState(false);
    const Quiz= async()=>{
        const response = await RNFetchBlob.fetch(
            'GET',
            `https://khuddar.org/application/api/quiz`,
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
              console.log(response.response.quiz);
               
            if(response.message=='Unauthorized User')
            {
              setShowSuspendAlert(true);
            }
            else
            {
              setQuiz(response.response.quiz);
            }
            })
            .catch((error) => {
              console.log(error);
            });
        
    }
  React.useEffect(() => {
    Quiz();
    setLoading(true);
  }, []);
    
    return (<View style={[{backgroundColor:'white',flex:1}]}>
 <TopDrawer/>

 <ScrollView style={{backgroundColor:'white'}} showsVerticalScrollIndicator={false}>
 <View style={[{backgroundColor:'white',flex:1},styles.ctr]}>

 <Heading head="Play and Earn" label="Play Quiz" type={true} />
 </View>

 <Image style={{height:220,width:'100%'}} resizeMode='contain' source={require('../../../images/quizz.png')} />
 <View style={[{backgroundColor:'white',flex:1},styles.ctr]}>
 <Heading head="Categories" label="Select Quiz Categories" type={true} />
 <FlatList
 numColumns={2}
          style={{padding:2}}
            data={quiz}
            renderItem={({item}) => {
                console.log(item)
              return  (

                <Card style={{marginBottom:RFValue(20),width:"47%",marginLeft:8}}onPress={()=>{
                    navigation.navigate(Nav.QuizStart,{
                      item:item
                    })
                  }}>
                    <Card.Cover style={{height:140}} source={{ uri: item.image }} />
                    <Card.Content>
                      <Title numberOfLines={1} style={[styles.PoppinsMedium,{fontSize:16}]}>{item.name}</Title>
                    
                    </Card.Content>
                   
                </Card>
                           )
            }}
            />
          

</View>
 </ScrollView>
 
 <AwesomeAlert
          show={showSuspendAlert}
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
            setShowSuspendAlert(false);
            dispatch(LogOut())

          }}
        />
    </View>);
};

export default QuizHome;
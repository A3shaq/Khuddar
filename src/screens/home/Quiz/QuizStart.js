import React,{useState} from 'react';
import { ScrollView, View, TouchableOpacity,Text, Image,Animated, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import NewsCard from '../../../componnents/home/News/newsCards';
import TopDrawer from '../../../componnents/auth/drawer/topDrawer';
import Heading from '../../../componnents/home/headingComp';
import {styles} from '../../../styles/authStyles'
import RNFetchBlob from 'rn-fetch-blob';
import LottieView from 'lottie-react-native';
import { headers, store } from '../../../utiles/reduxConfig/persistConfig';
import { FlatList } from 'react-native-gesture-handler';
import { Card, Paragraph, Searchbar, Title,RadioButton } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import ProductCard from '../../../componnents/products/productCard';
import { Nav } from '../../../navigation/navigationType';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import YouTube from 'react-native-youtube';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import AwesomeAlert from 'react-native-awesome-alerts';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { localNotification } from '../../../componnents/Notifications';
import { useDispatch } from 'react-redux';
import { LogOut } from '../../../redux/actions/userActionMethodes';


const QuizStart = ({route}) => {
    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    
    const [status1, setStatus1] = React.useState('unchecked');
    const [status2, setStatus2] = React.useState('unchecked');
    const [status3, setStatus3] = React.useState('unchecked');
    const [status4, setStatus4] = React.useState('unchecked');
    const [answer, setAnswer] = useState('')
    const item = route.params.item
    const [showAnswerAlert, setShowAnswerAlert] = useState(false);
    const [showQuizAlert, setShowQuizAlert] = useState(false);
    const [alert, setAlert] = useState('');

    const dispatch=useDispatch();
    const [showSuspendAlert, setShowSuspendAlert] = useState(false);
    // console.log(route.params.item.questions[0].question)
    // console.log(route.params.item.questions.length)
    const [quiz, setQuiz] = useState([]);
    const [key, setKey] = useState(0);
    const [showTryAgainAlert, setShowTryAgainAlert] = useState(false);
    const [loading, setLoading] = useState(true);
    const [borderColor, setBorderColor] = useState('#cdcdcd');
    const [playing, setPlaying] = useState(true);
    const [currentState, setCurrentState] = useState(0);
    const nextState = currentState +1;
    const [time, setTime ] = useState(item.questions[currentState].time)
const [data, setData] = useState([])
const addEntryClick = (ques,ans) => {
  console.log(ques,ans+'...')
  setData([...data, {"question_id":ques,"answer_id":ans}]);
};
    const Quiz= async()=>{
        const response = await RNFetchBlob.fetch(
            'GET',
            `https://khuddar.org/application/api/quiz/start`,
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
              if(response.error!=null){
                setShowTryAgainAlert(true);
                localNotification({title:'hellooo',msg:"You have already attempted to play a quiz today, try again after 12 midnight"})

              }
                
             else (response.message=='Unauthorized User')
            {
              setShowSuspendAlert(true);
            }
            //   setQuiz(response.response.quiz);
            })
            .catch((error) => {
              console.log(error);
            });
        
    }
    const postQuiz = async () => {
console.log(data)
       const response = await fetch('https://khuddar.org/application/api/quiz/submit' ,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'secret':store.getState().userReducer._token,
          'user-id':store.getState().userReducer.id
        },
        body:JSON.stringify({"questions":data
         }) 
        // body:JSON.stringify({bodyFormData}) 
         
        })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          navigation.replace(Nav.CalculateResults,{message:response.message})
        
        })
        .catch((error) => {
          console.log(error);
          Alert.alert(
            'Oopss!',
            '',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Ok',
                onPress: () => {
                  console.log('Ok Pressed');
                },
              },
            ],
            {cancelable: false},
          );
        });
    };
  React.useEffect(() => {
    Quiz();
    setLoading(false);
  }, []);

    return (<View style={[{backgroundColor:'white',flex:1}]}>
 <TopDrawer/>

 <ScrollView style={{backgroundColor:'white'}} showsVerticalScrollIndicator={false}>
 <View style={[{backgroundColor:'white',flex:1},styles.ctr]}>

 <Heading head="Play and Earn" label="Play Quiz" type={true} />
 <View style={{flexDirection:'row'}}>
 <Text style={{fontFamily:'PoppinsSemiBold',fontSize:22,flex:1}}>
     Question {currentState +1} / {route.params.item.questions.length}
 </Text>
 <CountdownCircleTimer
    isPlaying
    strokeWidth={5}
    size={50}
    key={key}
    initialRemainingTime={time}
    duration={time}
    onComplete={()=>{
      
      if(nextState < route.params.item.questions.length)
      {
        setShowQuizAlert(true)
        localNotification({title:'hellooo',msg:"You are out of the quiz."})

        }}}
        
    colors={[
        ['#004777', 0.4],
        ['#F7B801', 0.4],
        ['#A30000', 0.2],
    ]}
  >
    {({ remainingTime, animatedColor }) => (
      <Animated.Text style={{ color: animatedColor }}>
        {remainingTime}
      </Animated.Text>
    )}
  </CountdownCircleTimer>
 </View>
 <FlatList
 horizontal={true}
          style={{padding:2}}
            data={route.params.item.questions}
            renderItem={({item}) => {
                // console.log(item.id + 'e')
              return  (
                  <View style={{height:3,width:15,backgroundColor:'grey',marginRight:7}}></View> 

                           )
            }}
            />
 
 <Text style={{fontFamily:'PoppinsSemiBold',fontSize:18,marginVertical:20}}>
     {item.questions[currentState].question}
 </Text>

            <TouchableOpacity style={{paddingHorizontal:15,paddingVertical:5,borderColor:borderColor,borderWidth:2,borderRadius:3,marginVertical:10,flexDirection:'row',alignItems:'center'}}>
               <Text style={{flex:1}}>
               {item.questions[currentState].answers[0].answer}
               </Text>
               <RadioButton
                    value={item.questions[currentState].answers[0].id}
                    status={status1}
                    color="#21c5df"
                    onPress={()=>{console.log(status1); 
                      console.log(item.questions[currentState].answers[0].id +'test')
                        setStatus1("checked")
                        setStatus2("unchecked")
                        setStatus3("unchecked")
                        setStatus4("unchecked")
                        setAnswer(item.questions[currentState].answers[0].id)
                        addEntryClick(item.questions[currentState].id ,item.questions[currentState].answers[0].id)
                        // data.push({answer_id:item.questions[currentState].answers[0].id, question_id:item.questions[currentState].question })
                    }}
                />
            </TouchableOpacity>

            <TouchableOpacity style={{paddingHorizontal:15,paddingVertical:5,borderColor:borderColor,borderWidth:2,borderRadius:3,marginVertical:10,flexDirection:'row',alignItems:'center'}}>
               <Text style={{flex:1}}>
               {item.questions[currentState].answers[1].answer}
               </Text>
               <RadioButton
                    value={item.questions[currentState].answers[0].id}
                    status={status2}
                    color="#21c5df"
                    onPress={()=>{console.log(status2); 
                        setStatus1("unchecked")
                        setStatus2("checked")
                        setStatus3("unchecked")
                        setStatus4("unchecked")
                        setAnswer(item.questions[currentState].answers[0].id)
                        addEntryClick(item.questions[currentState].id ,item.questions[currentState].answers[0].id)
                        // data.push({answer_id:item.questions[currentState].answers[0].id, question_id:item.questions[currentState].question })

                    }}
                />
            </TouchableOpacity>

            <TouchableOpacity style={{paddingHorizontal:15,paddingVertical:5,borderColor:borderColor,borderWidth:2,borderRadius:3,marginVertical:10,flexDirection:'row',alignItems:'center'}}>
               <Text style={{flex:1}}>
               {item.questions[currentState].answers[2].answer}
               </Text>
               <RadioButton
                    value={item.questions[currentState].answers[0].id}
                    status={status3}
                    color="#21c5df"
                    onPress={()=>{console.log(status3); 
                        setStatus1("unchecked")
                        setStatus2("unchecked")
                        setStatus3("checked")
                        setStatus4("unchecked")
                        setAnswer(item.questions[currentState].answers[0].id)
                        addEntryClick(item.questions[currentState].id ,item.questions[currentState].answers[0].id)
                        // data.push({answer_id:item.questions[currentState].answers[0].id, question_id:item.questions[currentState].question })

                    }}
                />
            </TouchableOpacity>

            <TouchableOpacity style={{paddingHorizontal:15,paddingVertical:5,borderColor:borderColor,borderWidth:2,borderRadius:3,marginVertical:10,flexDirection:'row',alignItems:'center'}}>
               <Text style={{flex:1}}>
               {item.questions[currentState].answers[3].answer}
               </Text>
               <RadioButton
                    value={item.questions[currentState].answers[0].id}
                    status={status4}
                    color="#21c5df"
                    onPress={()=>{console.log(status4); 
                        setStatus1("unchecked")
                        setStatus2("unchecked")
                        setStatus3("unchecked")
                        setStatus4("checked")
                        setAnswer(item.questions[currentState].answers[0].id)
                        addEntryClick(item.questions[currentState].id ,item.questions[currentState].answers[0].id)
                        // data.push({answer_id:item.questions[currentState].answers[0].id, question_id:item.questions[currentState].question })

                    }}
                />
            </TouchableOpacity>
            {loading == false ?

            <TouchableOpacity style={[styles.buttonMain, styles.mt5, styles.border1,{marginBottom:10,backgroundColor:'#21c5df',height:47,justifyContent:'center',alignItems:'center'}]} 
            onPress={() => {
              
                if(answer==''){
                    setShowAnswerAlert(true)
                }
              else if(nextState < route.params.item.questions.length ){
              console.log(time)
              setCurrentState(currentState +1)
              console.log(nextState)
              setAnswer('')
              setStatus1("unchecked")
              setStatus2("unchecked")
              setStatus3("unchecked")
              setStatus4("unchecked")
              // setPlaying(!playing)
              console.log(answer)
              setTime(item.questions[nextState].time);
              setKey(prevKey => prevKey + 1);
                }
                else{
                    setLoading(true)
                    postQuiz()
                }
                }}>
             
                <Text style={[styles.textTr,styles.themeColorwhite,{fontSize:18,fontFamily:"PoppinsMedium",alignSelf:'center'}]}>Next</Text>
            </TouchableOpacity>:
               <View  style={[ styles.mt5,{backgroundColor:'#21c5df',height:47, width: '100%',
               marginBottom:10,
                borderRadius: 6,}]}>
               <LottieView
                   source={require('../../../animations/loading.json')}
                   autoPlay={true}
                   loop={true}
                   resizeMode="contain"
                   progress={0}
               />
               </View>
               }
            
 </View>
 <AwesomeAlert
          show={showAnswerAlert}
          showProgress={false}
          title="Alert"
          message="Fill out answer first"
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
            setShowAnswerAlert(false);
          }}
        />

 <AwesomeAlert
          show={showTryAgainAlert}
          showProgress={false}
          title="Alert"
          message="You have already attempted to play a quiz today, try again after 12 midnight"
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
            setShowTryAgainAlert(false);
    
      navigation.navigate(Nav.Home);
          }}
        />

 <AwesomeAlert
          show={showQuizAlert}
          showProgress={false}
          title="Alert"
          message="You are out of the quiz."
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
            setShowQuizAlert(false);
    
      navigation.navigate(Nav.Home);
          }}
        />

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
 </ScrollView>
    </View>);
};

export default QuizStart;
import React,{useState} from 'react';
import { ScrollView, View, TouchableOpacity,Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import TopDrawer from '../../../componnents/auth/drawer/topDrawer';
import Heading from '../../../componnents/home/headingComp';
import {styles} from '../../../styles/authStyles'
import RNFetchBlob from 'rn-fetch-blob';
import LottieView from 'lottie-react-native';
import { headers, store } from '../../../utiles/reduxConfig/persistConfig';
import { FlatList } from 'react-native-gesture-handler';
import { Card, Paragraph, Searchbar, Title } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import JobsCard from '../../../componnents/jobs/JobsCard';
import { useDispatch } from 'react-redux';
import { LogOut } from '../../../redux/actions/userActionMethodes';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import AwesomeAlert from 'react-native-awesome-alerts';



const Jobs = () => {
    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const handleChange = (id) => {
    }
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const dispatch=useDispatch();
    const [showSuspendAlert, setShowSuspendAlert] = useState(false);
    const Jobs= async(text)=>{
      // console.log(headers)
        const response = await RNFetchBlob.fetch(
            'GET',
            `https://khuddar.org/application/api/jobs/list`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              'secret':store.getState().userReducer._token,
              'user-id':store.getState().userReducer.id
            },
          )
            .then((response) => response.json())
            .then((response) => {
              console.log(response.response.jobs.filter(item => {      
                const itemData = `${item.title.toUpperCase()}`  
                
                 const textData = text.toUpperCase() || text.toLowerCase();
                 console.log(itemData);
                 return itemData.indexOf(textData) > -1;    
              }));
              
            if(response.message=='Unauthorized User')
            {
              setShowSuspendAlert(true);
            }
            else
            {
              setJobs(response.response.jobs.filter(item => {      
                const itemData = `${item.title.toUpperCase()}`  
                
                 const textData = text.toUpperCase() || text.toLowerCase();
                 console.log(itemData);
                 return itemData.indexOf(textData) > -1;    
              }));
            }
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
            });
        
    }
    const [query, setQuery] = useState('');

   const searchFilterFunction = (text) => {    
      const newData = jobs.filter(item => {      
        const itemData = `${item.title.toUpperCase()}`  
        
         const textData = text.toUpperCase();
          
         return itemData.indexOf(textData) > -1;    
      });
      if(text ==''){
        Jobs()
      }
      setJobs(newData)
    };
  React.useEffect(() => {
    Jobs('');
    setLoading(true);
  }, []);
    return (<View style={[{backgroundColor:'white',flex:1},styles.ctr]}>
 <TopDrawer/>
 
 <ScrollView style={{backgroundColor:'white'}} showsVerticalScrollIndicator={false}>
 <Heading head="Jobs" label="Khuddar is providing hundreds of jobs on merit basis in Different departments of this tech era." type={true} />

 <View style={[styles.mt5,{paddingVertical:10,paddingHorizontal:2}]}>
            <Searchbar hasRight={false} placeholder="Search jobs" inputStyle={{fontSize:12}} 
            onChangeText={query => {Jobs(query); setQuery(query)}}
            value={query} />
</View>
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
        //   style={{padding:2}}
            data={jobs}
            renderItem={({item}) => {
              return  (
                  <JobsCard item={item}/>
              )
            }}
            />
            }
        
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

export default Jobs;
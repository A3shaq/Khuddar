import React,{useState} from 'react';
import { ScrollView, View, TouchableOpacity,Text, Alert } from 'react-native'
import { styles } from '../../../../styles/authStyles';
import Header from '../../../../componnents/auth/header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Heading from '../../../../componnents/home/headingComp';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, Paragraph, TextInput, Title } from 'react-native-paper';
import { Chip } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize'
import TopDrawer from '../../../../componnents/auth/drawer/topDrawer';
import DateTimePicker from '@react-native-community/datetimepicker';
import LottieView from 'lottie-react-native';
import { headers, store } from '../../../../utiles/reduxConfig/persistConfig';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';
import { FlatList } from 'react-native-gesture-handler';

const SelectedFurniture = () => {
    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const handleChange = (id) => {
    }
    const [loading, setLoading] = React.useState(false);
    // const [list, setList] = useState([]);
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [description ,setDescription ] = useState(''); 
    const Food= async()=>{
      console.log(headers)
        const response = await RNFetchBlob.fetch(
            'POST',
            `https://khuddar.org/application/api/service/selected`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              'secret':store.getState().userReducer._token,
              'user-id':store.getState().userReducer.id
            },
            [
                {name: 'category', data: 'furniture'  + ''},
                
            ],
          )
            .then((response) => response.json())
            .then((response) => {
            //   setList(response.response.listings);
              setLoading(false);
              setImage(response.response.selection.listing.image);
              setTitle(response.response.selection.listing.title);
              setDescription(response.response.selection.listing.description);

              
            })
            .catch((error) => {
              console.log(error);
            });
        
    }
    
    
  React.useEffect(() => {
    Food();
    setLoading(true);
  }, []);

    return ( <View style={[{backgroundColor:'white',flex:1}]}>
    <TopDrawer/>
        <ScrollView>
            <View style={styles.ctr}>
            </View>
        
            <View style={[styles.ctr, styles.mt5]}>
                <Heading head="Selected Furniture" label="My selected furniture" />

                {loading==true ? (
        <View style={{height:300,}}>
          <LottieView
            source={require('../../../../animations/loading3.json')}
            autoPlay={true}
            loop={true}
            resizeMode="contain"
            progress={0}
          />
        </View>
      ) :  image=='' ? null :
                <Card style={{marginBottom:RFValue(20)}}onPress={()=>{
                  }}>
                    <Card.Cover source={{ uri: image }} />
                    <Card.Content>
                      <Title style={[styles.PoppinsMedium,{fontSize:16}]}>{title}</Title>
                      <Paragraph style={[styles.PoppinsThin,{marginTop:-RFValue(5),fontSize:12,lineHeight:15}]} numberOfLines={3}>{description}</Paragraph>
                    
                    </Card.Content>
                   {/* <Card.Actions>
                      <Button onPress={()=>{
                          AddFood(item.id);
                      }}>Select</Button>
                      <Button></Button>
                    </Card.Actions> */}
                    </Card>  
              
            }
 
  
             </View>

        </ScrollView>

    </View>);
};

export default SelectedFurniture;
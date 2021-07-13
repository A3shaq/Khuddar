import * as React from 'react';
import { Image, Dimensions, View, Text } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Heading from './headingComp'
import { styles } from '../../styles/authStyles'
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
const width = Dimensions.get('window').width;
import TCard from '../wallet/transactioncard'
import { store } from '../../utiles/reduxConfig/persistConfig';
const MyComponent = () => (
    <>
        <View style={styles.shadowWallet}  >

            <Image source={require('../../images/w-card.png')} resizeMode="stretch" style={{ margin: 15, width: width - 30, height: width / 1.8, borderTopLeftRadius: 15, borderTopRightRadius: 15 }} />
            <View style={{ margin: 15, width: width - 30, height: width / 1.8, position: 'absolute', top: 20, left: 20 }}>
                <Heading head="Total Amount" style={{ color: '#f2f2f2' }} />
                <Heading head="PKR-20000" style={{ color: '#f2f2f2' }} />
                <View style={{ flexDirection: 'row' }}>
                    
  {store.getState().userReducer.image == null ?
  <Avatar.Image size={55}  source={{uri:'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg'}} />:
  <Avatar.Image size={55}  source={{uri:store.getState().userReducer.image}} />}
                    {/* <Avatar.Image size={55} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5jtM-CCMxtsfW_3LBlScolR0_KXNng9Ts4A&usqp=CAU' }} /> */}
                    <View>
                        <Heading head={store.getState().userReducer.name} style={{ color: '#f2f2f2', marginTop: 10, marginLeft: 10 }} />
                        <Text style={[{ color: '#f1f1f1', marginTop: -20, marginLeft: 10 }]}>Last Transaction: RS-200</Text>
                    </View>
                </View>


            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15, marginRight: 15, backgroundColor: '#f1f1f1', marginTop: -15, paddingTop: 10, paddingBottom: 25, borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
                <View>
                    <Heading head="Total Deposit" style={{ marginTop: 10, marginLeft: 10, textAlign: 'center' }} />
                    <Text style={[{ color: '#565656', marginLeft: 10, marginTop: -15, textAlign: 'center' }]}>RS-500</Text>

                </View>
                <View>
                    <Heading head="Total Earned" style={{ marginTop: 10, marginRight: 10, textAlign: 'center' }} />
                    <Text style={[{ color: '#565656', marginRight: 10, marginTop: -15, textAlign: 'center' }]}>RS-1000</Text>

                </View>
            </View>
        </View>

      
    </>
);

export default MyComponent;
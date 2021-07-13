import React from 'react';
import { View, Image, Text, ScrollView, SafeAreaView } from 'react-native';
import { styles } from '../../styles/authStyles';
import { Button } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native'
import {Nav} from '../../navigation/navigationType';
import * as Animatable from 'react-native-animatable';
import Entypo  from 'react-native-vector-icons/Entypo';
import { widthPercentageToDP } from 'react-native-responsive-screen';
export default () => {
    const navigation=useNavigation();
    return <>
    <View  style={{flex:1,backgroundColor:'white'}}>
    <Animatable.View animation="fadeInLeft">
    <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.container}>
        <Image style={styles.logo} source={require('../../images/kdm.png')} />
            <Text style={[styles.mainTitleHead,styles.mt10]}><Text style={styles.themeColor}>W</Text><Text>elcome</Text><Text style={styles.themeColor}></Text></Text>
            <Text style={[styles.mainTitleHead,styles.mnt1,{width:widthPercentageToDP('94'),textAlign:'center'}]}><Text style={styles.themeColor}>K</Text><Text>huddar</Text> Banega<Text style={styles.themeColor}> P</Text>akistan</Text>
            <Text style={[styles.mainpara,styles.maxWidth80]}>
            Khuddar is a Pakistan-based company working with a mandate to make every Pakistani khuddar by providing their services and benefits only in a monthly subscription of 750 rupees.                </Text>
            <Button mode="contained" style={[styles.buttonMain, styles.mt10,styles.maxWidth80]}  onPress={() => navigation.push(Nav.Login)}>
                <Text style={styles.textTr,styles.themeColorwhite}>Sign in</Text>
            </Button>
            <Button mode="contained" style={[styles.buttonMain, styles.mt5,styles.maxWidth80]}  onPress={() => navigation.push(Nav.loginAsMember)}>
                <Text style={styles.textTr,styles.themeColorwhite}>Sign in as member</Text>
            </Button>
            <Button mode="contained" style={[styles.buttonMain, styles.mt5,styles.maxWidth80]}  onPress={() => navigation.push(Nav.Signup)}>
                <Text style={styles.textTr,styles.themeColorwhite}>Register</Text>
            </Button>
            {/* <Text style={[styles.mainTitleHead,styles.mt5]}><Text style={styles.themeColor}>O</Text><Text>R</Text><Text style={styles.themeColor}></Text></Text> */}

            {/* <Button mode="contained" style={[styles.buttonMain, styles.mt5,styles.maxWidth80,]}  onPress={() => navigation.push(Nav.Login)}>
                <Text style={styles.textTr,styles.themeColorwhite}> Change Language</Text>
            </Button> */}
            {/* <Button style={[styles.buttonMain, styles.mt5, styles.border1,styles.maxWidth80]} onPress={() => navigation.push(Nav.Signup)}>
                <Text style={styles.textTr}> Create an account</Text>
            </Button> */}
            {/* <Text style={[styles.mainpara, styles.mt5]}>Signup as Vendor</Text> */}
            {/* <Image style={[styles.dish1]} source={require('../../images/d1.png')} />
            <Image style={[styles.dish2]} source={require('../../images/d2.png')} /> */}
            {/* <View style={{flexDirection:'row'}}>
            <Entypo name="facebook-with-circle" size={44} style={{marginRight:10}} color="#0269e3" />
            <Entypo name="google--with-circle" size={44} color="#dc3c2a" style={{marginRight:10}} />
            </View> */}
          </View>
    </ScrollView>
  
    </Animatable.View>
    
    </View>
    </>
}
import * as React from 'react';
import { ScrollView, View, TouchableOpacity,Text } from 'react-native'
import { styles } from '../../../../styles/authStyles';
import Header from '../../../../componnents/auth/header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Heading from '../../../../componnents/home/headingComp';
import { useNavigation } from '@react-navigation/native';
import { Button, TextInput } from 'react-native-paper';
import { Chip } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize'
import TopDrawer from '../../../../componnents/auth/drawer/topDrawer';

const MyComponent = () => {
    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const handleChange = (id) => {
    }
    return ( <View style={[{backgroundColor:'white',flex:1}]}>
    <TopDrawer/>
        <ScrollView>
            <View style={styles.ctr}>
            </View>
        
            <View style={[styles.ctr, styles.mt5]}>
                <Heading head="Al Nikah Details" label="Upload Details about Al-Nikah" />

                <TextInput
                label="Input Bride Name"
                mode='outlined'
                style={[styles.textInput,styles.mt5]}
                left={
                    <TextInput.Icon
                    name={()=><AntDesign name="user" size={16}  style={[styles.themeColor,{paddingTop:'30%'}]} />}
                   
                  />
                  }            />

                <TextInput
                label="Input Bride Name"
                mode='outlined'
                style={[styles.textInput,styles.mt5]}
                left={
                    <TextInput.Icon
                    name={()=><AntDesign name="user" size={16}  style={[styles.themeColor,{paddingTop:'30%'}]} />}
                   
                  />
                  }            />

                <Button mode="contained" style={[styles.buttonMain, styles.mt5, styles.border1,{marginBottom:RFValue(60)}]} onPress={() => console.log()}>
                    <Text style={[styles.textTr, styles.themeColorwhite]}> Update</Text>
                </Button>       
             </View>

        </ScrollView>

    </View>);
};

export default MyComponent;
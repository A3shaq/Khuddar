
import * as React from 'react';
import { View, Text,TouchableOpacity} from 'react-native'
import { Avatar} from 'react-native-paper';
import { styles } from '../../styles/authStyles';
import { useNavigation } from '@react-navigation/native';

const MyComponent = ({ userImg , userName, datetime, notification }) => {
    const navigation = useNavigation();
    return (

        <TouchableOpacity style={[styles.ctr,styles.mt5]}>
            <View style={[styles.felxRow, { justifyContent: 'space-between' }]}>
                <View style={[{ justifyContent: 'flex-start',flexDirection:'row',justifyContent:'center',alignItems:'center'}]}>
                    <Avatar.Image size={44} source={{ uri: userImg }} />
                    <Text style={[styles.mainpara,{paddingLeft:'5%'},styles.PoppinsMedium]}>{userName}</Text>
                </View>
                <View style={{justifyContent:'center'}}>
                    <Text style={styles.mainpara}>{datetime}</Text>
                </View>
            </View>
            <View>
                <Text style={[styles.mainpara,styles.mt5]}>{notification}</Text>
            </View>
        </TouchableOpacity>
    );

}

export default MyComponent;
// import {React} from 'react';
// import {View} from 'react-native'
// import {styles} from '../../styles/authStyles'
// import { Avatar } from 'react-native-paper';

// const MyComponent =  ()=>{

//     return 

// }
// export default MyComponent
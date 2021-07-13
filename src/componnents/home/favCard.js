import * as React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import {Avatar} from 'react-native-paper'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { styles } from '../../styles/authStyles'
const MyComponent = ({ head, rest, price ,img}) => {
   
    return (
        <View style={styles.favcontainer}>
            {
                Array.from(Array(4)).map((x,i)=>    <TouchableOpacity key={i} >
                    <View style={styles.favbox} >
                    <FontAwesome name="heart-o" size={18} color="#a7a7a7" style={{ position: 'relative', left: '75%' }} />
                    <Avatar.Image style={{alignSelf:'center'}} size={100} source={{ uri: img }} />
                    <View style={{marginLeft: 10, marginRight: 10 }}>
                        <Text numberOfLines={1} style={[styles.mainTitleHead2, styles.p5]} >{head}</Text>
                        <Text numberOfLines={1} style={[styles.mainpara, { textAlign: 'left', marginTop: '-10%' }, styles.p5]}>Total Orders: {rest}</Text>
                        <Text numberOfLines={1} style={[styles.mainpara, { textAlign: 'left', marginTop: '-12%', fontFamily: 'PoppinsBold' }, styles.p5, styles.themeColor]}>Total Sell: ${price}</Text>
    
                    </View>
                </View>
                </TouchableOpacity>
    )
            }
        


        </View>

    );
};

export default MyComponent;
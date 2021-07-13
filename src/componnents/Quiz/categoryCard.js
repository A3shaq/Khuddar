import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native'

const width = Dimensions.get('window').width;

export default function () {
    const navigation = useNavigation();

    return <>

        <View style={{
            flex: 1, height: '100%', alignSelf: 'center', padding: 10, shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 9,
        }}>
            <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 10, flex: 1, alignItems: 'center', justifyContent: 'center', }} onPress={()=>navigation.navigate("Questions")}>
                <FontAwesome5 name="drafting-compass" size={35} color="#54595c" />
                <Text style={{ fontSize: 12, fontFamily: 'Ubuntu-Bold', marginTop: '4%', color: '#54595c' }}>Category</Text>
            </TouchableOpacity>


        </View>

    </>

}
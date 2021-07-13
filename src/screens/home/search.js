import React from 'react';
import { View, Image, Text, ScrollView, SafeAreaView ,StyleSheet} from 'react-native';
import { styles } from '../../styles/authStyles';
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CurvedNavBar from '../../componnents/auth/bottomTab'
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import Header from '../../componnents/auth/header';
import {Nav} from '../../navigation/navigationType'
export default () => {
    let [page, setPage] = React.useState({});
    const [selectedValue, setSelectedValue] = React.useState("Category (Optional)");
    const navigation = useNavigation();

    return <> 
   
    </>
}

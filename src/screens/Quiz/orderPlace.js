import * as React from 'react';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native'
import { styles } from '../../styles/authStyles';
import Header from '../../componnents/auth/header';
import Heading from '../../componnents/home/headingComp';
import ProductCard from '../../componnents/products/productCard'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Nav } from '../../navigation/navigationType'
import { Card, Button, RadioButton } from 'react-native-paper'
import Fontisto from 'react-native-vector-icons/Fontisto';
const MyComponent = () => {
    let [page, setPage] = React.useState({});
    const [value, setValue] = React.useState('first');

    const navigation = useNavigation();
    return (
        <>                
            <Header title="Order Successful!" leftHandler={() => navigation.goBack()} leftIcon="keyboard-backspace" />
            <View style={{ flex: 1,justifyContent:'center',alignItems:'center' }}>
                <Text style={styles.mainTitleHead1}>Find Nearest Delivery Boy</Text>
                <Text style={styles.mainpara}>Find Nearest Delivery Boy</Text>
                <Text style={styles.mainpara}>and deliver your order</Text>
                <Text style={styles.mainpara}></Text>
                <Button mode="contained" style={[styles.buttonMain, styles.mt5, styles.border1,{width:'40%',borderRadius:50}]} onPress={() => navigation.navigate(Nav.HomeStack)}>
                <Text style={[styles.textTr,styles.themeColorwhite]}> Find</Text>
            </Button>
            </View>
        </>);
};

export default MyComponent;
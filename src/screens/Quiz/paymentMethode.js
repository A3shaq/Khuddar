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
            <View>
                <Header title="Payment Method" leftHandler={() => navigation.goBack()} leftIcon="keyboard-backspace" />
                <ScrollView>


                    <View style={[styles.ctr, styles.mt5]}>
                        <Heading head="Payment Method" label="Select Payment Method" />

                        <View style={{marginTop:'5%'}}>
                        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>

                            <View style={[styles.felxRow, { justifyContent: 'space-between' }]}>
                                <View style={styles.felxRow}>
                                    <RadioButton value="second" />
                                    <Text style={[styles.mt5, styles.mainpara]}><Fontisto name="wallet" size={18}  /> Wallet</Text>
                                </View>
                                <View>
                                    <Text style={[styles.mt5, styles.mainpara]}>$526</Text>

                                </View>
                            </View>
                            <View style={[styles.felxRow, { justifyContent: 'space-between' }]}>
                                <View style={styles.felxRow}>
                                    <RadioButton value="second1" />
                                    <Text style={[styles.mt5, styles.mainpara]}><Fontisto name="dollar" size={18}  /> Cash On Delivery</Text>
                                </View>
                                <View>
                                    <Text style={[styles.mt5, styles.mainpara]}>$526</Text>

                                </View>
                            </View>
                            <View style={[styles.felxRow, { justifyContent: 'space-between' }]}>
                                <View style={styles.felxRow}>
                                    <RadioButton value="second2" />
                                    <Text style={[styles.mt5, styles.mainpara]}><Fontisto name="credit-card" size={18}  /> Credit/ Debit Card/Net Banking</Text>
                                </View>
                                <View>
                                    <Text style={[styles.mt5, styles.mainpara]}>$526</Text>

                                </View>
                            </View>
                            <View style={[styles.felxRow, { justifyContent: 'space-between' }]}>
                                <View style={styles.felxRow}>
                                    <RadioButton value="second22" />
                                    <Text style={[styles.mt5, styles.mainpara]}><Fontisto name="codepen" size={18}  /> Promo Code</Text>
                                </View>
                                <View>
                                    <Text style={[styles.mt5, styles.mainpara]}>$526</Text>

                                </View>
                            </View>
                        </RadioButton.Group>
                    </View>
                    </View>

                </ScrollView>

            </View>
            <View style={[{ position: 'absolute', bottom: 0, justifyContent: 'space-between', width: '100%', paddingTop: 20, paddingBottom: RFValue(25), paddingLeft: 10, paddingRight: 10 }, styles.themeBackColor, styles.felxRow]}>
                <View>
                    <Text style={[styles.mainpara, styles.themeColorwhite, { fontSize: 18 }]}>Total Amount $526</Text>

                    

                </View>

                <TouchableOpacity onPress={() => navigation.navigate(Nav.OrderPlace)}>
                    <Text style={[styles.mainpara, styles.themeColorwhite, { fontSize: 18 }]}>Pay Now<Text>
                        <MaterialCommunityIcons name="chevron-right" size={RFValue(20)} color="white" /></Text></Text>

                </TouchableOpacity>
            </View>
        </>);
};

export default MyComponent;
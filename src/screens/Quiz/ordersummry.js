import * as React from 'react';
import { ScrollView, View, TouchableOpacity, Text ,Image} from 'react-native'
import { styles } from '../../styles/authStyles';
import Header from '../../componnents/auth/header';
import Heading from '../../componnents/home/headingComp';
import ProductCard from '../../componnents/products/productCard'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { Nav } from '../../navigation/navigationType';
import { Card, Button, RadioButton } from 'react-native-paper'
// import DatePicker from 'react-native-datepicker'
const PriceFunc = ({ title, value }) => {
    return <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={[styles.mainTitleHead1, { fontSize: 16 }, styles.mt5]}>
            {title}
        </Text>
        <Text style={[styles.mainTitleHead1, { fontSize: 16 }, styles.mt5]}>
            {value}
        </Text>
    </View>
}
export default () => {
    const navigation = useNavigation();
    const [date, setDate] = React.useState("2020-11-19");
    const [value, setValue] = React.useState('first');

    return (
        <>
            <Header title="Order Summry" leftHandler={() => navigation.goBack()} leftIcon="keyboard-backspace" />

            <View style={styles.ctr}>
                <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:RFValue(10)}}>

                    <View style={[styles.mt5, { paddingLeft: 5, paddingRight: 5 }]}>
                        <Text style={[styles.mainpara, { fontSize: 16 }]}>
                            f7, Sector-59, Noida, UP, 1100438750221354
                  </Text>
                        
                        <Button mode="contained" style={[styles.buttonMain, styles.mt5, styles.border1]} >
                            <Text style={styles.textTr, styles.themeColorwhite}> Locate Address</Text>
                        </Button>
                        <Text style={[styles.mainTitleHead1, { fontSize: 16 }, styles.mt5]}>
                            Basket Items
                  </Text>
                        {Array.from(Array(2)).map((x, i) => <ProductCard quanity={10+i}  title="Product" desc="Description" unit="2 Kg" price="450" img="https://www.pngarts.com/files/3/Samsung-Mobile-PNG-Download-Image.png" key={i} />)}


                    <View style={{ borderBottomWidth: 1, paddingBottom: 10, borderBottomColor: '#d9d9d9'}}>

                    <PriceFunc title="Delivery Time" value="" />
                    <View style={{flexDirection:'row'}}>
                        <Image style={{width:50,height:50}} source={{ uri: "https://icons.iconarchive.com/icons/pixelkit/flat-jewels/96/Calendar-icon.png" }}/>
                        <Text style={[styles.mt5, styles.mainpara,{fontSize:16}]}>Time: 07:00 </Text>
                        <Text style={[styles.mt5, styles.mainpara,{fontSize:16}]}>Date: 2020-05-01</Text>

                    </View>

                   

                                </View>
                        <PriceFunc title="Total" value="$506" />
                        <PriceFunc title="Items" value="2 Items" />
                        <PriceFunc title="Discount Price" value="$0" />
                        <PriceFunc title="Delivery Charges" value="$0" />
                        <PriceFunc title="Sub Total" value="$506" />



                    </View>
                    <Button onPress={()=>navigation.navigate(Nav.OrderPlace)} mode="contained" style={[styles.buttonMain,{marginBottom:RFPercentage(20),marginTop:20}, styles.border1]} >
                            <Text style={styles.textTr, styles.themeColorwhite}> deliver now</Text>
                        </Button>
                </ScrollView>

            </View>
        
        </>);
}
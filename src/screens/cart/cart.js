import React,{useState} from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native'
import { styles } from '../../styles/authStyles';
import Header from '../../componnents/auth/header';
import CurvedNavBar from '../../componnents/auth/bottomTab'
import Searchbar from '../../componnents/home/searchbar';
import Chip from '../../componnents/home/chip';
import Heading from '../../componnents/home/headingComp';
import ProductCard from '../../componnents/products/productCard'
const MyComponent = () => {
    let [page, setPage] = React.useState({});

    return (<View>
        <Header title="Cart" leftIcon="keyboard-backspace" />
        <ScrollView>
           
            
            <View style={[styles.ctr, styles.mt5]}>
                <Heading head="Cart" label="Your Cart" />
                
                {Array.from(Array(10)).map((x,i)=>
                <ProductCard type="add" title="Product" desc="Description" unit="2 Kg" price="450" img="https://www.pngarts.com/files/3/Samsung-Mobile-PNG-Download-Image.png" key={i}/>)}
            </View>

        </ScrollView>
        <CurvedNavBar icons={['home', 'qrcode', 'magnify', 'bell', 'cart']}
            navColor='#7c967b'
            cb={(id) => {()=>alert(id) }} //change the parent's state of page 
        />
    </View>);
};

export default MyComponent;
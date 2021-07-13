import * as React from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native'
import { styles } from '../../styles/authStyles';
import Header from '../../componnents/auth/header';
import CurvedNavBar from '../../componnents/auth/bottomTab'
import Searchbar from '../../componnents/home/searchbar';
import Chip from '../../componnents/home/chip';
import Heading from '../../componnents/home/headingComp';
import ProductCard from '../../componnents/products/productCard';
import { useNavigation } from '@react-navigation/native';
import FavCard from '../../componnents/home/favCard';
import {RFPercentage,RFValue} from 'react-native-responsive-fontsize'
import TopDrawer from '../../componnents/auth/drawer/topDrawer';
import WalletCard from '../../componnents/home/walletCard'
import TCard from '../../componnents/wallet/transactioncard'

const MyComponent = () => {
    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const handleChange = (id) => {      
    }
    return (<View style={[{backgroundColor:'white',flex:1}]}>

                <TopDrawer/>

        <ScrollView style={{marginBottom:RFPercentage(8)}} showsVerticalScrollIndicator={false} >
<View style={styles.ctr}>
<Heading head="User Wallet" label="Lorem Ipsum is simply" type={true}  />
</View>
            <WalletCard/>
        <View style={{ marginTop: 20}}>
            <TCard title="Deposit To Khuddar" amount={200} />
            <TCard title="Deposit To Khuddar" amount={200} />
            <TCard title="Deposit To Khuddar" amount={200} />
            <TCard title="Deposit To Khuddar" amount={200} />

        </View>
        </ScrollView>
       
    </View>);
};

export default MyComponent;
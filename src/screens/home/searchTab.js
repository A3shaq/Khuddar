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

const MyComponent = () => {
    let [page, setPage] = React.useState({});
    const navigation = useNavigation();
    const handleChange = (id) => {      
    }
    return (<></>);
};

export default MyComponent;
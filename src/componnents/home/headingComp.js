import * as React from 'react';
import {View,Text, TouchableOpacity} from 'react-native'
import { Searchbar } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize'
import {styles} from '../../styles/authStyles'
const MyComponent = ({head,label,type,style}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
 
  const onChangeSearch = query => setSearchQuery(query);

  return (
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
       <View>
       <Text style={[type?styles.mainTitleHeadscreen:styles.mainTitleHead1,{...style}]}>{head}</Text>
       <Text style={[styles.mainpara,styles.mnt1,{marginLeft:5}]}>{label}</Text>
       </View>
       <View>
       {/* {head? <TouchableOpacity>
        <MaterialCommunityIcons name="dots-horizontal" size={24} color="#454545" />

        </TouchableOpacity>:<></>} */}
       </View>
      </View>
    
  );
};

export default MyComponent;
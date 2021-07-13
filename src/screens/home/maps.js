import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import CurvedNavBar from '../../componnents/auth/bottomTab'

import Header from '../../componnents/auth/header';

export default ()=> {
    let [page, setPage] = React.useState({});

    return (
        <>
                <Header title="Searching Nearby Dealers" leftIcon="map-marker" />
                <View style={styles.container}>

<MapView style={styles.mapStyle} />

</View>
<CurvedNavBar icons={['home', 'qrcode', 'magnify', 'bell', 'cart']}
            navColor='#7c967b'
            cb={(id) => { setPage({ page: id }) }} //change the parent's state of page 
        />

</>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
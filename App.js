// import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { DefaultTheme, Provider as PaperProvider,configureFonts } from 'react-native-paper';
// import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/navigation/appNavigation';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './src/utiles/reduxConfig/persistConfig'
import SplashScreen from 'react-native-splash-screen';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#21c5df',
    accent: 'white',

  },
};
enableScreens();

export default function App() {
  //  let [page,setPage]= React.useState({});
  useEffect ( ()=> {
    SplashScreen.hide();
  },[])

  // const [loaded] = Font.useFonts({
  //   PoppinsBlack: require('./assets/fonts/PoppinsBlack.ttf'),
  //   PoppinsBlackItalic: require('./assets/fonts/PoppinsBlackItalic.ttf'),
  //   PoppinsBold: require('./assets/fonts/PoppinsBold.ttf'),
  //   PoppinsBoldItalic: require('./assets/fonts/PoppinsBoldItalic.ttf'),
  //   PoppinsExtraLight: require('./assets/fonts/PoppinsExtraLight.ttf'),
  //   PoppinsExtraLightItalic: require('./assets/fonts/PoppinsExtraLightItalic.ttf'),
  //   PoppinsItalic: require('./assets/fonts/PoppinsItalic.ttf'),
  //   PoppinsLight: require('./assets/fonts/PoppinsLight.ttf'),
  //   PoppinsLightItalic: require('./assets/fonts/PoppinsLightItalic.ttf'),
  //   PoppinsMedium: require('./assets/fonts/PoppinsMedium.ttf'),
  //   PoppinsMediumItalic: require('./assets/fonts/PoppinsMediumItalic.ttf'),
  //   PoppinsRegular: require('./assets/fonts/PoppinsRegular.ttf'),
  //   PoppinsSemiBold: require('./assets/fonts/PoppinsSemiBold.ttf'),
  //   PoppinsSemiBoldItalic: require('./assets/fonts/PoppinsSemiBoldItalic.ttf'),
  //   PoppinsThin: require('./assets/fonts/PoppinsThin.ttf'),
  //   PoppinsThinItalic: require('./assets/fonts/PoppinsThinItalic.ttf'),
  //   PoppinsExtraBold: require('./assets/fonts/PoppinsExtraBold.ttf'),
  // });

  // if (!loaded) {
  //   return null;
  // }
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <AppStack />
          </NavigationContainer>
        </PersistGate>
      </Provider>

    </PaperProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

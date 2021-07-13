import * as React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../componnents/auth/drawer/customDrawer'
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import {styles} from '../styles/authStyles'
import UserNavigation from './userstackNavigation'
import TabNavigation from './useTabNavigation'
import { Nav } from './navigationType';
import About from '../screens/About/About';
const Stack = createNativeStackNavigator();
Stack.Navigator.defaultProps = {
  headerMode: 'none',
};
const dimensions = Dimensions.get('window');

const isLargeScreen = dimensions.width >= 768;


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}  drawerStyle={isLargeScreen ? [styles.themeBackColor] : [{ width: '90%'},styles.themeBackColor]}
    >
    <Drawer.Screen name="stackNav" component={UserNavigation} />
    {/* <Drawer.Screen name={Nav.About} component={About} /> */}
  </Drawer.Navigator>
  );
}
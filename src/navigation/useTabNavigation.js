import * as React from 'react';
import {View,TouchableOpacity,Text} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import CustomBottomTab from '../componnents/auth/bottomTab'
import Login from '../screens/auth/login';
import Signup from '../screens/auth/signup';
import {styles} from '../styles/authStyles';
import Home from '../screens/home/home'
import Search from '../screens/home/searchTab'
import Wallet from '../screens/home/wallet';
import Notifications from '../screens/home/notifications';
import Rewards from '../screens/Quiz/Rewards';
import FamilyHome from '../screens/home/Family/FamilyHome'
import {Nav} from './navigationType'
const Stack = createNativeStackNavigator();
Stack.Navigator.defaultProps = {
  headerMode: 'none',
};
const Tab = createBottomTabNavigator();


function MyTabBar({ state, descriptors, navigation }) {
    return (
     <CustomBottomTab state={state} descriptors={descriptors} navigation={navigation} icons={['home', 'heart-multiple', 'magnify', 'bell', 'cart']}
     navColor='#21c5df'
     cb={(id) => { }} />
    );
  }

export default function App() {
    return (
        <Tab.Navigator tabBar={({ state, descriptors, navigation}) => {
          return <CustomBottomTab state={state} descriptors={descriptors} navigation={navigation} icons={['home', 'wallet', 'newspaper', 'bell', 'newspaper-variant']}
          navColor='#1e9baf'
          cb={(id) => {}} />
        //   return <TabBar
          
        //   onPress={tabIndex => { 
        //     const isFocused = state.index === tabIndex;

        //     const event = navigation.emit({
        //       type: 'tabPress',
        //       target: state.routes[tabIndex].name,
        //     });
  
        //     if (!isFocused && !event.defaultPrevented) {
        //       console.log(state.routes)
        //       navigation.navigate(state.routes[tabIndex].name);
        //     }
        //    }}
        //   backgroundColor="#21c5df"
        //   selectColor="#21c5df"
        //   tintColor="white"
        //   values={[
        //     {
        //       title: 'Home',      // required
        //       icon: 'home',       // required
        //       iconSet: 'MaterialCommunityIcons',  // required
        //       size: 25           // required (icon will be size x size)
        //     },
        //     {
        //       title: 'Wallet',      // required
        //       icon: 'wallet',       // required
        //       iconSet: 'MaterialCommunityIcons',  // required
        //       size: 25            // required (icon will be size x size)
        //     },
        //     {
        //       title: 'News',      // required
        //       icon: 'newspaper',       // required
        //       iconSet: 'MaterialCommunityIcons',  // required
        //       size: 25            // required (icon will be size x size)
        //     },
        //     {
        //       title: 'Notifications',      // required
        //       icon: 'bell',       // required
        //       iconSet: 'MaterialCommunityIcons',  // required
        //       size: 25            // required (icon will be size x size)
        //     },{
        //       title: 'Rewards',      // required
        //       icon: 'results-demographics',       // required
        //       iconSet: 'Foundation',  // required
        //       size: 25            // required (icon will be size x size)
        //     }
        //   ]}
        // />
        }}>
        <Tab.Screen name={Nav.Home} component={Home} />
        <Tab.Screen name={Nav.Wallet} component={Wallet} />
        <Tab.Screen name={Nav.FamilyHome} component={FamilyHome} />
        <Tab.Screen name={Nav.Notifications} component={Notifications} />
        <Tab.Screen name={Nav.Rewards} component={Rewards} />
      </Tab.Navigator>
      );
    
}
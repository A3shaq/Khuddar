import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import HomeStack from './useTabNavigation'
import {Nav} from './navigationType';
import Search from '../screens/home/searchTab'
import Family from '../screens/home/Family/family';
import FamilyHome from '../screens/home/Family/FamilyHome';
import FamilyList from '../screens/home/Family/familyList'
import ServicesHome from '../screens/home/services/servicesHome';
import AlNikkah from '../screens/home/services/al-nikkah/alnikah'
import Barat from '../screens/home/services/barat/barat'
import FurnitureHome from '../screens/home/services/furniture/furniture';
import AddFurnitureDetailes from '../screens/home/services/furniture/addFurniture';
import SelectedFurniture from '../screens/home/services/furniture/selectedFurniture';
import FurnitureList from '../screens/home/services/furniture/furnitureList'
import FoodAndFood from '../screens/home/services/foodandfood/foodandfood'
import Saloon from '../screens/home/services/saloon/saloon'
import Valima from '../screens/home/services/valima/valima'
import Wedding from '../screens/home/services/weedingDress/weedingDress'
import RentACar from '../screens/home/services/rentAcar/rentacar'
import About from '../screens/About/About';
import drawernavigation from '../navigation/drawernavigation';
import Help from '../screens/Help/Help';
import News from '../screens/home/news';
import NewsDetails from '../screens/home/NewsDetails';
import RegisterFuneral from '../screens/home/Funeral/RegisterFuneral';
import Mart from '../screens/home/Mart';
import MartDetails from '../screens/home/MartDetails';
import ECommerce from '../screens/home/ECommerce';
import Business from '../screens/home/business/business';
import Jobs from '../screens/home/jobs/Jobs';
import JobDetails from '../screens/home/jobs/JobDetails';
import Hospital from '../screens/home/Hospital/Hospital';
import OPD from '../screens/home/Hospital/OPD';
import Lab from '../screens/home/Hospital/Lab';
import RegisterOpd from '../screens/home/Hospital/RegisterOpd';
import FemaleServices from '../screens/home/services/FemaleServices';
import MaleServices from '../screens/home/services/MaleServices';
import RegisterShadi from '../screens/home/Family/RegisterShadi';
import AffiliationHome from '../screens/home/Affiliation/AffiliationHome';
import BlogsList from '../screens/home/Affiliation/BlogsList';
import BlogDetails from '../screens/home/Affiliation/BlogDetails';
import VideosList from '../screens/home/videos/VideosList';
import WatchVideo from '../screens/home/videos/WatchVideo';
import ECommerceCart from '../screens/cart/ECommerceCart';
import ECommDetails from '../screens/home/ECommDetails';
import AddValima from '../screens/home/services/valima/AddValima';
import AddSaloon from '../screens/home/services/saloon/AddSaloon';
import AddBarat from '../screens/home/services/barat/AddBarat';
import AddFood from '../screens/home/services/foodandfood/AddFood';
import ListFood from '../screens/home/services/foodandfood/ListFood';
import SelectedFood from '../screens/home/services/foodandfood/SelectedFood';
import AddDress from '../screens/home/services/weedingDress/AddDress';
import DressList from '../screens/home/services/weedingDress/DressList';
import SelectedDress from '../screens/home/services/weedingDress/SelectedDress';
import SelectedCar from '../screens/home/services/rentAcar/SelectedCar';
import CarsList from '../screens/home/services/rentAcar/CarsList';
import AddCar from '../screens/home/services/rentAcar/AddCar';
import appliances from '../screens/home/services/appliances/appliances';
import AppliancesList from '../screens/home/services/appliances/appliancesList';
import SelectedAppliances from '../screens/home/services/appliances/selectedAppliances';
import Profile from '../screens/Profile/Profile';
import QuizHome from '../screens/home/Quiz/QuizHome';
import QuizStart from '../screens/home/Quiz/QuizStart';
import MartCart from '../screens/cart/MartCart';
import CalculateResults from '../screens/home/Quiz/CalculateResults';


const Stack = createNativeStackNavigator();
Stack.Navigator.defaultProps = {
  headerMode: 'none',
};
const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <Stack.Navigator  screenOptions={{headerShown: false,}} initialRouteName={Nav.HomeStack} >
          
          <Stack.Screen name={Nav.SearchTab} component={Search} />
          <Stack.Screen name={Nav.HomeStack} component={HomeStack} />
          <Stack.Screen name={Nav.Family} component={Family} />
          <Stack.Screen name={Nav.FamilyHome} component={FamilyHome} />
          <Stack.Screen name={Nav.FamilyList} component={FamilyList} />
          <Stack.Screen name={Nav.About} component={About} />
          <Stack.Screen name={Nav.Help} component={Help} />
          <Stack.Screen name={Nav.News} component={News} />
          <Stack.Screen name={Nav.NewsDetails} component={NewsDetails} />
          <Stack.Screen name={Nav.RegisterFuneral} component={RegisterFuneral} />
          <Stack.Screen name={Nav.Mart} component={Mart} />
          <Stack.Screen name={Nav.MartDetails} component={MartDetails} />
          <Stack.Screen name={Nav.ECommerce} component={ECommerce} />
          <Stack.Screen name={Nav.Business} component={Business} />
          <Stack.Screen name={Nav.Jobs} component={Jobs} />
          <Stack.Screen name={Nav.JobDetails} component={JobDetails} />
          <Stack.Screen name={Nav.Hospital} component={Hospital} />
          <Stack.Screen name={Nav.OPD} component={OPD} />
          <Stack.Screen name={Nav.Lab} component={Lab} />
          <Stack.Screen name={Nav.RegisterOpd} component={RegisterOpd} />
          <Stack.Screen name={Nav.FemaleServices} component={FemaleServices} />
          <Stack.Screen name={Nav.MaleServices} component={MaleServices} />
          <Stack.Screen name={Nav.RegisterShadi} component={RegisterShadi} />
          <Stack.Screen name={Nav.AffiliationHome} component={AffiliationHome} />
          <Stack.Screen name={Nav.BlogsList} component={BlogsList} />
          <Stack.Screen name={Nav.BlogDetails} component={BlogDetails} />
          <Stack.Screen name={Nav.VideosList} component={VideosList} />
          <Stack.Screen name={Nav.WatchVideo} component={WatchVideo} />
          <Stack.Screen name={Nav.ECommerceCart} component={ECommerceCart} />
          <Stack.Screen name={Nav.MartCart} component={MartCart} />
          <Stack.Screen name={Nav.ECommDetails} component={ECommDetails} />
          <Stack.Screen name={Nav.AddValima} component={AddValima} />
          <Stack.Screen name={Nav.AddSaloon} component={AddSaloon} />
          <Stack.Screen name={Nav.AddBarat} component={AddBarat} />
          <Stack.Screen name={Nav.AddFood} component={AddFood} />
          <Stack.Screen name={Nav.ListFood} component={ListFood} />
          <Stack.Screen name={Nav.SelectedFood} component={SelectedFood} />
          <Stack.Screen name={Nav.AddDress} component={AddDress} />
          <Stack.Screen name={Nav.DressList} component={DressList} />
          <Stack.Screen name={Nav.SelectedDress} component={SelectedDress} />
          <Stack.Screen name={Nav.AddCar} component={AddCar} />
          <Stack.Screen name={Nav.CarList} component={CarsList} />
          <Stack.Screen name={Nav.SelectedCar} component={SelectedCar} />
          <Stack.Screen name={Nav.appliances} component={appliances} />
          <Stack.Screen name={Nav.appliancesList} component={AppliancesList} />
          <Stack.Screen name={Nav.selectedAppliances} component={SelectedAppliances} />
          <Stack.Screen name={Nav.Profile} component={Profile} />
          <Stack.Screen name={Nav.QuizHome} component={QuizHome} />
          <Stack.Screen name={Nav.QuizStart} component={QuizStart} />
          <Stack.Screen name={Nav.CalculateResults} component={CalculateResults} />
          {/* <Stack.Screen name="Drawer" component={Drawer} /> */}
{/*
  Services
*/}
          <Stack.Screen name={Nav.ServicesHome} component={ServicesHome} />
          <Stack.Screen name={Nav.Alnikkah} component={AlNikkah} />
          <Stack.Screen name={Nav.Barat} component={Barat} />
          <Stack.Screen name={Nav.FunritureHome} component={FurnitureHome} />
          <Stack.Screen name={Nav.FurnitureList} component={FurnitureList} />
          <Stack.Screen name={Nav.FunrtitureDetailes} component={AddFurnitureDetailes} />
          <Stack.Screen name={Nav.SelectedFurniture} component={SelectedFurniture} />
          <Stack.Screen name={Nav.FoodAndFood} component={FoodAndFood} />
          <Stack.Screen name={Nav.Saloon} component={Saloon} />
          <Stack.Screen name={Nav.WeedingDress} component={Wedding} />
          <Stack.Screen name={Nav.Valima} component={Valima} />
          <Stack.Screen name={Nav.RentACar} component={RentACar} />

        </Stack.Navigator>
      );
    
}
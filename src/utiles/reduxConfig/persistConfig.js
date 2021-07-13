import { createStore, compose, applyMiddleware } from "redux";
import reducers from "../../redux/reducers";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
// import * as SplashScreen from 'expo-splash-screen';

//REDUX SETUP

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ['userReducer', 'userLanguage', 'userLocation','systemLanguages','fcmToken']
};
//'cartReducer'this.props.nav   igation.navigate('orderStatus', { orderId: orderId })cu
const persistedReducer = persistReducer(persistConfig, reducers);

const middleware = [thunk];
const store = createStore(
    persistedReducer,
    {},
    compose(
        applyMiddleware(...middleware)
    )
);
const persistor = persistStore(store, {}, () => {
    // const hideSplash=async ()=>{
    //     SplashScreen.hideAsync();
    // }
    // hideSplash();
    setConfig()
    console.log('done')
});


//API SETUP

const url = '';

var headers={};

//FUNCTION TO LOAD TOKEN AND USER ID

const setConfig = () => {
    var data = store.getState();
    var token = null;
    var id = null;
    var name = null;
    var image = null;
    var email = null;
    var cnic = null;
    var address = null;

    if (data['userReducer'] !== null) {
        token = data["userReducer"]['_token']
        id = data["userReducer"]['id']
        name = data["userReducer"]['name']
        image = data["userReducer"]['image']
        email = data["userReducer"]['email']
        cnic = data["userReducer"]['cnic']
        address = data["userReducer"]['address']
    }

    headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'secret': token,
        'id': id,
        'name':name,
        'image':image,
        'email':email,
        'cnic':cnic,
        'address':address
    };
}


const maps_api='AIzaSyCLMQZjetUzF6q_Ym-ugqEuqpIFY-jrq3Y';

export { store, persistor, url, setConfig, headers ,maps_api}
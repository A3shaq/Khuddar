import * as React from "react"
import { Dimensions, View, Animated, TouchableOpacity, StyleSheet, Text,Image } from 'react-native'
import Svg, { Path } from "react-native-svg"
//import { styles } from "../../../styles/authStyles"
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Value } from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

const fixoriginalHeight = 107;
const window = Dimensions.get('window');
function SvgComponent(props) {
  const animationDuration = 300;

  const scale=React.useState(new Animated.Value(window.width/2))[0];
  const [animatedHeight, setAnimatedHeight] = React.useState(new Animated.Value(window.width/3))
  const [expanded, setExpanded] = React.useState(false);

  const handleTouch=()=>{
    if (expanded == true) {
      Animated.timing(animatedHeight, {
          toValue: (window.width/1.4),
          duration: animationDuration,
          useNativeDriver:false
        }).start()
      setTimeout(() => {
          setExpanded(!expanded)
      }, animationDuration)
  } else {
      setExpanded(!expanded)
      // expand dropdown
      Animated.timing(animatedHeight, {
          toValue: (window.width/3) ,
          duration: animationDuration,
          useNativeDriver:false
      }).start()
  }
  }
  const interpolatedHeight = animatedHeight.interpolate({
    inputRange: [0,RFValue(680)],
    outputRange: ["0%", "100%"]
})  
const navigation= useNavigation();
  return (
    <>
  <Animated.View style={[styles.containerStyle,{height:interpolatedHeight}]} >
        <View style={styles.sliderContainerStyle} >
       
        </View>
        <View style={styles.sliderContainerStyle1} >
          
        </View>
       
      </Animated.View>


      <Animated.View style={{ position: 'absolute', top: 40, left: 20,flexDirection:'row' }}>
        <TouchableOpacity onPress={() =>navigation.toggleDrawer()} >
          <SimpleLineIcons name="menu" size={24} color="#5e5e5e" />

        </TouchableOpacity>
      <Image source={require('../../../images/kdm.png')} style={{width:130,height:25,marginLeft:40}} resizeMode="stretch"  />

      </Animated.View>
        </>
  );

}
const styles = StyleSheet.create({
  containerStyle: {
    alignSelf: 'center',
    width: window.width,
    backgroundColor:'transparent'
  },
  sliderContainerStyle: {
    borderRadius: window.width,
    width: window.width * 2,
    height: window.width*2 ,
    marginLeft: -(window.width / 1.4),
    position: 'absolute',
    bottom: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  
    elevation: 5,

  },
  sliderContainerStyle1: {
    borderRadius: window.width,
    width: window.width * 2,
    height: window.width * 2,
    marginLeft: -(window.width / 1.25),
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
    backgroundColor: '#21c5df',
    opacity:0.3   ,
    zIndex:-1
   
  },
  slider: {
    height: window.width / 2.3,
    width: window.width,
    position: 'absolute',
    bottom: 0,
    marginLeft: window.width / 1.4,
    backgroundColor: '#9DD6EB'
  }
});

// function SvgComponent(props) {

// //    const scale=React.useState(new Animated.Value(2.4))[0];
// let scale=React.useState({scaleX:new Animated.Value(0),scaleY:new Animated.Value(10)})[0];

// const [isExpand,setisExpand]=React.useState(false);
//     const originalWidth =290;
//     let [originalHeight,setoriginalHeight] =React.useState(107);
//     let [aspectRatio,setaspectRatio] = React.useState(originalWidth / originalHeight);
//     const windowWidth = Dimensions.get("window").width;
//     let AnimatedPath = Animated.createAnimatedComponent(Path);

//     const handleTouch=()=>{
//       Animated.spring(scale.scaleY,{
//         toValue:(2.4),
//         duration:1000,
//         useNativeDriver:true

//     }).start();

// }

//   return (
//       <>
//           {/* <View style={{ width: windowWidth, aspectRatio:aspectRatio/2.4 ,backgroundColor:'black'}}> 
//                   viewBox={`0 0 ${originalWidth} ${originalHeight*2.4}`}>
//           transform={{scaleY:2.4,scaleX:1.5}}

//           */}

//     <Animated.View style={{ width: windowWidth, aspectRatio:aspectRatio/2.4 ,backgroundColor:'black'}}>
//     <Svg 

//         width="100%" 
//         height="100%"

//         viewBox={`0 0 ${originalWidth} ${originalHeight*2.4}`}>


//          <AnimatedPath
//           d="M4 0h287v22.83C245.08 65.566 94.842 147.874 4 82.894V0z"
//           fill="#C51010"

//         scaleY={scale.scaleY}
//             x={-5}
//         />
//            <AnimatedPath
//         scaleY={scale.scaleY}

//           d="M4 0h290v22.886C247.6 65.724 124.64 134.358 4 66.193V0z"
//           fill="#fff"
//           x={-5}
//          />



//     </Svg>

// </Animated.View>

// <Animated.View style={{position:'absolute',top:20,left:10}}>
// <TouchableOpacity onPress={()=>handleTouch()} >
// <SimpleLineIcons  name="menu" size={24} color="black" />

// </TouchableOpacity>


// </Animated.View>
// </>
//   )
// }

export default SvgComponent

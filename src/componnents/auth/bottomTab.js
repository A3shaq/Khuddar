import React, { Component } from 'react'
import { Text, StyleSheet, View,Dimensions,Platform,TouchableHighlight } from 'react-native'
import {Animated,TouchableOpacity} from "react-native";
import {RFPercentage,RFValue} from 'react-native-responsive-fontsize'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const {height,width} = Dimensions.get('window');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StackActions } from '@react-navigation/routers';
import { useDispatch } from 'react-redux';



// let num = 3

// let offset = 343-num*(width-44)/5;
let selected= 1;

let yoffset=-15;
// let primColor= '#4687FD';
let iconSize=25;
// let selectedIconColor='white'
// let iconColor='black'

console.log(width)
let mainOffSet=Platform.OS==='ios'?20:0;

let slider = [(2*1-1)*((1*(width/5))/2)+85,(2*5-1)*((1*(width/5))/2)+84]


export default class CurvedNavBar extends Component{

state={
  iconColor:'black', //default color black
  primColor:'#4687FD',
  selectedIconColor:'white',
  mainOffSetIos:20,
  mainOffSetAndroid:0
}

  animatedValue= new Animated.Value(this.props.selected?this.props.selected:1);
  

  componentDidMount(){

    this.setState({
      icon1:this.props.icons[0],
      icon2:this.props.icons[1],
      icon3:this.props.icons[2],
      icon4:this.props.icons[3],
      icon5:this.props.icons[4],
      iconColor:this.props.iconColor?this.props.iconColor:'white',
      primColor:this.props.navColor?this.props.navColor:'#1e9baf',
      selectedIconColor:this.props.selectedIconColor?this.props.selectedIconColor:'white',
    })

    this._start(this.props.selected?this.props.selected:1) //select the tab else 1

  }

  onPress = (key,name,state,navigation) => {
    console.log(name);

    const isFocused = state.index === key;
    const event = navigation.emit({
      type: 'tabPress',
      target: key,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(name)
    }
  };

  state={
    fadeValue: new Animated.Value(1),
    id1: new Animated.Value(1),
    id2: new Animated.Value(1),
    id3: new Animated.Value(1),
    id4: new Animated.Value(1),
    id5: new Animated.Value(1),

    i1: new Animated.Value(0),
    i2: new Animated.Value(0),
    i3: new Animated.Value(0),
    i4: new Animated.Value(0),
    i5: new Animated.Value(0),

    h1: new Animated.Value(0),
    h2: new Animated.Value(0),
    h3: new Animated.Value(0),
    h4: new Animated.Value(0),
    h5: new Animated.Value(0),


    hh1: new Animated.Value(300),
    hh2: new Animated.Value(20),
    hh3: new Animated.Value(20),
    hh4: new Animated.Value(20),
    hh5: new Animated.Value(20),
  }

  _start = (id) => {

    this.props.cb(id)

    let idd='id'+id
    let hh = 'h'+id
    let iddd='i'+id

    let h = 'hh'+id

    let a= this.state[idd]
    let b= this.state[hh]
    let c=this.state[iddd]

    let d=this.state[h]

    // this.setState({[idd]: new Animated.Value()})
    Animated.timing(a, {toValue: 0,duration: 100,useNativeDriver: false}).start()
    Animated.timing(b, {toValue: 100,duration: 100,useNativeDriver: false}).start()
    Animated.timing(c, {toValue: 1, duration: 200,useNativeDriver: false}).start() //icon circle upp 
    Animated.timing(d , {toValue: 5, duration: 300,useNativeDriver: false}).start() //icon circle upp 

    this.showall(id)
}

  showall= (id)=>{
    for(let i=1;i<=5;i++){
      if(i!=id){
        let idd='id'+i
        let iddd='i'+i
        let h = 'hh'+i
        let hh = 'h'+i
        let d=this.state[h]
        let a= this.state[idd]
        let b= this.state[hh]
        let c=this.state[iddd]
        Animated.timing(a, {toValue: 1,duration: 200,useNativeDriver: false}).start() // icon fade
        Animated.timing(b, {toValue: 0,duration: 200,useNativeDriver: false}).start() //icon lower
        Animated.timing(c, {toValue: 0,duration: 200,useNativeDriver: false}).start() //icon lower rest
        Animated.timing(d, {toValue: 10,duration: 200,useNativeDriver: false}).start() //icon lower rest
        Animated.timing(this.animatedValue, {toValue: id,duration: 200,useNativeDriver: false}).start() //navbar

      }
   
    }
  }


  render() {

    const navrr= this.animatedValue.interpolate({
       inputRange:[1,5],
       outputRange:slider,
       extrapolate:"clamp"
    })

    let off=(Platform.OS==='ios')?height:height+20
    if(this.props.mainOffSetAndroid)
      off=(Platform.OS==='ios')?height:height+20-this.props.mainOffSetAndroid
    if(this.props.mainOffSetIos)
      off=(Platform.OS==='ios')?height-this.props.mainOffSetIos:height+20

    return (


<View style={{position:'absolute',top:off}}>

      <View style={{backgroundColor:'#1e9baf',position:'absolute',width:width,height:width<= 360 ? 70:69.7,bottom:14+yoffset,
      shadowColor: "#000",shadowOffset: {width: 1,height: 4},shadowOpacity: 0.5,shadowRadius: 10,}}></View> 
      
        {/* <View style={{backgroundColor:'red',position:'absolute',
      bottom:-15+yoffset,
      width:width,
      height:80
      }}>
        </View> */}

       
       <Animated.View style={{position:'absolute',bottom:0,left:navrr}}>

        <View style={{backgroundColor:'#1e9baf',position:'absolute',
        bottom:0+yoffset,
        right:wp('30.3'),
        // right:width>400?RFValue(90):Platform.OS==='ios'?RFValue(1004):RFValue(119.60),
        width:width,
        height:110,
        borderRadius:40
        }}></View>

      <View style={{backgroundColor:'#1e9baf',position:'absolute',
      bottom:0+yoffset,
      // right:35,
      width:width,
      height:110,
      right:width<= 360 ? width/3.3:width/3.6,

        borderRadius:40
        }}></View> 

      <View style={{backgroundColor:'#1e9baf',position:'absolute',
      bottom:0+yoffset,
      right: width<= 360 ? -wp('87'): -wp('86.9'),
      // right:Platform.OS==='ios'?-RFPercentage(45.6):width>400?-RFValue(398):-RFPercentage(50.2),
      width:width,
      height:110,
      borderRadius:40
      }}></View>

<View style={{backgroundColor:'transparent',position:'absolute',
          alignItems:'center',
          justifyContent:'center',
          bottom:64+yoffset,
          width:width<= 360 ? wp('20.5'):wp('18.5'),
          borderBottomColor:'white',
          borderBottomWidth:20,
          // alignSelf:'center',
          // marginLeft:40,
          right:width<= 360 ? width/8.8 :width<450 ? width/8.8: width/8.9,
          // right:width>400?RFValue(27):Platform.OS==='ios'?RFValue(65):RFValue(45.3),
          height:width<= 360 ? wp('20.5'):wp('18.5'),
          // elevation:1,
          borderRadius:width<= 360 ? wp('20.5'):wp('18.5')}}>
       
          <View style={{backgroundColor:this.state.primColor,position:'absolute',
          // alignItems:'center',
          // justifyContent:'center',
          // bottom:65.5+yoffset,
          width:width<= 360 ? wp('15'):wp('14'),
          // alignSelf:'center',
          // marginLeft:100,
          // right:width>400?RFValue(61):Platform.OS==='ios'?RFValue(65):RFValue(73),
          height:width<= 360 ? wp('15'):wp('14'),
          elevation:1,
          borderRadius:width<= 360 ? wp('15'):wp('14')}}>
            </View>
{/* 
            <View style={{backgroundColor:'red',position:'absolute',
          alignItems:'center',
          justifyContent:'center',
          bottom:-6+yoffset,
          width:width,
          height:20}}>

</View> */}
          </View>

        </Animated.View>

        


<View style={{position:'absolute',bottom:0,width:width,height:180,flexDirection:'row',elevation:2,alignItems:'center',justifyContent:'space-around',
marginLeft: width<= 360 ? width/55:width<450 ? width/130 : -width/90
// marginLeft:width>400?RFValue(18):Platform.OS==='ios'?RFValue(20):RFValue(8),
}}>
        
        <TouchableOpacity  onPressOut={() => {this._start(1)}
        }>
        <Animated.View style={{opacity:this.state.i1,top:this.state.hh1}} >
        <MaterialCommunityIcons name={this.state.icon1} size={iconSize} color={this.state.selectedIconColor} />
        </Animated.View></TouchableOpacity>


        <TouchableOpacity onPressOut={() => this._start(2)}>
        <Animated.View style={{opacity:this.state.i2,top:this.state.hh2}} >
        <MaterialCommunityIcons name={this.state.icon2} size={iconSize} color={this.state.selectedIconColor} />
        </Animated.View></TouchableOpacity>

        <TouchableOpacity onPressOut={() => this._start(3)}>
        <Animated.View style={{opacity:this.state.i3,top:this.state.hh3}} >
        <MaterialCommunityIcons name={this.state.icon3} size={iconSize} color={this.state.selectedIconColor} />
</Animated.View>
</TouchableOpacity>

        <TouchableOpacity onPressOut={() => this._start(4)}>
        <Animated.View style={{opacity:this.state.i4,top:this.state.hh4}} >
        <MaterialCommunityIcons name={this.state.icon4} size={iconSize} color={this.state.selectedIconColor} />
        </Animated.View>
        </TouchableOpacity>



        <TouchableOpacity onPressOut={() => this._start(5)} >
        <Animated.View style={{opacity:this.state.i5,top:this.state.hh5}} >
        <MaterialCommunityIcons name={this.state.icon5} size={iconSize} color={this.state.selectedIconColor} />
        </Animated.View>
        </TouchableOpacity>

</View>



<View style={{position:'absolute',bottom:-20,width:width,height:100,flexDirection:'row',justifyContent:'space-around',paddingVertical:20}}>
        
        
        <TouchableOpacity onPress={()=>this.onPress(0,this.props.state.routes[0].name,this.props.state,this.props.navigation)} onPressOut={() => this._start(1)} style={{...styles.wicon}}>
        <Animated.View style={{opacity:this.state.id1,top:this.state.h1}} >
        <MaterialCommunityIcons name={this.state.icon1} size={30} color={this.state.iconColor} />
        </Animated.View></TouchableOpacity>


        <TouchableOpacity onPress={()=>this.onPress(1,this.props.state.routes[1].name,this.props.state,this.props.navigation)} onPressOut={() =>{
           this._start(2)
           
        }} style={{...styles.wicon}}>
        <Animated.View style={{opacity:this.state.id2,top:this.state.h2}} >
        <MaterialCommunityIcons name={this.state.icon2} size={25} color={this.state.iconColor} />
        </Animated.View></TouchableOpacity>

        <TouchableOpacity onPress={()=>this.onPress(2,this.props.state.routes[2].name,this.props.state,this.props.navigation)} onPressOut={() => this._start(3)} style={{...styles.wicon}}>
        <Animated.View style={{opacity:this.state.id3,top:this.state.h3}} >
        <MaterialCommunityIcons name={this.state.icon3} size={25} color={this.state.iconColor} />
          </Animated.View>
    </TouchableOpacity>

        <TouchableOpacity onPress={()=>this.onPress(3,this.props.state.routes[3].name,this.props.state,this.props.navigation)} onPressOut={() => this._start(4)} style={{...styles.wicon}}>
        <Animated.View style={{opacity:this.state.id4,top:this.state.h4}} >
        <MaterialCommunityIcons name={this.state.icon4} size={25} color={this.state.iconColor} />
        </Animated.View>
        </TouchableOpacity>



        <TouchableOpacity onPress={()=>this.onPress(4,this.props.state.routes[4].name,this.props.state,this.props.navigation)} onPressOut={() => this._start(5)} style={{...styles.wicon}}>
        <Animated.View style={{opacity:this.state.id5?this.state.id5:1,top:this.state.h5}} >
        <MaterialCommunityIcons name={this.state.icon5} size={25} color={this.state.iconColor}  />
        </Animated.View>
        </TouchableOpacity>

</View>
</View>


    )
  }
}


const styles = StyleSheet.create({
  // wicon:{
  //   backgroundColor:'white',
  //   borderRadius:20,
  //   padding:2,
  //   overflow:"hidden",
  //   height:40,
  //   width:40,
  //   alignItems:'center',
  //   justifyContent:'center'
  // }
  wicon:{
    alignItems:'center',
    // justifyContent:'center',
    width:width/6,
    // paddingTop:10,
    top:-20
  }
})
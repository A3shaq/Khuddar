import { StyleSheet,Dimensions ,PixelRatio } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const width=Dimensions.get('screen').width;
const scale = width / 320;
export const styles = StyleSheet.create({

    shadowWallet:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        
        elevation: 17,
    },
    felxRow:{
        flexDirection:'row'
    },

    PoppinsLight:{
        fontFamily:'PoppinsLight'
    },
    PoppinsMedium:{
        fontFamily:'PoppinsMedium'
    },
    PoppinsRegular:{
        fontFamily:'PoppinsRegular'
    },
    ctr:{
        paddingLeft:RFPercentage(3),
        paddingRight:RFPercentage(3),
    },
    ctrLeft:{
        marginLeft:RFPercentage(3),
        
    },

    mt10: {
        marginTop: '10%'
    },
    mt5: {
        marginTop: '5%'
    },
    mt3: {
        marginTop: '3%'
    },
    mt2: {
        marginTop: '2%'
    },
    mt1: {
        marginTop: '1%'
    },
    mntp10: {
        marginTop: RFPercentage(-1)
    },
    mnt10: {
        marginTop: '-10%'
    },
    mnt5: {
        marginTop: -RFPercentage(5)
    },
    mnt3: {
        marginTop:-RFPercentage(3)
    },
    mnt2: {
        marginTop: -RFPercentage(2)
    },
    mnt1: {
        marginTop: -RFPercentage(1)
    },
    p5:{
        padding:RFPercentage(5)
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center', paddingBottom: '20%',paddingTop:'30%'
    },
    containerLeft: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center', paddingBottom: '20%', paddingTop: '10%', paddingLeft: '10%', paddingRight: '10%'
    },
    
logosmall: {
    width: 60,
    height: 20,
    resizeMode: 'stretch'
},
    logo: {
        width: 150,
        height: 30,
        resizeMode: 'stretch'
    },
    mainTitleHead: {
        fontSize: 26,
        fontFamily: 'PoppinsSemiBold',
        color: '#5e5e5e'
    },mainpara: {
        color: '#717171',
        fontFamily: 'PoppinsRegular',
        lineHeight: 20,
        fontSize: RFValue(13),
    
    },
    themeColor: {
        color: '#21c5df'
    }, themeBackColor: {
        backgroundColor: '#21c5df'
    
    }, themeColorwhite: {
        color: 'white'
    },
    themeColor1: {
        color: '#696969'
    }, themeBackColor1: {
        backgroundColor: '#696969'
    },
    maxWidth80: {
        maxWidth: '80%'
    },
    
buttonMain: {
    width: '100%',
    paddingTop: 4,
    paddingBottom: 4, borderRadius: 6,

},
border1: {
    borderWidth: 1,
    borderColor: "#21c5df",
},
textTr: {
    textTransform: 'none'
},
textInput: {
    width: '100%',
    height: 40,
    fontSize: 14,
    fontFamily: 'PoppinsRegular',
    backgroundColor: 'white',
    borderColor: 'white',
}, 
searchBarStyle:{borderRadius:4,elevation:2,fontSize:RFValue(12),marginTop:RFPercentage(2)},
searchBartilte:{fontSize:RFPercentage(1.8),fontFamily:'PoppinsRegular'},
mainTitleHead1: {
    fontSize: RFValue(22),
    fontFamily: 'PoppinsMedium',
    color: '#454545',
},

mainTitleHeadscreen: {
    fontSize: RFValue(26),
    fontFamily: 'PoppinsBold',
    color: '#454545',
},
productImage:{width:width/3,height:width/4.6,resizeMode:'stretch'},
productbtn:{flexDirection:'row',justifyContent:'space-between',width:width-RFPercentage(25)},
favcontainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingTop: 20,
    justifyContent:'space-between'
},
favbox: {
    flexBasis: 1000,
    height: width/1.85,
    width:width/2.3,
    marginTop: '12%',marginBottom:'-1%',backgroundColor:'#f8f8f8',borderRadius:10,paddingTop:10,
},favImage:{ width:width/2.7, height: width/3.7, resizeMode: 'stretch', margin: '5%', marginTop: '-5%' },
fabupd: {
   
    margin: 16,
    color:'white'
  },

});

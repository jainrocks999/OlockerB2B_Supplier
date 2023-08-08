import { StyleSheet } from 'react-native';
import colors from '../../component/colors';
import fontSize from '../fontSize';
export default StyleSheet.create({
    drawerContent: {
       // flex: 1,
       // paddingHorizontal:6
    },
    title: {
        fontFamily:'Montserrat-SemiBold',
        fontSize:fontSize.sixteen,
        width:'95%',
        color:colors.textColor
    },
    caption: {
        fontSize: fontSize.fourteen,
        fontFamily:'Montserrat-Regular',
        color:colors.textColor
    },
   
    drawer: {
        borderBottomWidth: 1,
        borderBottomColor: '#b6b8b6',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15, 
        justifyContent: 'space-between',
        height:40,
        
    },
    drawer1: {
        borderBottomWidth: 1,
        borderBottomColor: '#b6b8b6',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height:40,
        backgroundColor:'#EDEDEB'
    },
    iconView: {
        // width: 30,
        // height: 24,
       // backgroundColor: 'grey'
    },
    text: {
        marginLeft: 10,
        fontFamily:'Montserrat-SemiBold',
        fontSize:fontSize.fourteen,
        color:colors.textColor
    },
    icon: {
        width: 20,
        height: 20
    },
    profile: {
        marginLeft: 20,
        justifyContent: 'center',
    },
    bottom:{ 
        alignItems: 'center', 
        paddingVertical: 25, 
        backgroundColor: '#53b175' 
    },
    stop:{ 
        alignItems: 'center', 
        paddingVertical: 20
    },
    text1:{ 
        color: colors.white, 
        fontSize: fontSize.sixteen ,
        fontFamily:'Krdev016'
    },
    image:{ 
        height: 30, 
        width: 30 
    },
    row:{ 
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
        flex:1 
    },
    modal: {
        width: 320,
        height:172,
        borderRadius: 10,
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor:colors.white,
      },
      modal1:{
          width: '100%',
          borderWidth:1,
          backgroundColor:colors.bc,
          paddingVertical:5
        },
        modal2:{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            bottom:20,
            position:'absolute'
            },
        modaltext:{
            color: colors.white,
            fontSize: fontSize.twenty,
            fontWeight: 'bold',
            textAlign: 'center',
        },
      ModelBtntext: {
        color:colors.white,
        fontSize: fontSize.fefteen,
        alignSelf: 'center',
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
      },
      ModelMsgText: {
        width: '99%',
        color: colors.textColor,
        fontSize: fontSize.sixteen,
        textAlign: 'center',
        margin:10
      },
      ModelmsgView: {
        width: '99%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop:10
      },
      popup: {
        height: 40,
        width:100,
        marginTop: 10,
        backgroundColor:colors.bc,
        justifyContent: 'center',
        borderRadius: 4,
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal:10
      },
      main:{
        height:'22%',
        backgroundColor:colors.bc,
        flexDirection:'row',
        paddingHorizontal:20,
        justifyContent:'space-between',
        marginTop:-10
        // flex:1
       },
       main1:{
           flexDirection:'row',
           alignItems:'center',
        },
        img:{
            height:84,
            width:84,
            borderRadius:42
        },
        view:{
            marginLeft:20,
            width:'70%'
        }, 
        text2:{
            color:colors.white,
            fontFamily:'Montserrat-SemiBold',
            fontSize:fontSize.seventeen,
        },
        text3:{
            color:colors.white,
            fontSize:fontSize.fourteen,
            fontFamily:'Montserrat-Regular'
        }, 
        view1:{ 
            flexDirection: 'row',
            alignItems:'center'
         },
        view2:{ 
            flexDirection: 'row',
            alignItems:'center',
            justifyContent:'center'
         },
         camera:
         {
             width:28,
             height:28, 
             shadowColor:colors.black,
             shadowOpacity:0.25,
             shadowRadius:8,
             shadowOffset:{height:5,width:0},
             elevation:2,
             borderRadius:14,
             marginLeft:-25,
             marginTop:70,
             backgroundColor:colors.white,
             alignItems:'center',
             justifyContent:'center'
         }, 
         imageicon:{
             width:32,
             height:32
         } ,
         arrow:{
             width:28,height:28
         }
})
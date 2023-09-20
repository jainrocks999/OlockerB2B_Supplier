import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  text:{
      color:'#000',
      fontFamily:'Acephimere'
    }, dropdown: {
      marginVertical:10,
       height: 45,
       backgroundColor: '#f0f0f0',
       borderRadius:5,
       padding: 12,
       shadowColor: '#000',
       shadowOffset: {
         width: 0,
         height: 1,
       },
       shadowOpacity: 0.2,
       shadowRadius: 1.41,
   
       elevation: 2,
     },
    uploadView:{ 
      borderWidth: 1, 
      marginTop: 4, 
      height: 40, 
      borderRadius: 6, 
      borderColor: 'grey', 
      flexDirection:'row',
      alignItems:'center'
    },
    grey:{
      backgroundColor:'grey', 
      height: 40, 
      width:'30%',
      borderTopLeftRadius:6,
      borderBottomLeftRadius:6,
      alignItems:'center',
      justifyContent:'center'
    },
    multiline:{ 
      borderWidth: 1, 
      marginTop: 4, 
      borderRadius: 6, 
      borderColor: 'grey',
      height:100
  },
  input:{    
    paddingLeft: 10,
    fontSize: 14, 
    includeFontPadding: false, 
    padding: 0, 
    margin: 0,     
  } ,
   sView:{ 
    borderWidth: 1, 
    marginTop: 4, 
    height: 40, 
    borderRadius: 6, 
    borderColor: 'grey', 
    flexDirection:'row',
    alignItems:'center'
  },
  sTouch:{
    backgroundColor:'grey', 
    height: 40, 
    width:'30%',
    borderTopLeftRadius:6,
    borderBottomLeftRadius:6,
    alignItems:'center',
    justifyContent:'center'
  }
});

import { Dimensions, StyleSheet } from 'react-native';
import colors from '../colors';
export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor:'#032e63',
    alignItems: 'center',
    justifyContent: 'space-between',
     opacity: 50,
     paddingVertical:10,
     shadowColor:colors.black,
    shadowOpacity:10,
    shadowOffset:{height:4,width:2},
    elevation:3,
    borderTopWidth:3,
    borderTopColor:'#afb3b0'
    
  },

  itemSeperator: {
    borderBottomWidth: 0.5,
    borderColor: '#C1C1C1',
    width: '50%',
  },
  bottomTab: {
    tintColor: 'white',
    height: 25,
    width: 25,
  },
  bottomTab1: {
    height: 40,
    width: 40,
  },
  buttonText: {
    fontSize: 11,
    alignSelf: 'center',
    width: 90,
    padding: 4,
    textAlign: 'center',
  },
  text:{
    fontSize: 10,
    color:colors.textColor,
   // marginTop:5
  },
  container:{
    justifyContent: 'center', 
    alignItems: 'center'
  }
});

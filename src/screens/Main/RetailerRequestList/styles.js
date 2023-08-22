import React from 'react';
import {Platform, StyleSheet} from 'react-native';
export default StyleSheet.create({
  dropdown: {
   marginVertical:10,
    height: 45,
    backgroundColor: 'white',
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
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

searchbar:{
  borderWidth: 2,
  flexDirection:'row',
  justifyContent:'space-between',
  marginHorizontal: 8,
  borderColor: '#032E63',
  marginBottom: 20,
  paddingHorizontal: 20,
  borderRadius: 30,
  shadowColor: '#000',
  shadowOffset: {
    width: 10,
    height: 20,
  },
  shadowOpacity: 0.57,
  shadowRadius: 15.19,
},
  img: {
    height: 18,
    width: 12,
  },
  img1: {
    height: 20,
    width: 25,
  },
  img2: {
    height: 22,
    width: 26,
    tintColor: '#fff',
  },
  img3: {
    width: 34,
    height: 22,
    marginLeft: 15,
  },



  container: {
    width: '100%',
    backgroundColor: '#032e63',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    flexDirection: 'row',
    paddingVertical: 15,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  headertouch: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  

  row: {
    backgroundColor:'#032e63',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    width:'100%'
  },
  Subrow: {
   
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderColor:'#032e63',
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  cell: {
    color:'white',
    flex: 1,
    textAlign: 'center',
  fontWeight:'600'
  },
  Subcell: {
    color:'#000',
    flex: 1,
    textAlign: 'center',
  fontWeight:'700'
  },
  header: {
    alignItems:'center',justifyContent:'center',
    height: 50,
     backgroundColor: '#032e63'},

  text: {textAlign: 'center', fontWeight: '100'},
  dataWrapper: {marginTop: -2},
  row: {height: 40},
});

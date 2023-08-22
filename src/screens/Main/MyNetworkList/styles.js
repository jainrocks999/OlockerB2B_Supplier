import React from 'react';
import {Platform, StyleSheet} from 'react-native';
export default StyleSheet.create({
  

  header: {
    alignItems:'center',justifyContent:'center',
    height: 50,
     backgroundColor: '#032e63'},

  text: {textAlign: 'center', fontWeight: '100'},
  dataWrapper: {marginTop: -2},
  row: {height: 40},

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
});

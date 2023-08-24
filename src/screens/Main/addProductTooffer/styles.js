import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  btn: {
    borderWidth: 1,
    height: 35,
    width: 60,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#032E63',
  },
  txt: {
    color: '#fff',
  },
  circleBtn: {
    marginHorizontal:5,
    backgroundColor: '#032E63',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  Card:{
    borderRadius: 10,
    marginBottom:10,
    marginTop: 10,
    height: hp(60),
    marginHorizontal: 20,
    shadowColor: '#000',
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  
    elevation: 4,
  },
});

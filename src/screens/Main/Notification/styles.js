import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  addbtn: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 40,
    borderRadius: 20,
    width: '40%',
    marginTop: 15,
    backgroundColor: '#032e63',
  },
  search: {
    height: 50,
    paddingHorizontal: 10,
    marginTop: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

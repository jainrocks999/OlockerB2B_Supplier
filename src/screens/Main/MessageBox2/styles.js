import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
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
  searchbar: {
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  Usercard: {
    marginHorizontal: 10,
    flexDirection: 'row',
    padding: 5,
    backgroundColor:'white',

    height: 80,
    marginVertical: 2,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

import React from 'react';
import {Platform, StyleSheet} from 'react-native';
export default StyleSheet.create({
  bottomv: {
    marginBottom: 30,
    paddingHorizontal: 15,
  },
  Bimg: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 3,
    borderRadius: 15,
    width: 103,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
    marginHorizontal:Platform.OS=='android'?4:12,
  },
  Bt: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    marginBottom: 20,
    fontWeight: '700',
  },
  Bv: {
    bottom: 15,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Btt: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 3,
  },
});

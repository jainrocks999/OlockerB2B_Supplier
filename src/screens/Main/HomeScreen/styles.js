import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
export default StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#f0eeee',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#f0eeef',
  },
  imgback: {
    height: 260,
    width: '100%',
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
  text1: {
    color: '#c6e0ff',
    fontFamily: 'Roboto-Medium',
    marginLeft: 15,
  },
  text2: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'Roboto-Medium',
    marginLeft: 15,
  },
  main: {
    alignItems: 'center',
    height: 200,
    marginTop: -120,
  },
  itemview: {
    marginTop: 10,
    paddingHorizontal: 12,
  },
  itemview1: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text4: {
    marginLeft: 5,
    marginTop: 5,
    color: '#032e63',
    fontSize: 17,
    fontWeight: '700',
    fontStyle: 'italic',
    fontFamily: 'Roboto-Medium',
  },
  cardview: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 3,
    borderRadius: 10,
    width: 120,
    margin: 9,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    backgroundColor: '#fff',
  },
  cardimg: {
    height: 120,
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  middle1: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  card1: {
    
  },
  middle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  img4: {
    height: 100,
    width: 100,
  },
  textc: {
    fontSize: 16,
    marginTop: 6,
    color: '#032e63',
    fontFamily: 'Roboto-Medium',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  Gold: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Goldimg: {
    width: 35,
    height: 30,
    marginBottom: 2,
  },
  Goldview: {
    marginLeft: 7,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Goldt: {
    fontSize: 17,
    color: '#000',
    fontStyle: 'italic',
    fontFamily: 'Roboto-Medium',
    fontWeight: '700',
  },
  Goldtt: {
    color: '#032e63',
    fontSize: 17,
    fontStyle: 'italic',
    fontFamily: 'Roboto-Medium',
    fontWeight: '700',
  },
  touch: {
    paddingVertical: 4,
    paddingHorizontal: 14,
    backgroundColor: '#032e63',
    borderRadius: 12,
  },
  container: {
    width: '100%',
    backgroundColor: '#032e63',
    justifyContent: 'flex-end',
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
  bottomv: {
    marginBottom: 30,
    paddingHorizontal: 10,
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
    marginHorizontal:Platform.OS=='android'?6:12,
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
    
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:15,
    marginHorizontal:widthPercentageToDP(5)
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },

});

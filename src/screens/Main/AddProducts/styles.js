import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  dropdown: {
    marginTop: wp(2),
    height: hp(5.5),
    backgroundColor: 'white',
    borderRadius: wp(2),
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 3,
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
    fontSize: wp(4.5),
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: wp(4.5),
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: 'grey',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  Card: {
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    height: hp(81),
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
  img: {
    height: wp(4),
    width: wp(4),
  },
  img1: {
    height: wp(5.5),
    width: wp(6.5),
  },
  img2: {
    height: wp(5.5),
    width: wp(6.5),
    tintColor: '#fff',
  },
  img3: {
    width: wp(6),
    height: wp(5.5),
  },

  container: {
    width: '100%',
    backgroundColor: '#032e63',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 12,
    flexDirection: 'row',
    paddingVertical: wp(3),
    paddingHorizontal: wp(3),
  },
  text: {
    fontSize: wp(4),
    fontWeight: '700',
    color: 'white',
  },
  headertouch: {
    flexDirection: 'row',
    width: wp(20),
    // borderWidth: 1,
    justifyContent: 'space-between',
  },

  row: {
    backgroundColor: '#032e63',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    width: '100%',
  },
  Subrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderColor: '#032e63',
    borderColor: '#ccc',
    paddingVertical: 10,
    height: 60,
  },
  cell: {
    color: 'white',
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
  },
  Subcell: {
    color: '#000',
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
  },
  mrt: {marginHorizontal: wp(3), marginTop: wp(3.5)},
  text: {
    fontSize: wp(4),
    marginLeft: wp(1),
    fontWeight: '700',
    color: '#000',
  },
  btn: {
    borderWidth: wp(0.5),
    borderColor: '#032e63',

    width: '49%',
    height: hp(5.5),
    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt2: {fontSize: wp(4), fontWeight: '600', color: '#032e63'},
});

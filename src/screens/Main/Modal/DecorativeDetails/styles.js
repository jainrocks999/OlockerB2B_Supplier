import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  centeredView: {
    flex: 1,
    //justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 22,
  },

  modalView: {
    height: hp(85),
    width: wp(85),
    backgroundColor: 'white',
    alignSelf: 'center',
    elevation: 5,
    marginTop: wp(3),
    borderRadius: wp(2),
    paddingHorizontal: wp(4),
    paddingBottom: wp(6),
  },

  buttonOpen: {
    height: hp(5.5),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    //borderWidth: wp(0.6),
    marginTop: hp(3),
    width: wp(55),
    backgroundColor: '#032e63',
    borderRadius: wp(5),
  },
  buttonClose: {
    fontSize: wp(4.5),
    marginTop: hp(2),
    fontWeight: 'bold',
    color: 'black',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    width: wp(100),
    marginTop: hp(8),
  },
  dropdown: {
    marginVertical: 10,
    height: 45,
    backgroundColor: 'white',
    borderRadius: 5,
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
    flexDirection: 'row',
    width: wp(60),
  },
  textItem: {
    fontSize: wp(5),
    marginLeft: wp(2),
    fontWeight: 'bold',
    color: 'black',
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

  addbtn: {
    backgroundColor: '#032e63',
    alignSelf: 'center',
    width: '80%',
    height: 40,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 15,
  },
  container: {
    flex: 1,
  },

  crossbtn: {
    height: hp(5),
    width: hp(5),
    backgroundColor: '#032e63',
    borderRadius: wp(4.5),
    position: 'absolute',
    right: wp(4),
    top: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  xbtn: {
    color: 'white',
    fontSize: wp(5),
    fontWeight: 'bold',
  },
  deta: {
    fontSize: wp(3),
    fontWeight: 'bold',
    color: 'grey',
    textAlign: 'center',
  },
  inputFiled: {
    borderWidth: 1,
    height: hp(5.5),
    paddingLeft: wp(2),
    marginTop: wp(2),
    borderRadius: wp(2),
  },
  cartItem: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: wp(4),
    width: '65%',
    marginTop: wp(1),
  },
  dot: {
    width: '10%',
    color: 'grey',
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  editdelete: {
    flexDirection: 'row',
    position: 'absolute',
    right: wp(1),
    top: wp(2),
    width: '17%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

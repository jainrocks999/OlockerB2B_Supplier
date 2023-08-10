import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  
  centeredView: {
    flex: 1,
    justifyContent: 'center',
   // alignItems: 'center',
    marginTop: 22,
    
  },
  Card: {
    marginTop: 15,
    borderWidth:1,
    borderColor: '#bacae3',
    height: hp(22),
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 8,
    width:'100%'
  //  backgroundColor: '#f0f0f0',
  },
  modalView: {
    margin: 20,
   

    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal:15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

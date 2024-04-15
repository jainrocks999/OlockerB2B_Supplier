import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Loader';
import {useNavigation} from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();
  const dispatch=useDispatch();
  const selector3 =useSelector(state=>state.Home?.partnerData?.partnerdetails)
  const removeRetailer = async(item) => {
    console.log('logfff.....',item);
    const userId = await AsyncStorage.getItem('user_id');
    dispatch({
      type: 'remove_retailerfromnetwork_Request',
      url: 'removepartner',
      // SupplierSrNo: userId,
      partner_id: selector3.SrNo,
   user:userId,
   navigation,
      reatailer:true,
    });
  };

  return (
    <View>
      {selector3.isAdd == 0 ?null:
    <View style={{
      backgroundColor: '#fff',
      paddingVertical: 30,
      paddingHorizontal: 15,
    }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 0,
          width: '33%',
        }}>
        <View style={{ width: '100%' }}>
          <Text
            style={{
              fontSize: 14,
              width: '100%',
              color: '#3e3e3e',
              fontFamily: 'Acephimere',
            }}>
            {'Remove from network'}
          </Text>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>

          <TouchableOpacity
            onPress={() => removeRetailer()}
            style={{
              borderColor: '#e9056b',
              paddingHorizontal: 18,
              paddingVertical: 6,
              borderRadius: 8,
              borderWidth: 1,
            }}>
            <Text
              style={{
                color: '#e9056b',
                fontFamily: 'Acephimere',
                fontSize: 12,
              }}>
              {'REMOVE'}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
}
    </View>
  );
};
export default Settings;

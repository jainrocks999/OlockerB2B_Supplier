import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Loader';
import {useNavigation} from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: '#fff',
        paddingVertical: 20,
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
        <View style={{width: '100%'}}>
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
          style={{flexDirection: 'row', alignItems: 'center', marginLeft: 20}}>
          <TouchableOpacity
            // onPress={()=>deteleApi(selector.Profile.SrNo,)}
            style={{
              borderColor: '#e9056b',
              paddingHorizontal: 20,
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
  );
};
export default Settings;

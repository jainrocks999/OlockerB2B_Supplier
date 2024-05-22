import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import style from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../../components/Loader';
import Toast from "react-native-simple-toast";

export default function ChangePassword() {
  const [inputs, setInputs] = useState({
    visible: true,
    visible1: true,
    visible2: true,
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const dispatch = useDispatch();
const navigation =useNavigation()
const isFetching =useSelector(state=>state.Supplier?.isFetching)
  const handleInputs = (key, value) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const ChangePass = async () => {
    console.log('data ,,,,,', inputs);
    if(inputs.oldPassword==''){
       Toast.show('Please enter old password')
    }
    else if(inputs.newPassword==''){
      Toast.show('Please enter new password')
    }
    else if(inputs.confirmPassword==''){
      Toast.show('Please enter confirm password')
    }
    else if(inputs.newPassword != inputs.confirmPassword){
    
      Toast.show('New password and confirm password need to be same')
    }
    else{
    const user_id = await AsyncStorage.getItem('user_id');
    dispatch({
      type: 'Get_changePassword_Request',
      url: '/changePassword',
      userid: user_id,
      oldpass: inputs.oldPassword,
      newPassword: inputs.newPassword,
      cnPass: inputs.confirmPassword,
      navigation,
    });
    }
}
return (
  <View style={{ flex: 1 }}>
    <View
      style={{
        height: 50,
        backgroundColor: '#032e63',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <TouchableOpacity style={{ marginLeft: 10 }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image
          source={require('../../../assets/L.png')}
          style={{ height: 20, width: 20 }}
        />
      </TouchableOpacity>
      <View>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            marginLeft: 20,
            fontWeight: '500',
          }}>
          Change Password
        </Text>
      </View>
    </View>
    <ScrollView>
      {isFetching?<Loading/>:null}
      <View>
        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#000',
              marginTop: 20,
            }}>
            Create new Password
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              width: '90%',
              marginTop: 8, color: 'grey'
            }}>
            Your new password must be different from previous used passwords.
          </Text>
        </View>

        <View style={{ marginHorizontal: 20, marginTop: 30 }}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#000' }}>
            Old Password
          </Text>
          <View
            style={[
              style.input,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}>
            <TextInput
              placeholder="Old password"
              placeholderTextColor={'grey'}
              value={inputs.oldPassword}
              onChangeText={(val => handleInputs('oldPassword', val))}
              style={{ width: '90%', color: '#000' }}
              secureTextEntry={inputs.visible}

            />

            {inputs.visible ?
              <TouchableOpacity
                onPress={() => handleInputs('visible', !inputs.visible)}>
                <Ionicons name="eye-off-outline" size={25} color={'#000'} />
              </TouchableOpacity> :
              <TouchableOpacity onPress={() => handleInputs('visible', !inputs.visible)}>
                <Ionicons name="eye-outline" size={25} color={'#000'} />
              </TouchableOpacity>
            }
          </View>
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 15 }}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#000'}}>
            New Password
          </Text>
          <View
            style={[
              style.input,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}>
            <TextInput
              placeholder="New password"
              value={inputs.newPassword}
              onChangeText={(val => handleInputs('newPassword', val))}
              secureTextEntry={inputs.visible1}
              placeholderTextColor={'grey'}
              style={{ width: '90%', color: '#000' }}
            />

            {inputs.visible1 ?
              <TouchableOpacity
                onPress={() => handleInputs('visible1', !inputs.visible1)}>
                <Ionicons name="eye-off-outline" size={25} color={'#000'} />
              </TouchableOpacity> :
              <TouchableOpacity onPress={() => handleInputs('visible1', !inputs.visible1)}>
                <Ionicons name="eye-outline" size={25} color={'#000'} />
              </TouchableOpacity>
            }
          </View>
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 15 }}>
          <Text style={{fontSize: 15, fontWeight: '600', color: '#000'}}>
            Confirm Password
          </Text>
          <View style={[
            style.input,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}>
            <TextInput placeholder="Confirm password"
              value={inputs.confirmPassword}
              onChangeText={(val => handleInputs('confirmPassword', val))}
              secureTextEntry={inputs.visible2}
              placeholderTextColor={'grey'}
              style={{ width: '90%', color: '#000' }}
            />
            {inputs.visible2 ?
              <TouchableOpacity
                onPress={() => handleInputs('visible2', !inputs.visible2)}>
                <Ionicons name="eye-off-outline" size={25} color={'#000'} />
              </TouchableOpacity> :
              <TouchableOpacity onPress={() => handleInputs('visible2', !inputs.visible2)}>
                <Ionicons name="eye-outline" size={25} color={'#000'} />
              </TouchableOpacity>
            }
          </View>
        </View>
        <View style={{ marginTop: 30, marginHorizontal: 20 }}>
          <TouchableOpacity onPress={() => ChangePass()}
            style={{
              backgroundColor: '#032e63',
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              borderRadius: 10,
            }}>
            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 18 }}>
              Reset Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  </View>
);
}

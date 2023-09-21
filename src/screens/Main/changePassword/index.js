import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import React from 'react';
import style from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function ChangePassword() {

  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 50,
          backgroundColor: '#032e63',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity style={{marginLeft: 10}}  
        onPress={()=>{
          navigation.goBack();
        }}
        >
          <Image
            source={require('../../../assets/L.png')}
            style={{height: 20, width: 20}}
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

      <View>
        <View style={{marginHorizontal: 20}}>
          <Text
            style={{
              fontSize: 26,
              fontWeight: '800',

              color: '#000',
              marginTop: 40,
            }}>
            Create new Password
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              width: '90%',
              marginTop: 15,
            }}>
            Your new password must be different from previous used passwords.
          </Text>
        </View>

        <View style={{marginHorizontal: 20, marginTop: 30}}>
          <Text style={{fontSize: 18, fontWeight: '600', color: '#000'}}>
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
              style={{width: '90%'}}
              secureTextEntry={true}
            />
            <TouchableOpacity>
              <Ionicons name="eye-outline" size={25} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginHorizontal: 20, marginTop: 30}}>
          <Text style={{fontSize: 18, fontWeight: '600', color: '#000'}}>
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
              secureTextEntry={true}
              style={{width: '90%'}}
            />
            <TouchableOpacity>
              <Ionicons name="eye-outline" size={25} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginHorizontal: 20, marginTop: 30}}>
          <Text style={{fontSize: 18, fontWeight: '600', color: '#000'}}>
            Confirm Password
          </Text>
          <View style={style.input}>
            <TextInput placeholder="Confirm password" secureTextEntry={true} />
          </View>
        </View>
        <View style={{marginTop: 30, marginHorizontal: 20}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#032e63',
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              borderRadius: 10,
            }}>
            <Text style={{color: '#fff', fontWeight: '600', fontSize: 18}}>
              Reset Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

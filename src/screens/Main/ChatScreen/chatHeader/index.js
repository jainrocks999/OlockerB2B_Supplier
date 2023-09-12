import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function ChatHeader({...props}) {

  const navigation = useNavigation();
  return (
    <View style={{}}>
      <View
        style={{

          flexDirection: 'row',
          paddingVertical: 10,
          backgroundColor: '#032e63',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity
          onPress={()=>{
            navigation.goBack();
          }} >
          <Image
            style={{height: 24, width: 15}}
            source={require('../../../../assets/L.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
        <View  style={{height: 45, width: 45, borderRadius: 22.5, marginLeft: 20,
                  backgroundColor:'#f0f0f0',
                  alignItems:'center',justifyContent:'center'}}

                  >
                  <Text
                  
                   
                  > {props.name[0]}</Text>
                </View>
          
        </TouchableOpacity>
        <View style={{marginLeft: 20}}>
          <Text style={{fontSize: 18, fontWeight: '600', color: '#fff'}}>
            {props.name}
          </Text>
        </View>
      </View>
    </View>
  );
}

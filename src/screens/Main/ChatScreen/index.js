import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import ChatHeader from './chatHeader';
import {useRoute} from '@react-navigation/native';
import ChatScreen2 from './chatUi';

export default function ChatScreen() {
  const route = useRoute();
  const item = route.params?.item;
  console.log('item',item);
  return (
    <View style={{flex: 1}}>
      <ChatHeader name={item.CompanyName} />
      <View style={{flex: 1}}>
        <ChatScreen2 data={item} />
      </View>
    </View>
  );
}

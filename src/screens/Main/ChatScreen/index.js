import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ChatHeader from './chatHeader'
import { useRoute } from '@react-navigation/native';
import ChatScreen2 from './chatUi';

export default function ChatScreen() {

  const route = useRoute();
	const receivedData = route.params?.uri;
	const name = route.params?.name;
  
  return (
    <View style={{flex:1}}>
     
      <ChatHeader  img={receivedData} name={name}/>
      <View style={{flex:1}}>

     <ChatScreen2 />
      </View>
   
 
    </View>
  )
}
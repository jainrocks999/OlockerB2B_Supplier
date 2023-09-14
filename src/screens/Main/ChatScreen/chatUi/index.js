import {View, TouchableOpacity, ScrollView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useState, useCallback, useEffect} from 'react';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

const ChatScreen2 = ({...props}) => {

  const SendMessages = useSelector(state => state.Chat.MessageSend);
  const [messages, setMessages] = useState(SendMessages);
const dispatch = useDispatch();
  
  const navigation = useNavigation();
  const user_id =  AsyncStorage.getItem('user_id');
console.log('=>>>>>>>>>>>>>>>>>>>>>>>',props.data.contact_id);
  // data.map(item => {


    // messages.push({
    //   _id: item.id,
    //   createdAt: item.CreateDate,
    //  text: item.message,
    //   user: {
    //     _id: item.fromUser,
    //   },
    //   status:item.status
    // });
 
// });
const isFocused = useIsFocused();
useEffect(()=>{
GetMessage();
},[isFocused])


const GetMessage =()=>{
  
  dispatch({
    type: 'get_Message_Request',
    url: '/getMessage',
    senderId: user_id,
    reciverid:props.data.contact_id
  });
}
  const onSend = async(msg) => {
let message = await msg[0].text
const Token = await AsyncStorage.getItem('loginToken')
    dispatch({
      type: 'Message_Send_Request',
      url: '/chatSupplierToPartner',
      senderId: user_id,
      reciverId:props.data.contact_id,
      message:message,
      token:Token
    });
  

  }

  const renderActions = useCallback(() => {
    return (
      <TouchableOpacity
        onPress={() => {
          setVisiable(true);
        }}
        style={{paddingBottom: 8, marginLeft: 5, height: 40, width: 40}}>
        <Entypo name="emoji-happy" size={32} color={'#333'} />
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#f0f0f0'}}>
    
    <GiftedChat
        messages={messages}
        alwaysShowSend={true}
        onSend={onSend}
        user={{
          id: 763,
          name: 'React Native',
         
        }}
        textInputStyle={{
          backgroundColor: '#e1e3e3',
          borderRadius: 10,
          paddingHorizontal: 10,
          marginTop: 5,
          borderColor: 'grey',
        }}
        renderActions={renderActions}
        renderInputToolbar={props => {
          return (
            <InputToolbar
              containerStyle={{
                backgroundColor: '#f6f6f6',
              }}
              {...props}
            />
          );
        }}
        renderSend={props => {
          return (
            <View
              style={{
                paddingVertical: 2,
                alignItems: 'center',
                width: '30%',
                paddingHorizontal: 10,
                justifyContent: 'space-evenly',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{width: '35%'}}
                onPress={() => {
                  openCamera();
                }}>
                <Feather name="camera" size={28} color={'#000'} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{width: '35%'}}
                onPress={() => {
                  navigation.navigate('Audio');
                }}>
                <Feather name="mic" size={28} color={'#000'} />
              </TouchableOpacity>
              <View style={{width: '30%'}}>
                <Send {...props}>
                  <Ionicons
                    name="ios-send"
                    size={30}
                    color={'#4282eb'}
                    style={{marginBottom: 6}}
                  />
                </Send>
              </View>
            </View>
          );
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: 'white',
                },
                left: {
                  color: 'white',
                },
              }}
              timeTextStyle={{
                left: {
                  color: 'white',
                },
                right: {
                  color: 'white',
                },
              }}
              wrapperStyle={{
                right: {
                  maxWidth: '100%',
                  backgroundColor: '#032e63',
                  borderRadius: 5,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,

                  elevation: 3,
                },
                left: {
                  maxWidth: '100%',
                  backgroundColor: '#032e63',
                  borderRadius: 5,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,

                  elevation: 3,
                },
              }}
            />
          );
        }}
      /> 
    </View>
  );
};
export default ChatScreen2;
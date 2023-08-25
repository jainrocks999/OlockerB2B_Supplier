import {View, TouchableOpacity, ScrollView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useState, useCallback, useEffect} from 'react';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import {useNavigation, useRoute} from '@react-navigation/native';

const ChatScreen2 = () => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const receivedData = route.params?.uri;

  const navigation = useNavigation();
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),

        user: {
          _id: 1,
          name: 'React Native',
          avatar: receivedData,
        },
      },
      {
        _id: 1,
        text: 'Hello ',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: receivedData,
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

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
          id: 1,
          name: 'React Native',
          avatar:
            'data:image/jpeg;base64,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',
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

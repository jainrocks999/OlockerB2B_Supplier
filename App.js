import React, {useEffect,Fragment} from 'react';
import {LogBox, Platform, SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import Store from './src/Redux/Store';
import RootApp from './src/navigation';
import StatusBar from './src/components/StatusBar';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetMessageCommon} from './src/screens/Main/ChatScreen/common';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  const initializeNotifications = () => {
    PushNotification.deleteChannel('default-channel-id');
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id', // (required)
        channelName: 'My channel', // (required)
        soundName: 'notification.mp3', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        playSound: true,
      },
      created => console.log(`Notification channel created '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.configure({
      onRegister: function (token) {
             console.log("TOKEN: virendra", token);
             AsyncStorage.setItem('Tokenfcm',token.token)
           },

      onNotification: function (notification) {
        if (notification.userInteraction) {
          if (notification.data.toScreen) {
          }
        } else {
          PushNotification.localNotification({
            allowWhileIdle: true,
            ignoreInForeground: false,
            title: notification.title,
            // message: notification.title,
            soundName: 'notification.mp3',
            visibility: 'public',
            channelId: 'default',
            playSound: true,
          });
           GetMessageCommon(notification?.data?.id, 'partner');
          console.log('notification ,android',notification,notification.data.title);
        }
      },
    });

    if (Platform.OS === 'ios') {
      messaging().onMessage(async remoteMessage => {
        PushNotificationIOS.presentLocalNotification({
          alertTitle: remoteMessage?.notification?.title || '',
          alertBody: remoteMessage?.notification?.body || '',
          userInfo: remoteMessage.data,
          isSilent: false,
          applicationIconBadgeNumber: 0,
        });
      });
    }
  };

  useEffect(() => {

    initializeNotifications();
  
  }, [])


  return (
    <Fragment>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: Platform.OS == 'ios' ? '#052a47' : '#fff',
          }}>
          <Provider store={Store}>
            <RootApp />
          </Provider>
          <StatusBar />
        </SafeAreaView>
      </GestureHandlerRootView>
    </Fragment>
  );
};

export default App;

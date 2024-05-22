import React, { useEffect, Fragment } from 'react';
import { Alert, LogBox, Platform, SafeAreaView,StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Store from './src/Redux/Store';
import RootApp from './src/navigation';
// import StatusBar from './src/components/StatusBar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetMessageCommon } from './src/screens/Main/ChatScreen/common';
import * as RootNavigation from "./src/navigation/RootNavigation";

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();


PushNotification.createChannel(
  {
    channelId: "default-channel-id",
    channelName: "My channel",
    vibrate: true,
  },
  (created) => console.log(`createChannel returned '${created}'`)
);

const App = () => {

  const manageLogin = async (data1) => {
    const user_id = await AsyncStorage.getItem('loginToken')
    if (user_id == null) {
      console.log('this is working null');
      RootNavigation.push('Login')
    } else if (user_id) {
      console.log('this is working');
      RootNavigation.push('ChatScreen',{
        item:data1
      })
    }
  }

  const invitationRequest = async () => {
    const user_id = await AsyncStorage.getItem('loginToken')
    console.log('this is working');
    if (user_id == null) {
      console.log('this is working null');
      RootNavigation.push('Login')
    } else if (user_id) {
      console.log('this is working');
      RootNavigation.push('PendingRequest',{
        partnerSrNo:''
       })
    }
  }

  const requestAccept = async () => {
    const user_id = await AsyncStorage.getItem('loginToken')
    if (user_id == null) {
      console.log('this is working null');
      RootNavigation.push('Login')
    } else if (user_id) {
      console.log('this is working');
      RootNavigation.push('MyNetworks1')
    }
  }

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
        AsyncStorage.setItem('Tokenfcm', token.token)
      },

      onNotification: function (notification) {
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
        let obj=notification?.data
        if (notification.userInteraction === true && notification.foreground == false && notification.message == 'New Message From Partner') {
          manageLogin(obj)
        }
        else if (notification.userInteraction == true && notification.foreground == true && notification.message == 'New Message From Partner') {
          manageLogin(obj)
        }
        else if (notification.userInteraction == true && notification.foreground == false && notification.message == 'New Invitation Request') {
          invitationRequest()
        }
        else if (notification.userInteraction == true && notification.foreground == true && notification.message == 'New Invitation Request') {
          invitationRequest()
        }
        // else if (notification.userInteraction == false && notification.foreground == true && notification.message == 'New Invitation Request') {
        //   invitationRequest()
        // }
        else if (notification.userInteraction == true && notification.foreground == false && notification.message == 'Request Accepted') {
          requestAccept()
        }
        else if (notification.userInteraction == true && notification.foreground == true && notification.message == 'Request Accepted') {
          requestAccept()
        }
        // else if (notification.userInteraction == false && notification.foreground == true && notification.message == 'Request Accepted') {
        //   requestAccept()
        // }
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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: Platform.OS == 'ios' ? '#052a47' : '#fff',
          }}>
          <Provider store={Store}>
            <RootApp />
          </Provider>
          <StatusBar
            backgroundColor={"#032e63"}
            barStyle={"light-content"}
          />
        </SafeAreaView>
      </GestureHandlerRootView>
    </Fragment>
  );
};

export default App;

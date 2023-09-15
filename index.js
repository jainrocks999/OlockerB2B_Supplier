/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import { GetMessageCommon } from './src/screens/Main/ChatScreen/common';

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//  // console.log('Message the background!',remoteMessage.notification.title);
//  GetMessageCommon(remoteMessage.notification.title)
  
// });
// messaging().getInitialNotification(async remoteMessage => {
//   GetMessageCommon(remoteMessage.notification.title)
//   // console.log('Message  the clean mode!' ,remoteMessage);
// });

messaging().onMessage(async remoteMessage => {
  // console.log('Message onscreen',remoteMessage);
  GetMessageCommon(remoteMessage.notification.title)
});
AppRegistry.registerComponent(appName, () => App);

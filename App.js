import React, {Fragment, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  LogBox,
  Button,
  Platform,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {Provider} from 'react-redux';
import Store from './src/Redux/Store';
import RootApp from './src/navigation';
import StatusBar from './src/components/StatusBar';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
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

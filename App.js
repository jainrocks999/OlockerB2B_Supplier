import React, {Fragment,  useState} from 'react';
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
      {/* <SafeAreaView style={{backgroundColor:Platform.OS=='ios'?'#032e63':'#fff'}}/> */}
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

// import RNPickerSelect from 'react-native-picker-select';
// import {View} from 'react-native';
// const Dropdown = () => {
//   return (
//     <View style={{}}>
//       <RNPickerSelect
//         items={Status}
//         style={{
//           inputAndroid: {
//             color: '#474747',
//             width: '100%',
//             fontSize: 14,
//             marginBottom: -1,
//             fontFamily: 'Acephimere',
//           },
//           inputIOS: {
//             color: '#474747',
//             width: '100%',
//             fontSize: 14,
//             marginBottom: -1,
//             fontFamily: 'Acephimere',
//           },
//           placeholder: {
//             color: '#474747',
//             width: '100%',
//             alignSelf: 'center',
//             fontFamily: 'Acephimere',
//           },
//         }}
//         value={Status}
//         useNativeAndroidPickerStyle={false}
//         placeholder={{label: 'Select', value: ''}}
//         onValueChange={val => console.log('value', val)}
//       />
//     </View>
//   );
// };
// export default Dropdown;
// const Status = [
//   {label: 'Active', value: 'true'},
//   {label: 'In Active', value: 'false'},
// ];

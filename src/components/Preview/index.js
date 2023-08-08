// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Platform,
// } from 'react-native';

// const Preview = ({
//   style,
//   item,
//   imageKey,
//   onPress,
//   index,
//   active,
//   local,
// }) => {
//   return (
//       <View style={{alignItems:'center',justifyContent:'center'}}>
//     <TouchableOpacity
//       style={[styles.videoContainer]}
//       onPress={() => onPress(item)}>
//       <View style={[styles.imageContainer, styles.shadow]}>
//         <Image
//           style={[styles.videoPreview, 
//             active ? {height:240,width:240,borderRadius:120} : 
//             {height: 120,width:120,borderRadius:60}
//         ]}
//           source={{uri: item[imageKey]}}
//         />
//       </View>
//     </TouchableOpacity>
//     </View>
//   );
// };
// export default Preview
// const styles = StyleSheet.create({
//   videoContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   videoPreview: {
//     width: 275,
//     borderRadius: 8,
//   },
//   desc: {
//     fontSize: 14,
//     letterSpacing: 0,
//     lineHeight: 24,
//     marginTop: 18,
//   },
//   imageContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   shadow: {
//     ...Platform.select({
//       ios: {
//         shadowColor: 'black',
//         shadowOffset: {width: 0, height: 1},
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
// });
// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Platform,
// } from 'react-native';

// const Preview = ({
//   style,
//   item,
//   imageKey,
//   onPress,
//   index,
//   active,
//   local,
// }) => {
//   return (
//       <View style={{alignItems:'center',justifyContent:'center',borderRadius:110}}>
//     <TouchableOpacity
//       // onPress={() => onPress(item)}
//       >
//       <View style={[styles.imageContainer]}>
//         <Image
//       //    style={[styles.videoPreview, 
//       //     active ? {height: 180,width:300,borderRadius:15}:
//       //      {height:100,width:300,borderRadius:15} 
         
//       // ]}
//           style={{height:180,width:300,borderRadius:15}}
//           source={{uri: item[imageKey]}}
//         />
//       </View>
//     </TouchableOpacity>
//     </View>
//   );
// };
// export default Preview
// const styles = StyleSheet.create({
  
//   imageContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius:110
//   },
//   shadow: {
//     ...Platform.select({
//       ios: {
//         shadowColor: 'black',
//         shadowOffset: {width: 0, height: 1},
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
// });
// 

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';

const Preview = ({
  style,
  item,
  imageKey,
  onPress,
  index,
  active,
  local,
}) => {
  const BannerWidth = (Dimensions.get('window').width * 15) / 18;
  const BannerHeight = 180;
  return (
      <View style={{alignItems:'center',justifyContent:'center',borderRadius:15}}>
    <TouchableOpacity
      // onPress={() => onPress(item)}
      >
      <View style={[styles.imageContainer]}>
        <Image
          style={{height:190,width:BannerWidth,borderRadius:190}}
          source={{uri: item[imageKey]}}
          resizeMode={Platform.OS=='android'?'contain':''}
        />
      </View>
    </TouchableOpacity>
    </View>
  );
};
export default Preview
const styles = StyleSheet.create({
  
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:15,
    height:200,
    width:'100%'
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
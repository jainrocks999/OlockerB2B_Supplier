import React from 'react';
import FastImage from 'react-native-fast-image'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from 'react-native-responsive-screen';

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
     
      <View style={{height:hp(25),width:wp(95),marginHorizontal:wp(2.5)}}>
        <FastImage
        resizeMode='stretch'
          style={{height:'100%',borderRadius:15,borderWidth:1,width:'100%'}}
          source={{uri: `https://olocker.co${item.ImageUrl}${item.ImageName}`}}
        />
      </View>
   
  );
};
export default Preview
const styles = StyleSheet.create({
  
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:15
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
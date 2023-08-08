import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Header = ({
  title,
  source,
  onPress,
  source1,
  source2,
  onPress1,
  onPress2,
}) => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {source?<TouchableOpacity
            // style={{paddingVertical:15, width: 35,alignItems:'center',justifyContent:'center',marginLeft:-15}}
            delayPressIn={0}
            onPress={() => navigation.goBack()}>
            <Image style={styles.img} source={source} />
          </TouchableOpacity>:null}
          <Text style={[styles.text, {marginLeft: 15}]}>{title}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center',justifyContent:'center'}}>
          <TouchableOpacity onPress={onPress1}>
            <Image style={styles.img1} source={source1} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPress2}
          style={{marginLeft: 0}}>
            <Image style={styles.img2} source={source2} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#f0eeee',
  },
  img: {
    height: 24, width: 15
  },
  img1: {
    height: 24, width: 28,
  },
  img2: {
    height: 22, width: 26, tintColor: '#fff', marginLeft: 15

  },
  // img1: {
  //   height: 20,
  //   width: 25,
  // },
  // img2: {
  //   height: 26,
  //   width: 22,
  // },
  container: {
    // width: '100%',
    // backgroundColor: '#032e63',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // paddingHorizontal: 12,
    // flexDirection: 'row',
    // paddingVertical: 1,
    backgroundColor: '#032e63',
    height: 50,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontFamily:'Roboto-Medium'
  },
});

{/* <Image style={{ height: 24, width: 28, }} source={require('../../../assets/Fo.png')} />
<Image style={{ height: 22, width: 26, tintColor: '#fff', marginLeft: 15 }} source={require('../../../assets/Image/dil.png')} />
<Image style={{ height: 24, width: 28, tintColor: "#fff", marginLeft: 15 }} source={require('../../../assets/supplierImage/more.png')} /> */}

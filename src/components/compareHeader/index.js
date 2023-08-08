import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../colors';
import fontSize from '../fontSize';
import * as Root from '../../navigator/rootNavigation';
const Header = ({title, onPress1, titleTwo, source, onPress}) => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.main}>
        <TouchableOpacity delayPressIn={0} onPress={onPress}>
          <Image
            style={{height: 35, width: 35, tintColor: colors.white}}
            source={source}
          />
        </TouchableOpacity>
        <View style={styles.view}>
          <Text style={styles.text}>{title} </Text>
        </View>
        {titleTwo ? (
          <TouchableOpacity
            delayPressIn={0}
            onPress={onPress1}
            style={styles.squareView}>
            <Text
              style={{
                fontSize: fontSize.eleven,
                color: colors.bc,
                // fontFamily: 'Montserrat-Regular',
              }}>
              {titleTwo}
            </Text>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  main: {
    width: '100%',
    backgroundColor:'#052a47',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  drawer: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
  text: {
    color: colors.white,
    fontSize: fontSize.eighteen,
    //fontFamily: 'Montserrat-SemiBold',
    marginRight: 10,
  },
  view: {
    marginLeft: 15,
  },
  squareView: {
    height: 30,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
});

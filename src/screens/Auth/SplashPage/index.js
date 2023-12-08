import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
const Splash = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const unmemory = setInterval(() => {}, 3000);
    return () => {
      clearInterval(unmemory);
    };
  }, []);

  useEffect(() => {
    initial();
  }, []);

  const initial = async () => {
    let Token = await AsyncStorage.getItem('loginToken');
    dispatch({
      type: 'Banner_List_Request',
      url: '/getBannerList',
    });

    if (!Token) {
      setTimeout(() => navigation.replace('Login'), 2000);
    } else {
      setTimeout(() => navigation.replace('Home'), 2000);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Image
          style={styles.image}
          source={require('../../../assets/ol.png')}
        />
      </View>
    </View>
  );
};
export default Splash;

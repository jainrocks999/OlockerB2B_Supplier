import React, {useEffect} from 'react';
import {View, Image,PermissionsAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
const Splash = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();



  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Olocker Notification Permission',
          message:
            'Olocker would like to send you push notifications ' +
            'to keep you updated on the latest photo trends and app features.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Don’t Allow',
          buttonPositive: 'Allow',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      }
      console.log('this', granted);
    } catch (err) {
      console.warn(err);
    }
  };







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

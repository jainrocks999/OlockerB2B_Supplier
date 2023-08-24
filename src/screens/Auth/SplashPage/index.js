import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";
const Splash = () => {
  const navigation = useNavigation();
  const dispatch=useDispatch();

  useEffect(() => {
    const unmemory = setInterval(() => {}, 3000);
    console.log('vireddfdffffggggegeg', unmemory);
    return () => {
      clearInterval(unmemory);
      console.log('vireddfdffffggggegeg23244', unmemory);
    };
  },[]);
  
  useEffect(() => {
    initial();
  }, []);

  const initial = async () => {
    // setTimeout(() => navigation.replace('Login'), 2000);
    let Token = await AsyncStorage.getItem('loginToken');
    dispatch({
      type:'Banner_List_Request',
      url:'/getBannerList'
    })
    console.log('Login Before app run by print Token', Token);

    if (!Token) {
      setTimeout(() => navigation.replace('Login'), 2000);
    } else {
      //  if(SubscribeDetails.exp_date >= currentDate){
      setTimeout(() => navigation.replace('Home'), 2000);
      console.log('ets worikkdgj');
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

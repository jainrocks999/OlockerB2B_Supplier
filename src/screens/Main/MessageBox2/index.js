import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Loader from '../../../components/Loader';
import {TextInput} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';

const MessageBox2 = () => {
  const navigation = useNavigation();
  const selector = useSelector(state => state.Chat.patnerContact);
  const isFetching = useSelector(state => state.Chat.isFetching);
  const isFoucse = useIsFocused();
  useEffect(() => {
    manageBusiness();
  }, [isFoucse]);

  const dispatch = useDispatch();
  const manageBusiness = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    dispatch({
      type: 'Patner_Contact_Request',
      url: '/getContactPartner',
      id: parseInt(user_id),
    });
  };
  

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {isFetching ? <Loader /> : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              delayPressIn={0}
              onPress={() => navigation.goBack()}>
              <Image
                style={styles.img}
                source={require('../../../assets/L.png')}
              />
            </TouchableOpacity>
            <Text style={[styles.text, {marginLeft: 15}]}>Message Box</Text>
          </View>
          <View style={styles.headertouch}>
            <TouchableOpacity
              style={{marginLeft: 15}}
              onPress={() => handleWishList()}>
              <Image
                style={styles.img2}
                source={require('../../../assets/Image/dil.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Logout()}>
              <Image
                style={styles.img3}
                resizeMode="contain"
                source={require('../../../assets/Image/menu-icon.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{height: 80, marginTop: 15}}>
          {
            <FlatList
              data={selector}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ChatScreen', {item: item});
                    }}
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: 30,
                      backgroundColor: '#f0f0f0',
                      borderWidth: 1,
                      margin: 7,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: 22, fontWeight: '700'}}>
                      {item.conatct_name[0]}
                    </Text>
                    <View
                      style={{
                        backgroundColor: '#30fc3a',
                        height: 15,
                        width: 15,
                        borderWidth: 1,
                        position: 'absolute',
                        bottom: 2,
                        right: 2,
                        borderRadius: 7.5,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          }
        </View>
        <View style={[styles.searchbar, {marginTop: 20}]}>
          <TextInput placeholder="Search Business" style={{fontSize: 18}} />
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Feather name="search" size={30} />
          </View>
        </View>
        <View>
          <FlatList
            data={selector}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ChatScreen', {item: item});
                }}
                style={styles.Usercard}>
                <View
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 30,
                    backgroundColor: '#f0f0f0',
                    marginRight: 10,
                    marginTop: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text> {item.conatct_name[0]}</Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    width: '65%',
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{fontSize: 18, fontWeight: '800', color: '#000'}}>
                    {item.conatct_name}
                  </Text>
                  <Text>{item.updated_at?.substring(0, 19)}</Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontWeight: '800'}}>Now</Text>
                  <View
                    style={{
                      backgroundColor: '#4eaefc',
                      height: 15,
                      width: 15,
                      borderWidth: 1,
                      marginTop: 15,
                      borderRadius: 7.5,
                    }}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={{height: 30}} />
      </ScrollView>
    </View>
  );
};
export default MessageBox2;

const page = [
  {
    img: 'data:image/jpeg;base64,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',
    name: 'Lorem Ipuse',
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAyEADW7sODN1htuuDE9JDXfqanBz29hhZNw&usqp=CAU',
    name: 'Lorem Ipuse',
  },
  {
    img: 'data:image/jpeg;base64,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',
    name: 'Lorem Ipuse',
  },
  {
    img: 'data:image/jpeg;base64,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',
    name: 'Lorem Ipuse',
  },

  {
    img: 'data:image/jpeg;base64,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',
    name: 'Lorem Ipuse',
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqz2J2zwMNlmYtzcoHDxdFnviP5Awnkq4ohg&usqp=CAU',
    name: 'Lorem Ipuse',
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNBZEfCKfh8YFCuvFeWvb7DpDMoH20u4SujQ&usqp=CAU',
    name: 'Lorem Ipuse',
  },
];

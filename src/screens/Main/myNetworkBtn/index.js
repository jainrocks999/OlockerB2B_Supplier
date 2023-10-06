import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import styles from './styles';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useIsFocused, useNavigation } from '@react-navigation/native';

import RetailerRequestList from '../RetailerRequestList';
import MyNetworkList from '../MyNetworkList';
import ListOfRetailer from '../ListofRetailer';
import InviteRetailerList from '../InviteRetailerList';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function myNetworkBtn({ route }) {

  const { data } = route.params;

  const [listofRetailer, setListOfRetailer] = useState(false);
  const [myNetwork, setmyNetwork] = useState(false);
  const [retailerRequestList, setretailerRequestList] = useState(false);
  const [inviteRetailer, setinviteRetailer] = useState(false);
  const [headText, setHeadText] = useState('');

  const isFocuse = useIsFocused();

  useEffect(() => {
    checkScreen()
  }, [])



  const checkScreen = () => {


    if (data === 'invite') {
      setShowinviteRetailer()
    }
    else if (data === 'List') {
      setShowRetailerList()
    }
    else if (data === 'Network') {
      setShowmyNetwork()

    }
    else if (data === 'Request') {
      setShowRetailerRequest()
    }

  }

  const setShowRetailerList = () => {
    setHeadText('List Of Retailer');
    setListOfRetailer(true);
    setmyNetwork(false);
    setretailerRequestList(false);
    setinviteRetailer(false);
  };
  const setShowRetailerRequest = () => {
    setHeadText('Retailer Request List');
    setListOfRetailer(false);
    setmyNetwork(false);
    setretailerRequestList(true);
    setinviteRetailer(false);
  };
  const setShowinviteRetailer = () => {
    setHeadText('Invite Retailer List');
    setListOfRetailer(false);
    setmyNetwork(false);
    setretailerRequestList(false);
    setinviteRetailer(true);
  };
  const setShowmyNetwork = () => {
    setHeadText('My Network');
    setListOfRetailer(false);
    setmyNetwork(true);
    setretailerRequestList(false);
    setinviteRetailer(false);
  };
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              delayPressIn={0}
              onPress={() => navigation.goBack()}>
              <Image
                style={styles.img}
                source={require('../../../assets/L.png')}
              />
            </TouchableOpacity>
            <Text style={[styles.text, { marginLeft: 15 }]}>{headText}</Text>
          </View>
          <View style={styles.headertouch}>
            <TouchableOpacity onPress={() => navigation.navigate('Message')}>
              <Image
                style={styles.img1}
                source={require('../../../assets/Fo.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => handleWishList()}>
              <Image
                style={styles.img2}
                source={require('../../../assets/Image/dil.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Logout()}>
              <Image
                style={styles.img3}
                source={require('../../../assets/Image/menu-icon.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: hp(20),

            marginTop: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 10,
              marginHorizontal: 5,
            }}>
            <TouchableOpacity
              onPress={() => setShowRetailerList()}
              style={{
                backgroundColor: listofRetailer ? '#f0f0f0' : '#032E63',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: '#032E63',
                borderRadius: 30,
                width: wp(42),
                height: hp(6),
              }}>
              <Text
                style={{
                  fontSize: wp(4),
                  fontWeight: '700',
                  color: listofRetailer ? '#000' : 'white',
                }}>
                List Of Retailer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowmyNetwork()}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: '#032E63',
                backgroundColor: myNetwork ? '#f0f0f0' : '#032E63',
                borderRadius: 30,
                width: wp(42),
                height: hp(6),
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: myNetwork ? '#000' : 'white',
                }}>
                My Network
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 10,
              marginHorizontal: 5,
            }}>
            <TouchableOpacity
              onPress={() => setShowRetailerRequest()}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                backgroundColor: retailerRequestList ? '#f0f0f0' : '#032E63',
                borderRadius: 30,
                width: wp(42),
                height: hp(6),
              }}>
              <Text
                style={{
                  fontSize: wp(4),
                  fontWeight: '700',
                  color: retailerRequestList ? '#000' : 'white',
                  textAlign: 'center'
                }}>
                Retailer Request List
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowinviteRetailer()}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: '#032E63',
                backgroundColor: inviteRetailer ? '#f0f0f0' : '#032E63',
                borderRadius: 30,
                width: wp(42),
                height: hp(6),
              }}>
              <Text
                style={{
                  fontSize: wp(4),
                  fontWeight: '700',
                  color: inviteRetailer ? '#000' : 'white',
                }}>
                Invite Retailers List
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {listofRetailer && <ListOfRetailer />}
        {myNetwork && <MyNetworkList />}
        {retailerRequestList && <RetailerRequestList />}
        {inviteRetailer && <InviteRetailerList />}
      </View>
    </ScrollView>
  );
}

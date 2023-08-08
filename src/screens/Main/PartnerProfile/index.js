import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Linking,
  Share,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import BottomTab from '../../../components/StoreButtomTab';
import Stars from 'react-native-stars';
import styles from './styles';
import Catalogue from '../../../components/Catalogue';
import Profile from '../../../components/Profile';
import Setting from '../../../components/Settings';
import Loader from '../../../components/Loader';
import ImagePath from '../../../components/ImagePath';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
const HomeScreen = () => {
  const navigation = useNavigation();
  const selector = useSelector(state => state.Supplier.SupplierDetail?.detail)
  const isFetching = useSelector(state => state.isFetching);
  console.log('supplier detail.......', selector.logoImage);
  const [profile, setProfile] = useState(true);
  const [message, setMessage] = useState(false);
  const [catalogue, setCatalogue] = useState(false);
  const [setting, setSetting] = useState(false);
  const [rating1, setRatting1] = useState(0);
  const BannerWidth = (Dimensions.get('window').width * 15) / 16;
  const BannerHeight = 140;

  const share = async () => {
    await Share.share({
      message: `Supplier Name :   Email Address : virendramishra252@gmail.com `,
    });
  };

  const manageTab = () => {
    setProfile(true);
    setMessage(false);
    setCatalogue(false);
    setSetting(false);
  };
  const manageTab1 = () => {
    setProfile(false);
    setMessage(true);
    setCatalogue(false);
    setSetting(false);
  };
  const manageTab2 = () => {
    setProfile(false);
    setMessage(false);
    setCatalogue(true);
    setSetting(false);
  };
  const manageTab3 = () => {
    setProfile(false);
    setMessage(false);
    setCatalogue(false);
    setSetting(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f0eeef' }}>
      <Header
        source={require('../../../assets/L.png')}
        source2={require('../../../assets/Image/dil.png')}
        source1={require('../../../assets/Fo.png')}
        title={'Partner Profile '}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('FavDetails')}
        onPress1={() => navigation.navigate('Message')}
      />

      <ScrollView>
        {isFetching ? <Loader /> : null}
        <View
          style={{
            backgroundColor: '#032e63',
          }}>
          <View style={{ flexDirection: 'row', padding: 15, width: '100%' }}>
            <View
              style={{
                backgroundColor: '#fff',
                height: 100,
                width: '30%',
                borderRadius: 10,
              }}>
              <Image
                style={{ width: '100%', height: '100%', borderRadius: 10 }}
                // //  resizeMode='center'
                source={selector?.logoImage ? { uri: selector.logoImage } : require('../../../assets/Image/Not.jpeg')}
              />
            </View>
            <View style={{ marginLeft: 10, width: '60%', marginTop: -4 }}>
              <Text
                style={{ color: '#fff', fontSize: 19, fontFamily: 'Acephimere' }}>
                {selector?.SupplierName}
              </Text>
              <Text
                style={{ color: '#fff', fontSize: 12, fontFamily: 'Acephimere' }}>
                {selector?.cityName}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Stars
                  half={true}
                  default={0}
                  // display={3}
                  spacing={5}
                  update={val => setRatting1(val)}
                  count={5}
                  starSize={16}
                  fullStar={require('../../../assets/Image/star.png')}
                  emptyStar={require('../../../assets/Image/star1.png')}
                />

                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(`tel:${selector.MobileNo}`)}
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={require('../../../assets/PartnerImage/16.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => share()}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: 10,
                    }}>
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={require('../../../assets/PartnerImage/15.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity
              // onPress={()=>addToNetwork()}
              style={{
                backgroundColor: '#ea056c',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 20,
              }}>
              <Text
                style={{ color: '#fff', fontSize: 12, fontFamily: 'Acephimere' }}>
                {' '}
                Added To Network
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center', height: 0, marginTop: 15 }}></View>

          <View style={{ height: 20 }} />
        </View>
        <View style={styles.tabContainer}>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => manageTab()}
              style={styles.tabStyle}>
              {profile ? (
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require('../../../assets/PartnerImage/10.png')}
                />
              ) : (
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require('../../../assets/PartnerImage/pro_uncolor.png')}
                />
              )}
            </TouchableOpacity>
            <Text
              style={{ marginTop: 3, fontFamily: 'Acephimere', fontSize: 13 }}>
              Profile
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Message')}
              style={styles.tabStyle}>
              {message ? (
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require('../../../assets/PartnerImage/msg_active.png')}
                />
              ) : (
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require('../../../assets/PartnerImage/11.png')}
                />
              )}
            </TouchableOpacity>
            <Text
              style={{ marginTop: 3, fontFamily: 'Acephimere', fontSize: 13 }}>
              Message
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => manageTab2()}
              style={styles.tabStyle}>
              {catalogue ? (
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require('../../../assets/PartnerImage/nackactive.png')}
                />
              ) : (
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require('../../../assets/PartnerImage/8.png')}
                />
              )}
            </TouchableOpacity>
            <Text
              style={{ marginTop: 3, fontFamily: 'Acephimere', fontSize: 13 }}>
              Catalogue
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => manageTab3()}
              style={styles.tabStyle}>
              {setting ? (
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require('../../../assets/PartnerImage/setting_active.png')}
                />
              ) : (
                <Image
                  style={{ width: 50, height: 50, alignSelf: 'center' }}
                  source={require('../../../assets/PartnerImage/7.png')}
                />
              )}
            </TouchableOpacity>
            <Text
              style={{ marginTop: 3, fontFamily: 'Acephimere', fontSize: 13 }}>
              Settings
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          {profile == true ? <Profile /> : null}
          {catalogue == true ? <Catalogue /> : null}
          {setting == true ? <Setting /> : null}
        </View>
        {/* <View style={{height:70}}/> */}
      </ScrollView>
      {/* <View style={{bottom:0,position:'absolute',left:0,right:0}}>
      <BottomTab/>
      </View> */}
      <StatusBar />
    </View>
  );
};
export default HomeScreen;

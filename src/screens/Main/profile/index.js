import React, {useState} from 'react';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextInput} from 'react-native';

const Notification = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [value, setValue] = useState(null);

  const renderItem = item => {
    return (
      <View
        style={{
          borderBottomWidth: 2,
          height: 40,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 5,
        }}>
        <CheckBox />
        <Text
          style={{
            fontSize: 18,
            marginLeft: 5,
            fontWeight: '700',
            color: '#000',
          }}>
          {item.label}
        </Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView contentContainerStyle={{}}>
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
            <Text style={[styles.text, {marginLeft: 15}]}>Profile</Text>
          </View>
          <View style={styles.headertouch}>
            <TouchableOpacity onPress={() => navigation.navigate('Message')}>
              <Image
                style={styles.img1}
                source={require('../../../assets/Fo.png')}
              />
            </TouchableOpacity>
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
                source={require('../../../assets/Image/menu-icon.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: hp(35),
            margin: 10,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <View
            style={{borderWidth: 2, height: 120, width: 120, borderRadius: 60}}>
            <Image
              source={{
                uri: 'https://img.freepik.com/free-icon/user_318-159711.jpg',
              }}
              resizeMode="cover"
              style={{height: '100%', width: '100%'}}
            />
          </View>
          <View
            style={{
              marginLeft: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{marginLeft: 20, justifyContent: 'center'}}>
              <Text style={{fontSize: 22, fontWeight: '900', color: '#032e63'}}>
                Lorem ipusm
              </Text>
              <Text style={{fontSize: 20, fontWeight: '500'}}>Lorem ipusm</Text>
            </View>
            <TouchableOpacity
              style={{
                width: '90%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#032e63',
                height: 35,
                borderRadius: 30,
                marginTop: 15,
                marginLeft: 20,
              }}>
              <Text style={{fontSize: 18, color: 'white', alignSelf: 'center'}}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{marginTop: 15, marginHorizontal: 25}}>
          <Text style={{fontSize: 22, fontWeight: '800', color: '#000'}}>
            Account Setting
          </Text>
        </View>

        <TouchableOpacity style={styles.addbtn}>
          <Text style={{fontSize: 18, color: 'white'}}>Notification</Text>
          <AntDesign name="right" size={30} color={'white'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.addbtn}>
          <Text style={{fontSize: 18, color: 'white'}}>Save Address</Text>
          <AntDesign name="right" size={30} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addbtn}>
          <Text style={{fontSize: 18, color: 'white'}}>My Location</Text>
          <AntDesign name="right" size={30} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addbtn}>
          <Text style={{fontSize: 18, color: 'white'}}>Language</Text>
          <AntDesign name="right" size={30} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addbtn}>
          <Text style={{fontSize: 18, color: 'white'}}>About Us</Text>
          <AntDesign name="right" size={30} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addbtn}>
          <Text style={{fontSize: 18, color: 'white'}}>Privacy</Text>
          <AntDesign name="right" size={30} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.addbtn,
            {
              width: '50%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '15%',
            },
          ]}>
          <Text style={{fontSize: 18, color: 'white', alignSelf: 'center'}}>
            LogOut
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={{height: 60}} />
      <TouchableOpacity
        style={{
          position: 'absolute',
          backgroundColor: '#032e63',
          bottom: 15,
          alignItems: 'center',
          justifyContent: 'center',

          borderRadius: 40,
          right: 25,
          height: hp(9),
          width: wp(18),
        }}>
        <Ionicons name="chatbubbles-outline" size={45} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};
export default Notification;

const DropData = [
  {label: 'UNDER 25000', value: '1'},
  {label: 'UNDER 25000', value: '2'},
  {label: 'UNDER 50000', value: '3'},
  {label: 'UNDER 100000', value: '4'},
];

const page = [
  {
    number: '1',
  },
  {
    number: '2',
  },
  {
    number: '3',
  },
  {
    number: '4',
  },
  {
    number: '5',
  },
];
const data = [
  {
    sNo: '01',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '02',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
];

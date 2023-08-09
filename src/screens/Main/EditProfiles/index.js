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
import Feather from 'react-native-vector-icons/Feather';
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
            <Text style={[styles.text, {marginLeft: 15}]}>Edit Profile</Text>
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
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{borderWidth: 2, height: 130, width: 130, borderRadius: 65}}>
            <Image
              source={{
                uri: 'https://img.freepik.com/free-icon/user_318-159711.jpg',
              }}
              resizeMode="cover"
              style={{height: '100%', width: '100%'}}
            />
            <View
              style={{
                height: 50,
                position: 'absolute',
                bottom: 5,
                right: -10,
                width: 50,
                backgroundColor: '#032e63',
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Feather name="camera" size={28} color={'white'} />
            </View>
          </View>
        </View>
        <View style={{ marginHorizontal: 15, padding: 5}}>
          <View
            style={{
              borderWidth: 1,
              height: 50,
              paddingHorizontal: 10,
              borderColor: '#bacae3',
              marginTop: 10,
            }}>
            <TextInput
              placeholder="First Name"
              style={{fontSize: 18, fontWeight: '600'}}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              height: 50,
              paddingHorizontal: 10,
              borderColor: '#bacae3',
              marginTop: 10,
            }}>
            <TextInput
              placeholder="Last Name"
              style={{fontSize: 18, fontWeight: '600'}}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              height: 50,
              paddingHorizontal: 10,
              borderColor: '#bacae3',
              marginTop: 10,
            }}>
            <TextInput
              placeholder="Email"
              style={{fontSize: 18, fontWeight: '600'}}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              height: 50,
              paddingHorizontal: 10,
              borderColor: '#bacae3',
              marginTop: 10,
            }}>
            <TextInput
              placeholder="Phone"
              style={{fontSize: 18, fontWeight: '600'}}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              height: 50,
              paddingHorizontal: 10,
              borderColor: '#bacae3',
              marginTop: 10,
            }}>
            <TextInput
              placeholder="Password"
              style={{fontSize: 18, fontWeight: '600'}}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              height: 50,
              paddingHorizontal: 10,
              borderColor: '#bacae3',
              marginTop: 10,
            }}>
            <TextInput
              placeholder="Confirm Password"
              style={{fontSize: 18, fontWeight: '600'}}
            />
          </View>
        </View>
        <View style={{marginVertical: 40,alignItems:'center'}}>
          <TouchableOpacity
            style={{
              width: '80%',
              height: 40,
              backgroundColor: '#032e63',
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 20, color: 'white'}}>Save Changes</Text>
          </TouchableOpacity>
        </View>
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

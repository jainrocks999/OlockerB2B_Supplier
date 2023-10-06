import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TextInput } from 'react-native';

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
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{}}>
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
            <Text style={[styles.text, { marginLeft: 15 }]}>
              Product Stone Details
            </Text>
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
        <View>
          <View style={{ marginHorizontal: 15, marginTop: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: '800', color: '#000' }}>
              STONE DETAILS{' '}
              <Text style={{ fontSize: 18 }}>
                (DETAILS OF PRECIOUS STONE USED IN PRODUCT)
              </Text>
            </Text>
          </View>

          <View style={styles.Card}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '45.5%',
                  justifyContent: 'space-between',
                }}>
                <Text style={{ fontWeight: '600', fontSize: 18 }}>Stone Name</Text>
                <Text style={{ fontWeight: '600', fontSize: 18 }}>:</Text>
              </View>
              <View style={{ width: '41.5%', alignItems: 'center' }}>
                <Text style={{ fontWeight: '500', fontSize: 18, marginLeft: 26 }}>Amazonite</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="pencil"
                    size={20}
                    color={'#000'}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="delete"
                    size={20}
                    color={'#000'}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '45.5%',
                  justifyContent: 'space-between',
                }}>
                <Text style={{ fontWeight: '600', fontSize: 18 }}>Stone Wt.</Text>
                <Text style={{ fontWeight: '600', fontSize: 18 }}>:</Text>
              </View>
              <View style={{ width: '41.5%' }}>
                <Text style={{ fontWeight: '500', fontSize: 18 }}>0.5000</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '45.5%',
                  justifyContent: 'space-between',
                }}>
                <Text style={{ fontWeight: '600', fontSize: 18 }}>Unit of Stone Wt.</Text>
                <Text style={{ fontWeight: '600', fontSize: 18 }}>:</Text>
              </View>
              <View style={{ width: '41.5%' }}>
                <Text style={{ fontWeight: '500', fontSize: 18 }}>GMS</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '45.5%',
                  justifyContent: 'space-between',
                }}>
                <Text style={{ fontWeight: '600', fontSize: 18 }}>
                  Stone value
                </Text>
                <Text style={{ fontWeight: '600', fontSize: 18 }}>:</Text>
              </View>
              <View style={{ width: '41.5%' }}>
                <Text style={{ fontWeight: '500', fontSize: 18 }}>136520.00</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={{ marginHorizontal: 20, marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#000' }}>
              Stone Wt. <Text style={{ color: 'red', fontSize: 18 }}>*</Text>
            </Text>
            <View>
              <Dropdown
                style={[
                  styles.dropdown,
                  { borderWidth: 1, borderColor: '#979998' },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={DropData}
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder="Stone Wt"
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#000' }}>
              Unit of Wt. <Text style={{ color: 'red', fontSize: 18 }}>*</Text>
            </Text>
            <View>
              <Dropdown
                style={[
                  styles.dropdown,
                  { borderWidth: 1, borderColor: '#979998' },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={DropData}
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder="Select  Unit of weight "
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#000' }}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#000' }}>
                Stone value
                <Text style={{ color: 'red', fontSize: 18 }}>*</Text>
              </Text>
            </Text>
            <View>
              <Dropdown
                style={[
                  styles.dropdown,
                  { borderWidth: 1, borderColor: '#979998' },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={DropData}
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder="Amount in Rs"
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#000' }}>
              Stone details <Text style={{ color: 'red', fontSize: 18 }}>*</Text>
            </Text>
            <View>
              <Dropdown
                style={[
                  styles.dropdown,
                  { borderWidth: 1, borderColor: '#979998' },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={DropData}
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder="Syntheic Diamonds"
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#000' }}>
              Unit of wt. <Text style={{ color: 'red', fontSize: 18 }}>*</Text>
            </Text>
            <View>
              <Dropdown
                style={[
                  styles.dropdown,
                  { borderWidth: 1, borderColor: '#979998' },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={DropData}
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder="GMS"
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>

        </View>

        <TouchableOpacity
          style={styles.addbtn}>
          <Text style={{ fontSize: 18, color: 'white' }}>Add Stone Details</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={{ height: 60 }} />
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
  { label: 'UNDER 25000', value: '1' },
  { label: 'UNDER 25000', value: '2' },
  { label: 'UNDER 50000', value: '3' },
  { label: 'UNDER 100000', value: '4' },
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

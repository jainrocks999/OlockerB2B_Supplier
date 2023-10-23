import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  FlatList,
  Dimensions,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import styles from './style';
import {Dropdown} from 'react-native-element-dropdown';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/Loader';
import axios from 'axios';
import {RadioButton} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import RNDateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AddOffer = () => {
  const navigation = useNavigation();
  const [show, setShow] = useState({
    show1: false,
    show2: false,
  });
  const focused = useIsFocused();

  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();
  const [offerType, setOfferType] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const selector = useSelector(state => state.Offer.OfferTempList);
  const isFetching = useSelector(state => state.Offer.isFetching);
  const offerTypeList = useSelector(state => state.Offer.offerTypeList);
  console.log('this is offettypeliust', offerTypeList);
  useEffect(() => {
    getOffertypeList();
  }, [focused]);
  const manageOfferList = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    // dispatch({
    //   type: 'Offer_List_Request',
    //   url: '/getOfferList',
    //   userid:user_id,
    //   navigation
    //  })
  };
  console.log();
  const [value, setValue] = useState(null);
  //cons;
  handleWishList = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    dispatch({
      type: 'Get_wishListProduct_Request',
      url: '/wishListItem',
      user_id: user_id,
      navigation,
    });
  };
  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.Value}</Text>
        {item.Value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };
  const getOffertypeList = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const data = {userid: user_id};
    dispatch({
      type: 'get_offer_type_list_request',
      url: 'getOfferTypeList',
      data,
    });
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar />
      {fetching || isFetching ? <Loader /> : null}
      <View
        style={{
          backgroundColor: '#032e63',
          height: 50,
          width: '100%',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{paddingHorizontal: 5}}>
            <Image
              style={{height: 20, width: 14}}
              source={require('../../../assets/L.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: '#fff',
              fontSize: wp(4.5),
              fontFamily: 'Roboto-Medium',
              marginLeft: 14,
            }}>
            Add Offers
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
        </View>
      </View>
      <ScrollView contentContainerStyle={{padding: 12}}>
        <Text
          style={{
            color: '#030303',
            fontSize: wp(4.5),
            fontFamily: 'Roboto-Medium',
            borderBottomWidth: 1,
            alignSelf: 'flex-start',
            borderStyle: 'dashed',
          }}>
          Offer
        </Text>
        <View style={{}}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={offerTypeList?.offertype}
            itemTextStyle={{color: 'grey'}}
            maxHeight={250}
            labelField="Value"
            valueField="Id"
            placeholder="Select Offer type"
            value={value}
            onChange={item => {
              setValue(item.Id);
            }}
            renderItem={renderItem}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: hp(1),
            justifyContent: 'space-between',
          }}>
          <View style={{width: '48%'}}>
            <Text style={{color: '#23233C', fontSize: wp(4.5)}}>
              Start Date
            </Text>
            <TouchableOpacity
              onPress={() =>
                setShow({
                  show1: true,
                  show2: false,
                })
              }
              style={{
                width: '100%',
                borderWidth: 1,
                height: hp(6),
                alignItems: 'center',
                borderRadius: 8,
                paddingHorizontal: 6,
                marginTop: 4,
                justifyContent: 'center',
              }}>
              {show.show1 ? (
                <RNDateTimePicker
                  value={start}
                  onChange={(val, selecdate) => {
                    setShow({
                      show1: false,
                      show2: false,
                    });
                    setStart(selecdate);
                  }}
                  //mode="datetime"
                  dateFormat="day month year"
                  minimumDate={new Date()}
                  maximumDate={new Date(2300, 12, 31)}
                  style={{borderWidth: 1, height: 20, width: 40}}
                />
              ) : (
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: wp(3.5),
                    color: 'black',
                  }}>
                  {start != ''
                    ? start?.getFullYear() +
                      '-' +
                      start?.getMonth() +
                      '-' +
                      start?.getDate() +
                      '  ' +
                      start?.getHours() +
                      ':' +
                      start?.getMinutes() +
                      ':' +
                      start?.getSeconds()
                    : 'select start date'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={{width: '48%'}}>
            <Text style={{color: '#23233C', fontSize: 15}}>End Date</Text>
            <TouchableOpacity
              onPress={() => {
                setShow({
                  show1: false,
                  show2: true,
                });
              }}
              style={{
                width: '100%',
                borderWidth: 1,
                height: hp(6),
                alignItems: 'center',
                borderRadius: 8,
                paddingHorizontal: 6,
                marginTop: 4,
                justifyContent: 'center',
              }}>
              {show.show2 ? (
                <RNDateTimePicker
                  value={end}
                  onChange={(val, end) => {
                    setShow({
                      show1: false,
                      show2: false,
                    });
                    setEnd(end);
                  }}
                  mode="datetime"
                  minimumDate={new Date()}
                  style={{borderWidth: 1, height: 20, width: 40}}
                />
              ) : (
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: wp(3.5),
                    color: 'black',
                  }}>
                  {end != ''
                    ? end?.getFullYear() +
                      '-' +
                      end?.getMonth() +
                      '-' +
                      end?.getDate() +
                      '  ' +
                      end?.getHours() +
                      ':' +
                      end?.getMinutes() +
                      ':' +
                      end?.getSeconds()
                    : 'select end date'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            marginTop: hp(1.5),
            color: '#030303',
            fontFamily: 'Roboto-Medium',
            fontSize: wp(4),
          }}>
          Deal Type
        </Text>
        <View style={{}}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={DropData}
            maxHeight={250}
            labelField="label"
            valueField="value"
            placeholder="Select Offer type"
            value={value}
            onChange={item => {
              setValue(item.value);
            }}
            renderItem={renderItem}
          />
        </View>
        <Text
          style={{
            marginTop: 10,
            color: '#030303',
            fontFamily: 'Roboto-Medium',
            fontSize: wp(4),
          }}>
          Discount Percentage
        </Text>
        <View
          style={{
            width: '100%',
            borderWidth: 1,
            height: hp(6),
            borderRadius: 8,
            paddingHorizontal: 6,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 4,
          }}>
          <TextInput
            style={{fontSize: wp(4), color: 'black'}}
            placeholderTextColor={'grey'}
            placeholder="Discount Percentage"
          />
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            marginHorizontal: 10,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddProductTooffer');
            }}
            style={{
              backgroundColor: '#032e63',
              borderRadius: wp(4.5),
              alignItems: 'center',
              height: hp(6),
              paddingHorizontal: 5,
              justifyContent: 'center',
              marginTop: 15,
              width: '47%',
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Medium',
                fontSize: wp(4),
                textAlign: 'center',
              }}>
              Add Products to Offers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#032e63',
              borderRadius: wp(4.5),
              alignItems: 'center',
              height: hp(6),
              paddingHorizontal: 5,
              justifyContent: 'center',
              marginTop: 15,
              width: '47%',
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Medium',
                fontSize: wp(4),
                textAlign: 'center',
              }}>
              Add Customer to Offers
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 10}}>
          <TouchableOpacity
            style={{
              borderColor: '#032e63',
              borderRadius: wp(5),
              alignItems: 'center',
              height: hp(6),
              justifyContent: 'center',
              marginTop: 15,
              borderWidth: 1,
            }}>
            <Text
              style={{
                color: '#032e63',
                fontFamily: 'Roboto-Medium',
                fontSize: wp(4),
              }}>
              Choose file
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => manageOfferList()}
            style={{
              backgroundColor: '#032e63',
              borderRadius: wp(5),
              alignItems: 'center',
              height: hp(6),
              justifyContent: 'center',
              marginTop: 15,
              width: '48%',
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Medium',
                fontSize: wp(4),
              }}>
              Add
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#032e63',
              borderRadius: wp(5),
              alignItems: 'center',
              height: hp(6),
              justifyContent: 'center',
              marginTop: 15,
              width: '48%',
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Medium',
                fontSize: wp(4),
              }}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{height: 50}} />
      </ScrollView>
    </View>
  );
};
export default AddOffer;

const DropData = [
  {label: 'Discount on making', value: '1'},
  {label: 'Discount on Gold price', value: '2'},
  {label: 'Discount on diamond price', value: '3'},
  {label: 'Get Silver free on Gold Jewellery', value: '4'},
  {label: 'Get flat…...Rs. Off on every purchase', value: '5'},
  {label: 'Get product on interest free EMIs', value: '6'},
  {label: 'Products on ZERO Making', value: '7'},
  {label: 'Create your deal', value: '8'},
];

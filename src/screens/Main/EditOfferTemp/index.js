import React, {useEffect, useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import styles from './style';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/Loader';
import axios from 'axios';
import {RadioButton} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch, useSelector} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';

const Addproduct = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(false);
  const [template, setTemplate] = useState('');
  const [description, setDescription] = useState('');
  const selector = useSelector(state => state.Offer.OfferList);
  const isFetching = useSelector(state => state.Offer.isFetching);
  const item = route.params?.item;
  useEffect(() => {
    item ? setTemplate(item?.label) : null;
    item ? setDescription(item?.Description) : null;
  }, [item]);
  const addTemp = async item => {
    const Token = await AsyncStorage.getItem('loginToken');
    const user_id = await AsyncStorage.getItem('user_id');

    if (template == '') {
      Toast.show('Please enter template name');
    } else if (description == '') {
      Toast.show('Please enter description name');
    } else {
      try {
        setFetching(true);
        const data = new FormData();
        data.append('offertemplate', template);
        data.append('templatedescription', description);
        data.append('templateid', route.params.item.Id);
        const response = await axios({
          method: 'POST',
          data: data,
          headers: {
            'content-type': 'multipart/form-data',
            Olocker: `Bearer ${Token}`,
          },
          url: 'https://olocker.co/api/supplier//addOfferTemplate',
        });
        if (response.data.status) {
          setFetching(false);
          Toast.show(response.data.msg);
          dispatch({
            type: 'Template_Detail_Request',
            url: '/getOfferTemplate',
            userid: user_id,
            navigation,
          });
        } else {
          setFetching(false);
          Toast.show(response.data.msg);
        }
      } catch (error) {
        setFetching(false);
        // console.log('this isi error', error);
      }
    }
  };
  const handleWishList = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    dispatch({
      type: 'Get_wishListProduct_Request',
      url: '/wishListProduct',
      user_id: user_id,
      navigation,
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
              fontSize: 16,
              fontFamily: 'Roboto-Medium',
              marginLeft: 14,
            }}>
            Edit Offer template
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
          {/* <Image
            style={{height: 24, width: 28, tintColor: '#fff', marginLeft: 15}}
            source={require('../../../assets/supplierImage/more.png')}
          /> */}
        </View>
      </View>
      <ScrollView>
        <View style={{paddingHorizontal: 12, marginTop: 20}}>
          <View style={{marginTop: 15}}>
            <Text
              style={{
                fontSize: 15,
                color: '#23233C',
                fontFamily: 'Roboto-Medium',
              }}>
              Offer Template Name
            </Text>
            <View
              style={{
                width: '100%',
                borderWidth: 1,
                marginTop: 5,
                height: 40,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 15,
                paddingHorizontal: 6,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInput
                placeholder="Offer Template Name"
                value={template}
                onChangeText={val => setTemplate(val)}
                style={{color: '#030303', width: '100%'}}
                placeholderTextColor={'#999999'}
              />
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <Text
              style={{
                fontSize: 15,
                color: '#23233C',
                fontFamily: 'Roboto-Medium',
              }}>
              Description
            </Text>
            <View
              style={{
                width: '100%',
                borderWidth: 1,
                marginTop: 5,
                height: 40,
                borderRadius: 15,
                paddingHorizontal: 6,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInput
                placeholder="Offer Discription"
                value={description}
                onChangeText={val => setDescription(val)}
                style={{color: '#030303', width: '100%'}}
                placeholderTextColor={'#999999'}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <TouchableOpacity
              onPress={() => addTemp()}
              style={{
                borderWidth: 1,
                width: '96%',
                backgroundColor: '#032e63',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 7,
                borderRadius: 15,
                flexDirection: 'row',
              }}>
              {/* <Image
                style={{height: 11, width: 11}}
                source={require('../../../assets/supplierImage/addPlus.png')}
              /> */}
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 10,
                }}>
                Update Template
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height: 50}} />
      </ScrollView>
    </View>
  );
};
export default Addproduct;

const Status = [
  {label: 'Active', value: 'true'},
  {label: 'In Active', value: 'false'},
];

const data = [
  {
    name: 'Lorem Ipsum',
    desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
  {
    name: 'Lorem Ipsum',
    desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
  {
    name: 'Lorem Ipsum',
    desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
  {
    name: 'Lorem Ipsum',
    desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
  {
    name: 'Lorem Ipsum',
    desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
  {
    name: 'Lorem Ipsum',
    desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
  {
    name: 'Lorem Ipsum',
    desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
];

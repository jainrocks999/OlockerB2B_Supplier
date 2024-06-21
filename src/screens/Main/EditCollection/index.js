import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import {useNavigation,useIsFocused} from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import styles from './styles';
import RNPickerSelect from 'react-native-picker-select';
import Buttom from '../../../components/StoreButtomTab';
import Header from '../../../components/CustomHeader';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/Loader';
import PickerModel from '../../../components/PickerModel';
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux';
import {RadioButton} from 'react-native-paper';
import TempletModel from "./TempletModel";

const EditCollection = ({route}) => {
  // console.log('this i route data',route.params)
  const data = route.params.item;
  const navigation = useNavigation();
  const loading = useSelector(state => state.Auth.isFetching);
  const dispatch = useDispatch();
  const [name, setName] = useState(data.Name);
  const [tag, setTag] = useState(data.Title);
  const [description, setDescription] = useState(data.Description);
  const [templetmodel, setTempletModal] = useState(false);
  const isFocused = useIsFocused()
  const [active, setActive] = useState(
    data.IsActive
      ? data.IsActive == 1
        ? 'checked'
        : 'unchecked'
      : 'Select Status',
  );
  const [inactive, setInActive] = useState(
    data.IsActive
      ? data.IsActive == 0
        ? 'checked'
        : 'unchecked'
      : 'Select Status',
  );

  useEffect(() => {
    if (isFocused) {
      Apicall();
    }
  }, [isFocused])
  const Apicall = async () => {
    const Token = await AsyncStorage.getItem('loginToken');
    dispatch({
      type: 'Get_creativeImgList_Request',
      url: '/creativeImgList',
      Token: Token
    });
  }

  const [photo, setPhoto] = useState(`https://olocker.co${data.ImageUrl}`);
  const [photoName, setPhotoName] = useState(data.ImageName);
  const [photoType, setPhotoType] = useState('image/jpeg');
  const [fetching, setFetching] = useState(false);

  const [photo1, setPhoto1] = useState(data?.ImageName);
  const [Photo2, setPhoto2] = useState('image/jpeg');
  const [getapi, setGetapi] = useState(false);
  const [camera1, setCamera] = useState(false);

  const validateUser = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const Token = await AsyncStorage.getItem('loginToken');
    if (name == '') {
      Toast.show('Please enter collection name');
    }
    if (tag == '') {
      Toast.show('Please enter tagline');
    }
    if (description == '') {
      Toast.show('Please enter description');
    } else if (photo == '') {
      Toast.show('Please select banner image');
    } else {
      try {
        setFetching(true);
        const data = new FormData();
        data.append('userId', user_id);
        data.append('Name', name);
        data.append('Title', tag);
        data.append('IsActive', active == 'checked' ? 1 : 0);
        data.append('Description', description);
        data.append('SrNo', route.params.item.SrNo);
        data.append('ImageName', {
          uri: photo,
          name: photo1.substring(photo1.lastIndexOf('/') + 1),
          type: Photo2,
        });

        data.append('hidden_image','');
        const response = await axios({
          method: 'POST',
          data,
          headers: {
            'content-type': 'multipart/form-data',
            Olocker: `Bearer ${Token}`,
          },
          url: 'https://olocker.co/api/supplier//postCreateCollection',
        });

        if (response.data.status) {
          setFetching(false);
          dispatch({
            type: 'Get_Catalogue_Request',
            url: '/listCollection',
            user_id: user_id,
            navigation,
          });
          Toast.show(response.data.msg);
        } else {
          setFetching(false);
          Toast.show(response.data.msg);
        }
      } catch (error) {
        setFetching(false);
      }
    }
  };

  const getDataFromChild = (data, data1) => {
    console.log('this is data from chiled', data, data1);
    let image2 = data.Logo.split('.').pop();
    setPhoto(`${data1}${data.Logo}`);
    setPhoto1(data.Logo);
    setPhoto2(`image/${image2}`);
    setGetapi(true);
    setCamera(false)
  }

  const uploadPhoto = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      // setPhoto(res.uri);
      // setPhotoName(res.name);
      // setPhotoType(res.type);
      setPhoto(res.uri);
      setPhoto1(res.name);
      setPhoto2(res.type);
      setCamera(true);
      setGetapi(false);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };
  const manageActive = () => {
    setActive('checked');
    setInActive('unchecked');
  };

  const manageInActive = () => {
    setActive('unchecked');
    setInActive('checked');
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
    <View style={styles.container1}>
      <StatusBar />
      {fetching ||loading ? <Loader /> : null}
      <View
        style={{
          width: '100%',
          backgroundColor: '#032e63',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 12,
          flexDirection: 'row',
          paddingVertical: 12,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingVertical:15, width: 35,alignItems:'center',justifyContent:'center',marginLeft:-10}}>
            <Image
              style={{height: 18, width: 12}}
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
            Edit Collection
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>



        <TouchableOpacity onPress={() => navigation.navigate('Message')}>
            <Image
              style={{height: 24, width: 28}}
              source={require('../../../assets/Fo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 15}}
            onPress={() => handleWishList()}>
            <Image
              style={{height: 22, width: 26, tintColor: '#fff'}}
              source={require('../../../assets/Image/dil.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
      <TempletModel
          visi={templetmodel}
          close={() => setTempletModal(false)}
          sendDatatoParent={getDataFromChild}

        />
        <View style={{paddingHorizontal: 15, marginTop: 15}}>
          <TextInput
            placeholder="Name"
            style={{
              borderWidth: 1,
              paddingLeft: 10,
              fontFamily: 'Roboto-Medium',
              borderColor: '#03154138',
              borderRadius: 5,
              height: 40,color:'#000'
            }}
            placeholderTextColor={'#23233C'}
            value={name}
            onChangeText={val => setName(val)}
          />
          <TextInput
            placeholder="Tagline"
            style={{
              borderWidth: 1,
              paddingLeft: 10,
              fontFamily: 'Roboto-Medium',
              borderColor: '#03154138',
              borderRadius: 5,
              height: 40,
              marginTop: 20,color:'#000'
            }}
            placeholderTextColor={'#23233C'}
            value={tag}
            onChangeText={val => setTag(val)}
          />
          <View
            style={{
              borderWidth: 1,
              borderColor: '#03154138',
              borderRadius: 5,
              height: 200,
              marginTop: 20,
            }}>
            <TextInput
              placeholder="Description"
              style={{
                paddingLeft: 10,
                fontFamily: 'Roboto-Medium',
                marginTop: -8,color:'#000'
              }}
              placeholderTextColor={'#23233C'}
              value={description}
              onChangeText={val => setDescription(val)}
              multiline
            />
          </View>
          <View
            style={{
              shadowColor: '#000',
              shadowOffset: {width: 2, height: 4},
              shadowOpacity: 0.2,
              shadowRadius: 5,
              elevation: 5,
              backgroundColor: '#fff',
              marginTop: 20,
              borderRadius: 6,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="first"
                status={active}
                onPress={() => manageActive()}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text
                style={{
                  color: '#032e63',
                  fontSize: 14,
                  fontFamily: 'Roboto-Medium',
                }}>
                Active
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="first"
                status={inactive}
                onPress={() => manageInActive()}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text
                style={{
                  color: '#032e63',
                  fontSize: 14,
                  fontFamily: 'Roboto-Medium',
                }}>
                In Active
              </Text>
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
              onPress={() => uploadPhoto()}
              style={{
                borderWidth: 1,
                width: '48%',
                borderColor: '#032e63',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 7,
                borderRadius: 15,
              }}>
              <Text style={{color: '#032e63', fontFamily: 'Roboto-Medium'}}>
                Choose file
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
             onPress={() => {
              // getLibraryProduct();
              setTempletModal(true)
            }}
              style={{
                borderWidth: 1,
                width: '48%',
                borderColor: '#032e63',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#032e63',
                paddingVertical: 7,
                borderRadius: 15,
              }}>
              <Text style={{color: '#fff', fontFamily: 'Roboto-Medium'}}>
                Select from library
              </Text>
            </TouchableOpacity>
          </View>
          {photo ? (
            <View style={{marginTop: 20}}>
              <Image
                style={{height: 200, width: '48%', borderRadius: 10}}
                source={{uri: photo}}
              />
            </View>
          ) : null}
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => validateUser()}
            style={{
              borderWidth: 1,
              width: '92%',
              borderColor: '#032e63',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#032e63',
              // paddingVertical: 7,
              borderRadius: 30,
              marginTop: 40,
              height:40
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Medium',
                fontSize: 16,
              }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 50}} />
      </ScrollView>
    </View>
  );
};
export default EditCollection;

const Status = [
  {label: 'Active', value: 'true'},
  {label: 'In Active', value: 'false'},
];

import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import {useNavigation,useIsFocused} from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import styles from './styles';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/Loader';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {RadioButton} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import TempletModel from './TempletModel';

const Addcollection = () => {
  const loading = useSelector(state => state.Auth.isFetching);
  const libraryImages = useSelector(state => state.Catalogue?.lImages);
  const visible = useSelector(state => state.Catalogue.visible);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');
  const [active, setActive] = useState('checked');
  const [inactive, setInActive] = useState('unchecked');
  const [photo, setPhoto] = useState('');
  const [photoName, setPhotoName] = useState('');
  const [photo1, setPhoto1] = useState('');
  const [Photo2, setPhoto2] = useState('');
  const [getapi,setGetapi]= useState(false);
  const [camera1,setCamera]=useState(false);
  const [photoType, setPhotoType] = useState('');
  const [fetching, setFetching] = useState(false);
  const onlyCharacters = /^[a-zA-Z\s]*$/;
  const [templetmodel, setTempletModal] = useState(false);
  const isFocused=useIsFocused()



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
      Token:Token
    });
  }

  const getDataFromChild=(data,data1)=>{
    console.log('this is data from chiled',data,data1);
      let  image2=data.Logo.split('.').pop();
      setPhoto(`${data1}${data.Logo}`);
      setPhoto1(data.Logo);
      setPhoto2(`image/${image2}`);
      setGetapi(true);
      setCamera(false)  
  }






  const validateUser = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const Token = await AsyncStorage.getItem('loginToken');
    if(onlyCharacters.test(name) == '') {
      Toast.show('Please enter collection name only charecter');
    }
    if (onlyCharacters.test(tag) == '') {
      Toast.show('Please enter tagline');
    }
    if (description == '') {
      Toast.show('Please enter description');
    } else if (photo == '') {
      Toast.show('Please select banner image');
    } else {
      console.log(photoName);
      try {
        setFetching(true);
        const data = new FormData();
        data.append('userId', user_id);
        data.append('Name', name);
        data.append('Title', tag);
        data.append('IsActive', active == 'checked' ? 1 : 0);
        data.append('Description', description);
        data.append('ImageName', {
          uri: photo,
          name: photo1.substring(photo1.lastIndexOf('/') + 1),
          type: Photo2,
          // uri: photo,
          // name: photoName,
          // type: photoType,
        });

        data.append('hidden_image', '');
        const response = await axios({
          method: 'POST',
          data: data,
          headers: {
            'content-type': 'multipart/form-data',
            Olocker: `Bearer ${Token}`,
          },
          url: 'https://olocker.co/api/supplier//postCreateCollection',
        });
        console.log('data add colloction .....',JSON.stringify(response.data));
       
        if (response.data.status ==true) {
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
        Toast.show('Something went wrong');
        console.log('this isi error', error);
      }
    }
  };

  const uploadPhoto = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      console.log(res);
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

  const getLibraryProduct = () => {
    dispatch({
      type: 'library_images_request',
      url: 'creativeImgList',
      open: true,
    });
  };
  return (
    <View style={styles.container1}>
      <StatusBar />
      {fetching || loading ? <Loader /> : null}
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
            Add Collection
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{height: 24, width: 28}}
            source={require('../../../assets/Fo.png')}
          />
          <TouchableOpacity onPress={() => handleWishList()}>
            <Image
              style={{height: 22, width: 26, tintColor: '#fff', marginLeft: 15}}
              source={require('../../../assets/Image/dil.png')}
            />
          </TouchableOpacity>
         
        </View>
      </View>
     
      <ScrollView style={{ flex: 1}}>
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
              height: 40,
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
              marginTop: 20,
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
                marginTop: -8,
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
              paddingVertical: 7,
              borderRadius: 15,
              marginTop: 40,
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
      <Modal visible={false} transparent={true}>
        <View style={{flex: 1}}>
          <View
            style={{
              height: '80%',
              width: '90%',
              alignSelf: 'center',
              backgroundColor: 'white',
              borderRadius: 8,
              opacity: 5,
              elevation: 5,
              marginTop: '15%',
            }}>
            <View style={{marginTop: '5%'}}>
              <FlatList
                data={libraryImages}
                renderItem={({item, index}) => (
                  <View
                    style={{
                      height: hp(25),
                      marginVertical: 5,
                    }}>
                    <Image
                      style={{
                        height: '100%',
                        width: '90%',
                        alignSelf: 'center',
                        borderRadius: 5,
                      }}
                      source={{
                        uri: `https://olocker.co/uploads/creatives/${item?.Logo}`,
                      }}
                    />
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default Addcollection;

const Status = [
  {label: 'Active', value: 'true'},
  {label: 'In Active', value: 'false'},
];

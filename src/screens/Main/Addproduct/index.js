import React, {useState, useRef, useEffect} from 'react';
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
import styles from './styles';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/Loader';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {RadioButton} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import RBSheet from 'react-native-raw-bottom-sheet';
import RNPickerSelect from 'react-native-picker-select';
import MultiSelect from 'react-native-multiple-select';

const pushData = [];
const Addproduct = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const collectionList = useSelector(state => state.Catalogue.Catalogue);
  const selector = useSelector(state => state.Catalogue.SelfCreatedProduct);
  const addedProducts = useSelector(
    state => state.Catalogue.CollectionDetails?.products,
  );
  //console.log('this is selector', JSON.stringify(route.params.no));
  const isFetching = useSelector(state => state.Catalogue.isFetching);
  const selector1 = useSelector(state => state.Catalogue.OlockerCreatedProduct);
  const [fetching, setFetching] = useState(false);
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minWeight, setMinWeight] = useState('');
  const [maxWeight, setMaxWeight] = useState('');
  const [branch, setBranch] = useState(false);
  const [olocker, setOlocker] = useState(false);
  const [self, setSelf] = useState(true);
  const [selected, setSelected] = useState([]);
  const refRBSheet = useRef();
  const [product, setProduct] = useState('');
  const [change, setChange] = useState(false);
  const number = route.params.no;
  useEffect(() => {
    dispatch({
      type: 'Self_Product_Request',
      url: !change ? '/getSelfProductList' : '/getOlockerProductList',
      search_key: '',
      fromPrice: '',
      toPrice: '',
      minWeight: '',
      maxWeight: '',
      SupplierId: '',
      userCollectionType: !change ? 'btnPartner' : 'btnOlocker',
      start: '0',
      limit: '10',
      //  navigation,
    });
  }, []);
  useEffect(() => {
    resetClick();
  }, [selector]);
  const resetClick = () => {
    setSearch('');
    setMinPrice('');
    setMaxPrice('');
    setMinWeight('');
    setMaxWeight('');
  };
  const manageApis = () => {
    dispatch({
      type: 'Self_Product_Request',
      url: !change ? '/getSelfProductList' : '/getOlockerProductList',
      search_key: search,
      fromPrice: minPrice,
      toPrice: maxPrice,
      minWeight: minWeight,
      maxWeight: maxWeight,
      SupplierId: '',
      userCollectionType: !change ? 'btnPartner' : 'btnOlocker',
      start: '0',
      limit: '10',
      //  navigation,
    });

    // search_key: search,
    // fromPrice: minPrice,
    // toPrice: maxPrice,
    // minWeight: minWeight,
    // maxWeight: maxWeight,

    setChange(!change);
  };

  const manageChange = () => {
    // setSelf(true);
    // setOlocker(false);
    // setSelected([]);
    manageApis();
  };
  const manageChange1 = () => {
    setSelf(false);
    setOlocker(true);
    setSelected([]);
  };

  const handleOnpress = () => {
    if (self == true) {
      dispatch({
        type: 'Self_Product_Request',
        url: '/getSelfProductList',
        search_key: '',
        fromPrice: minPrice,
        toPrice: maxPrice,
        minWeight: minWeight,
        maxWeight: maxWeight,
        SupplierId: '',
        userCollectionType: 'btnPartner',
        start: '0',
        limit: '10',
        navigation,
      });
    } else if (olocker == true) {
      dispatch({
        type: 'Olocker_Product_Request',
        url: '/getOlockerProductList',
        search_key: '',
        fromPrice: minPrice,
        toPrice: maxPrice,
        minWeight: minWeight,
        maxWeight: maxWeight,
        SupplierId: '',
        userCollectionType: 'btnOlocker',
        start: '0',
        limit: '10',
        navigation,
      });
    }
  };

  const handleSearch = () => {
    if (self == true) {
      dispatch({
        type: 'Self_Product_Request',
        url: '/getSelfProductList',
        search_key: search,
        fromPrice: minPrice,
        toPrice: maxPrice,
        minWeight: minWeight,
        maxWeight: maxWeight,
        SupplierId: '',
        userCollectionType: 'btnPartner',
        start: '0',
        limit: '10',
        navigation,
      });
    } else if (olocker == true) {
      dispatch({
        type: 'Olocker_Product_Request',
        url: '/getOlockerProductList',
        search_key: search,
        fromPrice: minPrice,
        toPrice: maxPrice,
        minWeight: minWeight,
        maxWeight: maxWeight,
        SupplierId: '',
        userCollectionType: 'btnOlocker',
        start: '0',
        limit: '10',
        navigation,
      });
    }
  };

  const addProduct = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const Token = await AsyncStorage.getItem('loginToken');
    if (selected == []) {
      Toast.show('Please select product');
    } else {
      try {
        setFetching(true);
        const data = new FormData();
        data.append('collectionId', number);
        data.append('productId', selected);

        const response = await axios({
          method: 'POST',
          data,
          headers: {
            'content-type': 'multipart/form-data',
            Olocker: `Bearer ${Token}`,
          },
          url: 'https://olocker.co/api/supplier//addCollectionProduct',
        });
        console.log('thissi is rresponse', response);
        if (response.data.status) {
          setFetching(false);
          Toast.show(response.data.msg);
          navigation.goBack();
        } else {
          setFetching(false);
          Toast.show(response.data.msg);
          // console.log('thissi is rresponseelse');
        }
      } catch (error) {
        setFetching(false);
        console.log('this isi error', error);
      }
    }
  };

  const removeProduct = async item => {
    const Token = await AsyncStorage.getItem('loginToken');
    try {
      setFetching(true);
      const data = {
        SrNo: item.SrNo,
        collectionSrNo: item.collectionId,
      };
      const response = await axios({
        method: 'GET',
        params: data,
        headers: {
          'content-type': 'multipart/form-data',
          Olocker: `Bearer ${Token}`,
        },
        url: 'https://olocker.co/api/supplier//deleteCollectionProduct',
      });

      if (response.data.status) {
        setFetching(false);
        Toast.show(response.data.msg);
        dispatch({
          type: 'Self_Product_Request',
          url: '/getSelfProductList',
          search_key: search,
          fromPrice: minPrice,
          toPrice: maxPrice,
          minWeight: minWeight,
          maxWeight: maxWeight,
          SupplierId: '',
          userCollectionType: 'btnPartner',
          start: '0',
          limit: '10',
          navigation,
        });
      } else {
        setFetching(false);
        Toast.show(response.data.msg);
        // console.log('thissi is rresponseelse');
      }
    } catch (error) {
      setFetching(false);
      // console.log('this isi error', error);
    }
  };

  const handleMove = async item => {
    const Token = await AsyncStorage.getItem('loginToken');
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      setFetching(true);
      const data = {
        proCollectMapSrNo: item.SrNo,
        moveCollectionSrNo: item.collectionId,
      };
      const response = await axios({
        method: 'GET',
        params: data,
        headers: {
          'content-type': 'multipart/form-data',
          Olocker: `Bearer ${Token}`,
        },
        url: 'https://olocker.co/api/supplier//moveProductToCollection',
      });

      if (response.data.status) {
        setFetching(false);
        Toast.show(response.data.msg);
        dispatch({
          type: 'Get_Catalogue_Request',
          url: '/listCollection',
          user_id: user_id,
          navigation,
        });
      } else {
        setFetching(false);
        Toast.show(response.data.msg);
      }
    } catch (error) {
      setFetching(false);
    }
  };

  const handlePush = (item, newValue) => {
    if (newValue == true) {
      setSelected([...selected, item.SrNo]);
    } else {
      const index = selected.indexOf(item.SrNo);
      setSelected([...selected.slice(0, index), ...selected.slice(index + 1)]);
    }
  };

  const handleSelectAll = newValue => {
    setBranch(newValue);
    if (newValue == true) {
      selector.map(item => {
        setSelected(prevState => [...prevState, item.SrNo]);
      });
    } else {
      setSelected([]);
    }
  };

  const renderCheck = item => {
    let check = false;
    if (selected.includes(item.SrNo)) {
      check = true;
    }
    return (
      <CheckBox
        disabled={false}
        value={check}
        onValueChange={newValue => handlePush(item, newValue)}
        tintColors={{true: '#032e63', false: '#032e63'}}
        onTintColor="#032e63"
        onCheckColor="#032e63"
        boxType="square"
      />
    );
  };
  const [products, setProducts] = useState([]);
  const handlePrevProdut = async () => {
    let array = [];
    if (addedProducts?.length <= 0) {
      setProducts(selector);
      return;
    }
    await addedProducts?.map(async (item, index) => {
      let indexx = index;
      await selector?.map((items, index) => {
        array.push(items);
        if (
          indexx + 1 == addedProducts.length &&
          index + 1 == selector.length
        ) {
          setProducts(array);
          // alert('thisiss rajh');
        }
      });
    });
  };
  useEffect(() => {
    handlePrevProdut();
  }, [addedProducts, selector]);
  return (
    <View style={{flex: 1}}>
      <StatusBar />
      {isFetching || fetching ? <Loader /> : null}
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
            Add Product
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{height: 24, width: 28}}
            source={require('../../../assets/Fo.png')}
          />
          <Image
            style={{height: 22, width: 26, tintColor: '#fff', marginLeft: 15}}
            source={require('../../../assets/Image/dil.png')}
          />
          <Image
            style={{height: 24, width: 28, tintColor: '#fff', marginLeft: 15}}
            source={require('../../../assets/supplierImage/more.png')}
          />
        </View>
      </View>
      <ScrollView>
        <View style={{paddingHorizontal: 12, marginTop: 20}}>
          <Text
            style={{
              color: '#030303',
              fontFamily: 'Roboto-Medium',
              fontSize: 16,
            }}>
            Add Product Collection
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 30,
            }}>
            {/* <TouchableOpacity
              onPress={() => manageChange1()}
              style={{
                borderWidth: 1,
                width: '49%',
                backgroundColor: olocker == true ? '#032e63' : '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 7,
                borderRadius: 15,
                borderColor: '#032e63'
              }}>
              <Text style={{ color: olocker == true ? '#fff' : '#032e63', fontFamily: 'Roboto-Medium', }}>Olocker Product Library</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => manageChange()}
              style={{
                borderWidth: 1,
                width: '49%',
                borderColor: '#032e63',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: self == true ? '#032e63' : '#fff',
                paddingVertical: 7,
                borderRadius: 15,
              }}>
              <Text
                style={{
                  color: self == true ? '#fff' : '#032e63',
                  fontFamily: 'Roboto-Medium',
                }}>
                {change ? 'Self Created Product' : 'Olocker Library Product'}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              borderWidth: 1,
              marginTop: 15,
              height: 40,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 15,
            }}>
            <TextInput
              placeholder="Search"
              style={{paddingLeft: 10, width: '85%'}}
              placeholderTextColor={'#787676'}
              value={search}
              onChangeText={val => setSearch(val)}
            />
            <TouchableOpacity
              onPress={() =>
                search.length > 0
                  ? manageApis()
                  : Toast.show('Please enter collection name')
              }
              style={{
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{height: 20, width: 28}}
                source={require('../../../assets/Image/serch.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 20}}>
            <Text
              style={{
                color: '#23233C',
                fontSize: 14,
                fontFamily: 'Roboto-Medium',
              }}>
              Price
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderWidth: 1,
                  width: '40%',
                  backgroundColor: '#fff',
                  borderRadius: 4,
                  borderColor: '#03154138',
                }}>
                <TextInput
                  placeholder="Min"
                  style={{height: 40, paddingLeft: 10, color: 'black'}}
                  keyboardType="number-pad"
                  placeholderTextColor={'grey'}
                  value={minPrice}
                  onChangeText={val => setMinPrice(val)}
                />
              </View>
              <Text style={{color: '#333333', fontFamily: 'Roboto-Medium'}}>
                To
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  width: '40%',
                  backgroundColor: '#fff',
                  borderRadius: 4,
                  borderColor: '#03154138',
                }}>
                <TextInput
                  placeholder="Max"
                  style={{height: 40, paddingLeft: 10, color: 'black'}}
                  keyboardType="number-pad"
                  placeholderTextColor={'grey'}
                  value={maxPrice}
                  onChangeText={val => setMaxPrice(val)}
                />
              </View>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <Text
              style={{
                color: '#23233C',
                fontSize: 14,
                fontFamily: 'Roboto-Medium',
              }}>
              Weight
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderWidth: 1,
                  width: '40%',
                  backgroundColor: '#fff',
                  borderRadius: 4,
                  borderColor: '#03154138',
                }}>
                <TextInput
                  placeholder="Min"
                  style={{height: 40, paddingLeft: 10, color: 'black'}}
                  keyboardType="number-pad"
                  placeholderTextColor={'grey'}
                  value={minWeight}
                  onChangeText={val => setMinWeight(val)}
                />
              </View>
              <Text style={{color: '#333333', fontFamily: 'Roboto-Medium'}}>
                To
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  width: '40%',
                  backgroundColor: '#fff',
                  borderRadius: 4,
                  borderColor: '#03154138',
                }}>
                <TextInput
                  placeholder="Max"
                  style={{height: 40, paddingLeft: 10, color: 'black'}}
                  keyboardType="number-pad"
                  placeholderTextColor={'grey'}
                  value={maxWeight}
                  onChangeText={val => setMaxWeight(val)}
                />
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => manageApis()}
              style={{
                width: '100%',
                borderWidth: 1,
                backgroundColor: '#032E63',
                height: 40,
                borderRadius: 10,
                marginTop: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontFamily: 'Roboto-Bold', color: '#fff'}}>
                Search
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => resetClick()}
              style={{
                width: '100%',
                borderWidth: 1,
                backgroundColor: '#032E63',
                height: 40,
                borderRadius: 10,
                marginTop: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontFamily: 'Roboto-Bold', color: '#fff'}}>
                Reset
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 15,
            }}>
            <TouchableOpacity
              onPress={() => addProduct()}
              style={{
                backgroundColor: '#032E63',
                paddingVertical: 6,
                paddingHorizontal: 15,
                borderRadius: 15,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  fontFamily: 'Roboto-Medium',
                }}>
                Product Add
              </Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <CheckBox
                disabled={false}
                value={branch}
                onValueChange={newValue => handleSelectAll(newValue)}
                tintColors={{true: '#032e63', false: '#032e63'}}
                onTintColor="#032e63"
                onCheckColor="#032e63"
                boxType="square"
              />
              <Text
                style={{
                  color: '#032e63',
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 7,
                }}>
                Select All
              </Text>
            </View>
          </View>
          <FlatList
            data={selector}
            renderItem={({item}) => (
              <View
                style={{
                  marginVertical: 10,
                  marginHorizontal: 2,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.2,
                  shadowRadius: 5,
                  elevation: 5,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                }}>
                {renderCheck(item)}
                <View style={{paddingHorizontal: 10, marginTop: 6}}>
                  <Image
                    style={{height: 150, width: '100%', borderRadius: 5}}
                    source={{
                      uri: item.ImageName
                        ? `https://olocker.co${item.ImageUrl}${item.ImageName}`
                        : 'https://olocker.co/uploads/product/default.png',
                    }}
                  />

                  <View
                    style={{
                      marginTop: 12,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{color: '#333333', fontFamily: 'Roboto-Medium'}}>
                      {item.collection}
                    </Text>
                    {/* <TouchableOpacity style={{ borderWidth: 0 }} onPress={() => removeProduct(item)}>
                      <Image style={{ width: 16, height: 16, marginLeft: 10 }} source={require('../../../assets/supplierImage/trash.png')} />
                    </TouchableOpacity> */}
                  </View>
                  <View
                    style={{
                      marginTop: 6,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{color: '#333333', fontFamily: 'Roboto-Medium'}}>
                      {'Gross Wt :'}
                    </Text>
                    <Text
                      style={{
                        color: '#707070',
                        fontFamily: 'Roboto-Medium',
                      }}>{`  ${item.GrossWt} Gms`}</Text>
                  </View>
                  <View
                    style={{
                      marginTop: 6,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{color: '#333333', fontFamily: 'Roboto-Medium'}}>
                      {'Metal Wt :'}
                    </Text>
                    <Text
                      style={{
                        color: '#707070',
                        fontFamily: 'Roboto-Medium',
                      }}>{`  ${item.MetalWt} Gms`}</Text>
                  </View>
                  <View
                    style={{
                      marginTop: 6,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{color: '#333333', fontFamily: 'Roboto-Medium'}}>
                      {'Gms :'}
                    </Text>
                    <Text
                      style={{
                        color: '#707070',
                        fontFamily: 'Roboto-Medium',
                      }}>{`  `}</Text>
                  </View>
                  <View
                    style={{
                      marginTop: 6,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{color: '#333333', fontFamily: 'Roboto-Medium'}}>
                      {'Stone Wt :'}
                    </Text>
                    <Text
                      style={{
                        color: '#707070',
                        fontFamily: 'Roboto-Medium',
                      }}>{`  ${item.StoneWt} Gms`}</Text>
                  </View>
                  <View
                    style={{
                      marginTop: 6,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{color: '#333333', fontFamily: 'Roboto-Medium'}}>
                      {'Price :'}
                    </Text>
                    <Text
                      style={{
                        color: '#707070',
                        fontFamily: 'Roboto-Medium',
                      }}>{`  ${
                      item.ProductsPrice == null ? 0 : item.ProductsPrice
                    }`}</Text>
                  </View>
                  <View
                    style={{
                      marginTop: 6,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{color: '#333333', fontFamily: 'Roboto-Medium'}}>
                      {'Product Name :'}
                    </Text>
                    <Text
                      style={{
                        color: '#707070',
                        fontFamily: 'Roboto-Medium',
                      }}>{`  ${item.ItemName}`}</Text>
                  </View>
                  <View
                    style={{
                      marginTop: 6,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{color: '#333333', fontFamily: 'Roboto-Medium'}}>
                      {'ProductSKU :'}
                    </Text>
                    <Text
                      style={{
                        color: '#707070',
                        fontFamily: 'Roboto-Medium',
                      }}>{`  ${item.ProductSku}`}</Text>
                  </View>
                  <View
                    style={{
                      marginTop: 6,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{color: '#333333', fontFamily: 'Roboto-Medium'}}>
                      {'Collection Name :'}
                    </Text>
                    <Text
                      style={{
                        color: '#707070',
                        fontFamily: 'Roboto-Medium',
                      }}>{`  ${item.collection}`}</Text>
                  </View>
                  {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={{
                        backgroundColor: '#fff',
                        paddingHorizontal: 20,
                        paddingVertical: 7,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        borderColor: '#032E63',
                        borderWidth: 1
                      }}>
                      <Text style={{ color: '#032E63', fontFamily: 'Roboto-Medium' }}>View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                      backgroundColor: '#032E63',
                      paddingHorizontal: 20,
                      paddingVertical: 7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 20
                    }}>
                      <Text style={{ color: '#fff', fontFamily: 'Roboto-Medium' }}>Send Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => refRBSheet.current.open()}
                      style={{
                        backgroundColor: '#032E63',
                        paddingHorizontal: 20,
                        paddingVertical: 7,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20
                      }}>
                      <Text style={{ color: '#fff', fontFamily: 'Roboto-Medium' }}>Move</Text>
                    </TouchableOpacity>
                  </View> */}
                </View>
                <RBSheet ref={refRBSheet}>
                  <TouchableOpacity
                    onPress={() => refRBSheet.current.close()}
                    style={{
                      borderWidth: 1,
                      alignSelf: 'flex-end',
                      margin: 10,
                      backgroundColor: '#032E63',
                      paddingHorizontal: 10,
                      paddingVertical: 3,
                      borderRadius: 6,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Roboto-Medium',
                        color: '#fff',
                        fontSize: 12,
                      }}>
                      Close
                    </Text>
                  </TouchableOpacity>
                  <ScrollView>
                    <MultiSelect
                      items={collectionList}
                      uniqueKey="SrNo"
                      onSelectedItemsChange={val => setProduct(val)}
                      selectedItems={product}
                      searchIcon={false}
                      tagBorderColor={'#032e63'}
                      tagRemoveIconColor={'#fff'}
                      tagTextColor={'#fff'}
                      selectText={
                        product.length > 0 ? '' : 'Select collection name'
                      }
                      single={true}
                      searchInputPlaceholderText="Select collection name"
                      selectedItemTextColor={'#032e63'}
                      selectedItemIconColor={'#032e63'}
                      itemTextColor={'#032e63'}
                      displayKey="Name"
                      submitButtonColor={'#032e63'}
                      submitButtonText="Submit"
                      textInputProps={{editable: false, autoFocus: false}}
                      styleDropdownMenu={{
                        // width:'100%',
                        // borderBottomWidth: 1.5,
                        borderColor: '#032e63',
                        height: 50,
                        alignSelf: 'center',
                        flexDirection: 'row',
                        backgroundColor: '#fff',
                        paddingHorizontal: 12,
                        marginTop: 5,
                        margin: 10,
                        borderWidth: 1,
                        borderRadius: 10,
                      }}
                      tagContainerStyle={{
                        backgroundColor: '#032e63',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '48%',
                      }}
                    />
                    <View style={{height: 40}} />
                  </ScrollView>
                  {/* <View style={{
          width:'94%',
          borderWidth:1,
          marginTop:5,
          height:40,
          borderRadius:10,
          paddingHorizontal:6,
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center',
          margin:10
        }}>
        <RNPickerSelect 
              onValueChange={val => setProduct(val)}
              items={Status}
              style={{
                inputAndroid: {
                  color: '#474747',
                  width: Dimensions.get('window').width-100,
                  fontSize: 14,
                  marginBottom: -1,
                  fontFamily: 'Acephimere',
                },
                inputIOS: {
                  color: '#474747',
                  width: Dimensions.get('window').width-100,
                  fontSize: 14,
                  marginBottom: 10,
                  fontFamily: 'Acephimere',
                },
                placeholder: {
                  color: 'grey',
                  width: Dimensions.get('window').width-100,
                  alignSelf: 'center',
                  fontFamily: 'Acephimere',
                },
              }}
              value={product}
              useNativeAndroidPickerStyle={false}
              placeholder={{label: 'Select collection name', value: ''}}
            />
            <Image
             style={{height:14,width:24,marginRight:5,tintColor:'#333333'}}
             source={require('../../../assets/F.png')}/>
            </View> */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      position: 'absolute',
                      bottom: 0,
                      left: 10,
                      right: 0,
                      borderWidth: 0,
                      height: 50,
                      backgroundColor: '#fff',
                    }}>
                    <View></View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        margin: 10,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          setProduct('');
                          refRBSheet.current.close();
                        }}
                        style={{
                          backgroundColor: '#032E63',
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingHorizontal: 15,
                          paddingVertical: 5,
                          borderRadius: 10,
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontFamily: 'Roboto-Medium',
                            fontSize: 13,
                          }}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleMove()}
                        style={{
                          backgroundColor: '#032E63',
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingHorizontal: 15,
                          paddingVertical: 5,
                          borderRadius: 10,
                          marginLeft: 20,
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontFamily: 'Roboto-Medium',
                            fontSize: 13,
                          }}>
                          Submit
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </RBSheet>

                <View style={{height: 15}} />
              </View>
            )}
          />
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
  {name: 'narr'},
  {name: 'dgsadf'},
  {name: 'narr'},
  {name: 'dgsadf'},
];

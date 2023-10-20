import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Path from '../../../components/ImagePath';
import Loader from '../../../components/Loader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {RadioButton} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import RBSheet from 'react-native-raw-bottom-sheet';
import RNPickerSelect from 'react-native-picker-select';
import MultiSelect from 'react-native-multiple-select';

const MyCatalogueDetaill = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const selector1 = useSelector(state => state.Catalogue.CollectionDetails);
  const collectionList = useSelector(state => state.Catalogue.Catalogue);
  const isFetching = useSelector(state => state.Catalogue.isFetching);
  const [fetching, setFetching] = useState(false);
  const selector = selector1?.collectiondetails;
  const [active, setActive] = useState('checked');
  const [inactive, setInActive] = useState('unchecked');
  const [branch, setBranch] = useState(false);
  const [selected, setSelected] = useState([]);
  const refRBSheet = useRef();
  const [product, setProduct] = useState('');
  // console.log('this is product',product[0]);
  const manageActive = () => {
    setActive('checked');
    setInActive('unchecked');
  };

  const manageInActive = () => {
    setActive('unchecked');
    setInActive('checked');
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
        data.append('collectionId', selector.SrNo);
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
        // console.log('thissi is rresponse');
        if (response.data.status) {
          setFetching(false);
          Toast.show(response.data.msg);
        } else {
          setFetching(false);
          Toast.show(response.data.msg);
          // console.log('thissi is rresponseelse');
        }
      } catch (error) {
        setFetching(false);
        // console.log('this isi error', error);
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
      // console.log('thissi is rresponse', response);
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
    // console.log('this i item srno',item.pcm_srno);

    try {
      setFetching(true);
      const data = {
        proCollectMapSrNo: item.pcm_srno,
        moveCollectionSrNo: product[0],
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
      // console.log('thissi is rresponse', response);
      if (response.data.status) {
        setFetching(false);
        Toast.show(response.data.msg);
        dispatch({
          type: 'Get_Catalogue_Request',
          url: '/listCollection',
          user_id: user_id,
          // navigation
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
      selector1?.products.map(item => {
        setSelected(prevState => [...prevState, item.SrNo]);
      });
    } else {
      setSelected([]);
    }
  };
  // console.log('this i selected',selected);
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
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
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
            View Collection
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
      <ScrollView style={{flex: 1}}>
        <View style={{paddingHorizontal: 12}}>
          <View style={{paddingHorizontal: 11, marginTop: 40}}>
            <Image
              style={{height: 150, width: '100%', borderRadius: 13}}
              source={{
                uri: `https://olocker.co${selector.ImageUrl}${selector.ImageName}`,
              }}
            />
          </View>
          <View
            style={{
              width: '100%',
              marginTop: 20,
            }}>
            <View style={{paddingHorizontal: 1}}>
              <Text
                style={{
                  fontFamily: 'Roboto-Medium',
                  fontSize: 16,
                  color: '#000',
                }}>
                {selector?.Name}
              </Text>
              <Text
                style={{
                  fontFamily: 'Roboto-Medium',
                  fontSize: 14,
                  color: '#000',
                  marginTop: 6,
                }}>
                {selector?.Title}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 6,
                  marginLeft: -6,
                }}>
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
                  {selector.IsActive == 0 ? 'In Active' : 'Active'}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 16,
                    fontFamily: 'Roboto-Medium',
                  }}>
                  Description
                </Text>
              </View>
              <View style={{marginTop: 10}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000',
                    fontFamily: 'Roboto-Regular',
                  }}>
                  {selector?.Description}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 15,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                fontFamily: 'Roboto-Medium',
              }}>
              Product View
            </Text>
            {selected.length > 0 ? (
              <TouchableOpacity
                onPress={() => addProduct()}
                style={{
                  backgroundColor: '#032e63',
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#fff', fontFamily: 'Roboto-Medium'}}>
                  Add Product
                </Text>
              </TouchableOpacity>
            ) : null}
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
            data={selector1?.products}
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
                      uri: `https://olocker.co${selector.ImageUrl}${selector.ImageName}`,
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
                      {item.Name}
                    </Text>
                    <TouchableOpacity
                      style={{borderWidth: 0}}
                      onPress={() => removeProduct(item)}>
                      <Image
                        style={{width: 16, height: 16, marginLeft: 10}}
                        source={require('../../../assets/supplierImage/trash.png')}
                      />
                    </TouchableOpacity>
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
                      }}>{`  ${item.Name}`}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 20,
                    }}>
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
                        borderWidth: 1,
                      }}>
                      <Text
                        style={{color: '#032E63', fontFamily: 'Roboto-Medium'}}>
                        View
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#032E63',
                        paddingHorizontal: 20,
                        paddingVertical: 7,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                      }}>
                      <Text
                        style={{color: '#fff', fontFamily: 'Roboto-Medium'}}>
                        Send Message
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => refRBSheet.current.open()}
                      style={{
                        backgroundColor: '#032E63',
                        paddingHorizontal: 20,
                        paddingVertical: 7,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                      }}>
                      <Text
                        style={{color: '#fff', fontFamily: 'Roboto-Medium'}}>
                        Move
                      </Text>
                    </TouchableOpacity>
                  </View>
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
                        onPress={() => {
                          refRBSheet.current.close();
                          handleMove(item);
                        }}
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
        <View style={{height: 100}} />
      </ScrollView>
    </View>
  );
};
export default MyCatalogueDetaill;

const data = [
  {name: 'narr'},
  {name: 'dgsadf'},
  {name: 'narr'},
  {name: 'dgsadf'},
];

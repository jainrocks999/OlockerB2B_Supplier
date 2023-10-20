import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Path from '../../../components/ImagePath';
import Loader from '../../../components/Loader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
const MyCatalogue = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state.Catalogue.Catalogue);
  const isFetching = useSelector(state => state.Catalogue.isFetching);
  const navigation = useNavigation();
  const [fetching, setFetching] = useState(false);

  const validateUser = async item => {
    // console.log('this is iteem', item);
    const Token = await AsyncStorage.getItem('loginToken');
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      setFetching(true);
      const data = {
        SrNo: item.SrNo,
      };

      const response = await axios({
        method: 'GET',
        data,
        headers: {
          'content-type': 'application/json',
          Olocker: `Bearer ${Token}`,
        },
        url: `https://olocker.co/api/supplier//removeCollection?SrNo=${item.SrNo}`,
      });
      // console.log('thissi is rresponse', response.data);
      if (response.data.status) {
        setFetching(false);
        // console.log('thissi is rresponse1', response.data.status);
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

        // console.log('thissi is rresponseelse');
      }
    } catch (error) {
      setFetching(false);
      console.error(error.response.data);
      // console.log('this isi error', error);
    }
  };

  const collectionDetail = item => {
    dispatch({
      type: 'Collection_Detail_Request',
      url: '/getColllectionProductList',
      collectionSrNo: item.SrNo,
      navigation,
    });
  };

  const addProduct = () => {
    // dispatch({
    //   type: 'Olocker_Product_Request',
    //   url: '/getSelfProductList',
    //   search_key: '',
    //   fromPrice:'',
    //   toPrice:'',
    //   minWeight:'',
    //   maxWeight:'',
    //   SupplierId:'',
    //   userCollectionType:'btnPartner',
    //   start:'0',
    //   limit:'10',
    //   navigation
    //  })
    dispatch({
      type: 'Self_Product_Request',
      url: '/getSelfProductList',
      search_key: '',
      fromPrice: '',
      toPrice: '',
      minWeight: '',
      maxWeight: '',
      SupplierId: '',
      userCollectionType: 'btnPartner',
      start: '0',
      limit: '10',
      navigation,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
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
            My Collection
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
      <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                color: '#000',
                fontSize: 18,
                fontFamily: 'Roboto-Medium',
              }}>
              My Catalogue
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Addcollection')}
            style={{
              backgroundColor: '#032e63',
              paddingHorizontal: 20,
              paddingVertical: 7,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontFamily: 'Roboto-Medium',
              }}>
              Add Collection
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 10, marginBottom: 110}}>
          <FlatList
            data={selector}
            numColumns={2}
            renderItem={({item}) => (
              <View
                style={{
                  width: '45%',
                  // height:200,
                  margin: 10,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.2,
                  shadowRadius: 5,
                  elevation: 5,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  padding: 10,
                }}>
                <View style={{width: '100%'}}>
                  <Image
                    resizeMode="contain"
                    style={{height: 140, width: '100%', borderRadius: 10}}
                    source={{uri: `https://olocker.co${item.ImageUrl}`}}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 13,
                        fontFamily: 'Roboto-Medium',
                        width: '60%',
                      }}>{`${item.Title}`}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('EditCollection', {
                            item: item,
                          })
                        }>
                        <Image
                          style={{width: 16, height: 16}}
                          source={require('../../../assets/supplierImage/pencil.png')}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => validateUser(item)}>
                        <Image
                          style={{width: 16, height: 16, marginLeft: 10}}
                          source={require('../../../assets/supplierImage/trash.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text
                    style={{
                      color: '#030303',
                      fontSize: 11,
                      fontFamily: 'Roboto-Medium',
                      marginTop: 5,
                    }}>
                    {item.Description}
                  </Text>

                  <TouchableOpacity
                    disabled={item.product == 0 ? true : false}
                    onPress={() => collectionDetail(item)}
                    style={{
                      width: '100%',
                      height: 30,
                      backgroundColor: item.product == 0 ? 'grey' : '#032e63',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 10,
                      borderRadius: 20,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 13,
                        fontFamily: 'Roboto-Medium',
                      }}>
                      View
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => addProduct()}
                    style={{
                      width: '100%',
                      height: 30,
                      backgroundColor: '#032e63',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 10,
                      borderRadius: 20,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 13,
                        fontFamily: 'Roboto-Medium',
                      }}>
                      Add Product
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};
export default MyCatalogue;

const data = [
  {name: 'narr'},
  {name: 'dgsadf'},
  {name: 'narr'},
  {name: 'dgsadf'},
];

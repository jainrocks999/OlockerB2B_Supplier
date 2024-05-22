import React from 'react';
import { View, FlatList, TouchableOpacity, Text, Image,Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ImagePath from '../../components/ImagePath';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
const Catalogue = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const categiroes = useSelector(state => state.Auth.SupplierCategories);
  const isFetching = useSelector(state => state.Auth.isFetching)
  const win = Dimensions.get('window');
  // // console.log('categiroes   list  show on ', categiroes);

  const ProductList1 = async item => {
    const partnerId=await AsyncStorage.getItem('partnerId')
    console.log(item);
    navigation.navigate('ProductTypeListDetails', {
      id: item.Id,
      name: item.Value,
      userType:'partner',
      productRequestId:partnerId
    })
    // const supplier = await AsyncStorage.getItem('supplierID');
    // const Token = await AsyncStorage.getItem('loginToken');
    // dispatch({
    //   type: 'User_SupplierProductList_Request',
    //   url: 'partners/productTypeProducts',
    //   userId: supplier,
    //   userType: 'supplier',
    //   typeId: item.Id,
    //   Token: Token,
    //   name: item.Value,
    //   navigation,
    // });
  };

  return (
    <View>

      <View
        style={{
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 14,
        }}>
        <Text
          style={{
            fontSize: 19,
            fontWeight: '700',
            fontFamily: 'Roboto-Medium',
            color: '#032e63',
          }}>
          Categories{' '}
        </Text>
      </View>
      {isFetching ? <Loader /> : null}
      <FlatList
        data={categiroes}
        numColumns={3}
        style={{marginBottom:5}}
        renderItem={({ item }) => (
          <TouchableOpacity
            // onPress={() => navigation.navigate('MyProductDetails', { id: item.Id })}
            onPress={() => ProductList1(item)}
            // onPress={() => navigation.navigate('MyProductDetails')}
            style={{
              width: '33.3%',
              alignItems: 'center',
              // justifyContent: 'center',
              height: 175,
              backgroundColor: '#fff',
              borderWidth: 0.3,
            }}>
            {/* {// console.log('this is user respons2234', item)} */}
              {item?.ImageName ? <Image
                      style={{
                        width: win.width * 0.33,
                        height: '74%',
                        resizeMode: 'contain',
                        alignSelf: 'center',
                      }}
                      resizeMode='stretch'
                      source={{ uri: `https://olocker.co/uploads/product_type/${item.ImageName}` }}
                    /> : <Image
                      style={{
                        width: win.width * 0.33,
                        height: '74%',
                        resizeMode: 'contain',
                        alignSelf: 'center',
                      }}
                      resizeMode={'stretch'}
                      source={require('../../assets/logo.png')}
                    />}
            {/* <Image
              style={{ height: 100, width: '100%' }}
              // resizeMode={'stretch'}
              // source={require('../../assets/Not.png')}
              source={item.ImageName != null ? {
                uri: `https://olocker.co/uploads/product_type/${item.ImageName}`,
              } : require('../../assets/Not.png')}
            /> */}
            <View style={{
                      marginTop: 5,
                      alignItems: 'center',
                      marginHorizontal:6
                    }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: '#032e63', fontWeight: '700', fontFamily: 'Acephimere',
                          fontSize: 14,
                          
                        }}>
                        {/* {item.productTypeName} */}
                        {item.Value}
                      </Text>
                      <Text
                        style={{
                          color: '#0d0d0d', fontWeight: '700', fontFamily: 'Acephimere',
                          fontSize: 14,
                        }}>
                        {item.pTotal <= 0
                          ? `${item.pTotal} Item`
                          : `${item.pTotal} Items`}
                      </Text>
                    </View>
            {/* <View style={{ marginTop: 5, alignItems: 'center' }}>
              <Text
                style={{
                  fontFamily: 'Acephimere',
                  fontSize: 14,
                  color: '#032e63',
                  fontWeight: '700',
                }}>
                {item.Name}
              </Text>
              <Text
                style={{
                  fontFamily: 'Acephimere',
                  fontSize: 14,
                  color: '#0d0d0d',
                }}> {item.pTotal <= 0
                  ? `${item.pTotal} Item`
                  : `${item.pTotal} Items`}</Text>
            </View> */}
          </TouchableOpacity>
        )}
      />
      {/* <View style={{backgroundColor:'#fff'}}>
          <View style={{alignItems:'center',paddingVertical:20}}>
             <Text style={{fontSize:16,fontWeight:'700',fontFamily:'Roboto-Medium',color:'#032e63'}}>Collections</Text>
          </View>
           <View style={{width:'100%',height:180,borderTopWidth:1}}>

           </View>
           <View style={{width:'100%',height:180,borderTopWidth:1}}>

           </View>
           <View style={{width:'100%',height:180,borderWidth:1}}>

           </View>
        </View> */}
    </View>
  );
};
export default Catalogue;
const data1 = [
  { title: require('../../assets/Image/myjewlery.png') },
  { title: require('../../assets/Image/myjewlery.png') },
  { title: require('../../assets/Image/myjewlery.png') },
  { title: require('../../assets/Image/myjewlery.png') },
  { title: require('../../assets/Image/myjewlery.png') },
  { title: require('../../assets/Image/myjewlery.png') },
  { title: require('../../assets/Image/myjewlery.png') },
  { title: require('../../assets/Image/myjewlery.png'), type: 'add' },
];

const data = [
  {
    image: '',
    name: 'RC Bafna Jewllers',
    city: 'Mumbai',
    time: '17 Minutes ago',
  },
  {
    image: '',
    name: 'RC Bafna Jewllers',
    city: 'Mumbai',
    time: '17 Minutes ago',
  },
  {
    image: '',
    name: 'RC Bafna Jewllers',
    city: 'Mumbai',
    time: '17 Minutes ago',
  },
];

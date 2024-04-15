import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import BottomTab from '../../../components/StoreButtomTab';
import Loader from '../../../components/Loader';
import { useSelector, useDispatch } from 'react-redux';
import ImagePath from '../../../components/ImagePath';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { types } from 'react-native-document-picker';
import { useIsFocused } from '@react-navigation/native';
const HomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const isFetching = useSelector(state => state.Home.isFetching);
  const selector = useSelector(state => state.Home.NetworkList1?.partnerApprovedRequest);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState(selector);
  const [masterDataSource, setMasterDataSource] = useState(selector);
  const win = Dimensions.get('window');

  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = `${item.CityName} ${item.CompanyName} `
          ? `${item.CityName} ${item.CompanyName}`.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const handleSearch = () => {
    setSearch('');
    setFilteredDataSource(masterDataSource);
  };
  useEffect(() => {
   
    if (isFocused) {
      setFilteredDataSource()
      ApiCallWithUseEffect();
    }
  }, [isFocused]);
  const ApiCallWithUseEffect = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    dispatch({
      type: 'Network_ApprovedRequestList_Request',
      url: '/partnerApprovedRequestList',
      userId: user_id,
      userRole: 6,
    });
  }

  const supplierprofile = async (id) => {
    const user_id = await AsyncStorage.getItem('user_id');
    dispatch({
      type: 'get_networkretailerdetail_request',
      partnerId: id.PartnerSrNo,
      supplierId:user_id,
      url: 'getNetworkRetailerDeatils',
      navigation,
    });
  };


  // const supplierprofile = async (id) => {
  //   const Token = await AsyncStorage.getItem('loginToken');
  //   const srno = await AsyncStorage.getItem('Partnersrno');
  //   AsyncStorage.setItem('supplierID', id.SupplierSrNo);
  //   dispatch({
  //     type: 'User_SupplierCategories_Request',
  //     url: 'partners/productTypeList',
  //     userId: id.SupplierSrNo,
  //     userType: 'supplier',
  //     Token: Token,
  //   });
  //   dispatch({
  //     type: 'User_supplierDetail_Request',
  //     url: '/partners/supplierDetail',
  //     supplierId: id.SupplierSrNo,
  //     Token: Token,
  //     partnerId:srno,
  //     supplier_id: id.SupplierSrNo,
  //     navigation,
  //     Status: 2,

  //   })
  // }

  return (
    <View style={{ flex: 1, backgroundColor: '#f0eeef' }}>
      <Header
        source={require('../../../assets/L.png')}
        source2={require('../../../assets/Image/dil.png')}
        source1={require('../../../assets/Fo.png')}
        title={'My Network '}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('Message')}
        onPress2={() => navigation.navigate('FavDetails')}
      />
       {isFetching ? <Loader /> : null}
       {
        selector?.length==0?
            <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', height: '90%',}}>
              <Text style={{
        fontFamily: 'Acephimere',
        fontSize: 19,
        color: 'grey', fontWeight: '700'
    }}> {'No Partners found in your network'} </Text>
<TouchableOpacity
              onPress={() => navigation.navigate('MyNetwork')}
              style={{
                height: 40,marginTop:30,
                width: 130,
                backgroundColor: '#e9056b',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{ color: '#fff', fontFamily: 'Acephimere', fontSize: 15 }}>
                Add Partners
              </Text>
              </TouchableOpacity>
            </View>
            :
            <ScrollView>
      <View>
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 10,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
         
          <View style={{ width: '50%' }}>
            <Text style={{ color: '#565656', fontFamily: 'Acephimere' }}>
              {selector?.length <= 1
                ? `${selector?.length} Partner`
                : `${selector?.length} Partners`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '50%',
              justifyContent: 'center',
            }}>
            <View
              style={{
                borderWidth: 1,
                flexDirection: 'row',
                borderRadius: 30,
                paddingHorizontal: 10,
                width: '80%',
                backgroundColor: '#fff',
                marginLeft: 10,
                alignItems: 'center',
                height: 35,
              }}>
              <Image
                style={{
                  height: 13,
                  width: 20,
                  tintColor: '#474747',
                  marginLeft: 5,
                }}
                resizeMode={'contain'}
                source={require('../../../assets/Image/serch.png')}
              />
              <TextInput
                placeholder="Search"
                placeholderTextColor={'#474747'}
                style={{
                  fontFamily: 'Acephimere',
                  fontSize: 13,
                  height: 34,
                  marginTop: 4,
                  width: '100%',
                  color: '#474747',
                }}
                value={search}
                onChangeText={val => searchFilterFunction(val)}
              />
            </View>
          </View>
        </View>

        {/* filteredDataSource */}
        <FlatList
          data={filteredDataSource ? filteredDataSource : selector}
          numColumns={2}
          style={{ margin: 10, marginTop: 20, marginBottom: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => supplierprofile(item)

                // navigation.navigate('PartnerProfile')
              }
              style={{
                width: '47%',
                margin: 5,
                borderRadius: 20,
                height: 200,
                marginTop: 0,
              }}>
              
              <View
                style={{
                  height: 120,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                }}>
                <Image
                  style={{
                    height: 120,
                    width: '100%',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                  }}
                  source={ item.Logo
                    ? { uri: `${item.url}${item.Logo}` }: require('../../../assets/logo.png')}

                />
              </View>
              <View
                style={{
                  backgroundColor: '#fff',
                  //  height:80,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  padding: 10,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#032e63',
                    fontSize: 15,
                    fontFamily: 'Acephimere',
                  }}>
                  {item.CompanyName}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Acephimere',
                    color: '#666666',
                    fontSize: 12,
                  }}>
                  {item.CityName}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
     
      </View>
      </ScrollView>
}  
      <StatusBar />
    </View>
  );
};
export default HomeScreen;
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

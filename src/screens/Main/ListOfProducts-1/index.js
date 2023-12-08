import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextInput} from 'react-native';
import CategoryViewModal from '../Modal/categoryList';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../../components/Loader';

const ListOfProduct = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const dispatch = useDispatch();
  const [ViewModal, setViewModal] = useState(false);
  const [value, setValue] = useState(null);
  const [modalData, setModalData] = useState('');
  const [SearctTxt, setSearctTxt] = useState('');
  const navigation = useNavigation();
  const selector = useSelector(state => state.Catalogue.Products);
  const isFetching = useSelector(state => state.Catalogue.isFetching);
  const isFetching2 = useSelector(state => state.Auth.isFetching);
  const setModalDetails = details => {
    setModalData(details);
    setViewModal(true);
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
  const proctDetail = async item => {
    console.log('callrd');
    const user_id = await AsyncStorage.getItem('user_id');
    dispatch({
      type: 'product_detail_request',
      url: 'productDetails',
      productId: item.productId,
      supplierSrNo: user_id,
      navigation,
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {isFetching || isFetching2 ? <Loading /> : null}
      <ScrollView contentContainerStyle={{}}>
        <CategoryViewModal
          visi={ViewModal}
          close={() => setViewModal(false)}
          data={modalData}
        />
        <View style={styles.container}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              delayPressIn={0}
              onPress={() => navigation.goBack()}>
              <Image
                style={styles.img}
                source={require('../../../assets/L.png')}
              />
            </TouchableOpacity>
            <Text style={[styles.text, {marginLeft: 15}]}>
              List Of Products
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
              style={{marginLeft: 15}}
              onPress={() => handleWishList()}>
              <Image
                style={styles.img2}
                source={require('../../../assets/Image/dil.png')}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => Logout()}>
              <Image
                style={styles.img3}
                source={require('../../../assets/Image/menu-icon.png')}
              />
            </TouchableOpacity> */}
          </View>
        </View>

        <View style={[styles.searchbar, {marginTop: 20}]}>
          <TextInput
            value={SearctTxt}
            onChangeText={txt => setSearctTxt(txt)}
            placeholder="Search"
            style={{fontSize: 18, width: '90%', color: 'black'}}
            placeholderTextColor={'grey'}
          />
          <View
            style={{
              alignItems: 'center',

              justifyContent: 'center',
            }}>
            <Feather name="search" size={30} color={'grey'} />
          </View>
        </View>

        <View style={{marginHorizontal: 10}}>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 5,
              fontWeight: '600',
              color: '#000',
            }}>
            Show
          </Text>

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={styles.itemTxt}
            data={DropData}
            maxHeight={250}
            labelField="label"
            valueField="value"
            placeholder="Select "
            value={value}
            onChange={item => {
              setValue(item.value);
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#032E63',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 10,
            height: 50,
            borderRadius: 20,
            marginVertical: 20,
          }}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
            Excel
          </Text>
        </TouchableOpacity>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <FlatList
            data={selector}
            style={{width: '96%'}}
            numColumns={2}
            // contentContainerStyle={{justifyContent:'center',}}
            renderItem={({item, index}) => (
              <View
                style={{
                  width: '46%',
                  margin: 7,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.2,
                  shadowRadius: 5,
                  elevation: 5,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  paddingBottom: 10,
                }}>
                <View
                  style={{
                    padding: 0,
                    height: hp('3%'),
                    backgroundColor: '#7fb582',
                    borderWidth: 0,
                    marginTop: 0,
                    borderRadius: 10,
                    borderBottomStartRadius: 0,
                    marginVertical: 5,
                    borderTopEndRadius: 0,
                    borderBottomEndRadius: 20,
                    alignContent: 'center',
                    paddingLeft: 5,
                  }}>
                  <Text style={{color: '#fff'}}>Gross wt {item.grossWt}</Text>
                </View>
                <TouchableOpacity onPress={() => proctDetail(item)}>
                  <Image
                    style={{height: 144, width: '100%', borderRadius: 10}}
                    source={{uri: item.images}}
                  />
                  <View style={{marginTop: 10}}>
                    <Text
                      style={{
                        fontFamily: 'Roboto-Medium',
                        fontSize: 14,

                        color: '#666666',
                      }}>
                      Product Name : {item.productTypeName}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Roboto-Medium',
                        fontSize: 14,
                        color: '#666666',
                      }}>
                      ProductSku : {item.productSku}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Roboto-Medium',
                        fontSize: 14,
                        color: '#666666',
                      }}>
                      Price : {item.productPrice}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <View
          style={{
            marginVertical: 40,
            alignItems: 'center',

            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#032e63',
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 20,
            }}>
            <Text style={{color: 'white'}}>More..</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
export default ListOfProduct;

const DropData = [
  {label: '10', value: '1'},
  {label: '25', value: '2'},
  {label: '50', value: '3'},
  {label: '100', value: '4'},
];

const Offer = [
  {
    ProductSku: '10BAI-683',
    ProductUniqueld: '10BAI-683',
    ProductType: 'Lorem Ipsum',
    NetWT: 80000,
    Price: '₹4389015.19',
    PreInsured: 'NO',
    isBestSeller: true,
  },
  {
    ProductSku: -'10BAI-683',
    ProductUniqueld: '10BAI-683',
    ProductType: 'Lorem Ipsum',
    NetWT: 80000,
    Price: '₹4389015.19',
    PreInsured: 'NO',
    isBestSeller: true,
  },
  {
    ProductSku: -'10BAI-683',
    ProductUniqueld: '10BAI-683',
    ProductType: 'Lorem Ipsum',
    NetWT: 80000,
    Price: '₹4389015.19',
    PreInsured: 'NO',
    isBestSeller: true,
  },
];

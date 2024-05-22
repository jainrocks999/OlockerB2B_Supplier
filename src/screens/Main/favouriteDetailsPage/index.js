import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  Dimensions,
  Share,
  Alert,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import Header from '../../../components/CustomHeader';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import ImagePath from '../../../components/ImagePath';
import styles from './styles';
import Loader from '../../../components/Loader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../../../Redux/Constants';

const FavouriteList = () => {
  const navigation = useNavigation();
  const [liked, setLiked] = useState([]);
  const win = Dimensions.get('window');
  const isFocuse = useIsFocused();
  const selector = useSelector(state => state.Home.getWishList);
  const isFetching1=useSelector(state=>state.Catalogue.isFetching)

const Filter =()=>{

 return selector?.wishlistitems.filter((item)=>item!=false
  )
}
  console.log('this is selector', selector);
  useEffect(() => {
    RetailerRequest();
  }, [isFocuse]);

  const isFetching = useSelector(state => state.Home.isFetching);
  const dispatch = useDispatch();

  const imagePath = selector?.imagepath;

  const share = async (item) => {
    // console.log('this is itm',item);

    await Share.share({
      message: `Product Name : ${item.ItemName} \nProduct Price : ${item.ProductsPrice} \nProduct Description : ${item.ItemDesc}`,
    });
  };

  const RetailerRequest = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    dispatch({
      type: 'getWishList_request',
      url: '/wishListProduct',
      userId: user_id,
    });
  };
  const RemoveWhishList = async id => {
    console.log('called');
    const user_id = await AsyncStorage.getItem('user_id');
    const Token = await AsyncStorage.getItem('loginToken');
    const data = {
      productId: id,
      SupplierSrNo: user_id,
      userType: 'supplier',
    };

    try {
      const response = await axios({
        method: 'GET',
        url: Constants.MainUrl + 'removeProductWishlist',
        params: data,
        headers: {
          Olocker: `Bearer ${Token}`,
        },
      });

      if (response.status) {
        RetailerRequest();
        Toast.show('The product has been Removed to your wishlist', Toast.LONG);
      } else {
        alert('Item Not Remove This Time');
      }
    } catch (error) {
      //   throw error;
      console.log(error);
    }
  };
  console.log('this is wishlist item', JSON.stringify(selector?.wishlistitems));

  const productDetail = async item => {
    console.log('this is product',item);
    const user_id = await AsyncStorage.getItem('user_id');
    dispatch({
      type: 'product_detail_request',
      url: 'productDetails',
      productId: item.SrNo,
      supplierSrNo: user_id,
      navigation,
    });
  };

  return (
    <View style={styles.container}>
      {isFetching ||isFetching1 ? <Loader /> : null}
      <Header
        source={require('../../../assets/L.png')}
        source2={require('../../../assets/Fo.png')}
        //  source2={require('../../../assets/Image/dil.png')}
        title={'Wishlist'}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('Message')}
      />

      <ScrollView>
        <View style={styles.main}>
         {Filter()?.length > 0? <View>
            <Text style={styles.text}>{Filter()?.length == 1 ? `${Filter()?.length} Item` : `${Filter()?.length} Items`}</Text>
          </View>:null}
        </View>
        <View style={styles.card}>
          {Filter()?.length>0 ? (
            <FlatList
              data={Filter()}
              numColumns={2}
              renderItem={({item, index}) => {
                return item != false ? (
                  <TouchableOpacity onPress={()=>productDetail(item)} style={styles.cardview}>
                    <View
                      style={{
                        height: hp('100%'),
                        width: wp('45%'),
                        maxHeight: hp('25%'),
                        borderWidth: 0,
                      }}>
                        <View style={{ height: hp('7%'), width: '100%', borderWidth: 0 }}>
                      <View
                        style={{
                          padding: 0,
                          height: hp('5%'),
                          width: '18%',
                          borderWidth: 0,
                          marginTop: 0,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            RemoveWhishList(item?.SrNo);
                          }}>
                          <Image
                            style={{
                              height: hp('2.3%'),
                              width: wp('5.5%'),
                              marginLeft: 5,
                              marginTop: 5,
                              tintColor: 'red',
                            }}
                            source={require('../../../assets/Image/dil.png')}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => share(item)}>
                          <Image
                            style={{
                              height: hp('2%'),
                              width: wp('5.7%'),
                              marginTop: 10,
                              marginLeft: 8,
                            }}
                            source={require('../../../assets/Image/share1.png')}
                          />
                        </TouchableOpacity> 
                      </View>

                      <View
                        style={{
                          borderTopRightRadius: 10,
                          borderBottomLeftRadius: 10,
                          backgroundColor: '#24a31e',
                          marginTop: Platform.OS == 'android' ? hp('-5%') : -44,
                          alignSelf: 'flex-end',
                          height: hp('2.4%'),
                          width: '45%',
                          marginRight:-1
                        }}>
                        <Text style={styles.cardview2text}>
                         { parseFloat(item?.GrossWt)?.toFixed(2)}
                          <Text style={styles.cardview2text}> GM</Text>
                          </Text>
                      </View>
                      </View>
                      <View
                      
                        // onPress={() => manageCategory1(item.Product)}
                        style={{
                          height: hp('13%'),
                          width: wp('33%'),
                          marginLeft: 19,
                          maxHeight: hp('14%'),
                          borderWidth: 0,
                        }}>
                        <Image
                          style={{
                            width: win.width * 0.35,
                            height: '100%',
                            resizeMode: 'contain',
                            alignSelf: 'center',
                            // borderWidth: 5,
                          }}
                          source={item.ImageName ?{uri: `${imagePath}/${item.ImageName}`}:require('../../../assets/logo.png')}
                         
                        />
                      </View>
                      <View
                      style={{  width: '100%', marginLeft: 20,marginTop:5 }}>
                      <Text style={styles.cardbottomtext}>{`ID# ${item.ProductSku}`}</Text>
                      <View style={styles.cardbottom1}>
                        <Image
                          style={{ width: 16, height: 18 }}
                          source={require('../../../assets/Image/rupay.png')}
                        />
                        <Text style={styles.cardbottom1text}>{parseFloat(item.ProductsPrice==null?0:item.ProductsPrice)?.toFixed(2)}</Text>
                      </View>
                    </View>
                      {/* <View
                        style={{
                          width: '100%',
                          // marginLeft: 5,
                          paddingHorizontal:5,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop:5
                        }}>
                        <Text style={styles.cardbottomtext}>ProductID:-</Text>
                        <Text
                          style={{
                            fontWeight: '500',
                             width: '50%',
                            color: 'grey',
                          }}>
                          {item?.ProductSku?.substring(0, 10)}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          marginLeft: 5,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={styles.cardbottomtext}>
                         Name:-
                        </Text>
                        <Text
                          style={{
                            fontWeight: '400',
                            width: '50%',
                            color: 'grey',
                          }}>
                          
                          {item.ItemName?.substring(0, 10)}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          marginLeft: 5,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={styles.cardbottomtext}>
                           Price:-
                        </Text>
                        <Text
                          style={{
                            fontWeight: '500',
                            width: '50%',
                            color: 'grey',
                          }}>
                          {' '}
                          {item.ProductsPrice?.substring(0, 8)}
                        </Text>
                      </View>

                      <View
                        style={{
                          width: '100%',
                          marginLeft: 5,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={styles.cardbottomtext}>
                         GrossWt:-
                        </Text>
                        <Text
                          style={{
                            fontWeight: '500',
                            width: '50%',
                            color: 'grey',
                          }}>
                          {' '}
                          {`${item.GrossWt?.substring(0, 4)} GM`}
                        </Text>
                      </View> */}

                    </View>
                    {/* <View
                      style={{
                        borderTopRightRadius: 10,
                        borderBottomLeftRadius: 10,
                        backgroundColor: '#24a31e',
                        marginTop:45,
                        marginRight: 8,
                        marginVertical: 10,
                        alignSelf: 'flex-end',
                        //   marginRight:10,
                        height: hp('2.4%'),
                        width: '40%',
                      }}>
                      <Text
                        style={
                          styles.cardview2text
                        }>{`${item.GrossWt?.substring(0, 4)} GM`}</Text>
                    </View> */}
                  </TouchableOpacity>
                ) : null;
              }}
            />
          ) : (
            <Text
              style={{
                fontSize: wp(5),
                alignSelf: 'center',
                fontFamily: 'Roboto-Medium',
                fontWeight: '400',
                marginTop: wp(45),color:'grey'
              }}>
              No Data Found{' '}
            </Text>
          )}
        </View>
        <View style={{height: 70}} />
      </ScrollView>
    </View>
  );
};
export default FavouriteList;
const data1 = [
  {
    title: 'Milind Jewellers',
    title1: require('../../../assets/Image/Not.jpeg'),
    text: 'We can supply product you have as..',
    time: 'Last replied on 07 Sep,2020',
  },
  {
    title: 'Mahabir Jewellers',
    title1: require('../../../assets/Image/Not.jpeg'),
    text: 'Payments term can be discussed as per..',
    time: 'Last replied on 01 Sep,2020',
  },
  {
    title: 'Narendra Jewellers',
    title1: require('../../../assets/Image/Not.jpeg'),
    text: 'We can supply product you have as..',
    time: 'Last replied on 03 Sep,2020',
  },
];

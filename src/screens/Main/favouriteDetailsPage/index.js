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

  const share = async () => {
    await Share.share({
      message: `Product Name : ${name} \nProduct Price : ${pr} \n Product Description : ${Description}`,
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

  return (
    <View style={styles.container}>
      {isFetching ? <Loader /> : null}
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
          <View>
            {/* <Text style={styles.text}>{WishList.length == 1 ? `${WishList.length} Item` : `${WishList.length} Items`}</Text> */}
          </View>
        </View>
        <View style={styles.card}>
          {Filter()?.length>0 ? (
            <FlatList
              data={Filter()}
              numColumns={2}
              renderItem={({item, index}) => {
                return item != false ? (
                  <View style={styles.cardview}>
                    <View
                      style={{
                        height: '100%',
                        width: wp('45%'),
                        maxHeight: hp('25%'),
                        borderWidth: 0,
                        borderColor: 'red',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginVertical: 5,
                          marginHorizontal: 5,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            RemoveWhishList(item?.SrNo);
                          }}>
                          <Image
                            style={{
                              height: hp('2.4%'),
                              width: wp('5.8%'),
                              marginLeft: 5,
                              marginVertical: 5,
                              marginTop: 2,
                              tintColor: 'red',
                              alignSelf: 'flex-end',
                            }}
                            source={require('../../../assets/Image/dil.png')}
                          />
                        </TouchableOpacity>

                        {/* <TouchableOpacity
                      onPress={() => {
                        RemoveWhishList(item?.SrNo);
                      }}
                      style={{marginLeft: 2}}>
                      <MaterialCommunityIcons name="delete" size={30} />
                    </TouchableOpacity> */}
                      </View>

                      <TouchableOpacity
                        // onPress={() => manageCategory1(item.Product)}
                        style={{
                          height: hp('25%'),
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
                          source={{uri: `${imagePath}/${item.ImageName}`}}
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          width: '100%',
                          // marginLeft: 5,
                          paddingHorizontal:5,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
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
                      </View>

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
                  </View>
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

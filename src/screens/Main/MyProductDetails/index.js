import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  Dimensions,
  Platform,
  Share,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import TabView from '../../../components/StoreButtomTab';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
import Loader from '../../../components/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {types} from 'react-native-document-picker';
const MyProducts = ({route}) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const name = route.params.name;
  const name1 = route.params.name;
  const partner = route.params.ProductL;
  const selector = useSelector(state => state.ProductList?.list);
  const selector1 = useSelector(state => state.SupplierProduct?.list);
  const isFetching = useSelector(state => state.isFetching);
  // console.log('slector........', partner ? selector : selector1);
  const [liked, setLiked] = useState([]);
  const [search, setSearch] = useState('');

  const win = Dimensions.get('window');

  const [click1, setClick1] = useState(false);
  const [id, setId1] = useState([]);
  const click = id => {
    setClick1(id);
    setId1(id);
  };
  const share = async id => {
    let pr = id.Price;
    let name = id.ItemName;
    let Description = id.Description;
    await Share.share({
      message: `Product Name : ${name} \nProduct Price : ${pr} \n Product Description : ${Description}`,
    });
  };

  const ProductDetalis = async item => {
    const partnerid = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken');
    dispatch({
      type: 'User_singleProductDetail_Request',
      url: 'partners/singleProductDetail',
      userId: partnerid,
      userType: 'partner',
      productId: item.SrNo,
      Token: Token,
      name: item.ItemName,
      navigation,
    });
  };

  const ProductDetalis1 = async item => {
    const supplier = await AsyncStorage.getItem('supplierID');
    const Token = await AsyncStorage.getItem('loginToken');
    dispatch({
      type: 'User_SupplierProDetail_Request',
      url: 'partners/singleProductDetail',
      userId: supplier,
      userType: 'supplier',
      productId: item.SrNo,
      Token: Token,
      name: item.ItemName,
      navigation,
    });
  };

  return (
    <View style={styles.container}>
      <Header
        source={require('../../../assets/L.png')}
        source1={require('../../../assets/Fo.png')}
        source2={require('../../../assets/Image/dil.png')}
        title={partner ? `${name}` : `${name1}`}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('Message')}
        onPress2={() => navigation.navigate('FavDetails')}
      />

      <ScrollView>
        {isFetching ? <Loader /> : null}
        <View style={styles.main}>
          <View>
            <Text style={styles.text}>
              {partner
                ? selector.length === 1
                  ? `${selector.length} Item`
                  : `${selector.length} Items`
                : selector1.length === 1
                ? `${selector1.length} Item`
                : `${selector1.length} Items`}
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <FlatList
            data={partner ? selector : selector1}
            numColumns={2}
            // keyExtractor={index => index}
            renderItem={({item, index}) => (
              <View style={styles.cardview}>
                <View
                  style={{
                    height: hp('100%'),
                    width: wp('45%'),
                    maxHeight: hp('25%'),
                    borderWidth: 0,
                    borderColor: 'red',
                  }}>
                  <View
                    style={{height: hp('7%'), width: '100%', borderWidth: 0}}>
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
                          // console.log('liked i ii i ', liked);
                          if (liked.includes(index)) {
                            let unlike = liked.filter(elem => elem !== index);
                            setLiked(unlike);
                          } else {
                            setLiked([...liked, index]);
                          }
                        }}>
                        <Image
                          style={{
                            height: hp('2.7%'),
                            width: wp('6.8%'),
                            marginLeft: 5,
                            marginTop: 7,
                            tintColor: liked.includes(index) ? 'red' : 'grey',
                          }}
                          source={require('../../../assets/Image/dil.png')}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => share(item)}>
                        <Image
                          style={{
                            height: hp('2%'),
                            width: wp('6.1%'),
                            marginTop: 8,
                            marginLeft: 12,
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
                        marginTop: Platform.OS == 'android' ? -36 : -44,
                        alignSelf: 'flex-end',
                        height: hp('2.4%'),
                        width: '45.5%',
                      }}>
                      <Text
                        style={
                          styles.cardview2text
                        }>{`${item.GrossWt?.substring(0, 5)}GM`}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      partner ? ProductDetalis(item) : ProductDetalis1(item);
                    }}
                    style={{
                      height: hp('16.9%'),
                      width: wp('38%'),
                      marginLeft: 19,
                      marginTop: -30,
                      // maxHeight: hp('13%'),
                      borderWidth: 0,
                    }}>
                    <Image
                      style={{
                        width: win.width * 0.33,
                        height: '90%',

                        alignSelf: 'center',
                      }}
                      source={require('../../../assets/Image/Not.jpeg')}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      height: hp('3%'),
                      width: '100%',
                      marginLeft: 20,
                    }}>
                    <Text
                      style={
                        styles.cardbottomtext
                      }>{`ID# ${item.ProductSku}`}</Text>
                    <View style={styles.cardbottom1}>
                      <Image
                        style={{width: 16, height: 20}}
                        source={require('../../../assets/Image/rupay.png')}
                      />
                      <Text style={styles.cardbottom1text}>
                        {item.ProductsPrice?.substring(0, 8) ?? '0'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
        <View style={{height: 70}} />
      </ScrollView>
      <View style={{bottom: 0, left: 0, right: 0, position: 'absolute'}}>
        {/* <TabView /> */}
      </View>
    </View>
  );
};
export default MyProducts;
const data = [
  {title: require('../../../assets/Image/myjewlery.png')},
  {title: require('../../../assets/Image/myjewlery.png')},
  {title: require('../../../assets/Image/myjewlery.png')},
  {title: require('../../../assets/Image/myjewlery.png')},
  {title: require('../../../assets/Image/myjewlery.png')},
  {title: require('../../../assets/Image/myjewlery.png')},
  {title: require('../../../assets/Image/myjewlery.png')},
  {title: require('../../../assets/Image/myjewlery.png')},
];

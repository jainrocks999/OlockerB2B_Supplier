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
} from 'react-native';
import Header from '../../../components/CustomHeader';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import ImagePath from '../../../components/ImagePath';
import styles from './styles';
import Loader from '../../../components/Loader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavouriteList = () => {
  const navigation = useNavigation();
  const [liked, setLiked] = useState([]);
  const win = Dimensions.get('window');
  const isFocuse = useIsFocused();
  const [click1, setClick1] = useState(false);
  const selector = useSelector(state => state.Home.getWishList);

  useEffect(() => {
    RetailerRequest();
  }, [isFocuse]);

  const isFetching = useSelector(state => state.Home.isFetching);
  const dispatch = useDispatch();

const imagePath = selector?.imagepath
  const click = click1 => {
    if (click1) {
      setClick1(false);
    } else {
      setClick1(true);
    }
  };
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
      userId: 10,
    });
  };

  return (
    <View style={styles.container}>
      {isFetching ? <Loader /> : null}
      <Header
        source={require('../../../assets/L.png')}
        source2={require('../../../assets/Fo.png')}
        //  source2={require('../../../assets/Image/dil.png')}
        title={'Favourite List'}
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
          <FlatList
            data={selector?.wishlistitems}
            numColumns={2}
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
                          if (liked.includes(index)) {
                            let unlike = liked.filter(elem => elem !== index);
                            setLiked(unlike);
                          } else {
                            setLiked([...liked, index]);
                          }
                        }}
                        // onPress={() => click(click1)}
                      >
                        <Image
                          style={{
                            height: hp('2.4%'),
                            width: wp('5.8%'),
                            marginLeft: 5,
                            marginVertical: 5,
                            marginTop: 2,
                            tintColor: liked.includes(index) ? 'grey' :'red' ,
                          }}
                          source={require('../../../assets/Image/dil.png')}
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
                        width: '40%',
                        marginRight: 10,
                      }}>
                      <Text style={styles.cardview2text}>{`${item.GrossWt?.substring(0,4)} GM`}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
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
                      source={{uri:`${imagePath}/${item.ImageName}`}}
                    />
                  </TouchableOpacity>
                  <View
                    style={{width: '100%',marginLeft:5,flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={styles.cardbottomtext}>ProductID:-</Text>
                    <Text style={{fontWeight:'500',width:'50%'}}>{item.ProductSku}</Text>
                    
                  </View>
                  <View
                    style={{width: '100%',marginLeft:5,flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={styles.cardbottomtext}>Product Name:-</Text>
                    <Text style={{fontWeight:'500',width:'50%'}}> {item.ItemName}</Text>
                    
                  </View>
                  <View
                    style={{width: '100%',marginLeft:5,flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={styles.cardbottomtext}>Product Price:-</Text>
                    <Text style={{fontWeight:'500',width:'50%'}}> {item.ProductsPrice?.substring(0,8)}</Text>
                    
                  </View>
                </View>
              </View>
            )}
          />
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

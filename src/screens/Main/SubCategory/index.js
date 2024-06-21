import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Image,
  Share,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import TabView from '../../../components/StoreButtomTab';
import {useNavigation} from '@react-navigation/native';
import {FlatListSlider} from 'react-native-flatlist-slider';
import Preview from '../../../components/Preview';
import Banner from '../../../components/Banner/index2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../../components/Loader';
import { SliderBox } from "react-native-image-slider-box";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Mat from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from "react-native-simple-toast";

const SubCategory = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const selector = useSelector(state => state.ProductDetail?.detail);
  const selector1 = useSelector(state => state.SupplierProDetail?.detail);
  const productData = useSelector(state => state.Catalogue?.productData);
  const isFetching4 = useSelector(state => state.Catalogue?.isFetching);
  const ima = productData?.productdetails?.productimages;
  const Detail = 'route.params.Details';
  const productImage = () => {
    const img = ima
      ? ima?.map(item => {
          return `https://olocker.co/uploads/product/${item?.ImageName}`;
        })
      : [];

    return img;
  };
  const isFetching = useSelector(state => state.isFetching);
  const [collection, setCollection] = useState(
    Detail ? selector?.ProductSku : selector1?.ProductSku,
  );
  const [stockNo, setStock] = useState(
    Detail ? selector?.ItemName : selector1?.ItemName,
  );
  const [metal, setMetal] = useState('');
  const [gm, setGm] = useState('');
  const [demo, setDemo] = useState(
    Detail
      ? selector?.ItemDesc?.substring(0, 35)
      : selector1?.ItemDesc?.substring(0, 35),
  );
  const [editable, setEditable] = useState(false);
  const [editable1, setEditable1] = useState(false);
  const [editable2, setEditable2] = useState(false);
  const [fetching, setIsFetching] = useState(false);


  const share = async () => {
    await Share.share({
      message: `Product Name : ${selector?.ItemName}  \nProduct Details : ${selector?.ItemDesc} `,
    });
  };

  const manageEdit = () => {
    setEditable(true);
    setEditable1(true);
    setEditable2(true);
    // Detail();
  };
  const click = click1 => {
    if (click1) {
      setClick1(false);
    } else {
      setClick1(true);
    }
  };
  const edtiProduct = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    dispatch({
      type: 'edit_product_reqest',
      url: 'editProduct',
      productId: productData?.products?.SrNo,
      supplierSrNo: user_id,
      navigation,
    });
  };
  const deleteProduct = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    dispatch({
      type: 'product_delete_request',
      productSrNo: productData?.products?.SrNo,
      supplierSrNo: user_id,
      url: 'deleteProduct',
      navigation,
    });
  };

  const RemoveWhishList=async(item)=>{
    const res = await RemoveWhishList1(item);
    const user_id = await AsyncStorage.getItem('user_id');
     console.log('this is respo',res)
     if(res){
       dispatch({
         type: 'product_detail_request',
         url: 'productDetails',
         productId: item,
         supplierSrNo: user_id,
         // navigation,
       });
       Toast.show(res.msg)
     }
   }


  const RemoveWhishList1 = async (item) => {
    setIsFetching(true);
    const user_id = await AsyncStorage.getItem('user_id');
    const Token = await AsyncStorage.getItem('loginToken');
    var myHeaders = new Headers();
    myHeaders.append('Olocker', `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    let response = fetch(
      `https://olocker.co/api/supplier/removeProductWishlist?productId=${item}&SupplierSrNo=${user_id}&userType=supplier`,
      requestOptions,
    )
      .then(response => response.text())
      
      .then(result => {
        console.log('this is response',result.status);
        if(result){
         
          // dispatch({
          //   type: 'product_detail_request',
          //   url: 'productDetails',
          //   productId: item,
          //   supplierSrNo: user_id,
          //   // navigation,
          // });
       
          setIsFetching(false);
          return JSON.parse(result);
          // console.log('this is response data',result)
        }
        else{
          setIsFetching(false);
        }
      })
      .catch(error => {
        console.log('error', error);
        setIsFetching(false);
      });

    return response;
  };
  
  const addProductWishList=async(item)=>{
    console.log('this is item',item);
   const res = await addProductWishList1(item);
   const user_id = await AsyncStorage.getItem('user_id');
    console.log('this is respo',res)
    if(res){
      dispatch({
        type: 'product_detail_request',
        url: 'productDetails',
        productId: item,
        supplierSrNo: user_id,
        // navigation,
      });
      Toast.show(res.msg)
    }
  }

  const addProductWishList1 = async item => {
    setIsFetching(true);
    const Token = await AsyncStorage.getItem('loginToken');
    const user_id = await AsyncStorage.getItem('user_id');
    var myHeaders = new Headers();
    myHeaders.append('Olocker', `Bearer ${Token}`);

    var formdata = new FormData();
    formdata.append('checkProduct', item);
    formdata.append('SupplierSrNo', user_id);
    formdata.append('userType', 'supplier');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    let res = fetch(
      'https://olocker.co/api/supplier/addProductitemWishlist',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        if(result){
          setIsFetching(false);
          return JSON.parse(result);
          // dispatch({
          //   type: 'product_detail_request',
          //   url: 'productDetails',
          //   productId: item,
          //   supplierSrNo: user_id,
          //   // navigation,
          // });
          // console.log('this us fsgsfg',result.msg);
        }
        else{
          setIsFetching(false);
        }
      })
      .catch(error => {
        console.log('error', error);
        setIsFetching(false);
      });

    return res;
  };

const BannerWidth = (Dimensions.get('window').width * 15) / 18;

  return (
    <View style={styles.container}>
        {fetching || isFetching || isFetching4  ? <Loader /> : null}
      <Header
        source={require('../../../assets/L.png')}
        source1={require('../../../assets/Fo.png')}
        source2={require('../../../assets/Image/dil.png')}
        title={'Product Details'}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('Message')}
        onPress2={() => navigation.navigate('FavDetails')}
      />
      <ScrollView>
    
        <View style={styles.main}>
          <View
          //  onPress={() => click(click1)}
           >
            <TouchableOpacity
              onPress={() => {
                productData?.products?.is_exist
                  ? RemoveWhishList(productData?.products?.SrNo)
                  
                  : addProductWishList(productData?.products?.SrNo)
              }}
              >
              <Image
                style={{width: 21, height: 18}}
                tintColor={productData?.products?.is_exist ? 'red' : 'grey'}
                source={require('../../../assets/Image/dil.png')}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => share()}
              // {()=>navigation.navigate('Filter')}
            >
              <Image
                style={styles.img}
                source={require('../../../assets/Image/share1.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: 20}}>
         {productData?.productdetails?.productimages? <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: hp(25),
            }}>
              <FlatListSlider
              data={productData?.productdetails?.productimages}
              height={hp(25)}
              // height:hp(25),width:wp(87)
              timer={3000}
              contentContainerStyle={{paddingHorizontal:25}}
              indicatorContainerStyle={{position: 'absolute', bottom: -18}}
              indicatorActiveColor={'red'}
              indicatorInActiveColor={'grey'}
              indicatorActiveWidth={5}
              animation
              component={<Banner />}
              separatorWidth={15}
              width={Dimensions.get('window').width-68}
              autoscroll={true}
              loop={false}
            />
          </View>:
          <View  style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: hp(25),
          }}>
          <Image style={{
            height: hp(25),
            width: BannerWidth,
            borderRadius:190,
          }} source={require('../../../assets/logo.png')}/>
          </View>
          }
        </View>

        {productData?.products?.ProductsPrice? <View style={styles.view}>
          <Image
            style={styles.img1}
            source={require('../../../assets/Image/rupay.png')}
          />
          <Text style={styles.text}>
            {parseFloat(productData?.products?.ProductsPrice)?.toFixed(2)}
          </Text>
          <Text style={styles.text1}>( Approximate Price )</Text>
        </View>:null}
        <View style={{padding: 20}}>
          <View style={styles.main1}>
            <View style={styles.main1view}>
              <View style={styles.main1view1}>
                <Text style={styles.main1view1text}>
                  {
                    // selector?.ItemDesc
                    // ? selector.ItemDesc?.substring(0, 35)
                    //   :
                    'PRODUCT DESCRIPTION'
                  }
                </Text>
              </View>
              {route.params.data=='supplier' ? (
                <View
                  //  onPress={()=>manageEdit()}
                  style={{alignItems: 'flex-end', flexDirection: 'row'}}>
                  <TouchableOpacity onPress={() => edtiProduct()}>
                    <Image
                      style={{width: 20, height: 20}}
                      source={require('../../../assets/Image/edit.png')}
                    />
                  </TouchableOpacity>
                  <Mat
                    name="delete"
                    color="black"
                    size={wp(6)}
                    style={{marginLeft: 10}}
                    onPress={() => {
                      deleteProduct();
                    }}
                  />
                </View>
              ) : null}
            </View>
            <View style={{marginLeft: 20, marginTop: 8}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                {console.log('this isproductData?.products',productData?.products)}
                <Text style={styles.cardtext}>
                  {'Name       :      '}
                </Text>
                <Text style={{ color: '#052a47',fontWeight:'500'}}>{ productData?.products?.ItemName}</Text>
                </View>
                <TextInput
                  style={{height: 40, color: '#052a47'}}
                  value={stockNo}
                  editable={editable1}
                  onChangeText={val => setStock(val)}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: -15,
                }}>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={styles.cardtext}>
                  {'Stock No :      '}
                </Text>
                <Text style={{ color: '#052a47',fontWeight:'500'}}>{ productData?.products?.ProductSku}</Text>
                </View>
                <TextInput
                  style={{height: 40, color: '#052a47'}}
                  value={collection}
                  editable={editable}
                  onChangeText={val => setCollection(val)}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: -15,
                }}>

                 <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={styles.cardtext}>
                  {'Metal        :     ' }
                </Text>
                <Text style={{ color: '#052a47',fontWeight:'500'}}>{`${parseFloat(productData?.products?.GrossWt)?.toFixed(2)}  Gm`}</Text>
                </View>

                <TextInput
                  style={{height: 40, color: '#052a47'}}
                  value={demo}
                  editable={editable2}
                  onChangeText={val => setDemo(val)}
                />
                {/* )} */}
              </View>
            </View>
          </View>
        </View>
        <View style={{height: 100}} />
      </ScrollView>
      <View style={{bottom: 0, left: 0, right: 0, position: 'absolute'}}>
        {/* <TabView /> */}
      </View>
    </View>
  );
};
export default SubCategory;

const images = [
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
];

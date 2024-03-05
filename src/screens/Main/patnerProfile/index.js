import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Linking,
  Share,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import BottomTab from '../../../components/StoreButtomTab';
import Stars from 'react-native-stars';
import styles from './styles';
import Catalogue from '../../../components/Catalogue';
import Profile from '../../../components/Profile/index2';
import Setting from '../../../components/Settings';
import Loader from '../../../components/Loader';
import ImagePath from '../../../components/ImagePath';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';

let productImage = [];
let showroomImage = [];
let supplierLogo = '';
let ownerImage = [];
let goldSpecilization = [];

const PatnerProfile = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
 

 const selector3 =useSelector(state=>state.Home?.partnerData)
console.log('partnerDetail,,,,,,,',selector3?.partnerdetails);
  const selector1 = useSelector(state => state.Supplier.SupplierDetail);
  const selector = selector1?.data;
  const ownerImagePath = 'https://olocker.co/uploads/supplier/';
  // console.log('this is selector');
  const isFetching = useSelector(state => state.Supplier.isFetching);
  const isFetching1 = useSelector(state => state.City.isFetching);
  const [profile, setProfile] = useState(true);
  const [message, setMessage] = useState(false);
  const [catalogue, setCatalogue] = useState(false);
  const [setting, setSetting] = useState(false);
  const [rating1, setRatting1] = useState(0);
  const BannerWidth = (Dimensions.get('window').width * 15) / 16;
  const BannerHeight = 140;
  const share = async () => {
    await Share.share({
      message: `Supplier Name :   Email Address : virendramishra252@gmail.com `,
    });
  };

  const manageTab = () => {
    setProfile(true);
    setMessage(false);
    setCatalogue(false);
    setSetting(false);
  };
  const manageTab1 = () => {
    setProfile(false);
    setMessage(true);
    setCatalogue(false);
    setSetting(false);
  };
  const manageTab2 = () => {
    setProfile(false);
    setMessage(false);
    setCatalogue(true);
    setSetting(false);
  };
  const manageTab3 = () => {
    setProfile(false);
    setMessage(false);
    setCatalogue(false);
    setSetting(true);
  };

  manageUpdate = () => {
    dispatch({
      type: 'City_List_Request',
      url: '/getCities',
      stateId: selector.supplierdetails[0].StateId,
      selector: selector,
      productImage: productImage,
      ownerImage: ownerImage,
      supplierLogo: supplierLogo,
      showroomImage: showroomImage,
      navigation,
    });
  };

  useEffect(() => {
    selector?.supplierimagedetails.map(item => {
      if (item.Type == 'Product Image') {
        productImage.push(item);
        if (productImage.length > 0) {
          if (!productImage.includes(item)) {
            productImage.push(item);
          }
        } else {
          productImage.push(item);
        }
      }
    });
    selector?.supplierimagedetails.map(item => {
      if (item.Type == 'ShowRoom Image') {
        showroomImage.push(item);
        if (showroomImage.length > 0) {
          if (!showroomImage.includes(item)) {
            showroomImage.push(item);
          }
        } else {
          showroomImage.push(item);
        }
      }
    });
    selector?.supplierimagedetails.map(item => {
      if (item.Type == 'Owner Image') {
        if (ownerImage.length > 0) {
          if (!ownerImage.includes(item)) {
            ownerImage.push(item);
          }
        } else {
          ownerImage.push(item);
        }
      }
    });
    selector?.supplierimagedetails.map(item => {
      if (item.Type == 'Logo') {
        supplierLogo = item.ImageName;
      }
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#f0eeef'}}>
      <Header
        source={require('../../../assets/L.png')}
        source2={require('../../../assets/Image/dil.png')}
        source1={require('../../../assets/Fo.png')}
        title={'Patner Profile '}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('Message')}
        onPress2={() => navigation.navigate('FavDetails')}
      />

      <ScrollView>
        {isFetching || isFetching1 ? <Loader /> : null}
        <View
          style={{
            backgroundColor: '#032e63',
          }}>
          <View style={{flexDirection: 'row', padding: 15, width: '100%'}}>
            <View
              style={{
                backgroundColor: '#fff',
                height: 100,
                width: '30%',
                borderRadius: 10,
              }}>

{console.log('imageytetetee path deataillll',`${ownerImagePath}${selector3?.partnerdetails?.Logo}`)}

              <Image
                style={{width: '100%', height: '100%', borderRadius: 10}}
                source={
                  selector3?.partnerdetails?.Logo
                    ? {uri: `${ownerImagePath}${selector3?.partnerdetails?.Logo}`}
                    : require('../../../assets/Image/Not.jpeg')
                }
              />
            </View>
            <View style={{marginLeft: 10, width: '60%', marginTop: -4}}>
              <Text
                style={{color: '#fff', fontSize: 19, fontFamily: 'Acephimere'}}>
                {selector3?.partnerdetails?.CompanyName}
              </Text>
              <Text
                style={{color: '#fff', fontSize: 12, fontFamily: 'Acephimere'}}>
                {selector3?.partnerdetails?.Location}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Stars
                  half={true}
                  default={0}
                  // display={3}
                  spacing={5}
                  update={val => setRatting1(val)}
                  count={5}
                  starSize={16}
                  fullStar={require('../../../assets/Image/star.png')}
                  emptyStar={require('../../../assets/Image/star1.png')}
                />

                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(`tel:${selector3?.partnerdetails?.Mobile}`)}
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                      style={{width: 30, height: 30}}
                      source={require('../../../assets/PartnerImage/16.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => share()}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: 10,
                    }}>
                    <Image
                      style={{width: 30, height: 30}}
                      source={require('../../../assets/PartnerImage/15.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              alignSelf: 'flex-end',
              flexDirection: 'row',
              width: '62%',
            }}>
            <TouchableOpacity
              // onPress={()=>addToNetwork()}
              onPress={() => {}}
              style={{
                backgroundColor: '#ea056c',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 20,
              }}>
              <Text
                style={{color: '#fff', fontSize: 12, fontFamily: 'Acephimere'}}>
                {'Add To Network'}
                {/* Added To Network */}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{alignItems: 'center', height: 0, marginTop: 15}}></View>

          <View style={{height: 20}} />
        </View>
        <View style={styles.tabContainer}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => manageTab()}
              style={styles.tabStyle}>
              {profile ? (
                <Image
                  style={{width: 50, height: 50}}
                  source={require('../../../assets/PartnerImage/10.png')}
                />
              ) : (
                <Image
                  style={{width: 50, height: 50}}
                  source={require('../../../assets/PartnerImage/pro_uncolor.png')}
                />
              )}
            </TouchableOpacity>
            <Text
              style={{marginTop: 3, fontFamily: 'Acephimere', fontSize: 13}}>
              Profile
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Message')}
              style={styles.tabStyle}>
              {message ? (
                <Image
                  style={{width: 50, height: 50}}
                  source={require('../../../assets/PartnerImage/msg_active.png')}
                />
              ) : (
                <Image
                  style={{width: 50, height: 50}}
                  source={require('../../../assets/PartnerImage/11.png')}
                />
              )}
            </TouchableOpacity>
            <Text
              style={{marginTop: 3, fontFamily: 'Acephimere', fontSize: 13}}>
              Message
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => manageTab2()}
              style={styles.tabStyle}>
              {catalogue ? (
                <Image
                  style={{width: 50, height: 50}}
                  source={require('../../../assets/PartnerImage/nackactive.png')}
                />
              ) : (
                <Image
                  style={{width: 50, height: 50}}
                  source={require('../../../assets/PartnerImage/8.png')}
                />
              )}
            </TouchableOpacity>
            <Text
              style={{marginTop: 3, fontFamily: 'Acephimere', fontSize: 13}}>
              Catalogue
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => manageTab3()}
              style={styles.tabStyle}>
              {setting ? (
                <Image
                  style={{width: 50, height: 50}}
                  source={require('../../../assets/PartnerImage/setting_active.png')}
                />
              ) : (
                <Image
                  style={{width: 50, height: 50, alignSelf: 'center'}}
                  source={require('../../../assets/PartnerImage/7.png')}
                />
              )}
            </TouchableOpacity>
            <Text
              style={{marginTop: 3, fontFamily: 'Acephimere', fontSize: 13}}>
              Settings
            </Text>
          </View>
        </View>
        <View style={{marginTop: 10}}>
          {profile == true ? <Profile /> : null}
          {catalogue == true ? <Catalogue /> : null}
          {setting == true ? <Setting /> : null}
        </View>
      </ScrollView>
      <StatusBar />
    </View>
  );
};
export default PatnerProfile;

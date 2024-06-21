import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import Loading from '../Loader';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const Profile = () => {
  const selector = useSelector(state => state?.Supplier?.SupplierDetail?.data);
  const isFetching = useSelector(state => state.Supplier.isFetching);
  const ownerImagePath = 'https://olocker.co/uploads/supplier/';
  const parnerData = useSelector(state => state.Home.partnerData);
  const partner = parnerData?.partnerdetails;
  const data = selector?.supplierimagedetails
  const keyToCheck = 'Type';
  const valueToCheck1 = 'Product Image';
  const valueToCheck2 = 'Owner Image';
  const valueToCheck3 = 'ShowRoom Image';
  console.log('this is data details',selector?.supplierimagedetails);
  const product = selector?.supplierimagedetails?.some(item => item[keyToCheck] === valueToCheck1);
  const owner = selector?.supplierimagedetails?.some(item => item[keyToCheck] === valueToCheck2);
  const showroom = selector?.supplierimagedetails?.some(item => item[keyToCheck] === valueToCheck3);
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingVertical: 20 }}>
      {/* {isFetching ? <Loading /> : null} */}

      <View style={{ paddingHorizontal: 20, alignItems: 'flex-start' }}>
        {selector?.supplierdetails[0]?.SupplierIntroduction ? <View
          style={{
            backgroundColor: '#032e63',
            // paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 20,
            width: 120,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text numberOfLines={1} style={{ color: '#fff', fontSize: 14, fontFamily: 'Acephimere' }}>
            About us
          </Text>
        </View> : null}
        {selector?.supplierdetails[0]?.SupplierIntroduction ? <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: '#535353',
            fontFamily: 'Acephimere',
            marginTop: 15,
            marginLeft: '5%',
          }}>
          {selector?.supplierdetails[0]?.SupplierIntroduction}
        </Text> : null}
        {owner? <View
          style={{
            backgroundColor: '#032e63',
            // paddingHorizontal: 19,
            paddingVertical: 8,
            borderRadius: 20,
            width: 120,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15,
          }}>
          <Text numberOfLines={1} style={{ color: '#fff', fontSize: 14, fontFamily: 'Acephimere' }}>
            Founders
          </Text>
        </View> : null}
        {/* <ScrollView horizontal style={{width:'100%'}}> */}
        <View style={{flexDirection: 'row'}}>
          {selector?.supplierimagedetails?.map(item =>
            item.Type == 'Owner Image' && item.ImageName ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '35%',
                  paddingVertical: 15,
                }}>
                <View style={{width: '80%', alignItems: 'center'}}>
                  <View style={{height: 90, width: '100%', borderWidth: 1}}>
                    <Image
                      style={{height: '100%', width: '100%'}}
                      resizeMode={'stretch'}
                      source={
                        item.ImageName
                          ? {uri: `${ownerImagePath}${item.ImageName}`}
                          : require('../../assets/Image/Not.jpeg')
                      }
                    />
                  </View>
                  <Text
                    style={{
                      marginTop: 5,
                      color: '#032e63',
                      fontFamily: 'Acephimere',
                      fontSize: 13,
                    }}>
                    {item.OwnerName}
                  </Text>
                </View>
              </View>
            ) : null,
          )}
        </View>

        {/* <FlatList
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={selector?.supplierimagedetails}
          renderItem={({ item }) => item.Type == 'Owner Image' ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: Dimensions.get('window').width / 3 - 5,
                paddingVertical: 15,
              }}>
              <View style={{ width: '80%', alignItems: 'center' }}>
              {item.ImageName?<View style={{ height: 90, width: '100%', borderWidth: 1 }}>
                {console.log('item.ImageName',item.ImageName)}
                  <Image
                    style={{ height: '100%', width: '100%' }}
                    resizeMode={'stretch'}
                    source={
                      item.ImageName? { uri: `${ownerImagePath}${item.ImageName}` }
                        : require('../../assets/Image/Not.jpeg')
                    }
                  />
                </View>:null}
                <Text
                  style={{
                    marginTop: 5,
                    color: '#032e63',
                    fontFamily: 'Acephimere',
                    fontSize: 13,
                  }}>
                  {item.OwnerName}
                </Text>
              </View>
            </View>
          ) : null}
        /> */}
        {/* </ScrollView> */}
        <View>
          {showroom ? <View
            style={{
              backgroundColor: '#032e63',
              // paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20,
              width: 120,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <Text numberOfLines={1}
              style={{
                color: '#fff',
                fontSize: 14,
                fontFamily: 'Acephimere',
                // width: '90%',
              }}>
              Showrooms
            </Text>
          </View> : null}
         {/* {console.log('this is supplier image',selector?.supplierimagedetails)}
         <View style={{height:120,width:'100%',flexDirection:'row'}}>
          <FlatList
          inverted
          data={selector?.supplierimagedetails?selector?.supplierimagedetails:[]}
          renderItem={({item})=> (
            <View>
              {console.log('this is item for1',item)}
            </View>
          )}
          />
         </View> */}
    
          <View style={{ flexDirection: 'row' }}>
            {selector?.supplierimagedetails?.map(item =>
              item.Type == 'ShowRoom Image' && item.ImageName ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: wp('32%'),
                    paddingVertical: 15,
                  }}>
                  <View style={{ width: '80%', alignItems: 'center' }}>
                 <View style={{ height: 90, width: '100%', borderWidth: 1 }}>
                      <Image
                        style={{ height: '100%', width: '100%' }}
                        resizeMode={'stretch'}
                        source={
                          { uri: `${ownerImagePath}${item.ImageName}` }
                            // : require('../../assets/Image/Not.jpeg')
                        }
                      />
                    </View>
                    <Text
                      style={{
                        marginTop: 5,
                        color: '#032e63',
                        fontFamily: 'Acephimere',
                        fontSize: 13,
                      }}>
                      {item.OwnerName}
                    </Text>
                  </View>
                </View>
              ) : null,
            )}
          </View>
       
        </View>
        <View>
       
          {product ? <View
            style={{
              backgroundColor: '#032e63',
              // paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20,
              width: 120,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <Text numberOfLines={1}
              style={{
                color: '#fff',
                fontSize: 14,
                fontFamily: 'Acephimere',
                // width: '90%',
              }}>
              Products
            </Text>
          </View> : null}
          {/* {product?<View style={{ height: 140, width: '100%' }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={selector?.supplierimagedetails}
              renderItem={({ item,index }) => item.Type == `Product Image` &&item.ImageName ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    // width: wp('32%'),
                    width: Dimensions.get('window').width / 3 - 5,
                    paddingVertical: 15,
                  }}>
                  <View style={{ width: '80%', alignItems: 'center' }}>
                  <View style={{ height: 90, width: '100%', borderWidth: 1 }}>
                     <Image
                        style={{ height: '100%', width: '100%' }}
                        resizeMode={'stretch'}
                        source={
                          { uri: `${ownerImagePath}${item.ImageName}` }
                           
                        }
                      />
                    </View>
                    <Text
                      style={{
                        marginTop: 5,
                        color: '#032e63',
                        fontFamily: 'Acephimere',
                        fontSize: 13,
                      }}>
                      {item.OwnerName}
                    </Text>
                  </View>
                </View>

              ) : null}
            />
          </View>:null} */}
          <View style={{flexDirection: 'row'}}>
            {selector?.supplierimagedetails?.map(item =>
              item.Type == 'Product Image' &&item.ImageName ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    // width: wp('32%'),
                    width:Dimensions.get('window').width/3-5,
                    paddingVertical: 15,
                  }}>

                  <View style={{width: '80%', alignItems: 'center'}}>
                    <View style={{height: 90, width: '100%', borderWidth: 1}}>
                      <Image
                        style={{height: '100%', width: '100%'}}
                        resizeMode={'stretch'}
                        source={
                          item.ImageName
                            ? {uri: `${ownerImagePath}${item.ImageName}`}
                            : require('../../assets/Image/Not.jpeg')
                        }
                      />
                    </View>
                    <Text
                      style={{
                        marginTop: 5,
                        color: '#032e63',
                        fontFamily: 'Acephimere',
                        fontSize: 13,
                      }}>
                      {item.OwnerName}
                    </Text>
                  </View>
                </View>
            
              ) : null,
            )}
          </View>
        </View>
        <View>
          {selector?.supplierdetails[0]?.Address ? <View
            style={{
              backgroundColor: '#032e63',
              // paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20,
              width: 120,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <Text numberOfLines={1}
              style={{
                color: '#fff',
                fontSize: 14,
                fontFamily: 'Acephimere',
                // width: '90%',
              }}>
              Address
            </Text>
          </View> : null}
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{ height: 30, width: 22 }}
                source={require('../../assets/Image/loc.png')}
              />
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 14,
                  fontFamily: 'Acephimere',
                  color: '#424242',
                }}>
                {selector?.supplierdetails[0]?.Address}
              </Text>
            </View>
          </View>
        </View>

        <View>
          {selector?.supplierdetails[0]?.MobileNo || selector?.supplierdetails[0]?.EmailId ? <View
            style={{
              backgroundColor: '#032e63',
              paddingVertical: 8,
              borderRadius: 20,
              width: 120,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <Text numberOfLines={1}
              style={{ color: '#fff', fontSize: 14, fontFamily: 'Acephimere' }}>
              Contact
            </Text>
          </View> : null}
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            {selector?.supplierdetails[0]?.MobileNo ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{ height: 28, width: 28 }}
                source={require('../../assets/PartnerImage/16.png')}
              />
              <View>
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 14,
                    fontFamily: 'Acephimere',
                    color: '#424242',
                  }}>{`+91 ${selector?.supplierdetails[0]?.MobileNo}`}</Text>
                {/* <Text style={{marginLeft:30,fontSize:14,fontFamily:'Acephimere',color:'#424242'}}>{'Ph:9876567898 '}</Text>
                     <Text style={{marginLeft:30,fontSize:14,fontFamily:'Acephimere',color:'#424242'}}>{'Ph:9876567898 '}</Text> */}
              </View>
            </View> : null}
            {selector?.supplierdetails[0]?.EmailId ? <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
              <Image
                style={{ height: 28, width: 28 }}
                source={require('../../assets/PartnerImage/msg.png')}
              />
              <View>
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 14,
                    fontFamily: 'Acephimere',
                    color: '#424242',
                  }}>
                  {selector?.supplierdetails[0]?.EmailId}
                </Text>
              </View>
            </View> : null}

            {/* <View style={{flexDirection: 'row', marginTop: 20}}>
              <Image
                style={{height: 28, width: 28}}
                source={require('../../assets/PartnerImage/facebook.png')}
              />
              <View>
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 14,
                    fontWeight: '600',
                    fontFamily: 'Acephimere',
                  }}>
                  {'fb.com/rcbafna '}
                </Text>
              </View>
            </View> */}

            <View style={{ height: 100 }} />
          </View>
        </View>
      </View>
    </View>
  );
};
export default Profile;

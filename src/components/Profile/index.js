import React from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
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
  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingVertical: 20}}>
      {/* {isFetching ? <Loading /> : null} */}

      <View style={{paddingHorizontal: 20, alignItems: 'flex-start'}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#032e63',
            // paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 20,
            width: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#fff', fontSize: 14, fontFamily: 'Acephimere'}}>
            About us
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: '#535353',
            fontFamily: 'Acephimere',
            marginTop: 15,
            marginLeft: '5%',
          }}>
          {partner?.PartnerIntroduction}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#032e63',
            // paddingHorizontal: 19,
            paddingVertical: 8,
            borderRadius: 20,
            width: 100,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15,
          }}>
          <Text style={{color: '#fff', fontSize: 14, fontFamily: 'Acephimere'}}>
            Founders
          </Text>
        </TouchableOpacity>

        <View style={{flexDirection: 'row'}}>
          {selector?.supplierimagedetails?.map(item =>
            item.Type == 'Owner Image' ? (
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
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#032e63',
              // paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20,
              width: 110,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontFamily: 'Acephimere',
                // width: '90%',
              }}>
              Showrooms
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            {selector?.supplierimagedetails?.map(item =>
              item.Type == 'ShowRoom Image' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: wp('32%'),
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
          <TouchableOpacity
            style={{
              backgroundColor: '#032e63',
              // paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20,
              width: 110,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontFamily: 'Acephimere',
                // width: '90%',
              }}>
              Products
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            {selector?.supplierimagedetails?.map(item =>
              item.Type == 'Product Image' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: wp('32%'),
                    paddingVertical: 15,
                  }}>
                  {/* {// console.log('bire', `https://olocker.co/uploads/supplier/${item.ImageName}`)} */}

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
          <View style={{paddingHorizontal: 20, marginTop: 20}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{height: 30, width: 22}}
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
          <TouchableOpacity
            style={{
              backgroundColor: '#032e63',
              // paddingHorizontal: 20,
              paddingVertical: 8,
              borderRadius: 20,
              width: 100,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <Text
              style={{color: '#fff', fontSize: 14, fontFamily: 'Acephimere'}}>
              Contact
            </Text>
          </TouchableOpacity>
          <View style={{paddingHorizontal: 20, marginTop: 20}}>
            <View style={{flexDirection: 'row',alignItems:'center'}}>
              <Image
                style={{height: 28, width: 28}}
                source={require('../../assets/PartnerImage/16.png')}
              />
              <View>
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 14,
                    fontFamily: 'Acephimere',
                    color: '#424242',
                  }}>{`+91${selector?.supplierdetails[0]?.MobileNo}`}</Text>
                {/* <Text style={{marginLeft:30,fontSize:14,fontFamily:'Acephimere',color:'#424242'}}>{'Ph:9876567898 '}</Text>
                     <Text style={{marginLeft:30,fontSize:14,fontFamily:'Acephimere',color:'#424242'}}>{'Ph:9876567898 '}</Text> */}
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 20,alignItems:'center'}}>
              <Image
                style={{height: 28, width: 28}}
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
            </View>

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

            <View style={{height: 100}} />
          </View>
        </View>
      </View>
    </View>
  );
};
export default Profile;

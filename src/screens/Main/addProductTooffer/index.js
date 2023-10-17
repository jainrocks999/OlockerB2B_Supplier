import {View, ScrollView, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import StatusBar from '../../../components/StatusBar';
import styles from './styles';
import {FlatList} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

export default function AddProductTooffer() {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#032e63',
            height: 50,
            width: '100%',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{paddingHorizontal: 5}}>
              <Image
                style={{height: 20, width: 14}}
                source={require('../../../assets/L.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontFamily: 'Roboto-Medium',
                marginLeft: 14,
              }}>
              Products
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{height: 24, width: 28}}
              source={require('../../../assets/Fo.png')}
            />
            <Image
              style={{height: 22, width: 26, tintColor: '#fff', marginLeft: 15}}
              source={require('../../../assets/Image/dil.png')}
            />
            <Image
              style={{height: 24, width: 28, tintColor: '#fff', marginLeft: 15}}
              source={require('../../../assets/supplierImage/more.png')}
            />
          </View>
        </View>

        <View style={{}}>
          <View style={{flex: 1, width: wp(100)}}>
            {/* Table Rows */}
            <FlatList
              data={Offer}
              renderItem={({item}) => (
                <View style={styles.Card}>
                  <View style={{marginHorizontal: 10, marginTop: 5}}>
                    <CheckBox />
                  </View>
                  <View style={{padding: 7}}>
                    <Image
                      style={{height: hp(20), width: '100%'}}
                      source={{
                        uri: 'https://cdn1.jewelxy.com/live/img/business_product/TKJqNylvik_20211101135100.jpg',
                      }}
                    />
                  </View>
                  <View style={{paddingHorizontal: 20}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '700',
                        marginTop: 10,
                        color: '#000',
                      }}>
                      Gross Wt:-{' '}
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '700',
                          color: '#707371',
                        }}>
                        {item.ProductSku}
                      </Text>
                    </Text>

                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '700',
                        marginTop: 10,
                        color: '#000',
                      }}>
                      Metal Wt:-{' '}
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '700',
                          color: '#707371',
                        }}>
                        {item.ProductSku}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '600',
                        marginTop: 10,
                        color: '#000',
                      }}>
                      Gms:-{' '}
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '700',
                          color: '#707371',
                        }}>
                        {item.ProductType}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '600',
                        marginTop: 10,
                        color: '#000',
                      }}>
                      Stone Wt:-{' '}
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '700',
                          color: '#707371',
                        }}>
                        {item.NetWT}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '600',
                        marginTop: 10,
                        color: '#000',
                      }}>
                      Price:-{' '}
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '700',
                          color: '#707371',
                        }}>
                        {item.Price}
                      </Text>
                    </Text>

                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '600',

                          color: '#000',
                        }}>
                        Product Name:-{' '}
                      </Text>
                      <View></View>
                    </View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '600',
                        marginTop: 10,
                        color: '#000',
                      }}>
                      ProductsSku:-{' '}
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '700',
                          color: '#707371',
                        }}>
                        {item.ProductSku}
                      </Text>
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10,
                        alignItems: 'center',
                      }}>
                      <View style={{}}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: '#000',
                          }}>
                          Collection Name:
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',

                          width: '58%',
                        }}></View>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>

          <View style={{height: hp(5)}} />

          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 35,
            }}>
            <View style={{}}>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.txt}>Prev</Text>
              </TouchableOpacity>
            </View>
            <View>
              <FlatList
                data={data}
                horizontal
                renderItem={({item}) => (
                  <TouchableOpacity style={styles.circleBtn}>
                    <Text
                      style={{fontWeight: '800', fontSize: 18, color: '#fff'}}>
                      {item.num}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <View style={{}}>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.txt}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{height: hp(5)}} />
      </View>
    </ScrollView>
  );
}

const data = [
  {
    num: '1',
  },
  {
    num: '2',
  },
  {
    num: '3',
  },
  {
    num: '4',
  },
  {
    num: '5',
  },
];

const Offer = [
  {
    ProductSku: '10BAI-683',
    ProductName: '10BAI-683',
    CollectionName: 'Lorem Ipsum',
    GrossWT: 80000,
    MetalWT: 80000,
    StoneWT: 80000,
    Price: '₹4389015.19',
  },
  {
    ProductSku: '10BAI-683',
    ProductName: '10BAI-683',
    CollectionName: 'Lorem Ipsum',
    GrossWT: 80000,
    MetalWT: 80000,
    StoneWT: 80000,
    Price: '₹4389015.19',
  },
  {
    ProductSku: '10BAI-683',
    ProductName: '10BAI-683',
    CollectionName: 'Lorem Ipsum',
    GrossWT: 80000,
    MetalWT: 80000,
    StoneWT: 80000,
    Price: '₹4389015.19',
  },
];

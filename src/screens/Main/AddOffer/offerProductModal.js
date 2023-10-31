import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useSelector} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from './style';

const OfferProductModal = ({prevModal, snedDataToparent = num => {}}) => {
  const offerProudctList = useSelector(
    state => state.Offer.offerProudctList?.products,
  );
  const [inputs, setInputs] = useState({
    hdnselectedvalue: [],
  });
  useEffect(() => {
    snedDataToparent(inputs.hdnselectedvalue);
  }, [inputs.hdnselectedvalue]);
  useEffect(() => {
    setProductModal(prevModal);
  }, [prevModal]);
  const [productModal, setProductModal] = useState(false);

  return (
    <Modal visible={productModal}>
      {offerProudctList?.length > 0 ? (
        <>
          <TouchableOpacity
            onPress={() => setProductModal(false)}
            style={{
              position: 'absolute',
              height: hp(6),
              width: hp(6),
              backgroundColor: '#032e63',
              right: wp(10),
              top: 12,
              zIndex: 1,
              borderRadius: hp(6 / 2),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{fontSize: wp(5.5), fontWeight: 'bold', color: 'white'}}>
              X
            </Text>
          </TouchableOpacity>
          <ScrollView contentContainerStyle={{paddingBottom: wp(4)}}>
            <View style={{flex: 1, width: wp(100)}}>
              <FlatList
                data={offerProudctList}
                renderItem={({item}) => (
                  <View style={styles.Card}>
                    <View style={{marginHorizontal: 10, marginTop: 5}}>
                      <CheckBox
                        value={
                          inputs.hdnselectedvalue.includes(item.SrNo)
                            ? true
                            : false
                        }
                        onChange={() => {
                          if (inputs.hdnselectedvalue.includes(item?.SrNo)) {
                            let newee = hdnselectedvalue.filter(
                              items => items != item.SrNo,
                            );
                            setInputs(prev => ({
                              ...prev,
                              hdnselectedvalue: newee,
                            }));
                          } else {
                            setInputs(prev => ({
                              ...prev,
                              hdnselectedvalue: [
                                ...inputs.hdnselectedvalue,
                                item.SrNo,
                              ],
                            }));
                          }
                        }}
                      />
                    </View>
                    <View style={{padding: 7}}>
                      <Image
                        style={{height: hp(20), width: '100%'}}
                        source={{
                          uri: `https://olocker.co/uploads/product/${item?.ImageName}`,
                        }}
                      />
                    </View>
                    <View style={{paddingHorizontal: 20}}>
                      <Text
                        style={{
                          fontSize: wp(4),
                          fontWeight: '700',
                          marginTop: 10,
                          color: '#000',
                        }}>
                        Gross Wt:-{' '}
                        <Text
                          style={{
                            fontSize: wp(4),
                            fontWeight: '700',
                            color: '#707371',
                          }}>
                          {item.GrossWt}
                        </Text>
                      </Text>

                      <Text
                        style={{
                          fontSize: wp(4),
                          fontWeight: '700',
                          marginTop: 3,
                          color: '#000',
                        }}>
                        Metal Wt:-{' '}
                        <Text
                          style={{
                            fontSize: wp(4),
                            fontWeight: '700',
                            color: '#707371',
                          }}>
                          {item?.MetalWt}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          fontSize: wp(4),
                          fontWeight: '600',
                          marginTop: 3,
                          color: '#000',
                        }}>
                        Unit of MetalWt:-{' '}
                        <Text
                          style={{
                            fontSize: wp(4),
                            fontWeight: '700',
                            color: '#707371',
                          }}>
                          {item.UnitMetalWt}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          fontSize: wp(4),
                          fontWeight: '600',
                          marginTop: 3,
                          color: '#000',
                        }}>
                        Stone Wt:-{' '}
                        <Text
                          style={{
                            fontSize: wp(4),
                            fontWeight: '700',
                            color: '#707371',
                          }}>
                          {item.StoneWt}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          fontSize: wp(4),
                          fontWeight: '600',
                          marginTop: 3,
                          color: '#000',
                        }}>
                        Price:-{' '}
                        <Text
                          style={{
                            fontSize: wp(4),
                            fontWeight: '700',
                            color: '#707371',
                          }}>
                          ₹{item.Price}
                        </Text>
                      </Text>

                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                          marginTop: 3,
                        }}>
                        <Text
                          style={{
                            fontSize: wp(4),
                            fontWeight: '600',
                            color: '#000',
                          }}>
                          Product Name:-{' '}
                        </Text>
                        <View>
                          <Text
                            style={{
                              fontSize: wp(4),
                              fontWeight: '600',

                              color: '#707371',
                            }}>
                            {item?.ItemName}
                          </Text>
                        </View>
                      </View>
                      <Text
                        style={{
                          fontSize: wp(4),
                          fontWeight: '600',
                          marginTop: 3,
                          color: '#000',
                        }}>
                        ProductsSku:-{' '}
                        <Text
                          style={{
                            fontSize: wp(4),
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
                          marginTop: 3,
                          alignItems: 'center',
                        }}>
                        <View style={{}}>
                          <Text
                            style={{
                              fontSize: wp(4),
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
                          }}>
                          <Text
                            style={{
                              fontSize: wp(4),
                              fontWeight: '700',
                              color: '#707371',
                            }}>
                            {item?.Name}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>

            <View style={{alignItems: 'center'}}>
              <FlatList
                data={data}
                horizontal
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      handlePage(item.num);
                    }}
                    style={styles.circleBtn}>
                    <Text
                      style={{
                        fontWeight: '800',
                        fontSize: 18,
                        color: '#fff',
                      }}>
                      {item.num}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </ScrollView>
        </>
      ) : null}
    </Modal>
  );
};

export default OfferProductModal;
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

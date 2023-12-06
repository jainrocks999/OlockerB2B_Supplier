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
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../../components/Loader';

const OfferProductModal = ({
  prevModal,
  isformList,
  id,
  offerId,
  snedDataToparent = num => {},
}) => {
  const offerProudctList = useSelector(
    state => state.Offer.offerProudctList?.products,
  );
  const isFetching = useSelector(state => state.Offer.isFetching);
  const [inputs, setInputs] = useState({
    hdnselectedvalue: [],
  });
  const modal = useSelector(state => state.Offer.modal);
  console.log('this is modal', modal);
  useEffect(() => {
    snedDataToparent(inputs.hdnselectedvalue);
  }, [inputs.hdnselectedvalue]);
  // useEffect(() => {
  //   modal ? setProductModal(modal) : null;
  // }, [modal]);
  const [productModal, setProductModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    modal != undefined ? setProductModal(modal) : null;
  }, [modal]);
  const AddProduct = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    let data2 = {
      productId: inputs.hdnselectedvalue,
      userId: user_id,
      offerId: offerId,
    };

    let data = new FormData();
    Object.keys(data2).map(item => {
      switch (item) {
        case 'productId':
          data2[item]?.map((items, index) => {
            data.append(`productId[${index}]`, items);
          });
          break;
        default:
          data.append(item, data2[item]);
      }
    });

    dispatch({
      type: 'add_product_offer_request',
      url: 'addProductOffer',
      data,
      modal: false,
    });
  };

  return (
    <Modal visible={productModal} transparent={true}>
      <View
        style={{
          height: hp(95),
          width: wp(97),
          alignSelf: 'center',
          backgroundColor: 'white',
          alignItems: 'center',
          marginTop: wp(12),
        }}>
        {isFetching ? <Loading /> : null}
        {offerProudctList?.length > 0 ? (
          <>
            <TouchableOpacity
              onPress={() => {
                dispatch({
                  type: 'offfer_product_modal',
                  modal: false,
                });
                setProductModal(false);
              }}
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
            <ScrollView
              contentContainerStyle={{paddingBottom: wp(8)}}
              showsVerticalScrollIndicator={false}>
              <View style={{flex: 1, width: wp(100)}}>
                <FlatList
                  data={offerProudctList}
                  scrollEnabled={false}
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
              {isformList ? (
                <View
                  style={{
                    height: hp(8),
                    width: '50%',
                    marginBottom: wp(3),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    //paddingHorizontal: wp(20),
                    alignSelf: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      AddProduct();
                    }}
                    style={[styles.cardbtn]}>
                    <Text
                      style={{
                        fontSize: wp(4.5),
                        fontWeight: '600',
                        color: 'white',
                      }}>
                      Add
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      dispatch({
                        type: 'offfer_product_modal',
                        modal: false,
                      });
                      setProductModal(false);
                    }}
                    style={[styles.cardbtn, {backgroundColor: '#032e63'}]}>
                    <Text
                      style={{
                        fontSize: wp(4.5),
                        fontWeight: '600',
                        color: 'white',
                      }}>
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              <View style={{alignItems: 'center', marginTop: wp(2)}}>
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
      </View>
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

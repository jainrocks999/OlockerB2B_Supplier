import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native';
import Loading from '../../../../components/Loader';

const DecorativeViewModal = ({visi, close = () => {}, isBrekup, ...props}) => {
  const dispatch = useDispatch();
  const productType = useSelector(state => state.Home?.productTypeList);
  const [inputs, setInputs] = useState({
    DecoWt: '',
    DecoWtUnit: '',
    ChargAmt: '',
    DecoItemName: '',
    hDecorationSrNo: 0,
    hProductSrNo: 0,
  });
  //decItemDetails
  const decItemDetails = productType?.decItemDetails?.map(item => {
    return {label: item.Value, value: item.Value};
  });
  const hProductSrNo = useSelector(state => state.Catalogue?.hProductSrNo);
  const session = useSelector(state => state.Home?.session);
  const handleInputs = (text, input) => {
    setInputs(prev => ({...prev, [text]: input}));
  };
  //decorativeData
  const decorativeData = useSelector(state => state.Catalogue?.decorativeData);
  console.log('this iss decorative data', JSON.stringify(decorativeData));
  const isFetching = useSelector(state => state.Catalogue?.isFetching);
  const productEdit = useSelector(state => state.Catalogue?.productEdit);
  useEffect(() => {
    setInputs({
      DecoWt: '',
      DecoWtUnit: '',
      ChargAmt: '',
      DecoItemName: '',
      hDecorationSrNo: 0,
      hProductSrNo: 0,
    });
  }, [decorativeData]);
  const handleOnSubmit = async (isEdit, item) => {
    if (isEdit) {
      setInputs({
        DecoWt: item?.DecorativeItemWt,
        DecoWtUnit: item?.UnitDecoItemWt,
        DecoItemName: item?.DecorativeItemName,
        ChargAmt: item?.DecorativeChargeableAmount,
        hDecorationSrNo: item.SrNo,
        hProductSrNo: hProductSrNo ? hProductSrNo : '',
      });
    } else {
      const user_id = await AsyncStorage.getItem('user_id');
      dispatch({
        type: 'add_decItem_request',
        url: 'addDecorative',
        data: {
          ...inputs,
          isAdd: productEdit ? 0 : 1,
          current_session_id: productEdit ? 0 : session,
          BreakUp: isBrekup == 1 ? 0 : 1,
          hProductSrNo: productEdit ? hProductSrNo : 0,
        },
      });
    }
  };
  const handleOndelete = (SrNo, sessions) => {
    dispatch({
      type: 'remove_decorative_request',
      url: 'removeDecorative',
      DecorativeId: SrNo,
      BreakUp: isBrekup == 0 ? 1 : 0,
      current_session_id: productEdit ? 0 : sessions,
      hProductSrNo: productEdit ? hProductSrNo : 0,
    });
  };

  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent visible={visi}>
        <View style={styles.modalView}>
          <ScrollView>
            {isFetching ? <Loading /> : null}
            <TouchableOpacity onPress={() => close()} style={styles.crossbtn}>
              <Text style={styles.xbtn}>X</Text>
            </TouchableOpacity>
            <View style={styles.modalText}>
              <View style={styles.item}>
                <Text style={styles.textItem}>DECORATIVE ITEM DETAILS </Text>
              </View>
              <View style={{width: wp(80)}}>
                <Text style={styles.deta}>
                  (NON-PRECIOUS ITEM DETAILS USED IN PRODUCT ADDING UP IN GROSS
                  WT)
                </Text>
              </View>
            </View>
            {decorativeData?.length > 0 != undefined ? (
              <View style={{marginTop: wp(3)}}>
                <FlatList
                  data={decorativeData}
                  scrollEnabled={false}
                  renderItem={({item, index}) => {
                    return (
                      <View
                        style={{
                          borderWidth: 1,
                          marginVertical: wp(1),
                          paddingVertical: wp(2),
                          paddingHorizontal: wp(3),
                          backgroundColor: '#f3f3f5',
                          borderRadius: wp(2),
                          elevation: 5,
                        }}>
                        <View style={[styles.editdelete, {zIndex: 1}]}>
                          <TouchableOpacity
                            onPress={() => {
                              handleOnSubmit(true, item);
                            }}>
                            <MaterialCommunityIcons
                              name="pencil"
                              size={wp(4.5)}
                              color={'black'}
                            />
                          </TouchableOpacity>
                          <Text
                            style={[
                              styles.cardTitle,
                              {
                                width: 5,
                                fontSize: wp(5),
                                color: 'black',
                                marginTop: wp(-1),
                              },
                            ]}>
                            |
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              handleOndelete(item.SrNo, item.Session);
                            }}>
                            <MaterialCommunityIcons
                              name="delete"
                              size={wp(4.5)}
                              color={'black'}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.cartItem}>
                          <Text style={[styles.cardTitle, {color: 'black'}]}>
                            Decorative Item Name
                          </Text>

                          <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                          <Text style={styles.cardTitle}>
                            {item?.DecorativeItemName}
                          </Text>
                        </View>
                        <View style={styles.cartItem}>
                          <Text style={[styles.cardTitle, {color: 'black'}]}>
                            Decorative Item Wt.
                          </Text>

                          <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                          <Text style={styles.cardTitle}>
                            {item?.DecorativeItemWt}
                          </Text>
                        </View>
                        <View style={styles.cartItem}>
                          <Text style={[styles.cardTitle, {color: 'black'}]}>
                            Unit of Decorative Wt.
                          </Text>
                          <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                          <Text style={styles.cardTitle}>
                            {item?.UnitDecoItemWt}
                          </Text>
                        </View>
                        <View style={styles.cartItem}>
                          <Text style={[styles.cardTitle, {color: 'black'}]}>
                            Decorative Item value
                          </Text>

                          <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                          <Text style={styles.cardTitle}>
                            {item?.DecorativeChargeableAmount}
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
            ) : null}
            <View style={{marginLeft: wp(2)}}>
              <Text style={styles.buttonClose}>
                Decorative item weight<Text style={{color: 'red'}}>*</Text>
              </Text>
              <View style={styles.inputFiled}>
                <TextInput
                  value={inputs.DecoWt}
                  onChangeText={input => {
                    handleInputs('DecoWt', input);
                  }}
                  placeholder="Stone Wt "
                  style={{color: 'black', fontSize: wp(4)}}
                  placeholderTextColor={'grey'}
                />
              </View>
            </View>
            <Text style={[styles.buttonClose, {marginLeft: wp(3)}]}>
              Unit of Wt. <Text style={{color: 'red'}}>*</Text>
            </Text>

            <View
              style={[
                styles.inputFiled,
                {paddingHorizontal: 10, marginHorizontal: wp(2)},
              ]}>
              <Dropdown
                style={{
                  color: '#032e63',
                  width: '100%',
                  height: 40,
                }}
                placeholderStyle={{
                  color: '#474747',
                  width: '100%',
                  alignSelf: 'center',
                  fontSize: wp(4),
                }}
                itemTextStyle={{color: 'grey'}}
                selectedTextStyle={{
                  color: '#474747',
                  width: '100%',
                  fontSize: wp(4),
                  fontFamily: 'Acephimere',
                }}
                // iconStyle={{ tintColor: '#ffff' }}
                data={DropData}
                inputSearchStyle={{
                  borderRadius: 10,
                  backgroundColor: '#f0f0f0',
                }}
                searchPlaceholder="search.."
                maxHeight={250}
                search
                labelField="label"
                valueField="value"
                placeholder={
                  inputs.DecoWtUnit ? inputs.DecoWtUnit : 'Select Unit of Wt.'
                }
                value={inputs.DecoWtUnit}
                onChange={item => {
                  handleInputs('DecoWtUnit', item.value);
                }}
              />
            </View>

            {isBrekup == 0 ? (
              <>
                <Text style={[styles.buttonClose, {marginLeft: wp(3)}]}>
                  Decorative item value<Text style={{color: 'red'}}>*</Text>
                </Text>
                <View style={[styles.inputFiled, {marginHorizontal: wp(2)}]}>
                  <TextInput
                    value={inputs.ChargAmt}
                    onChangeText={input => {
                      handleInputs('ChargAmt', input);
                    }}
                    style={{color: 'black', fontSize: wp(4)}}
                    placeholderTextColor={'grey'}
                    placeholder="Amount in Rs."
                  />
                </View>
              </>
            ) : null}

            <Text style={[styles.buttonClose, {marginLeft: wp(3)}]}>
              Decorative item details <Text style={{color: 'red'}}>*</Text>
            </Text>

            <View
              style={[
                styles.inputFiled,
                {paddingHorizontal: wp(2), marginHorizontal: wp(2)},
              ]}>
              <Dropdown
                style={{
                  color: '#032e63',
                  width: '100%',
                  height: 40,
                  // marginTop: 5
                }}
                placeholderStyle={{
                  color: 'grey',
                  width: '100%',
                  alignSelf: 'center',
                  // fontFamily: 'Acephimere'
                  fontSize: wp(4),
                }}
                itemTextStyle={{color: 'grey'}}
                selectedTextStyle={{
                  color: '#474747',
                  width: '100%',
                  fontSize: wp(4),
                  fontFamily: 'Acephimere',
                }}
                // iconStyle={{ tintColor: '#ffff' }}
                data={decItemDetails}
                inputSearchStyle={{
                  borderRadius: 10,
                  backgroundColor: '#f0f0f0',
                }}
                // itemTextStyle={{ fontSize: 15 }}
                // itemContainerStyle={{ marginBottom: -20, }}
                searchPlaceholder="search.."
                maxHeight={250}
                search
                labelField="label"
                valueField="value"
                placeholder="Select Decorative item Name"
                value={inputs.DecoItemName}
                onChange={item => {
                  handleInputs('DecoItemName', item.value);
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => handleOnSubmit(false)}
              style={styles.buttonOpen}>
              <Text
                style={{color: 'white', fontSize: wp(4.5), fontWeight: 'bold'}}>
                Add Details
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};
export default DecorativeViewModal;
const DropData = [
  {label: 'Cts.', value: 'Cts.'},
  {label: 'Gms.', value: 'Gms.'},
];

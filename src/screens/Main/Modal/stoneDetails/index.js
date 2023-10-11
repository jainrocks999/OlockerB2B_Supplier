import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  FlatList,
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
import Loading from '../../../../components/Loader';

const StoneViewModal = ({visi, close = () => {}, isBrekup, ...props}) => {
  const dispatch = useDispatch();
  const productType = useSelector(state => state.Home?.productTypeList);
  const session = useSelector(state => state.Home?.session);
  const stoneData = useSelector(state => state.Catalogue?.stoneData);
  const isFetching = useSelector(state => state.Catalogue.isFetching);

  const [value, setValue] = useState(null);
  const [inputs, setInputs] = useState({
    StoneWt: '',
    StoneWtUnit: '',
    ChargAmt: '',
    StoneName: '',
    isAdd: 1,
    hProductSrNo: '',
    hStonesSrNo: '',
    current_session_id: '',
  });
  const stoneDetails = productType?.stoneDetails?.map(item => {
    return {label: item.Value, value: item.Value};
  });
  const handleInputs = (text, input) => {
    setInputs(prev => ({...prev, [text]: input}));
  };

  useEffect(() => {
    setInputs({
      StoneWt: '',
      StoneWtUnit: '',
      ChargAmt: '',
      StoneName: '',
      isAdd: 1,
      hProductSrNo: '',
      hStonesSrNo: '',
      current_session_id: session,
    });
  }, [stoneData]);
  const handleOnSubmit = async (isEdit, item) => {
    if (isEdit) {
      setInputs({
        ChargAmt: item.StoneChargeableAmount,
        StoneWtUnit: item.UnitStoneWt,
        StoneWt: item.StoneWt,
        StoneName: item.StoneName,
        isAdd: 1,
        hStonesSrNo: item.SrNo,
      });
    } else {
      const user_id = await AsyncStorage.getItem('user_id');
      dispatch({
        type: 'add_stone_request',
        url: 'addStone',
        data: {
          ...inputs,
          BreakUp: isBrekup == 0 ? 1 : 0,
          current_session_id: isEdit ? item.Session : session,
        },
      });
    }
  };
  const handleOnDelete = (SrNo, sessions) => {
    dispatch({
      type: 'remove_stone_request',
      url: 'removeStone',
      StoneId: SrNo,
      current_session_id: sessions,
      BreakUp: isBrekup == 0 ? 1 : 0,
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
                <Text style={styles.textItem}>STONE DETAILS</Text>
              </View>
              <View style={{width: wp(80)}}>
                <Text style={styles.deta}>
                  (DETAILS OF PRECIOUS/SEMI-PRECIOUS STONES USED IN PRODUCT)
                </Text>
              </View>
            </View>
            {stoneData ? (
              <View style={{marginTop: wp(3)}}>
                <FlatList
                  data={stoneData}
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
                            onPress={() =>
                              handleOnDelete(item.SrNo, item.Session)
                            }>
                            <MaterialCommunityIcons
                              name="delete"
                              size={wp(4.5)}
                              color={'black'}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.cartItem}>
                          <Text style={[styles.cardTitle, {color: 'black'}]}>
                            Stone Name
                          </Text>

                          <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                          <Text style={styles.cardTitle}>{item.StoneName}</Text>
                        </View>
                        <View style={styles.cartItem}>
                          <Text style={[styles.cardTitle, {color: 'black'}]}>
                            Stone Wt.
                          </Text>

                          <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                          <Text style={styles.cardTitle}>{item.StoneWt}</Text>
                        </View>
                        <View style={styles.cartItem}>
                          <Text style={[styles.cardTitle, {color: 'black'}]}>
                            Unit of Stone Wt.
                          </Text>
                          <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                          <Text style={styles.cardTitle}>
                            {item.UnitStoneWt}
                          </Text>
                        </View>
                        <View style={styles.cartItem}>
                          <Text style={[styles.cardTitle, {color: 'black'}]}>
                            Stone value
                          </Text>

                          <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                          <Text style={styles.cardTitle}>
                            {item.StoneChargeableAmount}
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
                Stone wt. <Text style={{color: 'red'}}>*</Text>
              </Text>
              <View style={styles.inputFiled}>
                <TextInput
                  value={inputs.StoneWt}
                  onChangeText={input => {
                    handleInputs('StoneWt', input);
                  }}
                  placeholder="Stone Wt "
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
                  // marginTop: 5
                }}
                placeholderStyle={{
                  color: '#474747',
                  width: '100%',
                  alignSelf: 'center',
                  fontSize: wp(4),
                  paddingLeft: wp(2),
                }}
                selectedTextStyle={{
                  color: '#474747',
                  width: '100%',
                  fontSize: wp(4),
                  fontFamily: 'Acephimere',
                  paddingLeft: wp(2),
                }}
                // iconStyle={{ tintColor: '#ffff' }}
                data={DropData}
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
                placeholder="Select Unit of Wt."
                value={inputs.StoneWtUnit}
                onChange={item => {
                  handleInputs('StoneWtUnit', item.value);
                }}
              />
            </View>
            {isBrekup == 0 ? (
              <>
                <Text style={[styles.buttonClose, {marginLeft: wp(3)}]}>
                  Stone value<Text style={{color: 'red'}}>*</Text>
                </Text>
                <View style={[styles.inputFiled, {marginHorizontal: wp(2)}]}>
                  <TextInput
                    value={inputs.ChargAmt}
                    onChangeText={input => {
                      handleInputs('ChargAmt', input);
                    }}
                    placeholder="Amount in Rs."
                  />
                </View>
              </>
            ) : null}
            <Text style={[styles.buttonClose, {marginLeft: wp(3)}]}>
              Stone details <Text style={{color: 'red'}}>*</Text>
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

                  marginBottom: -1,
                  height: 40,
                  // marginTop: 5
                }}
                placeholderStyle={{
                  color: 'grey',
                  width: '100%',
                  alignSelf: 'center',
                  // fontFamily: 'Acephimere'
                  fontSize: wp(4),
                  paddingLeft: wp(4),
                }}
                selectedTextStyle={{
                  color: '#474747',
                  width: '100%',
                  fontSize: wp(4),
                  fontFamily: 'Acephimere',
                  paddingLeft: wp(2),
                }}
                // iconStyle={{ tintColor: '#ffff' }}
                data={stoneDetails}
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
                placeholder="Select Stone Name"
                value={inputs.StoneName}
                onChange={item => {
                  handleInputs('StoneName', item.value);
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
export default StoneViewModal;
const DropData = [
  {label: 'Cts.', value: 'Cts.'},
  {label: 'Gms', value: 'Gms'},
];

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
import Toast from "react-native-simple-toast";

const StoneViewModal = ({visi, close = () => {}, isBrekup, ...props}) => {
  const dispatch = useDispatch();
  const productType = useSelector(state => state.Home?.productTypeList);
  const session = useSelector(state => state.Home?.session);
  const stoneData = useSelector(state => state.Catalogue?.stoneData);
  const isFetching = useSelector(state => state.Catalogue.isFetching);
  const hProductSrNo = useSelector(state => state.Catalogue?.hProductSrNo);
  const productEdit = useSelector(state => state.Catalogue?.productEdit);

  const [value, setValue] = useState(null);
  const [inputs, setInputs] = useState({
    StoneWt: '',
    StoneWtUnit: '',
    ChargAmt: '',
    StoneName: '',
    isAdd: 1,
    hProductSrNo: 0,
    hStonesSrNo: 0,
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
      hProductSrNo: 0,
      hStonesSrNo: 0,
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
        hStonesSrNo: item.SrNo,
      });
    } else {
      if(inputs.StoneWt==0){
        Toast.show('Please enter the stone weight');
        return;
      }
      else if(inputs.StoneWtUnit==''){
        Toast.show('Please select stone unit weight');
        return;
      }
      else if(inputs.StoneName==''){
        Toast.show('Please select stone Name');
        return;
      }
      dispatch({
        type: 'add_stone_request',
        url: 'addStone',
        data: {
          ...inputs,
          BreakUp: isBrekup == 0 ? 1 : 0,
          isAdd: productEdit ? 0 : 1,
          current_session_id: productEdit ? 0 : session,
          hProductSrNo: productEdit ? hProductSrNo : 0,
        },
      });
    }
  };
  const handleOnDelete = (SrNo, sessions) => {
    dispatch({
      type: 'remove_stone_request',
      url: 'removeStone',
      StoneId: SrNo,
      current_session_id: productEdit ? 0 : sessions,
      BreakUp: isBrekup == 0 ? 1 : 0,
      hProductSrNo: productEdit ? hProductSrNo : 0,
    });
  };

  const handleClose=()=>{
    setInputs({
      StoneWt: '',
      StoneWtUnit: '',
      ChargAmt: '',
      StoneName: '',
      isAdd: 1,
      hProductSrNo: 0,
      hStonesSrNo: 0,
      current_session_id: session,
    });
    close()
  }

  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent visible={visi}>
      <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(69, 71, 71,0.9)',
            justifyContent: 'center',
          }}>
        <View style={styles.modalView}>
          <ScrollView>
            {isFetching ? <Loading /> : null}
            <TouchableOpacity onPress={() => handleClose()} style={styles.crossbtn}>
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
            {stoneData?.length > 0 != undefined ? (
              <View style={{marginTop: wp(3)}}>
                <FlatList
                  data={stoneData}
                  scrollEnabled={false}
                  renderItem={({item}) => {
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
                          <Text style={styles.cardTitle}>
                            {item?.StoneName}
                          </Text>
                        </View>
                        <View style={styles.cartItem}>
                          <Text style={[styles.cardTitle, {color: 'black'}]}>
                            Stone Wt.
                          </Text>

                          <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                          <Text style={styles.cardTitle}>{item?.StoneWt}</Text>
                        </View>
                        <View style={styles.cartItem}>
                          <Text style={[styles.cardTitle, {color: 'black'}]}>
                            Unit of Stone Wt.
                          </Text>
                          <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                          <Text style={styles.cardTitle}>
                            {item?.UnitStoneWt}
                          </Text>
                        </View>
                        <View style={styles.cartItem}>
                          <Text style={[styles.cardTitle, {color: 'black'}]}>
                            Stone value
                          </Text>

                          <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                          <Text style={styles.cardTitle}>
                            {item?.StoneChargeableAmount}
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
                  style={{color: 'black', fontSize: wp(4)}}
                  placeholderTextColor={'grey'}
                  keyboardType='numeric'
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
                itemTextStyle={{color: 'grey'}}
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
                    keyboardType='numeric'
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
                itemTextStyle={{color: 'grey'}}
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
        </View>
      </Modal>
    </View>
  );
};
export default StoneViewModal;
const DropData = [
  {label: 'Cts.', value: 'Cts.'},
  {label: 'Gms.', value: 'Gms.'},
];

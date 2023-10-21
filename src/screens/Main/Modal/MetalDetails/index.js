import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
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
import Loading from '../../../../components/Loader';

const MetalViewModal = ({visi, close = () => {}, isBrekup, ...props}) => {
  const dispatch = useDispatch();
  const productType = useSelector(state => state.Home?.productTypeList);
  const session = useSelector(state => state.Home?.session);
  const isFetching = useSelector(state => state.Catalogue?.isFetching);
  const metalData = useSelector(state => state.Catalogue?.metalData);
  const hProductSrNo = useSelector(state => state.Catalogue?.hProductSrNo);
  const totalWiegt = useSelector(state => state.Catalogue?.totalWiegt);
  const productEdit = useSelector(state => state.Catalogue?.productEdit);
  // console.log('this is raju', metalData.result);
  const [inputs, setInputs] = useState({
    GrossWt: '',
    MetalPurity: '',
    MetalTypes: '',
    MetalWt: '',
    MetalWtUnit: '',
    session: '',
    hProductSrNo: 0,
    hMetalWt: 0,
    isAdd: 1,
    current_session_id: productEdit ? 0 : session,
  });
  //   Raju Virendra check it param
  // current_session_id:1697872810743
  // GrossWt:20
  // MetalPurity:995
  // MetalTypes:Gold
  // MetalWt:20
  // MetalWtUnit:Gms.
  // hProductSrNo:0
  // isAdd:1
  // hMetalWt:0
  useEffect(() => {
    setInputs({
      GrossWt: '',
      MetalPurity: '',
      MetalTypes: '',
      MetalWt: '',
      MetalWtUnit: '',
      current_session_id: productEdit ? 0 : session,
      hProductSrNo: 0,
      hMetalWt: 0,
    });
  }, [metalData]);
  const handleInputs = (type, input) => {
    setInputs(prev => ({...prev, [type]: input}));
  };

  const handleOnSubmit = async (isEdit, item) => {
    if (isEdit === 'edit') {
      setInputs({
        GrossWt: totalWiegt,
        MetalPurity: item.MetalPurity,
        MetalTypes: item.MetalType,
        MetalWt: item.MetalWt,
        MetalWtUnit: item.UnitMetalWt,

        hMetalWt: item.SrNo,
      });
    } else {
      dispatch({
        type: 'add_metal_list_request',
        url: 'addmetal',
        data: {
          ...inputs,
          current_session_id: productEdit ? '' : session,
          hProductSrNo: productEdit ? hProductSrNo : 0,
          isAdd: productEdit ? 0 : 1,
        },
      });
    }
  };

  const metaltype = productType?.MetalTypes.map(item => {
    return {value: item.Value, label: item.Value};
  });

  const handleOnDelete = (SrNo, session, item) => {
    dispatch({
      type: 'delete_metal_request',
      url: 'removeMetal',
      current_session_id: productEdit ? 0 : session,
      MetalId: SrNo,
      hProductSrNo: productEdit ? hProductSrNo : 0,
    });
    console.log(SrNo, session);
    console.log(item);
  };

  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent visible={visi}>
        <View style={styles.modalView}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: wp(4)}}>
            {isFetching ? <Loading /> : null}
            <TouchableOpacity onPress={() => close()} style={styles.crossbtn}>
              <Text style={styles.xbtn}>X</Text>
            </TouchableOpacity>
            <View style={styles.modalText}>
              <View style={styles.item}>
                <Text style={styles.textItem}>METAL DETAILS</Text>
              </View>
              <View style={{width: wp(80)}}>
                <Text style={styles.deta}>
                  (DETAILS OF PRECIOUS METALS USED IN PRODUCT)
                </Text>
              </View>
            </View>
            {metalData.result?.length > 0 != undefined ? (
              <View style={{marginTop: wp(3)}}>
                <FlatList
                  data={metalData?.result}
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
                            onPress={() => handleOnSubmit('edit', item)}>
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
                              handleOnDelete(item?.SrNo, item?.Session, item)
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
                            Metal Wt.
                          </Text>

                          <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                          <Text style={styles.cardTitle}>{item?.MetalWt}</Text>
                        </View>
                        <View style={styles.cartItem}>
                          <Text style={[styles.cardTitle, {color: 'black'}]}>
                            Unit of Metal Wt.
                          </Text>

                          <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                          <Text style={styles.cardTitle}>
                            {item?.UnitMetalWt}
                          </Text>
                        </View>
                        <View style={styles.cartItem}>
                          <Text style={[styles.cardTitle, {color: 'black'}]}>
                            Metal Type
                          </Text>
                          <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                          <Text style={styles.cardTitle}>
                            {item?.MetalType}
                          </Text>
                        </View>
                        <View style={styles.cartItem}>
                          <Text style={[styles.cardTitle, {color: 'black'}]}>
                            Metal Purity
                          </Text>

                          <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                          <Text style={styles.cardTitle}>
                            {item?.MetalPurity}
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
                Gross wt. GMS <Text style={{color: 'red'}}>*</Text>
              </Text>
              <View style={styles.inputFiled}>
                <TextInput
                  value={inputs.GrossWt}
                  onChangeText={input => {
                    handleInputs('GrossWt', input);
                  }}
                  placeholder="Gross Wt gms"
                />
              </View>
              <Text style={[styles.buttonClose, {marginLeft: wp(1)}]}>
                Metal type <Text style={{color: 'red'}}>*</Text>
              </Text>
            </View>
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
                  paddingLeft: wp(1),
                }}
                placeholderStyle={{
                  color: '#474747',
                  width: '100%',
                  alignSelf: 'center',
                  // fontFamily: 'Acephimere'
                }}
                selectedTextStyle={{
                  color: '#474747',
                  width: '100%',
                  fontSize: 14,
                  marginBottom: -1,
                  fontFamily: 'Acephimere',
                }}
                // iconStyle={{ tintColor: '#ffff' }}
                data={metaltype}
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
                placeholder="Metal type"
                value={inputs.MetalTypes}
                onChange={item => {
                  handleInputs('MetalTypes', item.value);
                }}
              />
            </View>
            <Text style={[styles.buttonClose, {marginLeft: wp(3)}]}>
              Metal purity <Text style={{color: 'red'}}>*</Text>
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
                  color: '#474747',
                  width: '100%',
                  alignSelf: 'center',
                  // fontFamily: 'Acephimere'
                }}
                selectedTextStyle={{
                  color: '#474747',
                  width: '100%',
                  fontSize: 14,
                  marginBottom: -1,
                  fontFamily: 'Acephimere',
                }}
                // iconStyle={{ tintColor: '#ffff' }}
                data={metalpurity}
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
                placeholder="Metal purity"
                value={inputs.MetalPurity}
                onChange={item => {
                  handleInputs('MetalPurity', item.value);
                }}
              />
            </View>
            <Text style={[styles.buttonClose, {marginLeft: wp(3)}]}>
              Metal net wt.<Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={[styles.inputFiled, {marginHorizontal: wp(2)}]}>
              <TextInput
                value={inputs.MetalWt}
                onChangeText={input => handleInputs('MetalWt', input)}
                placeholder="Net Wt gms"
              />
            </View>
            <Text style={[styles.buttonClose, {marginLeft: wp(3)}]}>
              Unit of wt.<Text style={{color: 'red'}}>*</Text>
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
                  color: '#474747',
                  width: '100%',
                  alignSelf: 'center',
                  // fontFamily: 'Acephimere'
                }}
                selectedTextStyle={{
                  color: '#474747',
                  width: '100%',
                  fontSize: 14,
                  marginBottom: -1,
                  fontFamily: 'Acephimere',
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
                placeholder="Select Unit of wt."
                value={inputs.MetalWtUnit}
                onChange={item => {
                  handleInputs('MetalWtUnit', item.value);
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => handleOnSubmit('')}
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
export default MetalViewModal;
const DropData = [
  {label: 'Cts.', value: 'Cts.'},
  {label: 'Gms.', value: 'Gms.'},
];
// const metaltype = [
//   {
//     label: 'Gold', value: 'Gold'
//   },
//   { label: 'Platinum', value: 'Platinum' },
//   { label: 'Silver', value: 'Silver' }

// ]

const metalpurity = [
  {label: '999 (24k)', value: '999'},
  {label: '995', value: '995'},
  {label: '990', value: '990'},
  {label: '958.3 (23k)', value: '958.3'},
  {label: '916 (22k)', value: '916'},
  {label: '900', value: '900'},
  {label: '834 (20k)', value: '834'},
  {label: '750 (18k)', value: '750'},
  {label: '625 (15k)', value: '625'},
  {label: '585 (14k)', value: '585'},
  {label: '417 (10k)', value: '417'},
  {label: '376 (9k)', value: '376'},
  {label: '800', value: '800'},
  {label: '850', value: '850'},
  {label: '880', value: '880'},
  {label: '985', value: '985'},
  {label: '833', value: '833'},
];

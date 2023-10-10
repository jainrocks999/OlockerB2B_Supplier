import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
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

const DiamondViewModal = ({visi, close = () => {}, isBrekup, ...props}) => {
  const productType = useSelector(state => state.Home?.productTypeList);
  const session = useSelector(state => state.Home?.session);
  const diamondData = useSelector(state => state.Catalogue?.diamondData);
  const isFetching = useSelector(state => state.Catalogue?.isFetching);

  const dispatch = useDispatch();

  const [value, setValue] = useState(null);
  const [inputs, setInputs] = useState({
    Diamondwt: '',
    ChargAmt: '',
    DiamondWtUnit: '',
    DiamondName: '',
    DiamondShape: '',
    DiamondQuality: '',
  });

  const handleInputs = (text, input) => {
    setInputs(prev => ({...prev, [text]: input}));
  };

  const diamondDetails = productType?.dimondDetails?.map(item => {
    return {label: item.Value, value: item.Value};
  });
  const dimondShape = productType?.dimondShape?.map(item => {
    return {label: item.Value, value: item.Value};
  });
  const dimondQuality = productType?.dimondQuality?.map(item => {
    return {label: item.Value, value: item.Value};
  });

  const handleOnSubmit = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    dispatch({
      type: 'add_dimon_request',
      url: 'addDiamond',
      data: {
        ...inputs,
        current_session_id: session,
        isAdd: 1,
        hProductSrNo: user_id,
        BreakUp: isBrekup == 0 ? 1 : 0,
        hDiamondSrNo: '',
      },
    });
  };

  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent visible={visi}>
        <View style={styles.modalView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {isFetching ? <Loading /> : null}
            <TouchableOpacity onPress={() => close()} style={styles.crossbtn}>
              <Text style={styles.xbtn}>X</Text>
            </TouchableOpacity>
            <View style={styles.modalText}>
              <View style={styles.item}>
                <Text style={styles.textItem}>DIAMOND DETAILS</Text>
              </View>
              <View style={{width: wp(80)}}>
                <Text style={styles.deta}>
                  (DETAILS OF DIAMOND USED IN PRODUC)
                </Text>
              </View>
            </View>

            {diamondData ? (
              <View style={{marginTop: wp(3)}}>
                <FlatList
                  data={diamondData}
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
                        <View style={styles.editdelete}>
                          <MaterialCommunityIcons
                            name="pencil"
                            size={wp(4.5)}
                            color={'black'}
                          />
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
                          <MaterialCommunityIcons
                            name="delete"
                            size={wp(4.5)}
                            color={'black'}
                          />
                        </View>
                        <View style={[styles.cartItem, {marginTop: wp(5)}]}>
                          <Text style={[styles.cardTitle, {color: 'black'}]}>
                            Diamond Name
                          </Text>

                          <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                          <Text style={styles.cardTitle}>{item.StoneName}</Text>
                        </View>
                        <View style={styles.cartItem}>
                          <Text style={[styles.cardTitle, {color: 'black'}]}>
                            Diamond Wt.
                          </Text>

                          <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                          <Text style={styles.cardTitle}>{item.StoneWt}</Text>
                        </View>
                        <View style={styles.cartItem}>
                          <Text style={[styles.cardTitle, {color: 'black'}]}>
                            Unit of Diamond Wt.
                          </Text>
                          <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                          <Text style={styles.cardTitle}>
                            {item.UnitStoneWt}
                          </Text>
                        </View>
                        <View style={styles.cartItem}>
                          <Text style={[styles.cardTitle, {color: 'black'}]}>
                            Diamond Quality
                          </Text>

                          <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                          <Text style={styles.cardTitle}>
                            {item.StoneQuality}
                          </Text>
                        </View>
                        <View style={styles.cartItem}>
                          <Text style={[styles.cardTitle, {color: 'black'}]}>
                            Diamond Shape
                          </Text>

                          <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                          <Text style={styles.cardTitle}>
                            {item.StoneShape}
                          </Text>
                        </View>
                        <View style={styles.cartItem}>
                          <Text style={[styles.cardTitle, {color: 'black'}]}>
                            Diamond value
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

            <View style={{marginLeft: wp(1)}}>
              <Text style={styles.buttonClose}>
                Diamond wt. <Text style={{color: 'red'}}>*</Text>
              </Text>
              <View style={styles.inputFiled}>
                <TextInput
                  value={inputs.Diamondwt}
                  onChangeText={input => handleInputs('Diamondwt', input)}
                  placeholder="Diamond wt"
                />
              </View>
              <Text style={[styles.buttonClose, {marginLeft: wp(1)}]}>
                Unit of wt. <Text style={{color: 'red'}}>*</Text>
              </Text>
            </View>
            <View style={[styles.inputFiled, {marginLeft: wp(1)}]}>
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
                  fontSize: wp(4),
                }}
                selectedTextStyle={{
                  color: '#474747',
                  width: '100%',
                  fontSize: wp(4),
                  fontFamily: 'Acephimere',
                  marginLeft: wp(2),
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
                value={inputs.DiamondWtUnit}
                onChange={item => {
                  handleInputs('DiamondWtUnit', item.value);
                }}
              />
            </View>
            {isBrekup == 0 ? (
              <>
                <Text style={[styles.buttonClose, {marginLeft: wp(2)}]}>
                  Diamond Value<Text style={{color: 'red'}}>*</Text>
                </Text>
                <View style={[styles.inputFiled, {marginHorizontal: wp(1)}]}>
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
            <Text style={[styles.buttonClose, {marginLeft: wp(2)}]}>
              Diamond details <Text style={{color: 'red'}}>*</Text>
            </Text>
            <View
              style={[
                styles.inputFiled,
                {paddingHorizontal: 10, marginHorizontal: wp(1)},
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
                  fontSize: wp(4),
                }}
                selectedTextStyle={{
                  color: '#474747',
                  width: '100%',
                  fontSize: wp(4),
                  fontFamily: 'Acephimere',
                  marginLeft: wp(2),
                }}
                // iconStyle={{ tintColor: '#ffff' }}
                data={diamondDetails}
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
                placeholder="Diamond details"
                value={inputs.DiamondName}
                onChange={item => {
                  handleInputs('DiamondName', item.value);
                }}
              />
            </View>
            <Text style={[styles.buttonClose, {marginLeft: wp(2)}]}>
              Diamond Shape <Text style={{color: 'red'}}>*</Text>
            </Text>
            <View
              style={[
                styles.inputFiled,
                {paddingHorizontal: 10, marginHorizontal: wp(1)},
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
                  fontSize: wp(4),
                }}
                selectedTextStyle={{
                  color: '#474747',
                  width: '100%',
                  fontSize: wp(4),
                  fontFamily: 'Acephimere',
                  marginLeft: wp(2),
                }}
                // iconStyle={{ tintColor: '#ffff' }}
                data={dimondShape}
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
                placeholder="Select Diamond Shape"
                value={inputs.DiamondShape}
                onChange={item => {
                  handleInputs('DiamondShape', item.value);
                }}
              />
            </View>
            <Text style={[styles.buttonClose, {marginLeft: wp(2)}]}>
              Diamond Quality <Text style={{color: 'red'}}>*</Text>
            </Text>
            <View
              style={[
                styles.inputFiled,
                {paddingHorizontal: 10, marginHorizontal: wp(1)},
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
                  fontSize: wp(4),
                }}
                selectedTextStyle={{
                  color: '#474747',
                  width: '100%',
                  fontSize: wp(4),
                  fontFamily: 'Acephimere',
                  marginLeft: wp(2),
                }}
                data={dimondQuality}
                inputSearchStyle={{
                  borderRadius: 10,
                  backgroundColor: '#f0f0f0',
                }}
                searchPlaceholder="search.."
                maxHeight={250}
                search
                labelField="label"
                valueField="value"
                placeholder="Diamond Quality"
                value={inputs.DiamondQuality}
                onChange={item => {
                  handleInputs('DiamondQuality', item.value);
                }}
              />
            </View>

            <TouchableOpacity
              onPress={() => handleOnSubmit()}
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
export default DiamondViewModal;
const DropData = [
  {label: 'Cts.', value: 'Cts.'},
  {label: 'Gms', value: 'Gms'},
];

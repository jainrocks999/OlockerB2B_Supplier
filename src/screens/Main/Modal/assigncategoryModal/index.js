import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Modal, TextInput} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import styles from './styles';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../../../components/Loader';
import {widthPercentageToDP} from 'react-native-responsive-screen';
const AssignCategory = ({visi, close = () => {}, ...props}) => {
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.Supplier.isFetching);
  const AssiGnModal = useSelector(state => state.Supplier.AssiGnModal);
  const data2 = useSelector(state => state.Home.data2);

  const StatusDropdown = [
    {label: 'Pending', value: '3'},
    {label: 'Approved', value: '1'},
    {label: 'Reject', value: '2'},
  ];
  const [allow, setAllow] = useState(false);
  const [value, setValue] = useState(props.data?.CategoryType);
  const [name, setName] = useState(props.data?.CompanyName);
  const [Status, setStatus] = useState(
    props.data?.Status ? props.data?.Status : 'Select',
  );
  useEffect(() => {
    setAllow(props.data?.IsShowInRetailerApp == 'No' ? false : true);
    setName(props.data?.CompanyName);
    setStatus(props.data?.Status ? props.data?.Status : 'Select');
    setValue(props.data?.CategoryType);
  }, [props.data]);
  const updateData = () => {
    let data = new FormData();
    data.append('hSrNo', props.data.SrNo);
    data.append('ddlStatus', Status);
    data.append('ddlCategory', value);
    data.append('IsShowInRetailerApp', allow ? 'Yes' : 'No');
    dispatch({
      type: 'update_status_&_assign_request',
      data,
      url: 'retailerStatusUpdate',
      AssiGnModal: !AssiGnModal,
      data2,
    });
  };
  return (
    <View style={{flex: 1}}>
      <Modal animationType="slide" transparent={true} visible={visi}>
        <View
          style={[
            styles.centeredView,
            {backgroundColor: 'rgba(52, 52, 52, 0.8)', marginTop: 0},
          ]}>
          {isFetching ? <Loading /> : null}
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => close()}
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                backgroundColor: '#032e63',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                right: 0,
                margin: 10,
              }}>
              <Text style={{fontSize: 18, color: 'white'}}>X</Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                alignSelf: 'center',
                marginTop: 40,
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '800',
                  color: '#000',
                  marginLeft: -10,
                }}>
                Assign Category to Retailer :
              </Text>
            </View>
            <View style={styles.Card}>
              <View
                style={{
                  marginTop: 10,
                }}>
                <View style={{}}>
                  <Text style={{fontWeight: '600', fontSize: 18}}>
                    Name of the retailer <Text style={{color: 'red'}}>*</Text>
                  </Text>
                </View>

                <View
                  style={{
                    borderWidth: 1,
                    marginTop: 10,
                    paddingHorizontal: 5,
                    height: 40,
                    borderRadius: 5,
                  }}>
                  <TextInput
                    value={name}
                    placeholder="Name"
                    style={{fontSize: widthPercentageToDP(4.3), color: 'black'}}
                    onChangeText={input => setName(input)}
                    editable={false}
                  />
                </View>
              </View>
              <View
                style={{
                  marginTop: 10,
                }}>
                <View style={{}}>
                  <Text style={{fontWeight: '600', fontSize: 18}}>
                    Status <Text style={{color: 'red'}}>*</Text>
                  </Text>
                </View>
                <Dropdown
                  style={[
                    styles.dropdown,
                    {borderWidth: 1, borderColor: '#979998'},
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={StatusDropdown}
                  maxHeight={250}
                  labelField="label"
                  valueField="value"
                  placeholder={`${Status}`}
                  value={Status}
                  onChange={item => {
                    setStatus(item.value);
                  }}
                />
              </View>
              <View
                style={{
                  marginTop: 10,
                }}>
                <View style={{}}>
                  <Text style={{fontWeight: '600', fontSize: 18}}>
                    Category <Text style={{color: 'red'}}>*</Text>
                  </Text>
                </View>

                <Dropdown
                  style={[
                    styles.dropdown,
                    {borderWidth: 1, borderColor: '#979998'},
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={DropData}
                  maxHeight={250}
                  labelField="label"
                  valueField="value"
                  placeholder="Select category"
                  value={value}
                  onChange={item => {
                    setValue(item.value);
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
                marginTop: 10,
              }}>
              <CheckBox
                value={allow}
                onChange={() => {
                  setAllow(!allow);
                }}
              />

              <Text style={{fontWeight: '600', fontSize: 14}}>
                Allow products to show on Retailer's App
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  updateData();
                }}
                style={{
                  backgroundColor: '#032e63',
                  height: 45,
                  padding: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  width: '70%',
                }}>
                <Text style={{color: '#fff', textAlign: 'center'}}>
                  {' '}
                  Update Status & Assign Category
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => close()}
                style={{
                  backgroundColor: 'red',
                  height: 40,
                  width: '25%',
                  padding: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                }}>
                <Text style={{color: '#fff'}}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default AssignCategory;
const DropData = [
  {label: 'Exclusive.', value: 'Exclusive.'},
  {label: 'Common', value: 'Common'},
];

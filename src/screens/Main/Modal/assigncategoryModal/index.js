import React, {useState} from 'react';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import styles from './styles';
import {Dropdown} from 'react-native-element-dropdown';
const AssignCategory = ({visi, close = () => {}, ...props}) => {
  const StatusDropdown = [
    {label: 'Pending.', value: 'Pending.'},
    {label: 'Approved', value: 'Approved'},
    {label: 'Reject', value: 'Reject'},
  ];


  const [value, setValue] = useState('');
  const [Status, setStatus] = useState(JSON.stringify(props.data.Status)?.replace('"',''));

  return (
    <View style={{flex: 1}}>
      <Modal animationType="slide" transparent={true} visible={visi}>
        <View
          style={[
            styles.centeredView,
            {backgroundColor: 'rgba(52, 52, 52, 0.8)', marginTop: 0},
          ]}>
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
                    value={props.data.CompanyName}
                    placeholder="Anand Jewels"
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

              <View
                style={{
                  flexDirection: 'row',

                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View style={{}}>
                  <CheckBox />
                </View>
                <View style={{}}>
                  <Text style={{fontWeight: '600', fontSize: 14}}>
                    Allow products to show on Retailer's App
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#032e63',
                  height: 40,
                  padding: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  width: '70%',
                }}>
                <Text style={{color: '#fff'}}>
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

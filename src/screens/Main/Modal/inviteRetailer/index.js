import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import styles from './styles';

const InviteretailerModal = ({visi, close = () => {}, ...props}) => {
  const [value, setValue] = useState(null);

  return (
    <View style={{flex: 1}}>
      <Modal animationType="slide" transparent={true} visible={visi}>
        <ScrollView>
          <View
            style={[
              styles.centeredView,
              {backgroundColor: 'rgba(52, 52, 52, 0.8)', marginTop: 0},
            ]}>
            <View style={styles.modalView}>
              <TouchableOpacity
              onPress={()=>{close()}}
                style={{
                  height: 35,
                  width: 35,
                  borderRadius: 17.5,
                  backgroundColor: '#032e63',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  right: 0,
                  margin: 10,
                }}>
                <Text style={{fontSize: 16, color: 'white'}}>X</Text>
              </TouchableOpacity>
              <View style={{marginTop: 15, marginHorizontal: 10}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '800',
                    color: '#000',
                    marginLeft: -10,
                  }}>
                  Invite retailers to network( who are not on the O-Locker
                  platform):
                </Text>
              </View>

              <View
                style={{marginHorizontal: 20, marginTop: 20, width: '100%'}}>
                <Text style={{fontSize: 20, fontWeight: '700', color: '#000'}}>
                  Name of the retailer :{' '}
                  <Text style={{color: 'red', fontSize: 18}}>*</Text>
                </Text>
                <View style={{marginTop: 5}}>
                  <View style={styles.textBox}>
                    <TextInput placeholder="Name of the retailer" />
                  </View>
                </View>
              </View>
              <View
                style={{marginHorizontal: 20, marginTop: 15, width: '100%'}}>
                <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
                  Location : <Text style={{color: 'red', fontSize: 18}}>*</Text>
                </Text>
                <View style={{marginTop: 5}}>
                  <View style={styles.textBox}>
                    <TextInput placeholder="Location" />
                  </View>
                </View>
              </View>
              <View
                style={{marginHorizontal: 20, marginTop: 20, width: '100%'}}>
                <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
                  Define Category{' '}
                  <Text style={{color: 'red', fontSize: 18}}>*</Text>
                </Text>
                <View style={{marginTop: 5}}>
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
                    placeholder="Select Category"
                    value={value}
                    onChange={item => {
                      setValue(item.value);
                    }}
                  />
                </View>
              </View>
              <View style={{marginHorizontal: 20, marginTop: 5, width: '100%'}}>
                <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
                  Contact Person First Name :{' '}
                  <Text style={{color: 'red', fontSize: 18}}>*</Text>
                </Text>
                <View style={{marginTop: 5}}>
                  <View style={styles.textBox}>
                    <TextInput placeholder="First name" />
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginHorizontal: 20,
                  marginTop: 5,
                  width: '100%',
                  marginTop: 10,
                }}>
                <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
                  Contact Person Last Name :
                  <Text style={{color: 'red', fontSize: 18}}>*</Text>
                </Text>
                <View style={{marginTop: 5}}>
                  <View style={styles.textBox}>
                    <TextInput placeholder="Last name" />
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginHorizontal: 20,
                  marginTop: 5,
                  width: '100%',
                  marginTop: 10,
                }}>
                <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
                  Contact Number :
                  <Text style={{color: 'red', fontSize: 18}}>*</Text>
                </Text>
                <View style={{marginTop: 5}}>
                  <View style={styles.textBox}>
                    <TextInput placeholder="Contact number" />
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginHorizontal: 20,
                  marginTop: 5,
                  width: '100%',
                  marginTop: 10,
                }}>
                <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
                  Email Id :<Text style={{color: 'red', fontSize: 18}}>*</Text>
                </Text>
                <View style={{marginTop: 5}}>
                  <View style={styles.textBox}>
                    <TextInput placeholder="Email" />
                  </View>
                </View>
              </View>
              <View style={{width: '100%'}}>
                <TouchableOpacity style={styles.addbtn}>
                  <Text
                    style={{fontSize: 18, color: 'white', fontWeight: '800'}}>
                    Add retailers to network
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=>{close()}}
                  style={[styles.addbtn, {marginBottom: 50, marginTop: 10}]}>
                  <Text
                    style={{fontSize: 18, color: 'white', fontWeight: '800'}}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};
export default InviteretailerModal;
const DropData = [
  {label: 'Exclusive', value: '1'},
  {label: 'Common', value: '2'},
];

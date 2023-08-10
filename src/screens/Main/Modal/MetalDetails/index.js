import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextInput} from 'react-native';

const Notification = () => {
  const [showModal, setShowModal] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [value, setValue] = useState(null);
  return (
    <View style={{flex: 1}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setShowModal(!showModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
             onPress={() => setShowModal(!showModal)}
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                backgroundColor: '#032e63',
                alignItems: 'center',
                justifyContent: 'center',
                position:'absolute',right:0,margin:10
              }}>
              <Text style={{fontSize: 18, color: 'white'}}>X</Text>
            </TouchableOpacity>
            <View style={{marginTop:10}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '800',
                  color: '#000',
                  marginLeft: -10,
                }}>
              Metal Details
              </Text> 
              <View style={{flexDirection: 'row',width:'40%'}}>
                  <TouchableOpacity>
                    <MaterialCommunityIcons
                      name="pencil"
                      size={20}
                      color={'#000'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <MaterialCommunityIcons
                      name="delete"
                      size={20}
                      color={'#000'}
                    />
                  </TouchableOpacity>
                </View>
                </View>
              <Text style={{fontSize:16, fontWeight: '800', color: '#000',marginLeft:-10}}>(DETAILS OF PRECIOUS METALS USED IN PRODUCT)
              </Text>
            </View>


            <View style={{marginHorizontal: 20, marginTop:5,width:'100%',}}>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
              Gross wt. <Text style={{color: 'red', fontSize: 18}}>*</Text>
            </Text>
            <View style={{marginTop:15}}>
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
                placeholder=" Gross wt."
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
            <View style={{marginHorizontal: 20,marginTop:5,width:'100%',}}>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
            Metal type <Text style={{color: 'red', fontSize: 18}}>*</Text>
            </Text>
            <View style={{marginTop:15}}>
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
                placeholder=" Metal type"
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
            <View style={{marginHorizontal: 20, marginTop: 5,width:'100%',}}>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
            Gold Metal purity <Text style={{color: 'red', fontSize: 18}}>*</Text>
            </Text>
            <View style={{marginTop:15}}>
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
                placeholder=" Gold Metal purity"
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
            <View style={{marginHorizontal: 20, marginTop: 5,width:'100%',}}>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
            Metal net wt. <Text style={{color: 'red', fontSize: 18}}>*</Text>
            </Text>
            <View style={{marginTop:15}}>
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
                placeholder=" Metal net wt."
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
            <View style={{marginHorizontal: 20, marginTop: 5,width:'100%',marginTop:10}}>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
              Unit of wt. <Text style={{color: 'red', fontSize: 18}}>*</Text>
            </Text>
            <View style={{marginTop:5}}>
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
                placeholder="  Unit of wt."
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
            <View style={{width:'100%'}}>
<TouchableOpacity style={styles.addbtn}>
    <Text style={{fontSize:18,color:'white',fontWeight:'800'}}>Add Metal Details</Text>
</TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => {
          setShowModal(true);
        }}
        style={{
          backgroundColor: 'skyblue',
          width: '80%',
          height: 45,
          alignSelf: 'center',
          marginTop: '15%',
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 18, fontWeight: '800'}}>Show</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Notification;
const DropData = [
    {label: 'UNDER 25000', value: '1'},
    {label: 'UNDER 25000', value: '2'},
    {label: 'UNDER 50000', value: '3'},
    {label: 'UNDER 100000', value: '4'},
  ];
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,

  TextInput
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import styles from './styles';
import { useSelector } from 'react-redux';


const DiamondViewModal = ({visi, close = () => {}, ...props}) => {
  const productType = useSelector(state => state.Home?.productTypeList);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [value, setValue] = useState(null);


  return (
 
    <View style={{flex: 1}}>
      <Modal
         animationType="slide"
         transparent={true}
    
           visible={visi}
           >
               <ScrollView >
        <View style={[styles.centeredView,{backgroundColor: 'rgba(52, 52, 52, 0.8)',marginTop:0}]}>
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
             Diamond Details
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
              <Text style={{fontSize:16, fontWeight: '800', color: '#000',marginLeft:-10}}>(DETAILS OF PRECIOUS Diamond S USED IN PRODUCT)
              </Text>
            </View>


            <View style={{marginHorizontal: 20, marginTop:5,width:'100%',}}>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
              Diamond  wt.<Text style={{color: 'red', fontSize: 18}}>*</Text>
            </Text>
            <View style={{marginTop:15}}>
              <TextInput
                style={[
                  styles.dropdown,
                  {borderWidth: 1, borderColor: '#979998'},
                ]}
              placeholder='Diamond Wt'
              />
            </View>
          </View>
            <View style={{marginHorizontal: 20,marginTop:5,width:'100%',}}>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
            Unit of wt <Text style={{color: 'red', fontSize: 18}}>*</Text>
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
                placeholder=" Diamond  type"
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
          <View style={{marginHorizontal: 20,marginTop:5,width:'100%',}}>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
            Diamond value<Text style={{color: 'red', fontSize: 18}}>*</Text>
            </Text>
            <View style={{marginTop:15}}>
              <TextInput
                style={[
                  styles.dropdown,
                  {borderWidth: 1, borderColor: '#979998'},
                ]}
              placeholder='Amount in Rs.'
              />
            </View>
          </View>
            <View style={{marginHorizontal: 20, marginTop: 5,width:'100%',}}>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
            Diamond details <Text style={{color: 'red', fontSize: 18}}>*</Text>
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
                data={productType?.dimondDetails}
                maxHeight={250}
                labelField="Value"
                valueField="Value"
                placeholder="Diamond Details"
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>

            <View style={{marginHorizontal: 20, marginTop: 5,width:'100%',}}>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
            Diamond Shape<Text style={{color: 'red', fontSize: 18}}>*</Text>
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
                data={productType?.dimondShape}
                maxHeight={200}
                labelField="Value"
                valueField="Value"
                placeholder="Diamond Shape"
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
            <View style={{marginHorizontal: 20, marginTop: 5,width:'100%',marginTop:10}}>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
            Diamond Quality <Text style={{color: 'red', fontSize: 18}}>*</Text>
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
                data={productType?.dimondQuality}
                dropdownPosition='top'
                maxHeight={200}
                labelField="Value"
                valueField="Value"
                placeholder="Diamond Quality"
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
            <View style={{width:'100%'}}>
<TouchableOpacity style={styles.addbtn}>
    <Text style={{fontSize:18,color:'white',fontWeight:'800'}}>Add {props.data} Details</Text>
</TouchableOpacity>
            </View>
          </View>
        </View>
        </ScrollView>
      </Modal>

   
    </View>

  );
};
export default DiamondViewModal;
const DropData = [
    {label: 'Cts.', value: 'Cts.'},
    {label: 'Gms', value: 'Gms'},
   
  ];
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


const StoneViewModal = ({visi, close = () => {}, ...props}) => {
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
             Stone Details
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


            <View style={{marginHorizontal: 20, marginTop:30,width:'100%',}}>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
            Stone weight<Text style={{color: 'red', fontSize: 18}}>*</Text>
            </Text>
            <View style={{marginTop:10}}>
              <TextInput
                style={[
                  styles.dropdown,
                  {borderWidth: 1, borderColor: '#979998'},
                ]}
              placeholder='Stone Wt'
              />
            </View>
          </View>
            <View style={{marginHorizontal: 20,marginTop:5,width:'100%',}}>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
            Unit of Wt.<Text style={{color: 'red', fontSize: 18}}>*</Text>
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
                placeholder="Select Unit of Wt"
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
          <View style={{marginHorizontal: 20, marginTop:10,width:'100%',}}>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
            Stone value<Text style={{color: 'red', fontSize: 18}}>*</Text>
            </Text>
            <View style={{marginTop:10}}>
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
            Stone details<Text style={{color: 'red', fontSize: 18}}>*</Text>
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
                data={productType?.stoneDetails}
                maxHeight={200}
                labelField="Value"
                valueField="Value"
                placeholder="Select Stone Name"
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
          
            
            <View style={{width:'100%',marginTop:'5%'}}>
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
export default StoneViewModal;
const DropData = [
  {label: 'Cts.', value: 'Cts.'},
  {label: 'Gms', value: 'Gms'},
 
];
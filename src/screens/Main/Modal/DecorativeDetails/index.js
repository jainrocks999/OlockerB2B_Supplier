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


const DecorativeViewModal = ({visi, close = () => {}, ...props}) => {

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
              {props.data} Details
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
              Gross wt. GMS <Text style={{color: 'red', fontSize: 18}}>*</Text>
            </Text>
            <View style={{marginTop:15}}>
              <TextInput
                style={[
                  styles.dropdown,
                  {borderWidth: 1, borderColor: '#979998'},
                ]}
              placeholder='Gross Wt gms'
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
              <TextInput
                style={[
                  styles.dropdown,
                  {borderWidth: 1, borderColor: '#979998'},
                ]}
               placeholder='Metal net wt'
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
export default DecorativeViewModal;
const DropData = [
    {label: 'UNDER 25000', value: '1'},
    {label: 'UNDER 25000', value: '2'},
    {label: 'UNDER 50000', value: '3'},
    {label: 'UNDER 100000', value: '4'},
  ];
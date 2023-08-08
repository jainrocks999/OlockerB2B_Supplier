import {View, Text, TouchableOpacity, FlatList, Modal} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'react-native';

const Dropdown = () => {
  const [select, setSelect] = useState('Select');
  const [click, setClick] = useState(false);
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={{
          //   //   width: '100%',
          //   //   height: 40,
          //   borderRadius: 30,
          //   //   borderWidth: 0.5,
          //   alignSelf: 'center',
          //   borderColor: 'grey',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => {
          setClick(!click);
        }}>
        <Text style={{marginTop: 9, fontSize: 14}}>{select}</Text>
        <Image
          style={{
            marginLeft: 2,
            width: 16,
            height: 13,
            marginTop: Platform.OS == 'android' ? 12 : 4,
          }}
          source={require('../../assets/F.png')}
        />
      </TouchableOpacity>
      {click ? (
        <Modal
          visible={click}
          style={{
            width: '90%',
            height: 100,
            borderRadius: 10,
            elevation: 5,
            marginTop: 10,
            alignSelf: 'flex-end',
            backgroundColor: '#fff',
          }}>
          <FlatList
            data={dataStatus}
            renderItem={({item}) => {
              return (
                <View style={{}}>
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      paddingVertical: 10,
                      borderBottomWidth: 0.5,
                      alignItems: 'center',
                      alignSelf: 'center',
                      //   justifyContent: 'center',
                    }}
                    onPress={() => {
                      setSelect(item.label);
                      setClick(false);
                    }}>
                    <Text style={{textAlign: 'center'}}>{item.label}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </Modal>
      ) : null}
    </View>
  );
};
export default Dropdown;
const dataStatus = [
  {label: 'Active', value: '1'},
  {label: 'In Active', value: '2'},
  //   {label: 'Activew1w', value: '1'},
  //   {label: 'In Active', value: '2'},
  //   {label: 'Activewqwqq', value: '1'},
  //   {label: 'In Actiqwqqsve', value: '2'},
];

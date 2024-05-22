import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Platform,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import styles from './styles';
import {useIsFocused} from '@react-navigation/native';
import PickerModel from '../../../components/PickerModel';
import { Dropdown } from 'react-native-element-dropdown';


const SelectOption = () => {
  const navigation = useNavigation();
  const [type, setType] = useState();
  const [visiable, setVisible] = useState(false);
  const isFocused = useIsFocused();

  useEffect(
    val => {
      if (isFocused) {
        manageOption;
        setType('');
      }
    },
    [isFocused],
  );

  const manageOption = val => {
    setType(val);

    if (val == 'Product') {
      {
        setVisible(false);
        navigation.navigate('ChooseSupplierProduct',{ productEdit1: false })
      }
    } else if (val == 'Collections') {
      {
        setVisible(false);
        navigation.navigate('Addcollection'), {type: val};
      }
    }
  };



  return (
    <View style={styles.container1}>
      <Header
        source1={require('../../../assets/Fo.png')}
        source={require('../../../assets/L.png')}
        source2={require('../../../assets/Image/dil.png')}
        title={'Select option to add '}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('FavDetails')}
      />
      <PickerModel
        visi={visiable}
        close={() => setVisible(false)}
        data={Data}
        onPress1={manageOption}
        styles={{
          height: 250,
          width: '58%',

          alignSelf: 'center',
          marginLeft: Platform.OS == 'android' ? '32%' : '34%',
          marginTop: Platform.OS == 'android' ? '12.5%' : '21%',
        }}
        // onPress1={() => manageOption(name)}
      />
      <View style={styles.main2}>
        <View style={[styles.main, {alignItems: 'center'}]}>
          <Text style={styles.Text1}>Select Type</Text>
          <View style={styles.main1}>
          <Dropdown
                  style={styles.card}
                  placeholderStyle={styles.placeholder}
                  selectedTextStyle={styles.rnimg}
                  // iconStyle={{ tintColor: '#ffff' }}
                  data={Data?Data:visiable}
                  itemTextStyle={{ color: '#474747',}}

                  inputSearchStyle={{
                    borderRadius: 10,
                    backgroundColor: '#f0f0f0',
                  }}
                   itemContainerStyle={{ marginBottom: -5,borderRadius:10 }}
                    maxHeight={250}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Type"
                  value={type}
                  onChange={item => {
                   manageOption(item.value)
                  }}
                />
          </View>
        </View>
      </View>
      <View style={styles.outcard}>
        <Text style={styles.outcardtext}>
          SELECT OPTION TO ADD FROM DROPDOWN
        </Text>
      </View>
      <StatusBar />
    </View>
  );
};
export default SelectOption;

const Data = [
  { label: 'Product', value: 'Product' },
  { label: 'Collections', value: 'Collections' },
];

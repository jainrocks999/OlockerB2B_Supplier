import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Platform,
  Button,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import BottomTab from '../../../components/StoreButtomTab';
import styles from './styles';
import RNPickerSelect from 'react-native-picker-select';
import {useIsFocused} from '@react-navigation/native';
import PickerModel from '../../../components/PickerModel';
import {Log} from 'victory';
import DateTimePicker from '@react-native-community/datetimepicker';

// const MyDateTimePicker = () => {
//   const [date, setDate] = useState(new Date());
//   const [show, setShow] = useState(false);

//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShow(Platform.OS === 'ios');
//     setDate(currentDate);
//   };

//   const showPicker = () => {
//     setShow(true);
//   };

//   return (
//     <View>
//       <Button onPress={showPicker} title="Select date" />
//       {show && (
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={date}
//           mode="date"
//           is24Hour={true}
//           display="default"
//           onChange={onChange}
//           style={{backgroundColor: 'white'}} // set container styles
//           textColor="blue" // set text color
//           textStyle={{fontWeight: 'bold'}} // set text styles
//         />
//       )}
//     </View>
//   );
// };

// export default MyDateTimePicker;

const SelectOption = () => {
  const navigation = useNavigation();
  const [type, setType] = useState();
  const [visiable, setVisible] = useState(false);
  const isFocused = useIsFocused();

  useEffect(
    val => {
      if (isFocused) {
        manageOption;
        // setVisible(false);
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
        navigation.navigate('Addproduct'), {type: val};
      }
    } else if (val == 'Collections') {
      {
        setVisible(false);
        navigation.navigate('Addcollection'), {type: val};
      }
    }
  };

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = currentMode => {
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
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
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  color: '#474747',
                  width: '100%',
                  fontSize: 14,
                  marginBottom: -1,
                  fontFamily: 'Acephimere',
                }}>
                Select Type
              </Text>
              <Image
                style={[styles.rnimg, {marginLeft: -15}]}
                source={require('../../../assets/F.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* <RNPickerSelect
              onValueChange={val => manageOption(val)}
              items={Data}
              style={{
                inputAndroid: {
                  color: '#474747',
                  width: '100%',
                  fontSize: 14,
                  marginBottom: -1,
                  fontFamily: 'Acephimere',
                },
                inputIOS: {
                  color: '#474747',
                  width: '100%',
                  fontSize: 14,
                  marginBottom: -1,
                  fontFamily: 'Acephimere',
                },
                placeholder: {
                  color: '#474747',
                  width: '100%',
                  alignSelf: 'center',
                  fontFamily: 'Acephimere',
                },
              }}
              value={type}
              useNativeAndroidPickerStyle={false}
              placeholder={{label: 'Select Type', value: ''}}
              Icon={() => (

              )}
            /> */}
      </View>
      <View style={styles.outcard}>
        <Text style={styles.outcardtext}>
          SELECT OPTION TO ADD FROM DROPDOWN
        </Text>
      </View>
      {/* <View style={{bottom:0,position:'absolute',left:0,right:0}}>
      <BottomTab/>
      </View> */}

      {/* <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
        <Button onPress={showTimepicker} title="Show time picker!" />
        <Text>selected: {date.toLocaleString()}</Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </View> */}
      <StatusBar />
    </View>
  );
};
export default SelectOption;

const Data = [
  {label: 'Product', value: 'Product'},
  // { label: 'Category', value: 'Category' },
  {label: 'Collections', value: 'Collections'},
];

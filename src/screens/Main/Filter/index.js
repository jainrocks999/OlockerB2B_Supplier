import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {useNavigation} from '@react-navigation/native';
import Label from '../../../components/Slider/Label';
import Notch from '../../../components/Slider/Notch';
import Rail from '../../../components/Slider/Rail';
import RailSelected from '../../../components/Slider/RailSelected';
import Thumb from '../../../components/Slider/Thumb';

import styles from './styles';

const Filter = () => {
  const [city, setCity] = useState();
  const navigation = useNavigation();
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingVertical: 20,
            alignItems: 'center',
          }}>
          {/* <Text style={{fontSize:20}}>x</Text> */}
          <TouchableOpacity
            style={{width: 20, height: 20}}
            onPress={() => navigation.goBack()}>
            <Image
              style={{width: 18, height: 18}}
              source={require('../../../assets/cross.png')}
            />
          </TouchableOpacity>
          <Text>Filters</Text>
          <View></View>
        </View>
        <View style={{paddingHorizontal: 25, marginTop: 20}}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 16,
              color: '#848484',
              fontFamily: 'Roboto-Medium',
            }}>
            City
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 30,
              height: 40,
              width: '100%',
              marginTop: 10,
              paddingHorizontal: 15,
              justifyContent: 'center',
              borderColor: 'grey',
            }}>
            <RNPickerSelect
              items={Data}
              onValueChange={val => setCity(val)}
              style={{
                inputAndroid: {
                  color: '#8e8c8d',
                  width: '100%',
                  fontSize: 14,
                  marginBottom: -1,
                },
                inputIOS: {
                  color: '#8e8c8d',
                  width: '100%',
                  fontSize: 14,
                  marginBottom: -1,
                },
                placeholder: {
                  color: '#8e8c8d',
                  width: '100%',
                  alignSelf: 'center',
                },
              }}
              value={city}
              useNativeAndroidPickerStyle={false}
              placeholder={{label: 'Select City', value: ''}}
              Icon={() => (
                <Image
                  style={{
                    marginLeft: 2,
                    width: 16,
                    height: 13,
                    marginTop: Platform.OS == 'android' ? 12 : 4,
                  }}
                  source={require('../../../assets/F.png')}
                />
              )}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              marginTop: 30,
              color: '#848484',
              fontFamily: 'Roboto-Medium',
            }}>
            Metal Type
          </Text>
          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  height: 70,
                  width: 70,
                  borderWidth: 1,
                  borderRadius: 35,
                  backgroundColor: '#032e63',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{width: 32, height: 26}}
                  source={require('../../../assets/gold.png')}
                />
              </View>
              <Text
                style={{
                  fontFamily: 'Roboto-Medium',
                  color: '#888888',
                  marginTop: 4,
                  fontSize: 15,
                }}>
                Gold
              </Text>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  height: 70,
                  width: 70,
                  borderWidth: 1,
                  borderRadius: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: '#848484',
                }}>
                <Image
                  style={{width: 35, height: 35}}
                  source={require('../../../assets/silver.png')}
                />
              </View>
              <Text
                style={{
                  fontFamily: 'Roboto-Medium',
                  color: '#888888',
                  marginTop: 4,
                  fontSize: 15,
                }}>
                Silver
              </Text>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  height: 70,
                  width: 70,
                  borderWidth: 1,
                  borderRadius: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: '#848484',
                }}>
                <Image
                  style={{width: 35, height: 35}}
                  source={require('../../../assets/platinum.png')}
                />
              </View>
              <Text
                style={{
                  fontFamily: 'Roboto-Medium',
                  color: '#888888',
                  marginTop: 4,
                  fontSize: 15,
                }}>
                Platinum
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 16,
              marginTop: 30,
              color: '#848484',
              fontFamily: 'Roboto-Medium',
            }}>
            Value
          </Text>
          <View style={[styles.root]}>
            {/* <Slider
            style={styles.slider}
            min={min}
            max={max}
            step={1}
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
          /> */}
          </View>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 16,
              marginTop: 40,
              color: '#848484',
              fontFamily: 'Roboto-Medium',
            }}>
            Weight
          </Text>
          <View style={[styles.root]}>
            {/* <Slider
            style={styles.slider}
            min={min}
            max={max}
            step={1}
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
          /> */}
          </View>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 16,
              marginTop: 40,
              color: '#848484',
              fontFamily: 'Roboto-Medium',
            }}>
            Making Percentage
          </Text>
          <View style={[styles.root]}>
            {/* <Slider
            style={styles.slider}
            min={min}
            max={max}
            step={1}
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
          /> */}
          </View>
        </View>
        <View style={{height: 100}} />
      </ScrollView>
    </View>
  );
};
export default Filter;
const Data = [
  {label: 'Indore', value: 'indore'},
  {label: 'Mumbai', value: 'Mumbai'},
  {label: 'Bangalore', value: 'Bangalore'},
];

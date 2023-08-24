import React, { useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import RNPickerSelect from 'react-native-picker-select';
import {Formik} from 'formik';
import * as yup from 'yup';
const loginValidationSchema = yup.object().shape({
  companyName: yup.string().required('Please enter company name'),
  displayName: yup.string().required('Please enter display name'),
  ownerName: yup.string().required('Please enter owner name'),
  homeAddress: yup.string().required('Please enter home address'),
  email: yup
    .string()
    .required('Please enter your email')
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/,
      'Please enter valid email address',
    ),
  password: yup.string().required('Please enter your password'),
  companygsTin: yup
    .string()
    .required('Please enter company GSTIN')
    .matches(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      'Please enter valid GSTIN number',
    ),
  stateName: yup.string().required('Please select State'),
  cityName: yup.string().required('Please select City'),
  pincode: yup.string().required('Please enter pincode'),
  mobile: yup.string().required('Please enter mobile number'),
});

const Login = () => {
  const navigation = useNavigation();
  const [company, setCompany] = useState('');
  const [display, setDisplay] = useState('');
  const [owner, setOwner] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gstin, setGstin] = useState('');
  const [userstate, setUsserstate] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [mobile, setMobile] = useState('');
  const [] = useState('');
  const [] = useState('');

  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  return (
    <Formik
      initialValues={{
        companyName: '',
        displayName: '',
        ownerName: '',
        homeAddress: '',
        email: '',
        password: '',
        companygsTin: '',
        stateName: '',
        cityName: '',
        pincode: '',
        mobile: '',
      }}
      onSubmit={values => partnerLogin(values)}
      validateOnMount={true}
      validationSchema={loginValidationSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <View style={styles.container}>
          <ScrollView>
            <KeyboardAwareScrollView
              extraScrollHeight={10}
              enableOnAndroid={true}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{flex: 1}}>
              <View style={styles.headerimg}>
                <Image
                  style={{marginTop: 40}}
                  source={require('../../../assets/ol.png')}
                />
              </View>
              <View style={[styles.card, {marginTop: 20}]}>
                <View style={[styles.view]}>
                  <View style={styles.main}>
                    <Text style={styles.text}>Register</Text>
                  </View>
                  <View style={styles.line} />
                  <View style={[styles.input, {marginTop: 20}]}>
                    <TextInput
                      style={styles.input1}
                      placeholder="Enter Company Name"
                      placeholderTextColor={'grey'}
                      onChangeText={handleChange('companyName')}
                      onBlur={handleBlur('companyName')}
                      value={values.companyName}
                    />
                  </View>
                  <View style={styles.error}>
                    {errors.companyName && touched.companyName && (
                      <Text style={styles.warn}>{errors.companyName}</Text>
                    )}
                  </View>
                  <View style={[styles.input, {marginTop: 10}]}>
                    <TextInput
                      style={styles.input1}
                      placeholder="Enter Display Name"
                      placeholderTextColor={'grey'}
                      onChangeText={handleChange('displayName')}
                      onBlur={handleBlur('displayName')}
                      value={values.displayName}
                    />
                  </View>
                  <View style={styles.error}>
                    {errors.displayName && touched.displayName && (
                      <Text style={styles.warn}>{errors.displayName}</Text>
                    )}
                  </View>
                  <View style={[styles.input, {marginTop: 10}]}>
                    <TextInput
                      style={styles.input1}
                      placeholder="Enter Owner Name"
                      placeholderTextColor={'grey'}
                      onChangeText={handleChange('ownerName')}
                      onBlur={handleBlur('ownerName')}
                      value={values.ownerName}
                    />
                  </View>
                  <View style={styles.error}>
                    {errors.ownerName && touched.ownerName && (
                      <Text style={styles.warn}>{errors.ownerName}</Text>
                    )}
                  </View>
                  <View style={[styles.input, {marginTop: 10}]}>
                    <TextInput
                      style={styles.input1}
                      placeholder="Enter Home Address"
                      placeholderTextColor={'grey'}
                      onChangeText={handleChange('homeAddress')}
                      onBlur={handleBlur('homeAddress')}
                      value={values.homeAddress}
                    />
                  </View>
                  <View style={styles.error}>
                    {errors.homeAddress && touched.homeAddress && (
                      <Text style={styles.warn}>{errors.homeAddress}</Text>
                    )}
                  </View>
                  <View style={[styles.input, {marginTop: 10}]}>
                    <TextInput
                      style={styles.input1}
                      placeholder="Enter Email Address"
                      placeholderTextColor={'grey'}
                      keyboardType="email-address"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                  </View>
                  <View style={styles.error}>
                    {errors.email && touched.email && (
                      <Text style={styles.warn}>{errors.email}</Text>
                    )}
                  </View>
                  <View style={[styles.input, {marginTop: 10}]}>
                    <TextInput
                      style={styles.input1}
                      placeholder="Enter Password"
                      placeholderTextColor={'grey'}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                  </View>
                  <View style={styles.error}>
                    {errors.password && touched.password && (
                      <Text style={styles.warn}>{errors.password}</Text>
                    )}
                  </View>
                  <View style={[styles.input, {marginTop: 10}]}>
                    <TextInput
                      style={styles.input1}
                      placeholder="Enter Company GSTIN"
                      placeholderTextColor={'grey'}
                      onChangeText={handleChange('companygsTin')}
                      onBlur={handleBlur('companygsTin')}
                      value={values.companygsTin}
                    />
                  </View>
                  <View style={styles.error}>
                    {errors.companygsTin && touched.companygsTin && (
                      <Text style={styles.warn}>{errors.companygsTin}</Text>
                    )}
                  </View>
                  <View style={[styles.input, {marginTop: 10}]}>
                    <RNPickerSelect
                      onValueChange={val => setUsserstate(val)}
                      items={State}
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
                          marginBottom: 10,
                          fontFamily: 'Acephimere',
                        },
                        placeholder: {
                          color: 'grey',
                          width: '100%',
                          alignSelf: 'center',
                          fontFamily: 'Acephimere',
                        },
                      }}
                      value={values.userstate}
                      useNativeAndroidPickerStyle={false}
                      placeholder={{label: 'Select State', value: ''}}
                    />
                  </View>
                  <View style={styles.error}>
                    {errors.stateName && touched.stateName && (
                      <Text style={styles.warn}>{errors.stateName}</Text>
                    )}
                  </View>
                  <View style={[styles.input, {marginTop: 10}]}>
                    <RNPickerSelect
                      items={City}
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
                          marginBottom: 10,
                          fontFamily: 'Acephimere',
                        },
                        placeholder: {
                          color: 'grey',
                          width: '100%',
                          alignSelf: 'center',
                          fontFamily: 'Acephimere',
                        },
                      }}
                      value={values.city}
                      onValueChange={val => setCity(val)}
                      useNativeAndroidPickerStyle={false}
                      placeholder={{label: 'Select City', value: ''}}
                    />
                  </View>
                  <View style={styles.error}>
                    {errors.cityName && touched.cityName && (
                      <Text style={styles.warn}>{errors.cityName}</Text>
                    )}
                  </View>
                  <View style={[styles.input, {marginTop: 10}]}>
                    <TextInput
                      style={styles.input1}
                      placeholder="Enter Pincode"
                      placeholderTextColor={'grey'}
                      onChangeText={handleChange('pincode')}
                      onBlur={handleBlur('pincode')}
                      value={values.pincode}
                      keyboardType="number-pad"
                    />
                  </View>
                  <View style={styles.error}>
                    {errors.pincode && touched.pincode && (
                      <Text style={styles.warn}>{errors.pincode}</Text>
                    )}
                  </View>
                  <View style={[styles.input, {marginTop: 10}]}>
                    <TextInput
                      style={styles.input1}
                      placeholder="Enter Mobile Number"
                      placeholderTextColor={'grey'}
                      onChangeText={handleChange('mobile')}
                      onBlur={handleBlur('mobile')}
                      value={values.mobile}
                      keyboardType="number-pad"
                    />
                  </View>
                  <View style={styles.error}>
                    {errors.mobile && touched.mobile && (
                      <Text style={styles.warn}>{errors.mobile}</Text>
                    )}
                  </View>
                  <View style={{paddingHorizontal: 20}}>
                    <TouchableOpacity
                      onPress={() => handleSubmit()}
                      style={{
                        backgroundColor: 'pink',
                        alignItems: 'center',
                        borderRadius: 45,
                        justifyContent: 'center',
                        marginTop: 30,
                        width: '80%',
                        height: 45,
                      }}>
                      <Text style={{color: '#474747'}}>Register New</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{height: 40}} />
                </View>
              </View>
            </KeyboardAwareScrollView>
          </ScrollView>
        </View>
      )}
    </Formik>
  );
};
export default Login;

const City = [
  {label: 'Mumbai', value: 'Mumbai'},
  {label: 'Indore', value: 'Indore'},
  {label: 'Ahmadabad', value: 'Ahmadabad'},
];

const State = [
  {label: 'Maharastra', value: 'Maharastra'},
  {label: 'Madhya Pradesh', value: 'Madhya Pradesh'},
  {label: 'Uttar Pradesh', value: 'Uttar Pradesh'},
];

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import axios from 'axios';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import {Formik} from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/Loader';
import {join} from 'redux-saga/effects';
import {useDispatch, useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import messaging from '@react-native-firebase/messaging';
const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Please enter your Email')
    .matches(
      // /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/,
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter valid Email Address',
    ),
  password: yup.string().required('Please enter your Password'),
});

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.Login.isFetching);
  //  const [fetching, setFetching] = useState(false);
  const pertnerLogin = async values => {
    // console.log('values', values);
    setFetching(true);
    const axios = require('axios');

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://olocker.co/api/partners//login?email=${values.email}&password=${values.password}`,
      headers: {},
    };

    axios
      .request(config)
      .then(response => {
        // console.log(JSON.stringify(response.data));
        if (response.data.status) {
          setFetching(false);
          navigation.replace('Home');
          Toast.show('Login successful');
        } else {
          Toast.show(response.data.message);
          setFetching(false);
        }
      })
      .catch(error => {
        // console.log(error);
      });
  };

  const Demo = async values => {
    const params = new URLSearchParams();
    params.append('email', 'issuenotfound.404+1@gmail.com');
    params.append('password', '123456');
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    // try {
    //   const response = await axios({
    //     method: 'POST',
    //     config:{
    //        headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     }},
    //     url: 'https://olocker.co/api/supplier//login',
    //     params: params,
    //   });
    //   // console.log('response.....',response.data);
    //   return response;
    // } catch (error) {
    //   // console.log('why eorror fatch by login', error);
    // }
    //  const response=   await axios.post('https://olocker.co/api/supplier//login', params, config)
    //      // console.log('this is useer response',response.data);

    let token = await messaging().getToken();
    console.log('this is token', token);

    dispatch({
      type: 'User_Login_Request',
      url: '/login',
      email: values.email,
      password: values.password,
      fcmToken: token,
      navigation,
    });
  };
  return (
    <Formik
      initialValues={{email: '', password: ''}}
      onSubmit={values => Demo(values)}
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
          {isFetching ? <Loader /> : null}
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
                    <Text style={styles.text}>Login</Text>
                  </View>
                  {/* <View style={styles.line} /> */}
                  <View style={[styles.input, {marginTop: 20}]}>
                    <View style={{height: hp('4%'), width: wp('5%')}}>
                      <Image
                        style={{height: '100%', width: '100%', marginLeft: -2}}
                        source={require('../../../assets/msg.png')}
                      />
                    </View>
                    <View style={{width: wp('53%'), marginLeft: 1}}>
                      <TextInput
                        style={styles.input1}
                        placeholder="Enter your Email"
                        placeholderTextColor={'grey'}
                        keyboardType="email-address"
                        onChangeText={handleChange('email')}
                        //onChange={(e) => { handleChange(e); LoginAuto(); }}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        returnKeyType="go"
                      />
                    </View>
                  </View>
                  <View style={styles.error}>
                    {errors.email && touched.email && (
                      <Text style={styles.warn}>{errors.email}</Text>
                    )}
                  </View>
                  <View style={[styles.input, {marginTop: 10}]}>
                    <View style={{height: hp('4%'), width: wp('5%')}}>
                      <Image
                        style={{height: '100%', width: '100%', marginLeft: -2}}
                        source={require('../../../assets/lock1.png')} // source={require('../../../assets/msg.png')}
                      />
                    </View>
                    {/* <Image
              style={styles.image}
              source={require('../../../assets/lock1.png')}
            /> */}
                    <View style={{width: wp('53%'), marginLeft: 1}}>
                      <TextInput
                        style={styles.input1}
                        placeholder="Enter your Password"
                        placeholderTextColor={'grey'}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        keyboardType={'default'}
                        secureTextEntry={true}
                        // returnKeyType="done"
                      />
                    </View>
                  </View>
                  <View style={styles.error}>
                    {errors.password && touched.password && (
                      <Text style={styles.warn}>{errors.password}</Text>
                    )}
                  </View>
                  <View style={{paddingHorizontal: 20}}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        // navigation.replace('Home');
                        // pertnerLogin();
                        handleSubmit();
                      }}>
                      <Text style={{color: '#474747'}}>Login</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{height: 40}} />
                  {/* <Image
            style={{marginTop: 10, marginBottom: -20}}
            source={require('../../../assets/oloc.png')}
          /> */}
                </View>
                <View style={{alignItems: 'center'}}>
                  <View style={styles.bottom}>
                    <Text
                      style={{
                        fontWeight: '700',
                        color: '#474747',
                        width: '45%',
                      }}>{`Don't have account? `}</Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('RegisterPage')}>
                      <Text
                        style={{
                          color: '#e9056b',
                          marginLeft: 3,
                          width: '100%',
                        }}>
                        {'Create Your Account'}
                      </Text>
                    </TouchableOpacity>
                  </View>
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

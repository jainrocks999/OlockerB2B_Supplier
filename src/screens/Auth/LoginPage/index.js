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
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter valid Email Address',
    ),
  password: yup.string().required('Please enter your Password'),
});

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.Login.isFetching);

  const handleLogin = async values => {
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
      onSubmit={values => handleLogin(values)}
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
                        handleSubmit();
                      }}>
                      <Text style={{color: '#474747'}}>Login</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{height: 40}} />
                </View>
                <View style={{alignItems: 'center'}}></View>
              </View>
            </KeyboardAwareScrollView>
          </ScrollView>
        </View>
      )}
    </Formik>
  );
};
export default Login;

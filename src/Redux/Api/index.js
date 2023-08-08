import axios from 'axios';
import Constants from '../Constants';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Api {
  static fetchDataByPOST = async (url, params) => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // "Olocker": `Bearer ${Token}`,
      }
    }
    try {
      const response =await axios.post(
         Constants.MainUrl + url,
         params, 
         config
         )
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  static fetchDataByGET = async (url, data) => {
    try {
      const response = await axios({
        method: 'GET',
        headers: {
          MobileAppKey: 'EED26D5A-711D-49BD-8999-38D8A60329C5',
        },
        url: Constants.MainUrl + url,
        params: data,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  static fetchDataByGET1 = async (url , data) => {
    const Token=await AsyncStorage.getItem('loginToken')
    try {
      const response = await axios({
        method: 'GET',
        url: Constants.MainUrl + url,
        params: data,
        headers: {
          "Olocker": `Bearer ${Token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

static fetchDataByGET3 = async (url, data) => {
  const Token=await AsyncStorage.getItem('loginToken')
    try {
      const response = await axios({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          "Olocker": `Bearer ${Token}`,
        },
        url: Constants.MainUrl + url,
        data: data,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  static fetchDataByGET2 = async (url,Token) => {
    try {
      const response = await axios({
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          "Olocker": `Bearer ${Token}`,
        },
        url: Constants.MainUrl + url,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}

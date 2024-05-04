import axios from 'axios';
import Constants from '../Constants';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Api {
  static fetchDataByPOST = async (url, params) => {
    const Token = await AsyncStorage.getItem('loginToken');
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Olocker: `Bearer ${Token}`,
      },
    };
    try {
      const response = await axios.post(
        Constants.MainUrl + url,
        params,
        config,
      );
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
  static fetchDataByGET1 = async (url, data) => {
    console.log('this is data',url,data);
    const Token = await AsyncStorage.getItem('loginToken');
    try {
      const response = await axios({
        method: 'GET',
        url: Constants.MainUrl + url,
        params: data,
        headers: {
          Olocker: `Bearer ${Token}`,
        },
      });
       return response.data;
    } catch (error) {
      throw error;
    }
  };

  static fetchDataByGET3 = async (url, data) => {
    const Token = await AsyncStorage.getItem('loginToken');
    try {
      const response = await axios({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Olocker: `Bearer ${Token}`,
        },
        url: Constants.MainUrl + url,
        data: data,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  static fetchDataByGET2 = async (url, Token) => {
    try {
      const response = await axios({
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Olocker: `Bearer ${Token}`,
        },
        url: Constants.MainUrl + url,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  static sendMessage = async action => {
    try {
      var myHeaders = new Headers();
      myHeaders.append('Olocker', `Bearer ${action.token}`);

      var formdata = new FormData();
      formdata.append('sender_id', action.senderId);
      formdata.append('reciver_id', action.reciverId);
      formdata.append('user_type', action.user_type);
      formdata.append('message', action.message);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      const response = fetch(
        'https://olocker.co/api/supplier/chatSupplierToPartner',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          return JSON.parse(result);
        })
        .catch(error => console.log('error', error));

      return response;
    } catch (error) {
      throw error;
    }
  };
  static getMessage = async action => {
    try {
      var myHeaders = new Headers();
      myHeaders.append('Olocker', `Bearer ${action.token}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };
      const response = fetch(
        `https://olocker.co/api/supplier//getMessage?sender_id=${13}&reciver_id=${5}`,
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          return JSON.parse(result);
        })
        .catch(error => console.log('error Api', error));

      return response;
    } catch (error) {
      throw error;
    }
  };

  static AddPatnerToNetwork = async action => {
    const Token = await AsyncStorage.getItem('loginToken');
    var myHeaders = new Headers();
    myHeaders.append('Olocker', `Bearer ${Token}`);

    var formdata = new FormData();
    formdata.append('userId', action.userId);
    formdata.append('id', action.id);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    const res = fetch(
      'https://olocker.co/api/supplier//addtoNetwork',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        return JSON.parse(result);
      })
      .catch(error => console.log('error', error));

    return res;
  };
}

import { ToastAndroid, YellowBox } from 'react-native';
import { takeEvery, put, call } from 'redux-saga/effects';
import Api from '../Api';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parse } from 'react-native-svg';

function* SupportProfileRequest(action) {
    try {
      const data = {
        userId:'10',
        usertype:'supplier',
        role:'6'
      };
      const response = yield call(Api.fetchDataByGET1,action.url,data);
    //  // console.log('this is user response',response);
      if (response.status == true) {
        yield put({
          type: 'Supplier_Profile_Success',
          payload: response,
        });
      } else {
        yield put({
          type: 'Supplier_Profile_Error',
        });
      }
    } catch (error) {
      yield put({
        type: 'Supplier_Profile_Error',
      });
    }
  }



export default function* supplierSaga() {
    yield takeEvery('Supplier_Profile_Request', SupportProfileRequest)
  
  }
  
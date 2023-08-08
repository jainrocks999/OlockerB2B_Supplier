import { ToastAndroid, YellowBox } from 'react-native';
import { takeEvery, put, call } from 'redux-saga/effects';
import Api from '../Api';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parse } from 'react-native-svg';

//Login
function* cityList(action) {
    try {
      const data={
        stateId:action.stateId
      }
      const response = yield call(Api.fetchDataByGET1,action.url,data);
      if (response.status == true) {
        yield put({
          type: 'City_List_Success',
          payload: response,
        });
        action.navigation.navigate('EditSupplierProfile',{
          selector:action.selector,
          productImage:action.productImage,
          ownerImage:action.ownerImage,
          supplierLogo:action.supplierLogo,
          showroomImage:action.showroomImage,
        })
      } else {
        yield put({
          type: 'City_List_Error',
        });
      }
    } catch (error) {
      yield put({
        type: 'City_List_Error',
      });
    }
  }

export default function* citySaga() {
    yield takeEvery('City_List_Request',cityList)
  }
  
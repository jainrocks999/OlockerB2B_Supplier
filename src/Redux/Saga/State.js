import {ToastAndroid, YellowBox} from 'react-native';
import {takeEvery, put, call} from 'redux-saga/effects';
import Api from '../Api';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {parse} from 'react-native-svg';

//Login
function* stateList(action) {
  try {
    const response = yield call(Api.fetchDataByGET1, action.url);
    // // console.log('this is states', response);
    if (response.status === true) {
      yield put({
        type: 'State_List_Success',
        payload: response,
      });
    } else {
      yield put({
        type: 'State_List_Error',
      });
    }
    //  // console.log('this is state list from saga', response);
  } catch (error) {
    yield put({
      type: 'State_List_Error',
    });
  }
}
function* getCity(action) {
  try {
    const data = {
      stateId: action.stateId,
    };
    const res = yield call(Api.fetchDataByGET1, action.url, data);
    if (res?.status) {
      yield put({
        type: 'city_list_success',
        data: res?.cities,
      });
    } else {
      yield put({
        type: 'city_list_error',
      });
    }
  } catch (err) {
    yield put({
      type: 'city_list_error',
    });
    console.log(err);
  }
}
export default function* stateSaga() {
  yield takeEvery('State_List_Request', stateList);
  yield takeEvery('city_list_request', getCity);
}

import {ToastAndroid, YellowBox} from 'react-native';
import {takeEvery, put, call} from 'redux-saga/effects';
import Api from '../Api';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {parse} from 'react-native-svg';

//Login
function* doLogin(action) {

  try {
    const params = new URLSearchParams();
    params.append('email', action.email);
    params.append('password', action.password);
    params.append("fcm_token", action.fcmToken);
    const response = yield call(Api.fetchDataByPOST, action.url, params);

    if (!response) {
      Toast.show('Please enter  Valid user id & password   ');
    } else if (response.status == true) {
      yield put({
        type: 'User_Login_Success',
        payload: response,
      });
      AsyncStorage.setItem('loginToken', response.token);
      AsyncStorage.setItem('user_id', response.userDetail.SrNo);
      action.navigation.replace('Home');
      Toast.show(response.message);
    } else {
      yield put({
        type: 'User_Login_Error',
      });
      Toast.show(response.message);
    }
  } catch (error) {
    // console.log('error223', error);
    yield put({
      type: 'User_Login_Error',
    });
  }
}

export default function* loginSaga() {
  yield takeEvery('User_Login_Request', doLogin);
}

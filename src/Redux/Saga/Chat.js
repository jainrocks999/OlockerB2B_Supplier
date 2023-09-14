import {ToastAndroid, YellowBox} from 'react-native';
import {takeEvery, put, call} from 'redux-saga/effects';
import Api from '../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

function* PatnerContact(action) {
  try {
    const data = {
      user_id: action.id,
    };
    const response = yield call(Api.fetchDataByGET1, action.url, data);

    if (response.status == true) {
      yield put({
        type: 'Patner_Contact_Success',
        payload: response.data,
      });
    } else {
      yield put({
        type: 'Patner_Contact_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Patner_Contact_Error',
    });
  }
}

function* SendMessage(action) {
  try {
    const response = yield call(Api.sendMessage, action);

    if (response.status == true) {
      yield put({
        type: 'Message_Send_Success',
      });
    } else {
      yield put({
        type: 'Message_Send_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Message_Send_Error',
    });
  }
}
function* GetMessage(action) {

  console.log('=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>safgadfsasada',action);
  try {
    const data = {
      sender_id:action.senderId,
      reciver_id: action.reciverid,
    };

    const response = yield call(Api.fetchDataByGET1, data);
console.log('res=>>>>>>>>>>>>>>>>>>>>>>>>>>>>saga ',response);
    // if (response.status == true) {
    //   yield put({
    //     type: 'get_Message_Success',
    //     payload: response.data,

    //   });
    // } else {
    //   yield put({
    //     type: 'get_Message_Error',
    //   });
    // }
  } catch (error) {
    console.log('tycatch errosadaga get msd=>>>>>>>>>',error);
    yield put({
      type: 'get_Message_Error',
    });
  }
}

export default function* ChatSaga() {
  yield takeEvery('Patner_Contact_Request', PatnerContact);
  yield takeEvery('Message_Send_Request', SendMessage);
  yield takeEvery('get_Message_Request', GetMessage);
}

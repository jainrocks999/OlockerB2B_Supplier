import { ToastAndroid, YellowBox } from 'react-native';
import { takeEvery, put, call } from 'redux-saga/effects';
import Api from '../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetMessageCommon } from '../../screens/Main/ChatScreen/common';
import { err } from 'react-native-svg/lib/typescript/xml';

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
        payload: action.reciverId

      });

      GetMessageCommon(action.reciverId, action.user_type);
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
  const data = {
    sender_id: action.senderId,
    reciver_id: action.reciverid,
    user_type: action.user_type
  };


  try {
    const res = yield call(Api.fetchDataByGET1, action.url, data);
    // console.log('this si respons', res)
    if (res.status == true) {
      let message = [];
      res.data.map(item => {
        let sendId = parseInt(item.sender_id);
        message.push({
          _id: item.id,
          text: item.message,
          createdAt: item.created_at,
          user: {
            _id: sendId,
          },
        });
      }),
        yield put({
          type: 'get_Message_Success',
          payload: message,
        });
    } else {
      yield put({
        type: 'get_Message_Error',
        payload: []
      });

    }
  } catch (error) {
    console.log('try catch  saga =>>>>>>>>>', error);
    yield put({
      type: 'get_Message_Error',
      payload: []
    });
  }
}
function* GetMessage2(action) {
  const data = {
    sender_id: action.senderId,
    reciver_id: action.reciverid,
    user_type: action.user_type
  };


  try {
    const res = yield call(Api.fetchDataByGET1, action.url, data);
    console.log('this is rspons on send mesegee', JSON.stringify(res))

    if (res.status == true) {
      let message = [];
      res.data.map(item => {
        let sendId = parseInt(item.sender_id);
        message.push({
          _id: item.id,
          text: item.message,
          createdAt: item.created_at,
          user: {
            _id: sendId,
          },
        });
      }),
        yield put({
          type: 'get_Message_Success',
          payload: message,
        });
    } else {
      yield put({
        type: 'get_Message_Error',
        payload: []
      });
    }
  } catch (error) {
    // console.log('try catch  saga =>>>>>>>>>', error);
    yield put({
      type: 'get_Message_Error',
      payload: []
    });
  }
}

export default function* ChatSaga() {
  yield takeEvery('Patner_Contact_Request', PatnerContact);
  yield takeEvery('Message_Send_Request', SendMessage);
  yield takeEvery('get_Message_Request', GetMessage);
  yield takeEvery('get_Message_Request2', GetMessage2);
}

import { ToastAndroid, YellowBox } from 'react-native';
import { takeEvery, put, call } from 'redux-saga/effects';
import Api from '../Api';

function* PatnerContact(action) {
    try {
      const data = {
        user_id:action.id,
        
      };
      const response = yield call(Api.fetchDataByGET1,action.url,data);
   
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



export default function* ChatSaga() {
    yield takeEvery('Patner_Contact_Request', PatnerContact)
  
  }
  
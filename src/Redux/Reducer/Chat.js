import {SearchBar} from 'react-native-screens';

initialstate = {
  isFetching:false,
  lodershow:false,
  patnerContact:[],
  MessageSend:null,
  GetMessage:[]
};
export default (state = initialstate, action) => {
  switch (action.type) {
   
    case 'Patner_Contact_Request':
      return {...state, isFetching: true};
    case 'Patner_Contact_Success':
      return {...state, isFetching: false, patnerContact: action.payload};
    case 'Patner_Contact_Error':
      return {...state, isFetching: false};

    case 'Message_Send_Request':
      return {...state, };
    case 'Message_Send_Success':
      return {...state, isFetching: false, MessageSend:action.payload};
    case 'Message_Send_Error':
      return {...state, isFetching: false,};

    case 'get_Message_Request':
      return {...state,isFetching:true};
    case 'get_Message_Success':
      return {...state, isFetching: false, GetMessage:action.payload};
    case 'get_Message_Error':
      return {...state, isFetching: false,};
    case 'get_Message_Request2':
      return {...state,};
    case 'get_Message_Success2':
      return {...state, isFetching: false, GetMessage:action.payload};
    case 'get_Message_Error2':
      return {...state, isFetching: false,};

    default:
      return state;
  }
};

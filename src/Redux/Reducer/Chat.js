import {SearchBar} from 'react-native-screens';

initialstate = {
  isFetching:false,
  patnerContact:[],
  MessageSend:false,
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
      return {...state, isFetching: true,};
    case 'Message_Send_Success':
      return {...state, isFetching: false, MessageSend:true};
    case 'Message_Send_Error':
      return {...state, isFetching: false,MessageSend:false};

    case 'get_Message_Request':
      return {...state, isFetching: true,};
    case 'get_Message_Success':
      return {...state, isFetching: false, GetMessage:action.payload};
    case 'get_Message_Error':
      return {...state, isFetching: false,MessageSend:false};

    default:
      return state;
  }
};

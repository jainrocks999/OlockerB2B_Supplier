import {SearchBar} from 'react-native-screens';

initialstate = {
  isFetching:false,
  patnerContact:[]
};
export default (state = initialstate, action) => {
  switch (action.type) {
   
    case 'Patner_Contact_Request':
      return {...state, isFetching: true};
    case 'Patner_Contact_Success':
      return {...state, isFetching: false, patnerContact: action.payload};
    case 'Patner_Contact_Error':
      return {...state, isFetching: false};

    default:
      return state;
  }
};

import {SearchBar} from 'react-native-screens';

initialstate = {
  isFetching: false,
  BannerList: [],
  NetworkList: [],
  SearchRetailerList: [],
  SearchMyNetworkList:[]
};
export default (state = initialstate, action) => {
  switch (action.type) {
    case 'Banner_List_Request':
      return {...state, isFetching: true};
    case 'Banner_List_Success':
      return {...state, isFetching: false, BannerList: action.payload};
    case 'Banner_List_Error':
      return {...state, isFetching: false};

    case 'Search_Retailer_Request':
      return {...state, isFetching: true};
    case 'Search_Retailer_Success':
      return {...state, isFetching: false, SearchRetailerList: action.payload};
    case 'Search_Retailer_Error':
      return {...state, isFetching: false};
      
    case 'Search_MyNetwork_Request':
      return {...state, isFetching: true};
    case 'Search_MyNetwork_Success':
      return {...state, isFetching: false, SearchMyNetworkList: action.payload};
    case 'Search_MyNetwork_Error':
      return {...state, isFetching: false};

    case 'Network_List_Request':
      return {...state, isFetching: true};
    case 'Network_List_Success':
      return {...state, isFetching: false, NetworkList: action.payload};
    case 'Network_List_Error':
      return {...state, isFetching: false};

    default:
      return state;
  }
};

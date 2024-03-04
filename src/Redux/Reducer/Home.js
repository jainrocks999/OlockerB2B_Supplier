import {SearchBar} from 'react-native-screens';

initialstate = {
  isFetching: false,
  BannerList: [],
  NetworkList: [],
  SearchRetailerList: [],
  SearchMyNetworkList: [],
  RetailerRequestList: [],
  InviteRetailerList: [],
  getWishList: [],
  addWishList: [],
  productTypeList: [],
  AddnetworkToPatner: [],
  RemovePatner: [],
  data2: {},
  session: '',
  partnerD:[],
   partnerData: {},
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
      return {
        ...state,
        isFetching: false,
        SearchRetailerList: action.payload,
        data2: action.data2,
      };
    case 'Search_Retailer_Error':
      return {...state, isFetching: false};

    case 'Search_MyNetwork_Request':
      return {...state, isFetching: true};
    case 'Search_MyNetwork_Success':
      return {...state, isFetching: false, SearchMyNetworkList: action.payload};
    case 'Search_MyNetwork_Error':
      return {...state, isFetching: false};

    case 'Retailer_RequestList':
      return {...state, isFetching: true};
    case 'Retailer_RequestList_Success':
      return {...state, isFetching: false, RetailerRequestList: action.payload};
    case 'Retailer_RequestList_Error':
      return {...state, isFetching: false};

    case 'Invite_RetailerList':
      return {...state, isFetching: true};
    case 'Invite_RetailerList_Success':
      return {...state, isFetching: false, InviteRetailerList: action.payload};
    case 'Invite_RetailerList_Error':
      return {...state, isFetching: false};

    case 'getWishList_request':
      return {...state, isFetching: true};
    case 'getWishList_Success':
      return {...state, isFetching: false, getWishList: action.payload};
    case 'getWishList_Error':
      return {...state, isFetching: false};

    case 'Addpruduct_WishList':
      return {...state, isFetching: true};
    case 'AddWishList_Success':
      return {...state, isFetching: false, addWishList: action.payload};
    case 'AddWishList_Error':
      return {...state, isFetching: false};

    case 'Network_List_Request':
      return {...state, isFetching: true};
    case 'Network_List_Success':
      return {...state, isFetching: false, NetworkList: action.payload};
    case 'Network_List_Error':
      return {...state, isFetching: false};

    case 'product_TypeList_Request':
      return {...state, isFetching: true};
    case 'product_TypeList_Success':
      return {
        ...state,
        isFetching: false,
        productTypeList: action.payload,
        session: action.session,
      };
    case 'product_TypeList_Error':
      return {...state, isFetching: false};

    case 'Addnetwork_toPatner_Request':
      return {...state, isFetching: true};
    case 'Addnetwork_toPatner_Success':
      return {...state, isFetching: false, AddnetworkToPatner: action.payload};
    case 'Addnetwork_toPatner_Error':
      return {...state, isFetching: false};

    case 'RemovePatner_Request':
      return {...state, isFetching: true};
    case 'RemovePatner_Success':
      return {...state, isFetching: false, RemovePatner: action.payload};
    case 'RemovePatner_Error':
      return {...state, isFetching: false};



      // get_networkretailerdetail_request

      case 'get_networkretailerdetail_request':
        return {...state, isFetching: true};
      case 'get_networkretailerdetail_Success':
console.log('reducer .......',action.payload);
         return {...state, isFetching: false, partnerData: action.payload};
      case 'get_networkretailerdetail_Error':
        return {...state, isFetching: false};

      
    // case 'get_network_retailer_detail_request':
    //   return {...state, isFetching: true};
    // case 'get_network_retailer_detail_success':
    //   return {...state, isFetching: false, partnerData: action.payload};
    // case 'get_network_retailer_detail_error':
    //   return {...state, isFetching: false};

    default:
      return state;
  }
};

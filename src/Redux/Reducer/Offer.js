initialstate = {
  OfferList: '',
  OfferTempList: '',
  isFetching: false,
  OfferListData: '',
  offerTypeList: {},
};
export default (state = initialstate, action) => {
  switch (action.type) {
    case 'Template_Detail_Request':
      return {...state, isFetching: true};
    case 'Template_Detail_Success':
      return {...state, isFetching: false, OfferList: action.payload};
    case 'Template_Detail_Error':
      return {...state, isFetching: false};

    case 'Add_Offer_Request':
      return {...state, isFetching: true};
    case 'Add_Offer_Success':
      return {...state, isFetching: false, OfferTempList: action.payload};
    case 'Add_Offer_Error':
      return {...state, isFetching: false};

    case 'Offer_List_Request':
      return {...state, isFetching: true};
    case 'Offer_List_Success':
      return {...state, isFetching: false, OfferListData: action.payload};
    case 'Offer_List_Error':
      return {...state, isFetching: false};
    case 'get_offer_type_list_request':
      return {...state, isFetching: true};
    case 'get_offer_type_list_success':
      return {...state, isFetching: false, offerTypeList: action.payload};

    default:
      return state;
  }
};

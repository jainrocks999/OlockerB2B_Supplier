initialstate = {
    OfferList: '',
    OfferTempList:'',
    isFetching:false,
    OfferListData:''
  };
  export default (state = initialstate, action) => {
    switch (action.type) {
     
      case 'Template_Detail_Request':
        return { ...state, isFetching: true };
      case 'Template_Detail_Success':
        return { ...state, isFetching: false, OfferList: action.payload };
      case 'Template_Detail_Error':
        return { ...state, isFetching: false };

      case 'Add_Offer_Request':
        return { ...state, isFetching: true };
      case 'Add_Offer_Success':
        return { ...state, isFetching: false, OfferTempList: action.payload };
      case 'Add_Offer_Error':
        return { ...state, isFetching: false };

      case 'Offer_List_Request':
        return { ...state, isFetching: true };
      case 'Offer_List_Success':
        return { ...state, isFetching: false, OfferListData: action.payload };
      case 'Offer_List_Error':
        return { ...state, isFetching: false };
  
        
      default:
        return state;
    }
  };
  
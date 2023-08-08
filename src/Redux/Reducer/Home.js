initialstate = {
    isFetching:false,
    BannerList:[],
    NetworkList:[]
  };
  export default (state = initialstate, action) => {
    switch (action.type) {
     
        case 'Banner_List_Request':
            return { ...state, isFetching: true };
        case 'Banner_List_Success':
            return { ...state, isFetching: false, BannerList: action.payload };
        case 'Banner_List_Error':
            return { ...state, isFetching: false };
  
        case 'Network_List_Request':
            return { ...state, isFetching: true };
        case 'Network_List_Success':
            return { ...state, isFetching: false, NetworkList: action.payload };
        case 'Network_List_Error':
            return { ...state, isFetching: false };
  
      default:
        return state;
    }
  };
  
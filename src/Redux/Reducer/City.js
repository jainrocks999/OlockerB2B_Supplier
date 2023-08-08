initialstate = {
    isFetching:false,
    CityList:[],
  };
  export default (state = initialstate, action) => {
    switch (action.type) {
     
        case 'City_List_Request':
            return { ...state, isFetching: true };
          case 'City_List_Success':
            return { ...state, isFetching: false, CityList: action.payload };
          case 'City_List_Error':
            return { ...state, isFetching: false };
  
   
      default:
        return state;
    }
  };
  
initialstate = {
    isFetching:false,
    StateList:[],
  };
  export default (state = initialstate, action) => {
    switch (action.type) {
     
        case 'State_List_Request':
            return { ...state, isFetching: true };
          case 'State_List_Success':
            return { ...state, isFetching: false, StateList: action.payload };
          case 'State_List_Error':
            return { ...state, isFetching: false };
  
   
      default:
        return state;
    }
  };
  
import * as actionTypes from './constant';

const initState = {
  userList: [],
  portFoliosList: [],
  userInfo: {}
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_LIST:
      return {
        ...state,
        userList: [],
      };
    case actionTypes.FETCH_USER_LIST_SUCCESS:
      return {
        ...state,
        userList: action.payload,
      };
    case actionTypes.FETCH_USER_LIST_FAILED:
      return {
        ...state,
        userList: [],
    };
    case actionTypes.CREATE_USER:
    return {
      ...state,
      userInfo: {},
    };
  case actionTypes.CREATE_USER_SUCCESS:
    return {
      ...state,
      userInfo: action.payload
    };
  case actionTypes.CREATE_USER_FAILED:
    return {
      ...state,
      userInfo:  action.payload
    };    
    default:
      return state;
  }
};
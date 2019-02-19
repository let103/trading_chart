import * as actionTypes from './constant';

const initState = {
  searchCoinList: [],
  top30CoinList: [],
  portFoliosCoinList: [],
  coinDataFullList: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TOP_30_COIN_LIST:
      return {
        ...state,
        top30CoinList: [],
      };
    case actionTypes.FETCH_TOP_30_COIN_LIST_SUCCESS:
      return {
        ...state,
        top30CoinList: action.payload.data,
      };
    case actionTypes.FFETCH_TOP_30_COIN_LIST_FAILED:
      return {
        ...state,
        top30CoinList: [],
      };
      case actionTypes.FETCH_COIN_BY_PORTFILO_ID:
      return {
        ...state,
        portFoliosCoinList: [],
      };
    case actionTypes.FETCH_COIN_BY_PORTFILO_ID_SUCCESS:
      return {
        ...state,
        portFoliosCoinList: action.payload,
      };
    case actionTypes.FETCH_COIN_BY_PORTFILO_ID_FAILED:
      return {
        ...state,
        portFoliosCoinList: [],
      };  
      case actionTypes.FETCH_COIN_BY_NAME:
      return {
        ...state,
        searchCoinList: [],
      };
    case actionTypes.FETCH_COIN_BY_NAME_SUCCESS:
      return {
        ...state,
        searchCoinList: action.payload,
      };
    case actionTypes.FETCH_COIN_BY_NAME_FAILED:
      return {
        ...state,
        searchCoinList: [],
      };   
      case actionTypes.ADD_COIN_BY_PORTFILO_ID:
      return {
        ...state,
      };
    case actionTypes.ADD_COIN_BY_PORTFILO_ID_SUCCESS:
      return {
        ...state,
        portFoliosCoinList: action.payload,
      };
    case actionTypes.ADD_COIN_BY_PORTFILO_ID_FAILED:
      return {
        ...state,
        portFoliosCoinList: [...state.portFoliosCoinList],
      };     
      case actionTypes.FETCH_COIN_FULL_DATA:
      return {
        ...state,
        coinDataFullList: [],
      };
    case actionTypes.FETCH_COIN_FULL_DATA_SUCCESS:
      return {
        ...state,
        coinDataFullList: action.payload,
      };
    case actionTypes.FETCH_COIN_FULL_DATA_FAILED:
      return {
        ...state,
        coinDataFullList: [],
      };   
    case actionTypes.DELETE_COIN_BY_PORTFILO_ID:
      return {
        ...state,
      };
    case actionTypes.DELETE_COIN_BY_PORTFILO_ID_SUCCESS:
      return {
        ...state,
        portFoliosCoinList: action.payload,
      };
    case actionTypes.DELETE_COIN_BY_PORTFILO_ID_FAILED:
      return {
        ...state,
        portFoliosCoinList: [],
      };       
    default:
      return state;
  }
};
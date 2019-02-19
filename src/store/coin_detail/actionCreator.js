import * as actionTypes from './constant';

export const fetchTop30Coin = { type: actionTypes.FETCH_TOP_30_COIN_LIST };
export const fetchTop30CoinSuccess = (payload) => {
  return { type: actionTypes.FETCH_TOP_30_COIN_LIST_SUCCESS, payload };
};
export const fetchTop30CoinFailed = (payload) => {
  return { type: actionTypes.FFETCH_TOP_30_COIN_LIST_FAILED, payload };
};

export const addCoinByPortfoliosId = (payload) => { return { 
  type: actionTypes.ADD_COIN_BY_PORTFILO_ID, payload 
}
};
export const addCoinByPortfoliosIdSuccess = (payload) => {
  return { type: actionTypes.ADD_COIN_BY_PORTFILO_ID_SUCCESS, payload };
};
export const addCoinByPortfoliosIdFailed = (payload) => {
  return { type: actionTypes.ADD_COIN_BY_PORTFILO_ID_FAILED, payload };
};

export const deleteCoinByPortfoliosId = (payload) => { return { 
  type: actionTypes.DELETE_COIN_BY_PORTFILO_ID, payload 
}
};
export const deleteCoinByPortfoliosIdSuccess = (payload) => {
  return { type: actionTypes.DELETE_COIN_BY_PORTFILO_ID_SUCCESS, payload };
};
export const deleteCoinByPortfoliosIdFailed = (payload) => {
  return { type: actionTypes.DELETE_COIN_BY_PORTFILO_ID_FAILED, payload };
};

export const fetchCoinByPortfoliosId = (payload) => { return { 
  type: actionTypes.FETCH_COIN_BY_PORTFILO_ID, payload 
}
};
export const fetchCoinByPortfoliosIdSuccess = (payload) => {
  return { type: actionTypes.FETCH_COIN_BY_PORTFILO_ID_SUCCESS, payload };
};
export const fetchCoinByPortfoliosIdFailed = (payload) => {
  return { type: actionTypes.FETCH_COIN_BY_PORTFILO_ID_FAILED, payload };
};

export const fetchCoinByName = (payload) => { return { 
  type: actionTypes.FETCH_COIN_BY_NAME, payload 
}
};
export const fetchCoinByNameSuccess = (payload) => {
  return { type: actionTypes.FETCH_COIN_BY_NAME_SUCCESS, payload };
};
export const fetchCoinByNameFailed = (payload) => {
  return { type: actionTypes.FETCH_COIN_BY_NAME_FAILED, payload };
};

export const fetchCoinDataFull = (payload) => { return { 
  type: actionTypes.FETCH_COIN_FULL_DATA, payload 
}
};
export const fetchCoinDataFullSuccess = (payload) => {
  return { type: actionTypes.FETCH_COIN_FULL_DATA_SUCCESS, payload };
};
export const fetchCoinDataFullFailed = (payload) => {
  return { type: actionTypes.FETCH_COIN_FULL_DATA_FAILED, payload };
};
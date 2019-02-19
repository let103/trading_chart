import * as actionTypes from './constant';

export const addPortfolio = (payload) => { return { type: actionTypes.ADD_PORTFOLIO, payload } };
export const addPortfolioSuccess = (payload) => {
  return { type: actionTypes.ADD_PORTFOLIO_SUCCESS, payload };
};
export const addPortfolioFailed = (payload) => {
  return { type: actionTypes.ADD_PORTFOLIO_FAILED, payload };
};

export const fetchPortfoliosList = (payload) => { return { type: actionTypes.FETCH_PORTFOLIOS_LIST, payload } };
export const fetchPortfoliosListSuccess = (payload) => {
  return { type: actionTypes.FETCH_PORTFOLIOS_LIST_SUCCESS, payload };
};
export const fetchPortfoliosListFailed = (payload) => {
  return { type: actionTypes.FETCH_PORTFOLIOS_LIST_FAILED, payload };
};

export const fetchHistoryPortfoliosList90Days = (payload) => { return { type: actionTypes.FETCH_HISTORY_PORTFOLIOS_90_DAYS_LIST, payload } };
export const fetchHistoryPortfoliosList90DaysSuccess = (payload) => {
  return { type: actionTypes.FETCH_HISTORY_PORTFOLIOS_90_DAYS_LIST_SUCCESS, payload };
};
export const fetchHistoryPortfoliosList90DaysFailed = (payload) => {
  return { type: actionTypes.FETCH_HISTORY_PORTFOLIOS_90_DAYS_LIST_FAILED, payload };
};

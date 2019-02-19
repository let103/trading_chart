import * as actionTypes from './constant';

const initState = {
  portFoliosList: [],
  historyPortfolio90Days: {
    created_at: [],
    sum_market_cap: []
  }
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PORTFOLIOS_LIST:
    return {
      ...state,
      portFoliosList: [],
    };
  case actionTypes.FETCH_PORTFOLIOS_LIST_SUCCESS:
    return {
      ...state,
      portFoliosList: action.payload,
    };
  case actionTypes.FETCH_PORTFOLIOS_LIST_FAILED:
    return {
      ...state,
      portFoliosList: [],
  };
  case actionTypes.ADD_PORTFOLIO:
      return {
        ...state,
      };
    case actionTypes.ADD_PORTFOLIO_SUCCESS:
      return {
        ...state,
        portFoliosList: [...state.portFoliosList, action.payload],
      };
    case actionTypes.ADD_PORTFOLIO_FAILED:
      return {
        ...state,
        portFoliosList: [],
      };
    case actionTypes.FETCH_HISTORY_PORTFOLIOS_90_DAYS_LIST:
      return {
        ...state,
        historyPortfolio90Days: {
          created_at: [],
          sum_market_cap: []
        },
      };
    case actionTypes.FETCH_HISTORY_PORTFOLIOS_90_DAYS_LIST_SUCCESS:
      return {
        ...state,
        historyPortfolio90Days: action.payload,
      };
    case actionTypes.FETCH_HISTORY_PORTFOLIOS_90_DAYS_LIST_FAILED:
      return {
        ...state,
        historyPortfolio90Days: {
          created_at: [],
          sum_market_cap: []
        },
    };
  default:
    return state;
  }
};
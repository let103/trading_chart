import { createSelector } from 'reselect';
import { get } from 'lodash';

export const fetchPortfoliosListSelector = createSelector(
  (state) => { return get(state.portfolio, 'portFoliosList'); },
  (result) => { return result; },
);

export const fetchHistoryPortfolios90DaysListSelector = createSelector(
  (state) => { return get(state.portfolio, 'historyPortfolio90Days'); },
  (result) => { return result; },
);

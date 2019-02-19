import { createSelector } from 'reselect';
import { get } from 'lodash';

export const fetchTop30CoinSelector = createSelector(
  (state) => { return get(state.coinReducer, 'top30CoinList'); },
  (result) => { return result; },
);

export const fetchCoinByPortfoliosIdSelector = createSelector(
  (state) => { return get(state.coinReducer, 'portFoliosCoinList'); },
  (result) => { return result; },
);

export const fetchCoinByNameSelector = createSelector(
  (state) => { return get(state.coinReducer, 'searchCoinList'); },
  (result) => { return result; },
);

export const fetchCoinDataFullSelector = createSelector(
  (state) => { return get(state.coinReducer, 'coinDataFullList'); },
  (result) => { return result; },
);
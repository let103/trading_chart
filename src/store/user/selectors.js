import { createSelector } from 'reselect';
import { get } from 'lodash';

export const fetchPortfoliosListSelector = createSelector(
  (state) => { return get(state.userReducer, 'portFoliosList'); },
  (result) => { return result; },
);

export const fetchUserListSelector = createSelector(
  (state) => { return get(state.userReducer, 'userList'); },
  (result) => { return result; },
);

export const createNewUserSelector = createSelector(
  (state) => { return get(state.userReducer, 'userInfo'); },
  (result) => { return result; },
);
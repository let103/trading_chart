import * as actionTypes from './constant';

export const fetchUserList = { type: actionTypes.FETCH_USER_LIST };
export const fetchUserListSuccess = (payload) => {
  return { type: actionTypes.FETCH_USER_LIST_SUCCESS, payload };
};
export const fetchUserListFailed = (payload) => {
  return { type: actionTypes.FETCH_USER_LIST_FAILED, payload };
};

export const createUser = (payload) => { 
  return { type: actionTypes.CREATE_USER, payload }
};

export const createUserSuccess = (payload) => {
  return { type: actionTypes.CREATE_USER_SUCCESS, payload };
};
export const createUserFailed = (payload) => {
  return { type: actionTypes.CREATE_USER_FAILED, payload };
};

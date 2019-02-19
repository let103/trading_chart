import { from, of } from 'rxjs';
import {
  mergeMap
} from 'rxjs/operators';
import * as actionTypes from './constant';
import CreateService from '../../service/CreateService';
import UserService from '../../service/UserService';
import { fetchUserListSuccess, fetchUserListFailed, createUserSuccess, createUserFailed} from './actionCreator';

const fetchAllUserEpic = (action$) => {
  return action$
    .ofType(actionTypes.FETCH_USER_LIST)
    .pipe(
      mergeMap(() => {
        return from(CreateService(UserService).getAll())
          .pipe(
            mergeMap((response) => {
              const data = response.data || [];
              if (data.length > 0) {
                
                return of(fetchUserListSuccess(data));
              }

              return of(fetchUserListFailed(response));
            }),
          );
      }),
    );
};

const createUserEpic = (action$) => {
  return action$
    .ofType(actionTypes.CREATE_USER)
    .pipe(
      mergeMap((action) => {
        return from(CreateService(UserService).create(action.payload.body))
          .pipe(
            mergeMap((response) => {
              if (response.status_code == 200) {
                
                return of(createUserSuccess(response.data));
              }
              
              return of(createUserFailed(response.data));
            }),
          );
      }),
    );
};

export {
  fetchAllUserEpic,
  createUserEpic
}

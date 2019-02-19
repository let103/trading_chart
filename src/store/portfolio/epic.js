import { from, of } from 'rxjs';
import {
  mergeMap
} from 'rxjs/operators';
import { map } from 'lodash';
import * as actionTypes from './constant';
import CreateService from '../../service/CreateService';
import PortfolioService from '../../service/PortfolioService';
import { 
  fetchPortfoliosListSuccess, 
  fetchPortfoliosListFailed, 
  addPortfolioSuccess , 
  addPortfolioFailed ,
  fetchHistoryPortfoliosList90DaysSuccess,
  fetchHistoryPortfoliosList90DaysFailed
} from './actionCreator';

const formartPorfoliosList = (portfoliosList) => {
  const newPortfoliosList = map(portfoliosList, (portfolios) => {
      return {
              id: portfolios.id,
              type: portfolios.type,
              name: portfolios.attributes.name,
              user_id: portfolios.attributes.user_id , 
  }});

  return newPortfoliosList;
}

export const addPorfolioEpic = (action$) => {
  return action$
    .ofType(actionTypes.ADD_PORTFOLIO)
    .pipe(
      mergeMap((action) => {
        return from(CreateService(PortfolioService).addPortofilo(action.payload))
          .pipe(
            mergeMap((response) => {
              if (response.status_code === 200) {
                const newPortfolios = {
                  id: response.data.id,
                  name: response.data.attributes.name,
                  user_id: response.data.attributes.name,
                  last: 0,
                  change: 0,
                  marketCap: 0
                }
                return of(addPortfolioSuccess(newPortfolios));
              }

              return of(addPortfolioFailed([]));
            }),
          );
      }),
    );
};

export const fetchPortfoliosEpic = (action$) => {
  return action$
    .ofType(actionTypes.FETCH_PORTFOLIOS_LIST)
    .pipe(
      mergeMap((action) => {
        return from(CreateService(PortfolioService).getPortfolios(action.payload))
          .pipe(
            mergeMap((response) => {
              let includes = formartPorfoliosList(response.included) || [];
              if (includes.length > 0) {
                     return of(fetchPortfoliosListSuccess(includes));
              }

              return of(fetchPortfoliosListFailed(response));
            })      
      )}),
  );
};

export const fetchHistoryPortfolios90DaysEpic = (action$) => {
  return action$
    .ofType(actionTypes.FETCH_HISTORY_PORTFOLIOS_90_DAYS_LIST)
    .pipe(
      mergeMap((action) => {
        return from(CreateService(PortfolioService).getHistory90Days(action.payload.id, action.payload.invest_number))
          .pipe(
            mergeMap((response) => {
              let data = response.message ? [] : response.data.created_at;
              if (data.length > 0) {
                     return of(fetchHistoryPortfoliosList90DaysSuccess(response.data));
              }

              return of(fetchHistoryPortfoliosList90DaysFailed(response.data));
            })      
      )}),
  );
};
import { from, of } from 'rxjs';
import {
  mergeMap
} from 'rxjs/operators';
import { map, forEach } from 'lodash';
import * as actionTypes from './constant';
import CreateService from '../../service/CreateService';
import CoinService from '../../service/CoinService';
import { 
   fetchTop30CoinSuccess, fetchTop30CoinFailed ,
   fetchCoinByPortfoliosIdSuccess, fetchCoinByPortfoliosIdFailed,
   fetchCoinByNameSuccess, fetchCoinByNameFailed,
   addCoinByPortfoliosIdSuccess, addCoinByPortfoliosIdFailed,
   deleteCoinByPortfoliosIdSuccess, deleteCoinByPortfoliosIdFailed,
   fetchCoinDataFullSuccess, fetchCoinDataFullFailed,
} from './actionCreator';
import { find } from 'rxjs-compat/operator/find';

const formartCoinList = (coinList) => {
  const newCoinList = map(coinList, (coin) => {
      return {
              id: coin.id,
              type: coin.type,
              name: coin.attributes.name,
              portfolio_id: coin.attributes.portfolio_id , 
              symbol: coin.attributes.symbol, 
              symbol_crypto: coin.attributes.symbol_crypto}
  });

  return newCoinList;
}

const getSymbolListFromPorfoliosCoinList = (porfoliosCoinList) => {
  let symbols = '';

  porfoliosCoinList.forEach((coin) => {
      symbols += `${coin.symbol_crypto},`;
  });

  return symbols.substr(0, symbols.length - 1);
}

const mergeCoinList = (porfoliosCoinList, rawCoinList, isDefaultPortfolio) => {
  
  porfoliosCoinList = forEach(porfoliosCoinList, (coin) => {
    for(var key in rawCoinList.RAW ){
      if(coin.symbol_crypto === key){
        coin.isDefaultPortfolio = isDefaultPortfolio;
        coin.last = rawCoinList.RAW[key].USD.PRICE;
        coin.change = rawCoinList.RAW[key].USD.CHANGEDAY;
        coin.marketCap = rawCoinList.RAW[key].USD.MKTCAP;
      }
    }
  });

  return porfoliosCoinList;
}

export const fetchTop30CoinEpic = (action$) => {
  return action$
    .ofType(actionTypes.FETCH_TOP_30_COIN_LIST)
    .pipe(
      mergeMap(() => {
        return from(CreateService(CoinService).getTop30Coin())
          .pipe(
            mergeMap((response) => {
              if (response.data.length > 0) {
                const coinList = response.data;
                return of(fetchTop30CoinSuccess(coinList));
              }

              return of(fetchTop30CoinFailed(response));
            }),
          );
      }),
    );
};

export const fetchCoinByPortfoliosIdEpic = (action$) => {
  return action$
    .ofType(actionTypes.FETCH_COIN_BY_PORTFILO_ID)
    .pipe(
      mergeMap((action) => {
        return from(CreateService(CoinService).getCoinByPortofiloId(action.payload))
          .pipe(
            mergeMap((response) => {
              let included = formartCoinList(response.included) || [];
              let isDefaultPortfolio = response.data.attributes.default_portfolio;
              if (included.length > 0) {
                const symbols = getSymbolListFromPorfoliosCoinList(included);
                return from(CreateService(CoinService).getDetailCoin(symbols))
                .pipe(
                  mergeMap((response) => {
                      const newCoinList = mergeCoinList(included, response, isDefaultPortfolio);
                      return of(fetchCoinByPortfoliosIdSuccess(newCoinList));
                  }),
                )
              }
              return of(fetchCoinByPortfoliosIdFailed(included));
            }),
          );
      }),
    );
};

export const addCoinByPortfoliosIdEpic = (action$) => {
  return action$
    .ofType(actionTypes.ADD_COIN_BY_PORTFILO_ID)
    .pipe(
      mergeMap((action) => {
        return from(CreateService(CoinService).addCoinByPortofiloId(action.payload.id, action.payload.body))
          .pipe(
            mergeMap((response) => {
              const included = formartCoinList(response.included) || [];
              let isDefaultPortfolio = response.data.attributes.default_portfolio;
              if (included.length > 0) {
                const symbols = getSymbolListFromPorfoliosCoinList(included);
                return from(CreateService(CoinService).getDetailCoin(symbols))
                .pipe(
                  mergeMap((response) => {
                      const newCoin = mergeCoinList(included, response, isDefaultPortfolio);
                      return of(addCoinByPortfoliosIdSuccess(newCoin));
                  }),
                )
              }
              return of(addCoinByPortfoliosIdFailed(included));
            }),
          );
      }),
    );
};

export const deleteCoinByPortfoliosIdEpic = (action$) => {
  return action$
    .ofType(actionTypes.DELETE_COIN_BY_PORTFILO_ID)
    .pipe(
      mergeMap((action) => {
        return from(CreateService(CoinService).deleteCoinByPortofiloId(action.payload.id, action.payload.body))
          .pipe(
            mergeMap((response) => {
              if (response.status_code == 200) {
                return from(CreateService(CoinService).getCoinByPortofiloId(action.payload.id))
                .pipe(
                  mergeMap((response) => {
                    const included = formartCoinList(response.included) || [];
                    let isDefaultPortfolio = response.data.attributes.default_portfolio;
                    if(included.length > 0){
                    const symbols = getSymbolListFromPorfoliosCoinList(included);
                    return from(CreateService(CoinService).getDetailCoin(symbols))
                    .pipe(
                      mergeMap((response) => {
                          const newCoin = mergeCoinList(included, response, isDefaultPortfolio);
                          return of(deleteCoinByPortfoliosIdSuccess(newCoin));
                      }),
                    )
                  }

                  return of(deleteCoinByPortfoliosIdFailed(response));
                }),
              )
            }
              return of(deleteCoinByPortfoliosIdFailed(response));
            }),
          );
      }),
    );
};

export const fetchCoinByNameEpic = (action$) => {
  return action$
    .ofType(actionTypes.FETCH_COIN_BY_NAME)
    .pipe(
      mergeMap((action) => {
        return from(CreateService(CoinService).getCoinByName(action.payload))
          .pipe(
            mergeMap((response) => {

              if (response.status_code === 200) {
                  return of(fetchCoinByNameSuccess(response.data));
              }

              return of(fetchCoinByNameFailed(response));
            }),
          );
      }),
    );
};

export const fetchCoinDataFullEpic = (action$) => {
  return action$
    .ofType(actionTypes.FETCH_COIN_FULL_DATA)
    .pipe(
      mergeMap((action) => {
        return from(CreateService(CoinService).getDetailCoin(action.payload))
          .pipe(
            mergeMap((response) => {
              if (response.RAW) {
                  return of(fetchCoinDataFullSuccess(response.RAW));
              }

              return of(fetchCoinDataFullFailed(response));
            }),
          );
      }),
    );
};
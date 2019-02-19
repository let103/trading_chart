import { combineEpics } from 'redux-observable';
import { fetchTop30CoinEpic, fetchCoinByPortfoliosIdEpic, 
         fetchCoinByNameEpic , addCoinByPortfoliosIdEpic ,
         deleteCoinByPortfoliosIdEpic,
         fetchCoinDataFullEpic
} from '../src/store/coin_detail/epic';
import { fetchAllUserEpic, createUserEpic } from '../src/store/user/epic';
import { fetchPortfoliosEpic, addPorfolioEpic, fetchHistoryPortfolios90DaysEpic } from '../src/store/portfolio/epic';

export const rootEpic = combineEpics(
    fetchTop30CoinEpic,
    fetchCoinByPortfoliosIdEpic,
    fetchCoinByNameEpic,
    fetchPortfoliosEpic,
    addPorfolioEpic,
    addCoinByPortfoliosIdEpic,
    deleteCoinByPortfoliosIdEpic,
    fetchAllUserEpic,
    fetchCoinDataFullEpic,
    fetchHistoryPortfolios90DaysEpic,
    createUserEpic
);
import { combineReducers } from 'redux';
import coinReducer from '../src/store/coin_detail/reducer';
import userReducer from '../src/store/user/reducer';
import portfolio from '../src/store/portfolio/reducer';

const reducer = combineReducers({
    coinReducer,
    userReducer,
    portfolio
});

export default reducer;
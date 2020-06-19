import { combineReducers } from 'redux';
import trades from './tradeReducer';
import account from './accountReducer';
import currentTrade from './currentTradeReducer';

const rootReducer = combineReducers({
  trades,
  account,
  currentTrade,
});

export default rootReducer;

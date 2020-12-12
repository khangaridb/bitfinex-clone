import {combineReducers} from 'redux';
import orderBookReducer from './orderBookSlice';
import tradeReducer from './tradeSlice';
import tickerReducer from './tickerSlice';

const rootReducer = combineReducers({
  orderBook: orderBookReducer,
  trade: tradeReducer,
  ticker: tickerReducer,
});

export default rootReducer;

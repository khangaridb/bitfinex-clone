import {configureStore} from '@reduxjs/toolkit';
import orderBookReducer from './orderBookSlice';

export default configureStore({
  reducer: {
    orderBook: orderBookReducer,
  },
});

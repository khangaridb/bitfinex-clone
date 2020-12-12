import {createSlice} from '@reduxjs/toolkit';

export const tickerSlice = createSlice({
  name: 'ticker',
  initialState: {
    ticker: {},
  },
  reducers: {
    setTickers: (state, action) => {
      const [
        bid,
        bidSize,
        ask,
        askSize,
        dailyChange,
        dailyChangeRelative,
        lastPrice,
        volume,
        high,
        low,
      ] = action.payload;

      state.ticker = {
        bid,
        bidSize,
        ask,
        askSize,
        dailyChange,
        dailyChangeRelative,
        lastPrice,
        volume,
        high,
        low,
      };
    },
  },
});

export const {setTickers} = tickerSlice.actions;

export default tickerSlice.reducer;

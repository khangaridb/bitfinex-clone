import {createSlice} from '@reduxjs/toolkit';

export const tradeSlice = createSlice({
  name: 'trade',
  initialState: {
    list: [],
  },
  reducers: {
    setTrades: (state, action) => {
      const tmpList = action.payload.map((data) => {
        const [id, mts, amount, price] = data;

        return {
          id,
          mts,
          amount,
          price,
        };
      });

      state.list = tmpList;
    },

    updateTrade: (state, action) => {
      const [id, mts, amount, price] = action.payload;
      state.list = [
        {
          id,
          mts,
          amount,
          price,
        },
        ...state.list.slice(0, -1),
      ];
    },
  },
});

export const {setTrades, updateTrade} = tradeSlice.actions;

export default tradeSlice.reducer;

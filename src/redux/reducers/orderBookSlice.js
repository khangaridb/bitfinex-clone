import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  bids: {},
  asks: {},
};

export const orderBookSlice = createSlice({
  name: 'orderBook',
  initialState,
  reducers: {
    setOrderBooks: (state, action) => {
      Object.assign(state, initialState);

      action.payload.forEach((data) => {
        const pp = {price: data[0], cnt: data[1], amount: data[2]};
        const side = pp.amount > 0 ? 'bids' : 'asks';
        pp.amount = Math.abs(pp.amount);

        state[`${side}`][pp.price] = pp;
      });
    },

    updateBook: (state, action) => {
      const pp = {
        price: action.payload[0],
        cnt: action.payload[1],
        amount: action.payload[2],
      };
      if (!pp.cnt) {
        if (pp.amount > 0) {
          if (state.bids[pp.price]) {
            delete state.bids[pp.price];
          }
        } else if (pp.amount < 0) {
          if (state.asks[pp.price]) {
            delete state.asks[pp.price];
          }
        }
      } else {
        let side = pp.amount >= 0 ? 'bids' : 'asks';
        pp.amount = Math.abs(pp.amount);
        state[side][pp.price] = pp;
      }
    },
  },
});

export const {setOrderBooks} = orderBookSlice.actions;

export default orderBookSlice.reducer;

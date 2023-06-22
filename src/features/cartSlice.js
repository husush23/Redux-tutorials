import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import cartItems from '../cartItems';

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems: [],
  total: 0,
  amount: 1,
  isLoading: false,
};

export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.error(error));
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: state => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload
      );
    },
    increase: (state, {payload}) => {
      const cartItem = state.cartItems.find(item => item.id === payload);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, {payload}) => {
      const cartItem = state.cartItems.find(item => item.id === payload);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: state => {
      let total = 0;
      let amount = 0;
      state.cartItems.forEach(item => {
        total += item.amount * item.price;
        amount += item.amount;
      });
      state.total = total;
      state.amount = amount;
    },
  },
  extraReducers: {
    [getCartItems.pending]: state => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.fulfilled]: state => {
      state.isLoading = false;
    },
  },
});

// console.log(cartSlice);

export const {clearCart, removeItem, increase, decrease, calculateTotals} =
  cartSlice.actions;
export default cartSlice.reducer;

import {createReducer} from '@reduxjs/toolkit';
import {
  addToCart,
  clearCart,
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
  setCoupon,
  setQuantity
} from '../action';
import {State} from '../store';
import {Guitar} from '../../types/guitar';

export type CouponType = string | null;
export type CartItemType = { guitar: Guitar, count: number };
export type CartItemsType = CartItemType[];

export type CartData = {
  cartItems: CartItemsType
  coupon: CouponType
}

const initialState: CartData = {
  cartItems: [],
  coupon: null,
};

const cartData = createReducer(initialState, (builder) => {
  builder
    .addCase(addToCart,(state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    })
    .addCase(incrementQuantity, (state, action) => {
      const index = state.cartItems.findIndex((item) => item.guitar.id === action.payload);
      state.cartItems[index] = {...state.cartItems[index], count: state.cartItems[index].count + 1};
    })
    .addCase(decrementQuantity, (state, action) => {
      const index = state.cartItems.findIndex((item) => item.guitar.id === action.payload);
      state.cartItems[index] = {...state.cartItems[index], count: state.cartItems[index].count - 1};
    })
    .addCase(setQuantity, (state, action) => {
      const index = state.cartItems.findIndex((item) => item.guitar.id === action.payload.id);
      state.cartItems[index] = {...state.cartItems[index], count: action.payload.quantity};
    })
    .addCase(deleteFromCart, (state, action) => {
      const index = state.cartItems.findIndex((item) => item.guitar.id === action.payload);
      state.cartItems = [
        ...state.cartItems.slice(0, index),
        ...state.cartItems.slice(index + 1),
      ];
    })
    .addCase(setCoupon, (state, action) => {
      state.coupon = action.payload;
    })
    .addCase(clearCart, (state, action) => {
      state.cartItems = action.payload.cartItems;
      state.coupon = action.payload.coupon;
    });
});

export {cartData};

export const getCartItems = (state:State): CartItemsType => state.cartData.cartItems;
export const getCoupon = (state:State): CouponType => state.cartData.coupon;

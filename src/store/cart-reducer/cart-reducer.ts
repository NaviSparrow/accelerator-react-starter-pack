import {createReducer} from '@reduxjs/toolkit';
import {Guitar} from '../../types/guitar';
import {addToCart, incrementQuantity} from '../action';
import {State} from '../store';

export type CartItem = {guitar:Guitar, count: number};
export type CartItems = CartItem[];

type CartData = {
  cartItems: CartItems
}

const initialState: CartData = {
  cartItems: [],
};

const cartData = createReducer(initialState, (builder) => {
  builder
    .addCase(addToCart,(state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    })
    .addCase(incrementQuantity, (state, action) => {
      const index = state.cartItems.findIndex((item) => item.guitar.id === action.payload);
      state.cartItems[index] = {...state.cartItems[index], count: state.cartItems[index].count + 1};
    });
});

export {cartData};

export const getCartItems = (state:State): CartItems => state.cartData.cartItems;

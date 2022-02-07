import {createReducer} from '@reduxjs/toolkit';
import {Guitar} from '../../types/guitar';
import {addToCart, decrementQuantity, deleteFromCart, incrementQuantity, setQuantity} from '../action';
import {State} from '../store';

export type CartItemType = {guitar:Guitar, count: number};
export type CartItemsType = CartItemType[];

export type CartData = {
  cartItems: CartItemsType
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
    });
});

export {cartData};

export const getCartItems = (state:State): CartItemsType => state.cartData.cartItems;

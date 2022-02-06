import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../types/action';
import {CartItem} from './cart-reducer/cart-reducer';

export const addToCart = createAction(
  ActionType.AddToCart,
  (guitar: CartItem) => ({
    payload: guitar,
  }),
);

export const incrementQuantity = createAction(
  ActionType.IncrementQuantity,
  (id: number) => ({
    payload: id,
  }),
);

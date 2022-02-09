import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../types/action';
import {CartData, CartItemType, CouponType} from './cart-reducer/cart-reducer';

export const addToCart = createAction(
  ActionType.AddToCart,
  (guitar: CartItemType) => ({
    payload: guitar,
  }),
);

export const incrementQuantity = createAction(
  ActionType.IncrementQuantity,
  (id: number) => ({
    payload: id,
  }),
);

export const decrementQuantity = createAction(
  ActionType.DecrementQuantity,
  (id: number) => ({
    payload: id,
  }),
);

export const setQuantity = createAction(
  ActionType.SetQuantity,
  (id:number, quantity: number) => ({
    payload: {id, quantity},
  }),
);

export const deleteFromCart = createAction(
  ActionType.DeleteFromCart,
  (id: number) => ({
    payload: id,
  }),
);

export const setCoupon = createAction(
  ActionType.SetCoupon,
  (coupon: CouponType) => ({
    payload: coupon,
  }),
);

export const clearCart = createAction(
  ActionType.ClearCart,
  (cart: CartData) => ({
    payload: cart,
  }),
);


import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {mainAPI} from '../service/api';
import {CartData, cartData} from './cart-reducer/cart-reducer';

const loadCartFromLocalStorage = () => JSON.parse(window.localStorage.getItem('state') as string);

export const saveCartDataToLocalStorage = (cart: CartData) =>  window.localStorage.setItem('state', JSON.stringify({cartData: cart}));

const cartDataFromLocalStorage = loadCartFromLocalStorage();

const rootReducer = combineReducers({
  [mainAPI.reducerPath]: mainAPI.reducer,
  cartData,
});

export const setUpStore = () => configureStore( {
  reducer: rootReducer,
  preloadedState: cartDataFromLocalStorage,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainAPI.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type State = RootState;

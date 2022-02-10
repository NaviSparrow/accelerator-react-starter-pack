import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {mainAPI} from '../service/api';
import {CartData, cartData} from './cart-reducer/cart-reducer';
import {toast} from 'react-toastify';
import {ERROR_TEXT} from '../const/const';

const loadCartFromLocalStorage = () => {
  try {
    const storageState = window.localStorage.getItem('state');
    return storageState ? JSON.parse(storageState) : undefined;
  } catch (error) {
    toast.error(ERROR_TEXT);
    return undefined;
  }
};

export const saveCartDataToLocalStorage = (cart: CartData) => {
  try {
    window.localStorage.setItem('state', JSON.stringify({cartData: cart}));
  } catch (error) {
    toast.error(ERROR_TEXT);
  }
};

const cartDataFromLocalStorage = loadCartFromLocalStorage();

export const rootReducer = combineReducers({
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

export const testStore = configureStore( {
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainAPI.middleware),
});

import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {mainAPI} from '../service/api';
import {cartData} from './cart-reducer/cart-reducer';
import {toast} from 'react-toastify';

const loadCartFromLocalStorage = () => {
  try {
    const storageState = window.localStorage.getItem('state');
    return storageState ? JSON.parse(storageState) : undefined;
  } catch (error) {
    toast.error(`${error} возникла ошибка`);
    return undefined;
  }
};

export const saveCartToLocalStorage = (state: State) => {
  try {
    window.localStorage.setItem('state', JSON.stringify(state));
  } catch (error) {
    toast.error(`${error} возникла ошибка`);
  }
};

const preloadedState = loadCartFromLocalStorage();

const rootReducer = combineReducers({
  [mainAPI.reducerPath]: mainAPI.reducer,
  cartData,
});

export const setUpStore = () => configureStore( {
  reducer: rootReducer,
  preloadedState: preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainAPI.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type State = RootState;

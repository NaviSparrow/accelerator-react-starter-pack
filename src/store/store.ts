import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {mainAPI} from '../service/api';
import {cartData} from './cart-reducer/cart-reducer';

const rootReducer = combineReducers({
  [mainAPI.reducerPath]: mainAPI.reducer,
  cartData,
});

export const setUpStore = () => configureStore( {
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainAPI.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type State = RootState;

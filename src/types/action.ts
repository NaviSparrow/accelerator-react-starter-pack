import {Action, ThunkAction, ThunkDispatch} from '@reduxjs/toolkit';
import {State} from './state';
import {AxiosInstance} from 'axios';

export enum ActionType {
  FillGuitarsList = 'main/fillGuitarsList',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
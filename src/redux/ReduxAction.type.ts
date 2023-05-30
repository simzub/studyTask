import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export type ReduxAction = ThunkAction<void, RootState, unknown, AnyAction>;

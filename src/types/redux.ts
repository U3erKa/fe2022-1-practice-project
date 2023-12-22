import type { ActionReducerMapBuilder, AsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from 'store';

export type ExtraReducersCreator = <State, Return, Payload>(options: {
  thunk: AsyncThunk<Return, Payload, {}>;
  pendingReducer?: any;
  fulfilledReducer?: any;
  rejectedReducer?: any;
}) => (builder: ActionReducerMapBuilder<State>) => void;

export type DefaultState = {
  isFetching: boolean;
  error: Error | null;
};

export type RootStateWithAsync = RootState[keyof RootState] & {
  isFetching: any;
  error: any;
};

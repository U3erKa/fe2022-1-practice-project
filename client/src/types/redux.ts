import type { ActionReducerMapBuilder, AsyncThunk } from '@reduxjs/toolkit';

export type AsyncThunkDecorator = <Return, Payload = void>({
  key,
  thunk,
}: {
  key: string;
  thunk: (payload: Payload, thunkAPI?: unknown) => Return;
}) => AsyncThunk<Return, Payload, {}>;

export type ExtraReducersCreator = <State, Return, Payload>(options: {
  thunk: AsyncThunk<Return, Payload, {}>;
  pendingReducer?: any;
  fulfilledReducer?: any;
  rejectedReducer?: any;
}) => (builder: ActionReducerMapBuilder<State>) => void;

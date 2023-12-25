import type {
  ActionReducerMapBuilder,
  AsyncThunk,
  AsyncThunkPayloadCreator,
} from '@reduxjs/toolkit';

export type AsyncThunkDecorator = <Return, Payload = void, Arg = void>({
  key,
  thunk,
}: {
  key: string;
  thunk: AsyncThunkPayloadCreator<Return, Arg>;
}) => AsyncThunk<Return, Payload, {}>;

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

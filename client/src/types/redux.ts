import type {
  ActionReducerMapBuilder,
  AsyncThunk,
  CaseReducer,
  PayloadAction,
} from '@reduxjs/toolkit';

export type AsyncThunkDecorator = <Return, Payload = void>({
  key,
  thunk,
}: {
  key: string;
  thunk: (payload: Payload, thunkAPI?: unknown) => Return;
}) => AsyncThunk<Return, Payload, {}>;

export type ExtraReducersCreator = <State, Return>(
  options: ExtraReducersOptions<State, Return>,
) => (builder: ActionReducerMapBuilder<State>) => void;

type ExtraReducersOptions<State, Return, Payload = void> = {
  thunk: AsyncThunk<Return, Payload, {}>;
  pendingReducer?: ExtraReducer<State>;
  fulfilledReducer?: ExtraReducer<State>;
  rejectedReducer?: ExtraReducer<State>;
};

type ExtraReducer<State> = CaseReducer<
  State,
  PayloadAction<any, string, unknown, never>
>;

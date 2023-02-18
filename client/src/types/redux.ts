import type {
  ActionReducerMapBuilder,
  AsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';

export type AsyncThunkDecorator = <Return, Payload>({
  key,
  thunk,
}: {
  key: string;
  thunk: (payload: Payload, thunkAPI?: unknown) => Return;
}) => AsyncThunk<Return, Payload, {}>;

export type ExtraReducersCreator = (
  options: ExtraReducersOptions<any>,
) => (builder: ActionReducerMapBuilder<any>) => void;

type ExtraReducersOptions<State> = {
  thunk: AsyncThunk<any, unknown, {}>;
  pendingReducer?: (state: State, action: PayloadAction<State>) => void;
  fulfilledReducer?: (state: State, action: PayloadAction<State>) => void;
  rejectedReducer?: (state: State, action: PayloadAction<State>) => void;
};

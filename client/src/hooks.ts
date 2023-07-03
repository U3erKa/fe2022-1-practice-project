import { useState } from 'react';
import {
  useSelector as _useSelector,
  useDispatch as _useDispatch,
} from 'react-redux';

import type { RootState, AppDispatch } from 'store';

export const useSelector: <TSelected = unknown>(
  selector: (state: RootState) => TSelected,
  equalityFn?: ((left: TSelected, right: TSelected) => boolean) | undefined,
) => TSelected = _useSelector;

export const useDispatch: () => AppDispatch = _useDispatch;

export function useForceUpdate() {
  const [, setValue] = useState(0);
  return () => setValue((value) => value + 1);
}

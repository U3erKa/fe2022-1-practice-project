import { useState } from 'react';
import {
  useDispatch as _useDispatch,
  useSelector as _useSelector,
} from 'react-redux';
import { isEqual } from 'radash';
import type { AppDispatch, RootState } from 'store';

export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected,
  equalityFn: (left: TSelected, right: TSelected) => boolean = isEqual,
) => _useSelector(selector, equalityFn);

export const useDispatch: () => AppDispatch = _useDispatch;

export function useForceUpdate() {
  const [, setValue] = useState(0);
  return () => setValue((value) => value + 1);
}

import { isEqual } from 'radash';
import { useEffect, useRef, useState } from 'react';
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from 'react-redux';
import type { AppDispatch, RootState } from 'store';

export const useSelector: TypedUseSelectorHook<RootState> = (
  selector,
  equalityFn = isEqual,
) => useReduxSelector(selector, equalityFn as any);

export const useDispatch: () => AppDispatch = useReduxDispatch;

export function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => {
    setValue((value) => value + 1);
    return value;
  };
}

export function useRenderCount() {
  const renders = useRef(0);
  useEffect(() => {
    renders.current = renders.current + 1;
  });
  return renders.current;
}

'use client';

import isEqual from 'fast-deep-equal/es6/react';
import { useEffect, useRef, useState } from 'react';
import {
  type EqualityFn,
  type TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';
import type { AppDispatch, RootState } from 'store';

export const useSelector: TypedUseSelectorHook<RootState> = (
  selector,
  equalityFn = isEqual,
) => useReduxSelector(selector, equalityFn as EqualityFn<unknown>);

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

import { useEffect, useRef, useState } from 'react';
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

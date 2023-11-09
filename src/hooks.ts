import { useEffect, useRef, useState } from 'react';
import {
  useDispatch as _useDispatch,
  useSelector as _useSelector,
} from 'react-redux';

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

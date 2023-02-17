import {
  useSelector as _useSelector,
  useDispatch as _useDispatch,
} from 'react-redux';
import { RootState, Dispatch } from './store/index';

export const useSelector: <TSelected = unknown>(
  selector: (state: RootState) => TSelected,
  equalityFn?: ((left: TSelected, right: TSelected) => boolean) | undefined,
) => TSelected = _useSelector;

export const useDispatch: () => Dispatch = _useDispatch;

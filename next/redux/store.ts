import { createStore } from "redux";
import {
  useDispatch as _useDispatch,
  useSelector as _useSelector,
} from "react-redux";
import rootReducer, { Event, Store } from "./reducers/root.reducer";

export function useDispatch() {
  const dispatch = _useDispatch();
  return (event: Event) => {
    dispatch(event);
  };
}

export function useSelector<T>(fn: (store: Store) => T): T {
  return fn(_useSelector((x: Store) => x));
}

const store = createStore(rootReducer);
export default store;

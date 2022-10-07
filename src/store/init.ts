import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { takeEvery } from "redux-saga/effects";
import { ECoordinateType } from "../enum/coordinate-types";

const initialState = {
  coordinates: [
    { type: ECoordinateType.SIMPLE, coord: [{ lat: 0, lng: 0 }] },
    { type: ECoordinateType.UNLOAD, coord: [{ lat: 0, lng: 0 }] },
  ],
  isLoading: false,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_COORD":
      return {
        ...state,
        coordinates: action.data,
      };
    case "SET_IS_LOADING":
      return {
        ...state,
        isLoading: action.data,
      };
    default:
      return state;
  }
};

export const changeCoord = (data: any) => {
  return { type: "SET_COORD", data };
};

export const setIsLoading = (data: any) => {
  return { type: "SET_IS_LOADING", data };
};

function* watchChangeCoord() {
  yield takeEvery("SET_COORD", changeCoordAsync);
}

function* changeCoordAsync(data: any) {
  yield console.log("middleware))", data);
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: reducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(watchChangeCoord);

// export const actionStore = (type: string, operation?: any) => {
//   store.dispatch({ type, operation });
// };

export default store;
//const store = configureStore(reducer, applyMiddleware(sagaMiddleware));

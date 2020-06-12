import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { MakeStore, createWrapper, Context, HYDRATE } from "next-redux-wrapper";
import { authInitState, authModule, AuthUserInfo } from "./modules/authModule";

export type RootState = {
  auth: AuthUserInfo;
};

const preloadedState = {
  auth: authInitState,
};

const combineReducer = combineReducers({
  auth: authModule.reducer,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combineReducer(state, action);
  }
};

export const makeStore: MakeStore<RootState> = (context: Context) => {
  return configureStore({
    reducer,
    preloadedState,
    middleware: [createLogger()],
  });
};

export const wrapper = createWrapper<RootState>(makeStore, { debug: true });

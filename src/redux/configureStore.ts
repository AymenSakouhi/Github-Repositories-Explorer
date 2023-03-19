import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import usersReducer from "./users";
import error from "./middleware/error";
import { apiMiddleware } from "./middleware/graphMiddleware";

export const store =  configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    apiMiddleware,
    error,
  ],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

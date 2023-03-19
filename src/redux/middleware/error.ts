import { Middleware, Dispatch } from "@reduxjs/toolkit";

const error: Middleware = (store) => (next: Dispatch) => (action) => {
  if (action.type === "SHOW_ERROR") {
    console.log(action.payload.error);
    next(action);
  } else {
    next(action);
  }
};

export default error;

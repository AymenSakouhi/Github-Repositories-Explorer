import { Middleware, Dispatch, Action } from "@reduxjs/toolkit";

const log: Middleware = (store) => (next: Dispatch) => (action: Action) => {
    console.log(action);
    next(action);
};
export default log;
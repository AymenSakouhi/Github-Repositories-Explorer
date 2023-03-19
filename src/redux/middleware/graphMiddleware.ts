import { ApiAction } from './../../models/Main.model';
import { Dispatch, Middleware } from "@reduxjs/toolkit";
import { graphqlQuery } from "../../graphql/users-schema";
import { apolloClient } from "../../graphql";
import { apiCallBeganUsers } from "../api";



export const apiMiddleware: Middleware =
  ({ dispatch }: { dispatch: Dispatch }) =>
  (next: Function) =>
  async (action: ApiAction) => {
    if (action.type !== apiCallBeganUsers.type) return next(action);
    let {
      url,//eslint-disable-line @typescript-eslint/no-unused-vars
      method, //eslint-disable-line @typescript-eslint/no-unused-vars
      data: query,
      onStart,
      onSuccess,
      onError,
    } = action.payload!;
    // console.log('query', query)
    if (onStart) dispatch({ type: onStart });
    try {
      const { loading, error, data } = await apolloClient.query({ //eslint-disable-line @typescript-eslint/no-unused-vars
        query: graphqlQuery,
        variables: { username: query ? query.search : "Brian", number_of_users: 5, number_of_repos: 5},
      });
      if (data) {
        dispatch({
          type: onSuccess,
          payload: data?.search.nodes || [],
        });
      }
    } catch (error: Error | any) {
      if (onError)
        dispatch({
          type: "users/getUsersFailure",
          payload: error.message,
        });
      dispatch({ type: "SHOW_ERROR", payload: { error: error.message } });
    }

    return next(action);
  };

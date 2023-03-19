import { UserModel, UsersState } from './../models/Main.model';
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBeganUsers } from "./api";

const initialState: UsersState = {
  users: [] as UserModel[],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    apiRequested: (state, action) => {
      state.loading = true;
    },
    apiRequestFailed: (state, action) => {
      state.loading = false;
    },
    getUsers: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    LoadNewUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { apiRequested, apiRequestFailed, getUsers, LoadNewUsers } =
  usersSlice.actions;
export default usersSlice.reducer;

// Action Creator
export const loadUsers = (search: string, numberOfUsers: number, numberOfRepos : number) => {
  return apiCallBeganUsers({
    data:  { search, numberOfUsers, numberOfRepos },
    onStart: apiRequested.type,
    onSuccess: getUsers.type,
    onError: apiRequestFailed.type,
  });
};

export const loadUsersWithSearchBar = (search: string, numberOfUsers: number, numberOfRepos : number) => {
  return apiCallBeganUsers({
    data:  { search, numberOfUsers, numberOfRepos },
    onSuccess: LoadNewUsers.type,
  });
};

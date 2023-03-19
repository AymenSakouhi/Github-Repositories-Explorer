import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { loadUsers } from "./redux/users";
import SearchBar from "./components/shared/SearchBar";
import MainBlock from "./components/MainBlock";
import Header from "./components/shared/Header";

function App() {
  const { users, loading } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUsers("Colt", 5, 5));
  }, [dispatch]);

  if (loading)
    return (
      <div className="text-3xl font-bold underline text-center">Loading...</div>
    );
  if (!users)
    return (
      <div className="text-3xl font-bold underline text-center">No users</div>
    );
  return (
    <>
      <Header />
      <SearchBar />
      {users && <MainBlock users={users} />}
    </>
  );
}

export default App;

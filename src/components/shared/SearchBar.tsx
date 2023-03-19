import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { loadUsersWithSearchBar } from "../../redux/users";

const SearchBar = () => {
  const [search, setSearch] = useState<string>("Colt");
  const [error, setError] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(loadUsersWithSearchBar(search, 5, 5));
    }, 100);
    return () => clearTimeout(delayDebounceFn);
  }, [search, dispatch]);

  //onchange event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  //onclick event
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (search === "") {
      setError(true);
    } else {
      setError(false);
      dispatch(loadUsersWithSearchBar(search, 5, 5));
    }
  };

  return (
    <>
      <div className="flex justify-center pt-4 w-full" data-testid="search">
        <form className="md:w-[50%] w-[75%] ">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              onChange={handleChange}
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for a username here"
              required
            />
          </div>
        </form>
        <div>
          <button
            onClick={handleClick}
            type="submit"
            className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
      <div>
        {!error && (
          <p className="text-center text-sm">
            Searching right now for the username:{" "}
            <code className="text-sm text-red-500">{search}</code>
          </p>
        )}
      </div>
    </>
  );
};

export default SearchBar;

import React from "react";
import { UserModel, MainBlockProps } from "../models/Main.model";
import ReposContainer from "./shared/ReposContainer";

const MainBlock = ({ users }: MainBlockProps) => (
  <div data-testid="main-block">
    {users.length ? (
      users.map((user: UserModel) => (
        <div
          key={Math.random().toString(26).slice(2)}
          className="flex justify-center items-center p-4"
        >
          <div className="w-full lg:max-w-[50%] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                {user.name}
              </h5>
            </div>
            <div className="flow-root">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={user.avatarUrl}
                        alt={user.name}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Username:{" "}
                        <code>
                          {user.login
                            ? user.login
                            : user.__typename === "Organization"
                            ? "User name reserved for organizations"
                            : "No Username"}
                        </code>
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {user?.bio}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {user?.location}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="w-full bg-slate-400 rounded-lg">
              <ReposContainer user={user} />
            </div>
          </div>
        </div>
      ))
    ) : (
      <div
        className="w-full h-screen flex items-center justify-center"
        data-testid="no-users"
      >
        <div className="text-2xl font-bold">No Users Found</div>
      </div>
    )}
  </div>
);

export default MainBlock;

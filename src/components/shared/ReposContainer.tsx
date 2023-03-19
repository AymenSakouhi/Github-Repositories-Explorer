import React from "react";
import Accordion from "./Accordion";
import { UserModel } from "../../models/Main.model";

const ReposContainer = ({ user }: { user: UserModel }) => {
  return (
    <div>
      <div className="flex justify-center items-center p-1 w-full">
        <div className="bg-slate-200 w-full lg:w-95 border border-gray-200 divide-y divide-gray-200 rounded-md">
          <details>
            <summary className="question py-3 px-4 cursor-pointer select-none w-full outline-none">
              <span className="text-bold">Repositories:</span>{" "}
              {user?.repositories?.nodes?.length
                ? user?.repositories?.nodes?.length
                : "0"}{" "}
              Repositories available.
            </summary>
            {user?.repositories?.nodes?.length ? (
              user?.repositories?.nodes?.map(
                (repo: {
                  name: string;
                  description: string;
                  stargazerCount: number;
                }) => (
                  <Accordion
                    key={repo.name + Math.random().toString(26).slice(2)}
                    repository={repo}
                  />
                )
              )
            ) : (
              <div className="text-xl font-bold px-4">
                No Repositories Available
              </div>
            )}
          </details>
        </div>
      </div>
    </div>
  );
};

export default ReposContainer;

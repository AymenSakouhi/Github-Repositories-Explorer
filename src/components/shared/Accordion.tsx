import React from "react";
import { AccordionProps } from "../../models/Main.model";

const Accordion = ({ repository }: AccordionProps) => (
  <>
    <div className="flex justify-center items-center p-4 w-full">
      <div className="bg-white w-full lg:w-96 border border-gray-200 divide-y divide-gray-200 rounded-md">
        <details>
          <summary className="question py-1 px-4 cursor-pointer select-none w-full outline-none">
            Repository:{" "}
            <div className="flex items-center justify-between">
              <p className="capitalize font-semibold">{repository?.name}</p>
              <span className="font-semibold flex items-center justify-center space-x-1">
                <p>{repository?.stargazerCount}</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                  <path d="M8 .2l4.9 15.2L0 6h16L3.1 15.4z" />
                </svg>{" "}
              </span>
            </div>
          </summary>
          <p className="pt-1 pb-3 px-4">
            <span className="underline">Description</span> :{" "}
            {repository?.description
              ? repository?.description
              : "No description"}
          </p>
        </details>
      </div>
    </div>
  </>
);

export default Accordion;

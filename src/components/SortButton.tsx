import React, { useState } from "react";
// import { CaughtViolator } from "../types/violator";
import { CaughtViolator } from "../types/violator.types";

interface SortButtonProps {
  entries: CaughtViolator[];
  setEntries: React.Dispatch<
    React.SetStateAction<CaughtViolator[] | undefined>
  >;
}

const SortButton = ({ entries, setEntries }: SortButtonProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const sortByName = () => {
    const sortedEntries = [...entries].sort((a, b) =>
      a.first_name.localeCompare(b.first_name)
    );
    setEntries(sortedEntries);
    setDropdownOpen(false);
  };

  const sortByDate = () => {
    const sortedEntries = [...entries].sort((a, b) => {
      const dateA = new Date(a.Violations.reverse()[0].violation_date);
      const dateB = new Date(b.Violations.reverse()[0].violation_date);
      return dateB.getTime() - dateA.getTime();
    });
    setEntries(sortedEntries);
    setDropdownOpen(false);
  };

  return (
    <div className="relative inline-block text-left lg:text-base md:text-sm text-xs">
      <button
        onClick={toggleDropdown}
        className="bg-color1 hover:bg-color2 active:bg-color1 border-gray-300 transition-all rounded-lg py-2 px-4 shadow-md shadow-gray-500 flex items-center text-white w-22 h-11"
      >
        Sort <span className="pl-2">▼</span>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={sortByName}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Sort by Name
            </button>
            <button
              onClick={sortByDate}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Sort by Date
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortButton;

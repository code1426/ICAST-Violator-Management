import React, { useState } from "react";
import { CaughtViolator } from "../types/violator";

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
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="bg-white border border-gray-300 rounded-lg p-2 shadow-sm hover:bg-gray-100 flex items-center"
      >
        Sort <span className="ml-2">▼</span>
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

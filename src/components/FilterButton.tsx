import React, { useState } from "react";
import { Violation } from "../types/violator";

interface FilterButtonProps {
  entries: Violation[];
  setEntries: React.Dispatch<React.SetStateAction<Violation[]>>;
}

const FilterButton = ({ entries, setEntries }: FilterButtonProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const filterAll = () => {
    setEntries(entries);
    toggleDropdown();
  };

  const filterPaid = () => {
    setEntries(entries.filter((entry) => entry.paid));
    toggleDropdown();
  };

  const filterUnpaid = () => {
    setEntries(entries.filter((entry) => !entry.paid));
    toggleDropdown();
  };

  return (
    <div className="relative inline-block text-left lg:text-base md:text-sm text-xs">
      <button
        onClick={toggleDropdown}
        className="bg-color1 hover:bg-color2 transition-all shadow-gray-500 rounded-lg py-2 px-4 shadow-md flex items-center text-white w-22 h-11">
        Filter <span className="pl-2">▼</span>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 z-10 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu">
            <button
              onClick={filterAll}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
              All Violations
            </button>
            <button
              onClick={filterUnpaid}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
              Unpaid
            </button>
            <button
              onClick={filterPaid}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
              Paid
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;

import React, { SetStateAction, useState } from "react";
// import { CaughtViolator } from "../types/violator";
import { CaughtViolator } from "../types/violator.types";

interface SearchBarProps {
  entries: CaughtViolator[] | undefined;
  setFilteredEntries: React.Dispatch<
    SetStateAction<CaughtViolator[] | undefined>
  >;
}

const SearchBar = ({ entries, setFilteredEntries }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchValue(searchTerm);

    const filteredItems = entries!.filter(
      (entry) =>
        entry!.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry!.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (searchValue != null || "") setFilteredEntries(filteredItems);
  };

  return (
    <div className="flex rounded-full md:py-3 md:px-4 py-2 px-3 w-5/6 bg-color3 space-x-2 border-b-color2 shadow-md shadow-gray-500">
      <input
        type="text"
        value={searchValue}
        placeholder="Search..."
        className="border-2 border-black rounded-full hover:ring-2 bg-color6 hover:ring-gray-600 transition-all px-5 py-1 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 lg:text-base md:text-sm text-xs "
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;

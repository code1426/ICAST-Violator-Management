import React, { SetStateAction, useState } from "react";
import { CaughtViolator } from "../types/violator";

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
        entry.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (searchValue != null || "") setFilteredEntries(filteredItems);
  };

  return (
    <div className="flex rounded-full py-3 px-4 w-4/6 bg-color3 mb-5 space-x-2 border-b-color2 shadow-md shadow-gray-500">
      <input
        type="text"
        value={searchValue}
        placeholder="Search..."
        className="border-2 border-black rounded-full px-5 py-1 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 lg:text-base md:text-sm text-xs "
        onChange={handleInputChange}
      />
    </div> 
  );
};

export default SearchBar;

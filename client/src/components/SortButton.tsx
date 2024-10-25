import React, { useState } from 'react';

interface Entry {
  id: number;
  name: string;
  address: string;
  date: string;
}

interface SortButtonProps {
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}

const SortButton = ({ entries, setEntries }: SortButtonProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const sortByName = () => {
    const sortedEntries = [...entries].sort((a, b) => a.name.localeCompare(b.name));
    setEntries(sortedEntries);
    setDropdownOpen(false); 
  };

  const sortByDate = () => {
    const sortedEntries = [...entries].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
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
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
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

// import React from 'react';
import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

  const handleButtonClick = () => {
    setIsMenuOpen((prev) => !prev); // Toggle menu visibility
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false); // Close menu when an item is clicked
  };

  const handleLogout = () => { 
    window.location.href = '/login';
  }
  return (
    <header className="flex items-center bg-color1 py-2 px-1">
      <img src="../src/assets/ICAST LOGO.png" className="mx-3 w-7 h-7" />
      <h1 className="lg:text-xl md:text-base text-xs font-bold text-center text-white">
        ILOILO CITY ANTI-SMOKING TASK FORCE
      </h1>

        <button 
          onClick={handleButtonClick}
          className="flex items-center ml-auto">
          <img src="../src/assets/menu-bar (1).png" 
          alt="Button Icon" 
          className="w-10 h-10 mr-2 bg-white rounded-md"/>
        </button>

      {isMenuOpen && <Menu onMenuItemClick={handleMenuItemClick} onLogout={handleLogout}/>}

    </header>
  );
};

const Menu: React.FC<{ onMenuItemClick: () => void; onLogout: () => void }> = ({ onMenuItemClick, onLogout }) => {
  return (
    <div className="absolute right-0 mt-20 w-48 bg-white rounded-md shadow-lg mr-1">
      <ul className="flex flex-col">

        <li 
        className="p-2 hover:bg-gray-200 cursor-pointer" 
        onClick={onMenuItemClick}>Cancel
        </li>

        <li 
        className="p-2 hover:bg-gray-200 cursor-pointer" 
        onClick={onMenuItemClick}>Account
        </li>

        <li 
        className="p-2 hover:bg-gray-200 cursor-pointer" 
        onClick={onLogout}>Log Out
        </li>

      </ul>
    </div>
  );
};


export default Header;

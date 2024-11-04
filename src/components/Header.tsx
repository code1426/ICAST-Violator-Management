import React, { useState, useRef, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const menuRef = useRef<HTMLDivElement | null>(null); 

  const handleButtonClick = () => {
    setIsMenuOpen((prev) => !prev); // Toggle menu visibility
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false); // Close menu when an item is clicked
  };

  const handleLogout = () => { 
    window.location.href = '/login';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="flex items-center bg-color1 py-2 px-1 shadow-md shadow-gray-500">
      <img src="../src/assets/ICAST LOGO.png" className="mx-3 w-7 h-7" />
      <h1 className="lg:text-xl md:text-base text-xs font-bold text-center text-white">
        ILOILO CITY ANTI-SMOKING TASK FORCE
      </h1>

      <button
        onClick={handleButtonClick}
        className="flex items-center ml-auto">
        <img src="../src/assets/image.png" 
        alt="Button Icon" 
        className="w-10 h-10 mr-2 bg-color1 rounded-md"/>
      </button>

      {isMenuOpen && <Menu ref={menuRef} onMenuItemClick={handleMenuItemClick} onLogout={handleLogout}/>}

    </header>
  );
};

const Menu = React.forwardRef<HTMLDivElement, { onMenuItemClick: () => void; onLogout: () => void }>(
  ({ onMenuItemClick, onLogout }, ref) => {
    return (
      <div ref={ref} className="absolute right-0 mt-12 w-48 z-10 bg-white rounded-md shadow-lg mr-1">
        <ul className="flex flex-col">

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
  }
);

export default Header;
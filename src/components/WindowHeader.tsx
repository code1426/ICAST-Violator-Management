import React, { useState, useEffect } from "react";

const windowHeader: React.FC = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  // This effect checks the initial window state
  useEffect(() => {
    // Get the initial state of the window (maximized or not) from the main process
    window.electronAPI.isMaximized().then((maximized: boolean) => {
      setIsMaximized(maximized);
    });
  }, []);

  // Handle minimize, maximize, and close actions
  const handleMinimize = () => {
    window.electronAPI.minimize();
  };

  const handleMaximize = () => {
    window.electronAPI.toggleMaximize();
    setIsMaximized(!isMaximized);
  };

  const handleClose = () => {
    window.electronAPI.close();
  };

  return (
    <div className="flex justify-end items-center bg-[#322723] text-white h-7 px-2 fixed top-0 left-0 right-0 z-50">
      <button
        className="text-white hover:bg-gray-700 w-7 rounded p-1.5"
        onClick={handleMinimize}
      >
        <img src="./minimize.png" alt="minimize" />
      </button>
      <button
        className="text-white hover:bg-gray-700 w-7 rounded p-1.5"
        onClick={handleMaximize}
      >
        {isMaximized ? (
          <img src="./maximize.png" alt="maximize" />
        ) : (
          <img src="./restore.png" alt="restore" />
        )}
      </button>
      <button
        className="text-white hover:bg-red-500 w-7 rounded p-1.5"
        onClick={handleClose}
      >
        <img src="./close.png" alt="close" />
      </button>
    </div>
  );
};

export default windowHeader;

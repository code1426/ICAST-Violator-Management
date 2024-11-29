// src/types/global.d.ts

declare global {
  interface Window {
    electronAPI: {
      minimize: () => void;
      toggleMaximize: () => void;
      close: () => void;
      isMaximized: () => Promise<boolean>;
    };
  }
}

export {}; // This ensures the file is treated as a module

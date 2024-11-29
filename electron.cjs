// electron.cjs
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, "public", "Logo.png"), // Path to the app logo
    frame: false, // Removes default OS-provided header
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true, // Ensures better security
      preload: path.join(__dirname, "preload.cjs"), // Path to your preload script
    },
  });

  const isDev = !app.isPackaged;
  const indexPath = path.join(__dirname, "dist", "index.html");

  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools(); // Open DevTools in development
  } else {
    mainWindow.loadFile(indexPath);
  }

  // Ensure the bottom taskbar remains visible
  mainWindow.setAlwaysOnTop(false, "screen-saver");
  mainWindow.setFullScreenable(false);

  // Handle window actions
  ipcMain.on("minimize-window", () => {
    if (mainWindow) {
      mainWindow.minimize();
    }
  });

  ipcMain.on("toggle-maximize", () => {
    if (mainWindow) {
      if (mainWindow.isMaximized()) {
        mainWindow.restore();
      } else {
        mainWindow.maximize();
      }
    }
  });

  ipcMain.on("close-window", () => {
    if (mainWindow) {
      mainWindow.close();
    }
  });

  // Send window state (whether maximized or not)
  ipcMain.handle("is-window-maximized", () => {
    return mainWindow.isMaximized();
  });

  app.on("ready", createWindow);

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

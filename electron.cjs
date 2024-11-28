// electron.cjs
const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
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

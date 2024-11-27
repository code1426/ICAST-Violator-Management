const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    // fullscreen: true,
    // frame: false,
    

    webPreferences: {
      contextIsolation: true, // Ensures better security
      nodeIntegration: true,
    },
  });

  // Load the Vite frontend
  const isDev = !app.isPackaged;

  // Resolve path to 'index.html' in dist folder for production
  const indexPath = path.join(__dirname, "dist", "index.html");
  console.log("Loading path: ", indexPath); // Log the path to check it

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

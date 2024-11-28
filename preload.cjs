// preload.js
const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  // Example of exposing Node.js functionality safely to the renderer
  myFunction: () => console.log("Function from Electron's main process")
});

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.send("minimize-window"),
  toggleMaximize: () => ipcRenderer.send("toggle-maximize"),
  close: () => ipcRenderer.send("close-window"),
  isMaximized: () => ipcRenderer.invoke("is-window-maximized"),
});



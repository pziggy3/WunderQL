/* eslint-disable no-restricted-globals */
const { contextBridge, ipcRenderer } = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  send: (channel, data) => {
    // whitelist channels
    console.log("this is in send within preload.js");
    const validChannels = [
      "signUpToMain",
      "loginToMain",
      "urlToMain",
      "queryTestToMain",
      "loadTestQueryToMain",
      "dashboardToMain",
      "postgresUrlToMain",
    ];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    console.log("im in receive in preload.js");
    const validChannels = [
      "fromMainSignup",
      "userLoggedInFromMain",
      "userIdFromMain",
      "urlsFromMain",
      "idFromMain",
      "queriesFromMain",
      "totalsFromMain",
    ];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => {
        func(...args);
      });
    }
  },
  receiveArray: (channel, arg) => {
    const validChannels = ["responseTimesFromMain", "loadTestResultsFromMain"];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, arg));
    }
  },
});

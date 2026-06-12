import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("thoughtweave", {
  appName: "ThoughtWeave",
  platform: process.platform
});

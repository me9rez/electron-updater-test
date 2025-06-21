import path from "path";

export const rootPath = path.join(__dirname, "../../");

export const distPath = path.join(rootPath, "out");

export const distElectronPath = path.join(distPath, "out-electron");

export const indexHtmlPath = path.join(distPath, "index.html");

export const preloadPath = path.join(distElectronPath, "./preload/preload.js");

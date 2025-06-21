import path from "path";

export const rootPath = path.join(__dirname, "../../");

export const distPath = path.join(rootPath, "dist");

export const distElectronPath = path.join(distPath, "dist-electron");

export const indexHtmlPath = path.join(distPath, "index.html");

export const preloadPath = path.join(distElectronPath, "./preload/preload.js");

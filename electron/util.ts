import path from "node:path";

export const rootPath = path.join(__dirname, "../../");

export const distPath = path.join(rootPath, "out");

export const indexHtmlPath = path.join(distPath, "renderer", "index.html");

export const preloadPath = path.join(distPath, "preload", "preload.js");

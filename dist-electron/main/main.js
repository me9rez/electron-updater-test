(() => { // webpackBootstrap
"use strict";
var __webpack_modules__ = ({});
/************************************************************************/
// The module cache
var __webpack_module_cache__ = {};

// The require function
function __webpack_require__(moduleId) {

// Check if module is in cache
var cachedModule = __webpack_module_cache__[moduleId];
if (cachedModule !== undefined) {
return cachedModule.exports;
}
// Create a new module (and put it into the cache)
var module = (__webpack_module_cache__[moduleId] = {
exports: {}
});
// Execute the module function
__webpack_modules__[moduleId](module, module.exports, __webpack_require__);

// Return the exports of the module
return module.exports;

}

/************************************************************************/
// webpack/runtime/compat_get_default_export
(() => {
// getDefaultExport function for compatibility with non-ESM modules
__webpack_require__.n = (module) => {
	var getter = module && module.__esModule ?
		() => (module['default']) :
		() => (module);
	__webpack_require__.d(getter, { a: getter });
	return getter;
};

})();
// webpack/runtime/define_property_getters
(() => {
__webpack_require__.d = (exports, definition) => {
	for(var key in definition) {
        if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
            Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
    }
};
})();
// webpack/runtime/has_own_property
(() => {
__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
})();
// webpack/runtime/rspack_version
(() => {
__webpack_require__.rv = () => ("1.4.0-beta.1")
})();
// webpack/runtime/rspack_unique_id
(() => {
__webpack_require__.ruid = "bundler=rspack@1.4.0-beta.1";

})();
/************************************************************************/

;// CONCATENATED MODULE: external "electron"
const external_electron_namespaceObject = require("electron");
;// CONCATENATED MODULE: external "path"
const external_path_namespaceObject = require("path");
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_namespaceObject);
;// CONCATENATED MODULE: ./electron/util.ts

const rootPath = external_path_default().join(__dirname, "../../");
const distPath = external_path_default().join(rootPath, "dist");
const distElectronPath = external_path_default().join(distPath, "dist-electron");
const indexHtmlPath = external_path_default().join(distPath, "index.html");
const preloadPath = external_path_default().join(distElectronPath, "./preload/preload.js");

;// CONCATENATED MODULE: ./electron/main.ts


const createWindow = ()=>{
    const win = new external_electron_namespaceObject.BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true
    });
    win.loadFile(indexHtmlPath);
};
external_electron_namespaceObject.app.whenReady().then(()=>{
    createWindow();
    external_electron_namespaceObject.app.on('activate', ()=>{
        if (external_electron_namespaceObject.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
external_electron_namespaceObject.app.on('window-all-closed', ()=>{
    if (process.platform !== 'darwin') {
        external_electron_namespaceObject.app.quit();
    }
});

})()
;
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
;// CONCATENATED MODULE: ./node_modules/.pnpm/@electron-toolkit+preload@3.0.2_electron@36.5.0/node_modules/@electron-toolkit/preload/dist/index.mjs


const electronAPI = {
    ipcRenderer: {
        send(channel, ...args) {
            external_electron_namespaceObject.ipcRenderer.send(channel, ...args);
        },
        sendTo(webContentsId, channel, ...args) {
            const electronVer = process.versions.electron;
            const electronMajorVer = electronVer ? parseInt(electronVer.split('.')[0]) : 0;
            if (electronMajorVer >= 28) {
                throw new Error('"sendTo" method has been removed since Electron 28.');
            }
            else {
                external_electron_namespaceObject.ipcRenderer.sendTo(webContentsId, channel, ...args);
            }
        },
        sendSync(channel, ...args) {
            return external_electron_namespaceObject.ipcRenderer.sendSync(channel, ...args);
        },
        sendToHost(channel, ...args) {
            external_electron_namespaceObject.ipcRenderer.sendToHost(channel, ...args);
        },
        postMessage(channel, message, transfer) {
            external_electron_namespaceObject.ipcRenderer.postMessage(channel, message, transfer);
        },
        invoke(channel, ...args) {
            return external_electron_namespaceObject.ipcRenderer.invoke(channel, ...args);
        },
        on(channel, listener) {
            external_electron_namespaceObject.ipcRenderer.on(channel, listener);
            return () => {
                external_electron_namespaceObject.ipcRenderer.removeListener(channel, listener);
            };
        },
        once(channel, listener) {
            external_electron_namespaceObject.ipcRenderer.once(channel, listener);
            return () => {
                external_electron_namespaceObject.ipcRenderer.removeListener(channel, listener);
            };
        },
        removeListener(channel, listener) {
            external_electron_namespaceObject.ipcRenderer.removeListener(channel, listener);
            return this;
        },
        removeAllListeners(channel) {
            external_electron_namespaceObject.ipcRenderer.removeAllListeners(channel);
        }
    },
    webFrame: {
        insertCSS(css) {
            return external_electron_namespaceObject.webFrame.insertCSS(css);
        },
        setZoomFactor(factor) {
            if (typeof factor === 'number' && factor > 0) {
                external_electron_namespaceObject.webFrame.setZoomFactor(factor);
            }
        },
        setZoomLevel(level) {
            if (typeof level === 'number') {
                external_electron_namespaceObject.webFrame.setZoomLevel(level);
            }
        }
    },
    webUtils: {
        getPathForFile(file) {
            return external_electron_namespaceObject.webUtils.getPathForFile(file);
        }
    },
    process: {
        get platform() {
            return process.platform;
        },
        get versions() {
            return process.versions;
        },
        get env() {
            return { ...process.env };
        }
    }
};
/**
 * Expose Electron APIs from your preload script, the API
 * will be accessible from the website on `window.electron`.
 */
function exposeElectronAPI() {
    if (process.contextIsolated) {
        try {
            external_electron_namespaceObject.contextBridge.exposeInMainWorld('electron', electronAPI);
        }
        catch (error) {
            console.error(error);
        }
    }
    else {
        // @ts-ignore (need dts)
        window.electron = electronAPI;
    }
}



;// CONCATENATED MODULE: ./electron/preload.ts

exposeElectronAPI();

})()
;
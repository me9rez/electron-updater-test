import { app, BrowserWindow } from 'electron';
import { indexHtmlPath, preloadPath } from './util';
import { setupAutoUpdater } from './updater';


const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            preload: preloadPath
        }
    })

    if (app.isPackaged) {
        win.loadFile(indexHtmlPath)
    } else {
        win.loadURL("http://localhost:3000/index.html")
        win.webContents.openDevTools()
    }

}

app.whenReady().then(() => {
    // 初始化自动更新
    // setupAutoUpdater();

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
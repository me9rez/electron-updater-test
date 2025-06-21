import { app, BrowserWindow } from 'electron';
import { distElectronPath, indexHtmlPath } from './util'

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
    })

    if (app.isPackaged) {
        win.loadFile(indexHtmlPath)
    }else{
        win.loadURL("http://localhost:3000/index.html")
        win.webContents.openDevTools()
    }

}

app.whenReady().then(() => {
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
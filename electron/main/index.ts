import { app, BrowserWindow, ipcMain } from 'electron'
import { createIPCHandler } from 'electron-trpc/main';
import {router} from './api';
import path from 'path'

const port = process.env.PORT || 5173;
const isdev = !app.isPackaged || (process.env.NODE_ENV == "development");
const server = isdev ? `http://localhost:${port}/` : `file://${path.join(__dirname, '../dist/index.html')}`;

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, '../', 'preload', 'index.cjs'),
      devTools: isdev,
    },
  })
  createIPCHandler({ router, windows: [win] });

  ipcMain.handle('ping', () => 'pong')

    win.loadURL(server)  // load the index.html of the app.
}

app.whenReady().then(() => {
  createWindow()
})
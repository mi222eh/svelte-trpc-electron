import { app, BrowserWindow, ipcMain } from 'electron'
import { createIPCHandler } from 'electron-trpc/main';
import { router } from './api';
import path from 'path'

const port = process.env.PORT || 3000;
const isdev = !app.isPackaged || (process.env.NODE_ENV == "development");
const server = isdev ? `http://localhost:${port}/` : `file://${path.join(__dirname, '../', 'renderer', 'index.html')}`;

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, '../', 'preload', 'index.cjs'),
      devTools: isdev,
    },
  })
  createIPCHandler({ router, windows: [win] });

  ipcMain.handle('ping', () => 'pong')

  if (isdev) {
    console.log('starting dev server')
    win.webContents.openDevTools()
    win.loadURL('http://localhost:3000')
  }
  else {
    console.log('loading from file')
    win.removeMenu()
    win.loadFile(path.join(__dirname, '../', 'renderer', 'index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()
})
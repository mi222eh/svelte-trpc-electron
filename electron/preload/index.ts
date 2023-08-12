import { contextBridge, ipcRenderer } from 'electron'
import { exposeElectronTRPC } from 'electron-trpc/main';

contextBridge.exposeInMainWorld('electron', {
  ping: () => ipcRenderer.invoke('ping')
})


process.once('loaded', async () => {
  exposeElectronTRPC();
});
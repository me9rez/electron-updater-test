import { createSignal, createEffect, Show, onMount } from 'solid-js'

const ipcRenderer = window.electron.ipcRenderer

const App = () => {

  onMount(() => {
    
    ipcRenderer.on('update-available', (event, info) => {
      console.log('update-available', info)
    })
    ipcRenderer.on('update-downloaded', (event, info) => {
      console.log('update-downloaded', info)
    })
    ipcRenderer.on('update-error', (event, info) => {
      console.log('update-error', info)
    })
    ipcRenderer.on('update-not-available', (event, info) => {
      console.log('update-not-available', info)
    })
    ipcRenderer.on('update-progress', (event, info) => {
      console.log('update-progress', info)
    })
    ipcRenderer.on('update-quit', (event, info) => {  
      console.log('update-quit', info)  
    })
    ipcRenderer.on('update-quit-and-install', (event, info) => {
      console.log('update-quit-and-install', info)
    })
    ipcRenderer.on('update-quit-and-install-success', (event, info) => {
      console.log('update-quit-and-install-success', info)
    })  
    window.electron.ipcRenderer.on('update-quit-and-install-fail', (event, info) => {      
      console.log('update-quit-and-install-fail', info)
    })
    ipcRenderer.on('update-quit-and-install-cancel', (event, info) => {
      console.log('update-quit-and-install-cancel', info)
    })
    ipcRenderer.on('update-quit-and-install-restart', (event, info) => {
      console.log('update-quit-and-install-restart', info)
    })
    ipcRenderer.on('update-quit-and-install-restart-success', (event, info) => {
      console.log('update-quit-and-install-restart-success', info)
    })
    ipcRenderer.on('update-quit-and-install-restart-fail', (event, info) => { 
      console.log('update-quit-and-install-restart-fail', info) 
    })  
    ipcRenderer.on('update-quit-and-install-restart-cancel', (event, info) => {
      console.log('update-quit-and-install-restart-cancel', info)
    })    
  })

  return (
    <div class="content">
      <h1>Electron应用自动更新测试</h1>
    </div>
  );
};

export default App;
